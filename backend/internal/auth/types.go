package auth

import "errors"

type user struct {
	// Caps for decoder (external package)
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

const JWT_MAX_AGE_MINUTES = 10
const SECONDS_PER_MINUTE = 60

var (
	ErrorEmailExists        = errors.New("An account with this email already exists!")
	ErrorInvalidCredentials = errors.New("Invalid credentials.")
	ErrorCreatingToken      = errors.New("Error creating JWT Token.")
)
