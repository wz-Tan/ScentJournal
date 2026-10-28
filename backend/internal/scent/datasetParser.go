package scent

import (
	"encoding/json"
	"io"
	"log"
	"os"
	"path/filepath"
	"strconv"
)

func parseJSONL(fileName string) ([]Scent, error) {
	file, err := os.Open(filepath.Join("internal", "datasets", fileName))
	if err != nil {
		log.Printf("Error opening file: %v", err)
		return nil, ErrorParseCSV
	}
	defer file.Close()

	dec := json.NewDecoder(file)

	var scents []Scent
	line := 0

	// While True
	for {
		var raw rawScent

		// Write into the rawScent object
		err := dec.Decode(&raw)

		if err == io.EOF {
			break
		}

		line++

		if err != nil {
			log.Printf("Error decoding record %d: %v", line, err)
			return nil, ErrorParseCSV
		}

		scents = append(scents, parseRecord(raw))
	}

	return scents, nil
}

func parseRecord(r rawScent) Scent {
	year := 0
	if r.Year != nil {
		year = *r.Year
	}

	collection := ""
	if r.Collection != nil {
		collection = *r.Collection
	}

	// if null = ""
	photo := r.Picture

	accords := make(map[string]int, len(r.Accords))
	for _, a := range r.Accords {
		accords[a.Name] = a.Strength
	}

	return Scent{
		ScentID:    strconv.Itoa(r.ID),
		Name:       r.Name,
		Year:       year,
		Gender:     r.Gender,
		PhotoURL:   photo,
		House:      r.Brand,
		Collection: collection,
		Accords:    accords,
	}
}
