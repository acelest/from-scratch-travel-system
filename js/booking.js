import { flights, taxis } from '../data/mockData.js';

// ========== BOOKING & CONFIRMATION MODAL FUNCTIONALITY ==========

function setupModals() {
  const bookingModal = document.getElementById('booking-modal');
  const confirmationModal = document.getElementById('confirmation-modal');
  const resultsGrid = document.getElementById('results-grid');
  const bookingForm = document.getElementById('booking-form');
  let currentFlight = null;

  function updateTotalPrice() {
    if (!currentFlight) return;
    const flightPrice = currentFlight.price;
    const selectedTaxi = document.querySelector('input[name="taxi-option"]:checked');
    const taxiPrice = selectedTaxi ? parseFloat(selectedTaxi.dataset.price) : 0;
    bookingModal.querySelector('#total-price').textContent = `€${flightPrice + taxiPrice}`;
  }

  function openBookingModal(flight) {
    currentFlight = flight;
    const { from, to, price } = flight;
    const taxiOptions = taxis[to.code]?.options;

    bookingModal.querySelector('#modal-flight-summary').innerHTML = `
      <h4>${from.city} (${from.code}) to ${to.city} (${to.code})</h4>
      <p>Flight Price: <strong class="price">€${price}</strong></p>`;

    const taxiContainer = bookingModal.querySelector('#taxi-options-container');
    let taxiHTML = '<div class="taxi-option"><label><input type="radio" name="taxi-option" value="none" data-price="0" checked> None</label></div>';
    if (taxiOptions) {
      for (const [type, details] of Object.entries(taxiOptions)) {
        taxiHTML += `
          <div class="taxi-option">
            <label>
              <input type="radio" name="taxi-option" value="${type}" data-price="${details.price}">
              <strong>${type}</strong> - ${details.vehicle}
            </label>
            <div class="taxi-price">€${details.price}</div>
          </div>`;
      }
    }
    taxiContainer.innerHTML = taxiHTML;
    taxiContainer.removeEventListener('change', updateTotalPrice); // Avoid duplicate listeners
    taxiContainer.addEventListener('change', updateTotalPrice);

    updateTotalPrice();
    bookingModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    bookingModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  function showConfirmationModal() {
    const selectedTaxiRadio = document.querySelector('input[name="taxi-option"]:checked');
    const taxiType = selectedTaxiRadio.value;
    const taxiPrice = parseFloat(selectedTaxiRadio.dataset.price);
    const total = currentFlight.price + taxiPrice;
    
    document.getElementById('conf-code').textContent = "SK" + Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('conf-summary').innerHTML = `
      <p><strong>Flight:</strong> ${currentFlight.from.city} to ${currentFlight.to.city}</p>
      ${taxiType !== 'none' ? `<p><strong>Taxi:</strong> ${taxiType} Transfer</p>` : ''}
      <p><strong>Total Paid:</strong> €${total}</p>`;

    closeBookingModal();
    confirmationModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  // Event Listeners
  resultsGrid.addEventListener('click', e => {
    const selectButton = e.target.closest('.btn-select');
    if (selectButton) {
      const flightId = parseInt(selectButton.dataset.flightId, 10);
      const selectedFlight = flights.find(f => f.id === flightId);
      if (selectedFlight) openBookingModal(selectedFlight);
    }
  });

  bookingModal.querySelector('.close-modal').addEventListener('click', closeBookingModal);
  bookingModal.addEventListener('click', e => { if (e.target === bookingModal) closeBookingModal(); });
  
  document.getElementById('book-another-btn').addEventListener('click', () => {
    confirmationModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });

  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const confirmBtn = bookingForm.querySelector('.btn-confirm');
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    confirmBtn.disabled = true;
    setTimeout(() => {
      showConfirmationModal();
      confirmBtn.innerHTML = 'Confirm & Pay';
      confirmBtn.disabled = false;
    }, 2500);
  });
}

document.addEventListener('DOMContentLoaded', setupModals);