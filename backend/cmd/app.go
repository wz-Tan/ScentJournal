package main

import (
	"ScentJournal/internal/scent"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5"
)

// Server
type application struct {
	config config
	db     *pgx.Conn
}

type config struct {
	addr string
	db   dbConfig
}

type dbConfig struct {
	dsn string
}

// Mount Router and Services
func (app *application) mount() http.Handler {
	r := chi.NewRouter()

	// A good base middleware stack
	r.Use(middleware.RequestID) // for rate limiting
	r.Use(middleware.RealIP)    // for rate limiting, analytics and tracing
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer) // crash recoverer

	r.Use(middleware.Timeout(60 * time.Second))

	// CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowedHeaders: []string{"*"},
		MaxAge:         300,
	}))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Server is running."))
	})

	// Init Services
	scentService := scent.NewService()
	scentHandler := scent.NewHandler(scentService)

	// Load Scents First
	if err := scentService.LoadScents(); err != nil {
		log.Fatalf("Error loading scents %v", err)
	}

	// Get Scents (With Offset)
	r.Get("/scents/offset={offset}", scentHandler.ListScents)

	// Query Scents (Autocomplete)
	r.Get("/scents/name={name}", scentHandler.QueryScents)

	// Get One Scent Detail
	r.Get("/scents/id={scentID}", scentHandler.GetScentDetails)

	return r
}

// Listen and Serve
func (app *application) run(h http.Handler) error {
	// Server Consists of App Config and Handler
	srv := &http.Server{
		Addr:         app.config.addr,
		Handler:      h,
		WriteTimeout: time.Second * 30,
		ReadTimeout:  time.Second * 10,
		IdleTimeout:  time.Minute * 1,
	}

	log.Printf("Server has started at address %s", srv.Addr)

	return srv.ListenAndServe()
}
