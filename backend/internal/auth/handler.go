package auth

import (
	"encoding/json"
	"net/http"
)

type handler struct {
	service Service
}

func NewHandler(service Service) *handler {
	return &handler{service: service}
}

func (h *handler) SignUp(w http.ResponseWriter, r *http.Request) {
	// Create Sign Up Object
	var u user

	// Parsing
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := h.service.signUp(u); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
