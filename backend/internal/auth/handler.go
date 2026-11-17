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

func (h *handler) SignIn(w http.ResponseWriter, r *http.Request) {
	// Create Sign In Object (Email and password. No username)
	var u user

	// Parsing
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get JWT Token
	token, err := h.service.signIn(u)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create HTTP Cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "ScentJournal_Token",
		Value:    token,
		HttpOnly: true,
		Secure:   false, // false on plain http localhost
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		MaxAge:   JWT_MAX_AGE_MINUTES * SECONDS_PER_MINUTE,
	})
	w.WriteHeader(http.StatusNoContent)
}

func (h *handler) SignOut(w http.ResponseWriter, r *http.Request) {
	// Just set the cookie with the name ScentJournal_Token to age of -1
	http.SetCookie(w, &http.Cookie{
		Name:     "ScentJournal_Token",
		Value:    "",
		HttpOnly: true,
		Secure:   false, // false on plain http localhost
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		MaxAge:   -1,
	})
	w.WriteHeader(http.StatusNoContent)
}
