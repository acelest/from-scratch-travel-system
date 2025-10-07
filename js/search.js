import { flights, taxis } from "../data/mockData.js";
import { DRIVERS } from "./data.js";

// ========== SHARED NAVBAR/BURGER MENU LOGIC ==========
function setupSharedUI() {
  const burgerMenu = document.getElementById("burger-menu");
  const navbarLinks = document.getElementById("navbar-links");
  const navbar = document.getElementById("navbar");

  if (burgerMenu) {
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("active");
      navbarLinks.classList.toggle("active");
    });
  }

  if (navbarLinks) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (burgerMenu && navbarLinks) {
          burgerMenu.classList.remove("active");
          navbarLinks.classList.remove("active");
        }
      });
    });
  }

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
}

// ========== DATE MANAGEMENT ==========
function setDefaultDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const departureDateInput = document.getElementById("departure-date");
  const returnDateInput = document.getElementById("return-date");
  const todayString = today.toISOString().split("T")[0];

  if (departureDateInput) {
    departureDateInput.value = tomorrow.toISOString().split("T")[0];
    departureDateInput.min = todayString;
  }
  if (returnDateInput) {
    returnDateInput.value = nextWeek.toISOString().split("T")[0];
    returnDateInput.min = todayString;
  }
}

// ========== TRIP TYPE TOGGLE ==========
function setupTripTypeToggle() {
  const tripTypeRadios = document.querySelectorAll('input[name="trip-type"]');
  const returnField = document.getElementById("return-field");

  tripTypeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (returnField) {
        returnField.style.display = radio.value === "one-way" ? "none" : "flex";
      }
    });
  });

  // Initialize visibility based on default checked radio
  const checked = document.querySelector('input[name="trip-type"]:checked');
  if (checked && returnField) {
    returnField.style.display = checked.value === "one-way" ? "none" : "flex";
  }
}

// ========== AUTOCOMPLETE ==========
function setupAutocomplete(inputId, dropdownId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);

  // Get unique locations from flights
  const locations = [
    ...new Set(
      flights.flatMap((f) => [f.from, f.to].map((loc) => JSON.stringify(loc)))
    ),
  ].map((locStr) => JSON.parse(locStr));

  // Populate dropdown with all locations
  dropdown.innerHTML = locations
    .map(
      (loc) => `
    <div class="suggestion-item" data-code="${loc.code}">
      <strong>${loc.city} ${loc.code}</strong>
    </div>`
    )
    .join("");

  // Show dropdown on focus
  input.addEventListener("focus", () => dropdown.classList.add("show"));

  // Hide dropdown on blur (with delay for click to register)
  input.addEventListener("blur", () =>
    setTimeout(() => dropdown.classList.remove("show"), 200)
  );

  // Filter suggestions on input
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    dropdown.querySelectorAll(".suggestion-item").forEach((suggestion) => {
      suggestion.style.display = suggestion.textContent
        .toLowerCase()
        .includes(query)
        ? "block"
        : "none";
    });
    dropdown.classList.add("show");
  });

  // Handle suggestion click
  dropdown.addEventListener("mousedown", (e) => {
    const suggestion = e.target.closest(".suggestion-item");
    if (suggestion) {
      input.value = suggestion.querySelector("strong").textContent;
      input.setAttribute("data-code", suggestion.getAttribute("data-code"));
      dropdown.classList.remove("show");
    }
  });
}

// ========== DISPLAY FLIGHTS ==========
function displayFlights(results) {
  const resultsGrid = document.getElementById("results-grid");
  const sectionTitle = document.querySelector("#results-section .section-title");

  if (!results.length) {
    sectionTitle.textContent = "No Flights Found";
    resultsGrid.innerHTML =
      '<p class="no-results-message">Sorry, we couldn\'t find any flights for your search. Please try different airports or dates.</p>';
    return;
  }

  sectionTitle.textContent = "Available Flights";

  // Render flight cards
  resultsGrid.innerHTML = results
    .map(
      (flight) => `
    <div class="flight-card">
      <div class="flight-header">
        <div class="airline-info">
          <div class="airline-logo">${flight.airline.substring(0, 2).toUpperCase()}</div>
          <span class="airline-name">${flight.airline}</span>
        </div>
        ${flight.badge ? `<div class="flight-badge ${flight.badge.toLowerCase().replace(' ', '-')}">${flight.badge}</div>` : ""}
      </div>

      <div class="flight-route">
        <div class="route-info">
          <div class="time">${flight.departureTime}</div>
          <div class="airport">${flight.from.code}</div>
        </div>
        <div class="flight-path">
          <div class="duration">${flight.duration}</div>
          <div class="path-line"></div>
          <div class="stops">${flight.stops}</div>
        </div>
        <div class="route-info">
          <div class="time">${flight.arrivalTime}</div>
          <div class="airport">${flight.to.code}</div>
        </div>
      </div>

      <div class="flight-footer">
        <div class="price">€${flight.price}</div>
        <div style="display: flex; gap: 12px">
          <button class="btn btn-secondary btn-details" data-flight-id="${flight.id}">
            View details
          </button>
          <button class="btn btn-primary btn-select" data-flight-id="${flight.id}">
            Select Flight
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// ========== SEARCH FORM ==========
function setupSearchForm() {
  const searchForm = document.getElementById("flight-search-form");
  if (!searchForm) return;

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fromInput = document.getElementById("from-airport");
    const toInput = document.getElementById("to-airport");
    let fromCode = fromInput.getAttribute("data-code");
    let toCode = toInput.getAttribute("data-code");

    // Fallback: derive IATA code from input like "Paris CDG" or "CDG"
    const deriveIata = (val) => {
      if (!val) return null;
      const match = val.trim().match(/([A-Z]{3})$/i);
      return match ? match[1].toUpperCase() : null;
    };

    if (!fromCode) {
      const derived = deriveIata(fromInput.value);
      if (derived) {
        fromCode = derived;
        fromInput.setAttribute("data-code", derived);
      }
    }

    if (!toCode) {
      const derived = deriveIata(toInput.value);
      if (derived) {
        toCode = derived;
        toInput.setAttribute("data-code", derived);
      }
    }

    if (!fromCode || !toCode) {
      showAlert(
        "Required fields",
        "Please select valid airports from suggestions or type the IATA code (e.g., CDG)."
      );
      [fromInput, toInput].forEach((inp) => inp.classList.add("input-error"));
      setTimeout(() => {
        [fromInput, toInput].forEach((inp) => inp.classList.remove("input-error"));
      }, 1200);
      return;
    }

    // Show loading state
    const searchButton = document.getElementById("search-button");
    searchButton.classList.add("loading");
    searchButton.disabled = true;

    // Simulate API delay
    setTimeout(() => {
      const results = flights.filter(
        (f) => f.from.code === fromCode && f.to.code === toCode
      );

      // Show results or fallback to sample flights
      displayFlights(results.length ? results : flights.slice(0, 3));

      searchButton.classList.remove("loading");
      searchButton.disabled = false;

      // Scroll to results
      document.getElementById("results-section").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 1000);
  });
}

// ========== MODALS MANAGEMENT ==========
function setupModals() {
  const bookingModal = document.getElementById("booking-modal");
  const detailsModal = document.getElementById("details-modal");
  const detailsBody = document.getElementById("details-body");
  const alertModal = document.getElementById("alert-modal");
  const alertTitle = document.getElementById("alert-title");
  const alertMessage = document.getElementById("alert-message");
  const confirmationModal = document.getElementById("confirmation-modal");
  const resultsGrid = document.getElementById("results-grid");
  const bookingForm = document.getElementById("booking-form");
  let currentFlight = null;

  // Update total price calculation
  function updateTotalPrice() {
    if (!currentFlight) return;

    const flightPrice = currentFlight.price;

    // Get taxi price
    const selectedTaxi = document.querySelector('input[name="taxi-option"]:checked');
    const taxiPrice = selectedTaxi ? parseFloat(selectedTaxi.dataset.price) : 0;

    // Get driver price
    const selectedDriver = document.querySelector('input[name="driver-option"]:checked');
    let driverPrice = 0;
    if (selectedDriver) {
      const driverName = selectedDriver.value;
      const destinationCode = currentFlight.to.code;
      const drivers = DRIVERS[destinationCode] || [];
      const driver = drivers.find((d) => d.name === driverName);
      if (driver) {
        driverPrice = driver.price;
      }
    }

    const totalPrice = flightPrice + taxiPrice + driverPrice;
    bookingModal.querySelector("#total-price").textContent = `€${totalPrice}`;
  }

  // Open booking modal
  function openBookingModal(flight) {
    currentFlight = flight;
    const { from, to, price } = flight;
    const taxiOptions = taxis[to.code]?.options;

    // Populate flight summary
    bookingModal.querySelector("#modal-flight-summary").innerHTML = `
      <h4>${from.city} (${from.code}) to ${to.city} (${to.code})</h4>
      <p>Flight Price: <strong class="price">&euro;${price}</strong></p>`;

    // Populate taxi options
    const taxiContainer = bookingModal.querySelector("#taxi-options-container");
    let taxiHTML =
      '<div class="taxi-option"><label><input type="radio" name="taxi-option" value="none" data-price="0" checked> None</label></div>';

    if (taxiOptions) {
      for (const [type, details] of Object.entries(taxiOptions)) {
        taxiHTML += `
          <div class="taxi-option">
            <label>
              <input type="radio" name="taxi-option" value="${type}" data-price="${details.price}">
              <strong>${type}</strong> - ${details.vehicle}
            </label>
            <div class="taxi-price">&euro;${details.price}</div>
          </div>`;
      }
    }
    taxiContainer.innerHTML = taxiHTML;
    taxiContainer.removeEventListener("change", updateTotalPrice);
    taxiContainer.addEventListener("change", updateTotalPrice);

    // Populate drivers
    const driversWrap = document.getElementById("drivers-container");
    const drivers = DRIVERS[to.code] || [];

    if (drivers.length) {
      driversWrap.innerHTML = `
        <h4 style="margin:8px 0;">Choose your driver:</h4>
        <div id="drivers-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;">
          ${drivers
            .map(
              (d, idx) => `
            <div class="driver-card" style="padding:12px;border:2px solid #e0e0e0;border-radius:8px;transition:all 0.2s;${
              idx === 0 ? "background:#f0f8ff;border-color:#007bff;" : ""
            }" data-driver-name="${d.name}">
              <label style="cursor:pointer;display:block;">
                <input type="radio" name="driver-option" value="${d.name}" style="margin-right:8px;" ${idx === 0 ? "checked" : ""} />
                <span style="font-weight:600;">${d.name}</span>
              </label>
              <div style="color:var(--gray-500);font-size:0.9rem;margin-top:4px;">${d.vehicle}</div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
                <span>⭐ ${d.rating}</span>
                <span class="price" style="font-weight:600;color:#007bff;">&euro;${d.price}</span>
              </div>
              <div style="font-size:0.85rem;color:var(--gray-500);margin-top:6px;">${d.notes}</div>
            </div>
          `
            )
            .join("")}
        </div>`;

      // Add event listeners for driver selection
      setTimeout(() => {
        const driverRadios = driversWrap.querySelectorAll('input[name="driver-option"]');
        driverRadios.forEach((radio) => {
          radio.addEventListener("change", (e) => {
            // Reset all cards
            driversWrap.querySelectorAll(".driver-card").forEach((card) => {
              card.style.background = "";
              card.style.borderColor = "#e0e0e0";
            });
            // Highlight selected card
            const selectedCard = e.target.closest(".driver-card");
            if (selectedCard) {
              selectedCard.style.background = "#f0f8ff";
              selectedCard.style.borderColor = "#007bff";
            }
            updateTotalPrice();
          });
        });
      }, 100);
    } else {
      driversWrap.innerHTML =
        "<div style='color:#888;font-size:0.95em;'>No drivers available for this destination.</div>";
    }

    updateTotalPrice();
    bookingModal.classList.remove("hidden");
    bookingModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close booking modal
  function closeBookingModal() {
    bookingModal.classList.add("hidden");
    bookingModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Show confirmation modal
  function showConfirmationModal() {
    const selectedTaxiRadio = document.querySelector('input[name="taxi-option"]:checked');
    const taxiType = selectedTaxiRadio.value;
    const taxiPrice = parseFloat(selectedTaxiRadio.dataset.price);

    const selectedDriver = document.querySelector('input[name="driver-option"]:checked');
    let driverPrice = 0;
    let driverName = "None";
    if (selectedDriver) {
      driverName = selectedDriver.value;
      const destinationCode = currentFlight.to.code;
      const drivers = DRIVERS[destinationCode] || [];
      const driver = drivers.find((d) => d.name === driverName);
      if (driver) driverPrice = driver.price;
    }

    const total = currentFlight.price + taxiPrice + driverPrice;

    // Generate confirmation code
    document.getElementById("conf-code").textContent =
      "SK" + Math.random().toString(36).substring(2, 11).toUpperCase();

    // Populate confirmation summary
    const confSummary = document.getElementById("conf-summary");
    if (confSummary) {
      confSummary.innerHTML = `
        <p><strong>Flight:</strong> ${currentFlight.from.city} to ${currentFlight.to.city}</p>
        ${taxiType !== "none" ? `<p><strong>Taxi:</strong> ${taxiType} Transfer</p>` : ""}
        ${driverName !== "None" ? `<p><strong>Driver:</strong> ${driverName}</p>` : ""}
        <p><strong>Total Paid:</strong> &euro;${total}</p>`;
    }

    closeBookingModal();
    confirmationModal.classList.remove("hidden");
    confirmationModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Open details modal
  function openDetailsModal(flight) {
    detailsBody.innerHTML = `
      <div class="flight-summary">
        <h4>${flight.from.city} (${flight.from.code}) → ${flight.to.city} (${flight.to.code})</h4>
        <p><strong>Airline:</strong> ${flight.airline}</p>
        <p><strong>Schedule:</strong> ${flight.departureTime} → ${flight.arrivalTime} (${flight.duration})</p>
        <p><strong>Stops:</strong> ${flight.stops}</p>
        <p><strong>Price:</strong> &euro;${flight.price}</p>
      </div>`;
    detailsModal.classList.remove("hidden");
    detailsModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close details modal
  function closeDetailsModal() {
    detailsModal.classList.add("hidden");
    detailsModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Show alert modal (global function)
  window.showAlert = function (title, message) {
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertModal.classList.remove("hidden");
    alertModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  // Close alert modal
  function closeAlert() {
    alertModal.classList.add("hidden");
    alertModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Event listeners for flight cards
  resultsGrid.addEventListener("click", (e) => {
    const selectButton = e.target.closest(".btn-select");
    const detailsButton = e.target.closest(".btn-details");

    if (selectButton) {
      const flightId = parseInt(selectButton.dataset.flightId, 10);
      const selectedFlight = flights.find((f) => f.id === flightId);
      if (selectedFlight) openBookingModal(selectedFlight);
    }

    if (detailsButton) {
      const flightId = parseInt(detailsButton.dataset.flightId, 10);
      const selectedFlight = flights.find((f) => f.id === flightId);
      if (selectedFlight) openDetailsModal(selectedFlight);
    }
  });

  // Modal close buttons
  bookingModal.querySelector(".close-modal").addEventListener("click", closeBookingModal);
  document.getElementById("details-close-btn").addEventListener("click", closeDetailsModal);
  document.querySelector("#details-modal .close-modal").addEventListener("click", closeDetailsModal);
  document.getElementById("alert-ok-btn").addEventListener("click", closeAlert);

  // Close modals on backdrop click
  document.getElementById("alert-modal").addEventListener("click", (e) => {
    if (e.target.id === "alert-modal") closeAlert();
  });
  document.getElementById("details-modal").addEventListener("click", (e) => {
    if (e.target.id === "details-modal") closeDetailsModal();
  });
  bookingModal.addEventListener("click", (e) => {
    if (e.target === bookingModal) closeBookingModal();
  });

  // Book another flight button
  document.getElementById("book-another-btn").addEventListener("click", () => {
    confirmationModal.classList.add("hidden");
    confirmationModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Booking form submission
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("user-name").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const phone = document.getElementById("user-phone").value.trim();

    if (!name || !email || !phone) {
      showAlert("Required fields", "Please provide your full name, email and phone.");
      return;
    }

    const confirmBtn = bookingForm.querySelector(".btn-confirm");
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    confirmBtn.disabled = true;

    // Optional: EmailJS submission
    try {
      if (window.emailjs && window.emailjs.send) {
        const passengersVal = document.getElementById("user-count").value;
        const departDateVal = document.getElementById("departure-date").value;
        const selectedTaxiRadio = document.querySelector('input[name="taxi-option"]:checked');
        const taxiType = selectedTaxiRadio ? selectedTaxiRadio.value : "none";
        const totalPrice = document.getElementById("total-price").textContent;

        let driver = "";
        const driverRadio = document.querySelector('input[name="driver-option"]:checked');
        if (driverRadio) driver = driverRadio.value;

        const formData = {
          name: name,
          phone: phone,
          person: passengersVal,
          reservationDate: departDateVal,
          time: currentFlight ? currentFlight.departureTime : "",
          message: document.getElementById("user-note").value,
          email: email,
          flight: currentFlight
            ? `${currentFlight.from.city} (${currentFlight.from.code}) → ${currentFlight.to.city} (${currentFlight.to.code})`
            : "",
          taxi: taxiType,
          total: totalPrice,
          driver: driver,
        };

        let serviceId = "service_e46lvrs";
        let templateId = "template_z6ov884";

        if (window.EMAILJS_CONFIG) {
          const { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } = window.EMAILJS_CONFIG;
          if (SERVICE_ID && TEMPLATE_ID) {
            serviceId = SERVICE_ID;
            templateId = TEMPLATE_ID;
          }
          if (PUBLIC_KEY) {
            try {
              window.emailjs.init(PUBLIC_KEY);
            } catch {}
          }
        }

        window.emailjs
          .send(serviceId, templateId, formData)
          .then(() => {
            // Email sent successfully
          })
          .catch(() => {
            // Email failed but don't block booking
          });
      }
    } catch {}

    // Show confirmation after delay
    setTimeout(() => {
      showConfirmationModal();
      confirmBtn.innerHTML = "Confirm & Pay";
      confirmBtn.disabled = false;
    }, 1200);
  });

  // Reset search form button
  const resetBtn = document.getElementById("reset-search-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const fromInput = document.getElementById("from-airport");
      const toInput = document.getElementById("to-airport");
      const depInput = document.getElementById("departure-date");
      const retWrap = document.getElementById("return-field");
      const retInput = document.getElementById("return-date");
      const oneWayRadio = document.querySelector('input[name="trip-type"][value="one-way"]');

      if (fromInput) {
        fromInput.value = "";
        fromInput.removeAttribute("data-code");
      }
      if (toInput) {
        toInput.value = "";
        toInput.removeAttribute("data-code");
      }
      if (oneWayRadio) {
        oneWayRadio.checked = true;
      }
      if (retWrap) retWrap.style.display = "none";
      if (depInput || retInput) setDefaultDates();

      const paxSelect = document.getElementById("passengers");
      if (paxSelect) paxSelect.value = "1";

      // Clear results
      const resultsGrid = document.getElementById("results-grid");
      if (resultsGrid) resultsGrid.innerHTML = "";

      const sectionTitle = document.querySelector("#results-section .section-title");
      if (sectionTitle) sectionTitle.textContent = "Available Flights";
    });
  }
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener("DOMContentLoaded", () => {
  setupSharedUI();
  setDefaultDates();
  setupTripTypeToggle();
  setupAutocomplete("from-airport", "from-dropdown");
  setupAutocomplete("to-airport", "to-dropdown");
  setupSearchForm();
  setupModals();

  // Apply URL query params if present
  const params = new URLSearchParams(window.location.search);
  const from = params.get("from");
  const to = params.get("to");
  const trip = params.get("trip");
  const depart = params.get("depart");
  const ret = params.get("return");

  const fromInput = document.getElementById("from-airport");
  const toInput = document.getElementById("to-airport");

  // Helper to convert code to city
  function codeToCity(code) {
    const flight =
      flights.find((fl) => fl.from.code === code) ||
      flights.find((fl) => fl.to.code === code);
    return flight ? (flight.from.code === code ? flight.from.city : flight.to.city) : code;
  }

  if (from && to) {
    fromInput.value = `${codeToCity(from)} ${from}`;
    fromInput.setAttribute("data-code", from);
    toInput.value = `${codeToCity(to)} ${to}`;
    toInput.setAttribute("data-code", to);

    if (depart) {
      const depInput = document.getElementById("departure-date");
      if (depInput) depInput.value = depart;
    }

    if (trip) {
      const radio = document.querySelector(`input[name="trip-type"][value="${trip}"]`);
      if (radio) radio.checked = true;

      const returnField = document.getElementById("return-field");
      if (trip === "one-way" && returnField) returnField.style.display = "none";

      if (trip === "round-trip" && ret) {
        const retInput = document.getElementById("return-date");
        if (retInput) retInput.value = ret;
      }
    }

    // Auto-run search
    const matches = flights.filter((f) => f.from.code === from && f.to.code === to);
    displayFlights(matches.length ? matches : flights.slice(0, 3));

    document.getElementById("results-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    // Default showcase
    fromInput.value = "Paris CDG";
    fromInput.setAttribute("data-code", "CDG");
    toInput.value = "New York JFK";
    toInput.setAttribute("data-code", "JFK");
    displayFlights(flights.slice(0, 3));
  }
});
