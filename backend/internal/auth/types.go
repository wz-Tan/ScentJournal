package auth

type signUp struct {
	// Caps for decoder (external package)
	Email    string `json:"email"`
	Password string `json:"password"`
}
