package scent

import (
	"cmp"
	"slices"
	"strings"
)

type Service interface {
	LoadScents() error
	ListScents(offset int) []Scent
	QueryScents(name string) ([]Scent, error)
	GetScentDetails(scentID string) (Scent, error)
}

type svc struct {
	scentsList []Scent          // For Iteration / Displays / Queries Cuz Map is Randomised in Go
	scentsMap  map[string]Scent // For ID Lookup
}

func NewService() Service {
	return &svc{}
}

// Init Scents Database
func (s *svc) LoadScents() error {
	// Load Scents on Creation
	scentsList, err := parseJSONL("perfumes.jsonl")

	if err != nil {
		return err
	}

	// Sort Scents List Alphabetically
	slices.SortFunc(scentsList, func(a, b Scent) int {
		return cmp.Compare(strings.ToLower(a.Name), strings.ToLower(b.Name))
	})

	// Hashmap Init
	scentsMap := make(map[string]Scent, len(scentsList))

	for _, scent := range scentsList {
		scentsMap[scent.ScentID] = scent
	}

	s.scentsList = scentsList
	s.scentsMap = scentsMap

	return nil
}

// List a Specific Number of Scents (Support Lazy Loading)
func (s *svc) ListScents(offset int) []Scent {
	// How Much Per Load
	const BATCH_SIZE	 = 100

	// Edge Cases
	// Offset out of bounds
	if offset > len(s.scentsList) {
		return []Scent{}
	} else if (offset + BATCH_SIZE	) > len(s.scentsList) {
		// Offset in bounds but BATCH_SIZE	 out of bounds
		return s.scentsList[offset : len(s.scentsList)-1]
	}

	return s.scentsList[offset : offset+BATCH_SIZE	]
}

// Search for Scent
func (s *svc) QueryScents(name string) ([]Scent, error) {

	// Sanity Check for Name Input
	name = strings.ToLower(strings.TrimSpace(name))

	if name == "" {
		return nil, ErrorInvalidQuery
	}

	const maxResults = 10

	var res []Scent
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
func (s *svc) GetScentDetails(scentID string) (Scent, error) {
	scent, exists := s.scentsMap[scentID]
	if !exists {
		return Scent{}, ErrorScentNotFound
	}

	return scent, nil
}
