package scent

import (
	"ScentJournal/internal/utils"
	"net/http"
	"strconv"
	"strings"
)

// No export, so small letters
type handler struct {
	service service
}

func NewHandler(service service) *handler {
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
	scents := h.service.listScents(offset)
	utils.Write(w, http.StatusOK, scents)
}

// Query Scent by Name
func (h *handler) QueryScents(w http.ResponseWriter, r *http.Request) {
	scentName := strings.ToLower(r.PathValue("name"))

	scents, err := h.service.queryScents(scentName)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.Write(w, http.StatusOK, scents)
}

// Get Specific Scent Details
func (h *handler) GetScentDetails(w http.ResponseWriter, r *http.Request) {
	scentID := strings.ToLower(r.PathValue("scentID"))

	scents, err := h.service.getScentDetails(scentID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.Write(w, http.StatusOK, scents)
}
