package main

import (
	"log/slog"
	"os"
)

func main() {
	// Advanced Logging
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	cfg := config{
		addr: ":8080",
		db: dbConfig{
			dsn: "",
		},
	}

	// Connect to DB (Postgres not set yet)
	// ctx := context.Background()
	// conn, err := pgx.Connect(ctx, cfg.db.dsn)

	// if err != nil {
	// 	panic(err)
	// }

	// defer conn.Close(ctx)

	api := application{
		config: cfg,
		db:     nil,
	}

	// Get Router
	h := api.mount()

	if err := api.run(h); err != nil {
		slog.Error("Error running application", err)
		os.Exit(67)
	}
}
