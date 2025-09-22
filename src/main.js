document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Trip Type Toggle --- //
  const tripTypeRadios = document.querySelectorAll('input[name="trip-type"]');
  const returnDateGroup = document.getElementById('return-date-group');

  tripTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'one-way') {
        returnDateGroup.classList.add('hidden');
      } else {
        returnDateGroup.classList.remove('hidden');
      }
    });
  });

  // --- 2. Modal Logic --- //
  const bookingModal = document.getElementById('booking-modal');
  const closeModalBtn = bookingModal.querySelector('.close-modal');
  const bookFlightBtns = document.querySelectorAll('.btn-book');

  // Function to open the modal
  const openModal = () => bookingModal.classList.remove('hidden');
  
  // Function to close the modal
  const closeModal = () => bookingModal.classList.add('hidden');

  // Attach event listeners to all 'Book Flight' buttons
  bookFlightBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.flight-card');
      populateModal(card);
      openModal();
    });
  });

  // Close modal event
  closeModalBtn.addEventListener('click', closeModal);

  // --- 3. Populate Modal with Flight Data --- //
  const modalFlightSummary = document.getElementById('modal-flight-summary');
  const modalTotalPriceEl = document.getElementById('total-price');

  function populateModal(flightCard) {
    const route = flightCard.querySelector('h4').textContent;
    const priceEl = flightCard.querySelector('.price');
    const price = parseFloat(priceEl.textContent.replace('$', ''));

    modalFlightSummary.querySelector('h4').textContent = route;
    const flightPriceEl = modalFlightSummary.querySelector('.price');
    flightPriceEl.textContent = `$${price}`;
    flightPriceEl.dataset.price = price;

    // Reset taxi toggle and update total price
    taxiToggle.checked = false;
    updateTotalPrice();
  }

  // --- 4. Taxi Add-on & Price Calculation --- //
  const taxiToggle = document.getElementById('add-taxi-toggle');
  const taxiPrice = parseFloat(document.querySelector('.taxi-proposal .price').dataset.price);

  taxiToggle.addEventListener('change', updateTotalPrice);

  function updateTotalPrice() {
    const flightPrice = parseFloat(modalFlightSummary.querySelector('.price').dataset.price);
    let total = flightPrice;

    if (taxiToggle.checked) {
      total += taxiPrice;
    }

    modalTotalPriceEl.textContent = `$${total.toFixed(2)}`;
  }

  // --- 5. Final Booking Confirmation --- //
  const bookingForm = document.getElementById('booking-form');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const flightPrice = parseFloat(modalFlightSummary.querySelector('.price').dataset.price);
    const includeTaxi = taxiToggle.checked;
    const totalPrice = document.getElementById('total-price').textContent;

    const bookingDetails = {
      fullName: document.getElementById('user-name').value,
      email: document.getElementById('user-email').value,
      flight: modalFlightSummary.querySelector('h4').textContent,
      flightPrice: `$${flightPrice}`,
      taxiAdded: includeTaxi,
      total: totalPrice,
    };

    console.log('Booking Confirmed:', bookingDetails);
    alert(`Booking Confirmed!\nTotal: ${totalPrice}`);
    
    closeModal();
  });

});