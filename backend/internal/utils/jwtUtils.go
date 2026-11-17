package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var secret = []byte(os.Getenv("JWT_SECRET"))

// Function to Make A JWT Token
func MakeToken(userEmail string, liveMinutes int) (string, error) {
	// Payload
	claims := jwt.MapClaims{
		"sub": userEmail,
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(time.Duration(liveMinutes) * time.Minute).Unix(),
	}
	// Add Header
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Create Token with Stamp
	return t.SignedString(secret)
}
