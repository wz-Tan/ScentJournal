package auth

import (
	"log"
	"net/http"
	"os"

	"ScentJournal/internal/utils"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type Service interface {
	signUp(user user) error
	signIn(user user) (string, error)
	me(cookie *http.Cookie) (string, error)
}

type svc struct {
	// email to user object map
	users map[string]user
}

func NewService() Service {
	return &svc{
		users: make(map[string]user),
	}
}

func (s *svc) signUp(u user) error {
	// Email Already Exists
	if _, exists := s.users[u.Email]; exists {
		return ErrorEmailExists
	}

	// Hash Password
	hash, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	u.Password = string(hash)

	log.Print("Storing user", u)

	// Upload into map
	s.users[u.Email] = u
	return nil
}

func (s *svc) signIn(u user) (string, error) {
	// Email Does Not Exist
	retrievedUser, exists := s.users[u.Email]

	if !exists {
		return "", ErrorInvalidCredentials
	}

	// Match password
	err := bcrypt.CompareHashAndPassword([]byte(retrievedUser.Password), []byte(u.Password))
	if err != nil {
		return "", ErrorInvalidCredentials
	}

	// Return Token (use email to sign)
	token, err := utils.MakeToken(u.Email, JWT_MAX_AGE_MINUTES)
	if err != nil {
		return "", ErrorCreatingToken
	}

	return token, nil
}

func (s *svc) me(cookie *http.Cookie) (string, error) {
	var secret = []byte(os.Getenv("JWT_SECRET"))

	// Get the Token after Verifying Stamp Matches
	token, err := jwt.Parse(cookie.Value, func(token *jwt.Token) (any, error) {
		return secret, nil
	}, jwt.WithValidMethods([]string{"HS256"}))

	if err != nil || !token.Valid {
		return "", ErrorParsingToken
	}

	// Get Value in Token (Claims = Payload)
	email, err := token.Claims.GetSubject() // reads "sub"
	if err != nil {
		return "", err
	}

	return email, nil

}
