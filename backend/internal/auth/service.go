package auth

import (
	"log"

	"ScentJournal/internal/utils"

	"golang.org/x/crypto/bcrypt"
)

type Service interface {
	signUp(user user) error
	signIn(user user) (string, error)
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
