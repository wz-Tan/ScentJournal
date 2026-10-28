package scent

import "errors"

// Raw is When It Gets Read from the JSONL file
type rawScent struct {
	ID         int         `json:"id"`
	Name       string      `json:"name"`
	Brand      string      `json:"brand"`
	Year       *int        `json:"year"`       // null when unknown
	Collection *string     `json:"collection"` // null when not part of a line
	Gender     string      `json:"gender"`     // male / female / unisex
	Picture    string      `json:"picture"`
	Accords    []rawAccord `json:"accords"`
}

type rawAccord struct {
	Name     string `json:"name"`
	Strength int    `json:"strength"` // 0..100
}

type Scent struct {
	ScentID    string         `json:"scentId"`
	Name       string         `json:"name"`
	Year       int            `json:"year"`
	Gender     string         `json:"gender"`
	PhotoURL   string         `json:"photoUrl"`
	House      string         `json:"house"`
	Collection string         `json:"collection"`
	Accords    map[string]int `json:"accords"`
}

var (
	ErrorInvalidQuery  = errors.New("Invalid Query")
	ErrorScentNotFound = errors.New("Scent Not Found")
	ErrorParseCSV      = errors.New("Error Parsing CSV")
)

var sampleScents = map[string]Scent{
	"1": {
		ScentID:    "1",
		Name:       "Pacific Blue",
		Year:       2021,
		Gender:     "male",
		PhotoURL:   "https://fimgs.net/mdimg/perfume/375x500.1.jpg",
		House:      "Maison Alhambra",
		Collection: "Tom Ford Clone",
		Accords: map[string]int{
			"vanilla": 100,
			"citrus":  72,
			"musky":   64,
			"sweet":   55,
		},
	},
	"2": {
		ScentID:    "2",
		Name:       "Kismet Angel",
		Year:       2022,
		Gender:     "unisex",
		PhotoURL:   "https://fimgs.net/mdimg/perfume/375x500.2.jpg",
		House:      "Maison Alhambra",
		Collection: "Kilian Clone",
		Accords: map[string]int{
			"vanilla": 100,
			"amber":   81,
			"sweet":   70,
			"musky":   58,
		},
	},
	"3": {
		ScentID:    "3",
		Name:       "Club de Nuit Intense Man",
		Year:       2015,
		Gender:     "male",
		PhotoURL:   "https://fimgs.net/mdimg/perfume/375x500.3.jpg",
		House:      "Armaf",
		Collection: "Creed Clone",
		Accords: map[string]int{
			"fruity": 100,
			"citrus": 78,
			"woody":  66,
			"musky":  60,
			"smoky":  45,
		},
	},
}
