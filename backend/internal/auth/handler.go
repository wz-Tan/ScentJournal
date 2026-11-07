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
	var userInfo signUp

	// Parsing
	if err := json.NewDecoder(r.Body).Decode(&userInfo); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	h.service.signUp(userInfo.Email, userInfo.Password)
}
