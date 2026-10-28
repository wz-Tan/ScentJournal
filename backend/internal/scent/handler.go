package scent

import (
	"ScentJournal/internal/utils"
	"net/http"
	"strconv"
	"strings"
)

// No export, so small letters
type handler struct {
	service Service
}

func NewHandler(service Service) *handler {
	return &handler{
		service: service,
	}
}

// List Scents
func (h *handler) ListScents(w http.ResponseWriter, r *http.Request) {
	offset, err := strconv.Atoi(r.PathValue("offset"))

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	scents := h.service.ListScents(offset)
	utils.Write(w, http.StatusOK, scents)
}

// Query Scent by Name
func (h *handler) QueryScents(w http.ResponseWriter, r *http.Request) {
	scentName := strings.ToLower(r.PathValue("name"))

	scents, err := h.service.QueryScents(scentName)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.Write(w, http.StatusOK, scents)
}

// Get Specific Scent Details
func (h *handler) GetScentDetails(w http.ResponseWriter, r *http.Request) {
	scentID := strings.ToLower(r.PathValue("scentID"))

	scents, err := h.service.GetScentDetails(scentID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.Write(w, http.StatusOK, scents)
}
