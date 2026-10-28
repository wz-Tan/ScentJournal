package utils

import (
	"encoding/json"
	"net/http"
)

func Write(w http.ResponseWriter, status int, data any) {
	// Set Headers
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	// Write Back
	json.NewEncoder(w).Encode(data)
}
