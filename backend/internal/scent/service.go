package scent

import (
	"cmp"
	"slices"
	"strings"
)

type service interface {
	LoadScents() error
	listScents(offset int) []scent
	queryScents(name string) ([]scent, error)
	getScentDetails(scentID string) (scent, error)
}

type svc struct {
	scentsList []scent          // For Iteration / Displays / Queries Cuz Map is Randomised in Go
	scentsMap  map[string]scent // For ID Lookup
}

func NewService() service {
	return &svc{}
}

// Init Scents Database (Specifically capitalised because used in app)
func (s *svc) LoadScents() error {
	// Load Scents on Creation
	scentsList, err := parseJSONL("perfumes.jsonl")

	if err != nil {
		return err
	}

	// Sort Scents List Alphabetically
	slices.SortFunc(scentsList, func(a, b scent) int {
		return cmp.Compare(strings.ToLower(a.Name), strings.ToLower(b.Name))
	})

	// Hashmap Init
	scentsMap := make(map[string]scent, len(scentsList))

	for _, scent := range scentsList {
		scentsMap[scent.ScentID] = scent
	}

	s.scentsList = scentsList
	s.scentsMap = scentsMap

	return nil
}

// List a Specific Number of Scents (Support Lazy Loading)
func (s *svc) listScents(offset int) []scent {
	// How Much Per Load
	const BATCH_SIZE = 100

	// Edge Cases
	// Offset out of bounds
	if offset > len(s.scentsList) {
		return []scent{}
	} else if (offset + BATCH_SIZE) > len(s.scentsList) {
		// Offset in bounds but BATCH_SIZE	 out of bounds
		return s.scentsList[offset : len(s.scentsList)-1]
	}

	return s.scentsList[offset : offset+BATCH_SIZE]
}

// Search for Scent
func (s *svc) queryScents(name string) ([]scent, error) {

	// Sanity Check for Name Input
	name = strings.ToLower(strings.TrimSpace(name))

	if name == "" {
		return nil, ErrorInvalidQuery
	}

	const maxResults = 10

	var res []scent
	var counter int

	// Find Corresponding Name or House
	for _, scent := range s.scentsList {
		// Max Results Reached
		if counter == maxResults {
			break
		}

		if strings.Contains(strings.ToLower(scent.Name), name) || strings.Contains(strings.ToLower(scent.House), name) {
			res = append(res, scent)
			counter++
		}
	}

	return res, nil
}

// Get One Scent Only
func (s *svc) getScentDetails(scentID string) (scent, error) {
	selectedScent, exists := s.scentsMap[scentID]
	if !exists {
		return scent{}, ErrorScentNotFound
	}

	return selectedScent, nil
}
