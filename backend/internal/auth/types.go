package auth

import "errors"

type user struct {
	// Caps for decoder (external package)
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

var (
	ErrorEmailExists        = errors.New("An account with this email already exists!")
	ErrorInvalidCredentials = errors.New("Invalid credentials.")
)
