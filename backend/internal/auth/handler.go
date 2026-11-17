package auth

import (
	"ScentJournal/internal/utils"
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
		Name:     "ScentJournal_Cookie",
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
	// Just set the cookie with the name ScentJournal_Cookie to age of -1
	http.SetCookie(w, &http.Cookie{
		Name:     "ScentJournal_Cookie",
		Value:    "",
		HttpOnly: true,
		Secure:   false, // false on plain http localhost
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		MaxAge:   -1,
	})
	w.WriteHeader(http.StatusNoContent)
}

// Identify Your Email from Cookie
func (h *handler) Me(w http.ResponseWriter, r *http.Request) {
	// Retrieve Cookie from Request
	cookie, err := r.Cookie("ScentJournal_Cookie")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	email, err := h.service.me(cookie)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return User Email to Frontend
	utils.Write(w, http.StatusOK, email)
}
