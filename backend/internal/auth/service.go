package auth

import "log"

type Service interface {
	signUp(email string, password string)
}

type svc struct {
}

func NewService() Service {
	return &svc{}
}

func (s *svc) signUp(email string, password string) {
	log.Print("Signing up with ", email, password)
}
