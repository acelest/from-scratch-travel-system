// ========== HOTELS.JS - Hotel booking functionality ==========

// Mock hotel data
const HOTELS = [
  {
    id: "ritz-carlton",
    name: "The Ritz Carlton",
    location: "Paris, France",
    price: 299,
    rating: 4.8,
    category: "luxury",
    features: ["Free WiFi", "Pool", "Gym"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
  },
  {
    id: "four-seasons",
    name: "Four Seasons",
    location: "London, UK",
    price: 399,
    rating: 4.9,
    category: "premium",
    features: ["Free WiFi", "Spa", "Restaurant"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
  },
  {
    id: "waldorf-astoria",
    name: "Waldorf Astoria",
    location: "New York, USA",
    price: 499,
    rating: 4.7,
    category: "luxury",
    features: ["Free WiFi", "Valet", "Concierge"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop"
  },
  {
    id: "mandarin-oriental",
    name: "Mandarin Oriental",
    location: "Tokyo, Japan",
    price: 349,
    rating: 4.8,
    category: "premium",
    features: ["Free WiFi", "Spa", "Pool"],
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop"
  },
  {
    id: "burj-al-arab",
    name: "Burj Al Arab",
    location: "Dubai, UAE",
    price: 899,
    rating: 4.9,
    category: "luxury",
    features: ["Free WiFi", "Pool", "Helipad"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: "marriott",
    name: "Marriott Resort",
    location: "Barcelona, Spain",
    price: 199,
    rating: 4.5,
    category: "standard",
    features: ["Free WiFi", "Pool", "Gym"],
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop"
  }
];

// Mock cities data
const CITIES = [
  { name: "Paris", country: "France", code: "paris" },
  { name: "London", country: "United Kingdom", code: "london" },
  { name: "New York", country: "USA", code: "new-york" },
  { name: "Tokyo", country: "Japan", code: "tokyo" },
  { name: "Dubai", country: "UAE", code: "dubai" },
  { name: "Barcelona", country: "Spain", code: "barcelona" },
  { name: "Rome", country: "Italy", code: "rome" },
  { name: "Sydney", country: "Australia", code: "sydney" }
];

// Initialize hotel page
document.addEventListener('DOMContentLoaded', function() {
  initializeHotelPage();
});

function initializeHotelPage() {
  setupHotelSearchForm();
  setupHotelBooking();
  setupNavbar();
  setMinDates();
}

// ========== HOTEL SEARCH FORM ==========
function setupHotelSearchForm() {
  const form = document.getElementById('hotel-search-form');
  const destinationInput = document.getElementById('hotel-destination');
  const dropdown = document.getElementById('hotel-dropdown');
  
  if (!form || !destinationInput || !dropdown) {
    return;
  }
  
  // Setup autocomplete for destination
  setupHotelAutocomplete(destinationInput, dropdown);
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    searchHotels();
  });
}

function setupHotelAutocomplete(input, dropdown) {
  let timeoutId;
  
  input.addEventListener('input', function() {
    clearTimeout(timeoutId);
    const query = this.value.toLowerCase();
    
    if (query.length < 2) {
      dropdown.classList.remove('show');
      return;
    }
    
    timeoutId = setTimeout(() => {
      const suggestions = CITIES.filter(city => 
        city.name.toLowerCase().includes(query) || 
        city.country.toLowerCase().includes(query)
      ).slice(0, 5);
      
      if (suggestions.length > 0) {
        dropdown.innerHTML = suggestions.map(city => 
          `<div class="suggestion-item" data-city="${city.code}">
            <strong>${city.name}</strong> - ${city.country}
          </div>`
        ).join('');
        dropdown.classList.add('show');
      } else {
        dropdown.classList.remove('show');
      }
    }, 150);
  });
  
  // Handle suggestion clicks
  dropdown.addEventListener('click', function(e) {
    if (e.target.closest('.suggestion-item')) {
      const item = e.target.closest('.suggestion-item');
      const cityCode = item.dataset.city;
      const city = CITIES.find(c => c.code === cityCode);
      
      if (city) {
        input.value = `${city.name}, ${city.country}`;
        input.dataset.city = cityCode;
        dropdown.classList.remove('show');
      }
    }
  });
  
  // Close dropdown on blur
  input.addEventListener('blur', function() {
    setTimeout(() => {
      dropdown.classList.remove('show');
    }, 150);
  });
}

function searchHotels() {
  const button = document.getElementById('hotel-search-button');
  const destination = document.getElementById('hotel-destination').value.trim();
  const checkin = document.getElementById('checkin-date').value;
  const checkout = document.getElementById('checkout-date').value;
  const guests = document.getElementById('guests').value;
  
  // Validation
  if (!validateSearchForm(destination, checkin, checkout, guests)) {
    return;
  }
  
  // Show loading state
  if (button) {
    button.classList.add('loading');
    const buttonText = button.querySelector('.button-text');
    const spinner = button.querySelector('.loading-spinner');
    
    if (buttonText) buttonText.style.opacity = '0';
    if (spinner) spinner.classList.remove('hidden');
  }
  
  // Simulate search delay
  setTimeout(() => {
    // Filter hotels based on search criteria
    const filteredHotels = filterHotels(destination, checkin, checkout, guests);
    
    // Reset button
    if (button) {
      button.classList.remove('loading');
      const buttonText = button.querySelector('.button-text');
      const spinner = button.querySelector('.loading-spinner');
      
      if (buttonText) buttonText.style.opacity = '1';
      if (spinner) spinner.classList.add('hidden');
    }
    
    // Show results
    if (filteredHotels.length > 0) {
      showAlert('Search Results', `Found ${filteredHotels.length} hotels matching your criteria!`);
    } else {
      showAlert('No Results', 'No hotels found matching your criteria. Please try different dates or destination.');
    }
  }, 2000);
}

function validateSearchForm(destination, checkin, checkout, guests) {
  const errors = [];
  
  if (!destination) {
    errors.push('Please enter a destination');
  }
  
  if (!checkin) {
    errors.push('Please select check-in date');
  }
  
  if (!checkout) {
    errors.push('Please select check-out date');
  }
  
  if (checkin && checkout && new Date(checkin) >= new Date(checkout)) {
    errors.push('Check-out date must be after check-in date');
  }
  
  if (!guests || guests < 1) {
    errors.push('Please select number of guests');
  }
  
  if (errors.length > 0) {
    showAlert('Validation Error', errors.join('<br>'));
    return false;
  }
  
  return true;
}

function filterHotels(destination, checkin, checkout, guests) {
  // Simple filtering logic
  let filtered = [...HOTELS];
  
  if (destination) {
    const cityCode = document.getElementById('hotel-destination').dataset.city;
    if (cityCode) {
      filtered = filtered.filter(hotel => 
        hotel.location.toLowerCase().includes(cityCode.replace('-', ' '))
      );
    }
  }
  
  return filtered;
}

// ========== HOTEL BOOKING ==========
function setupHotelBooking() {
  const bookButtons = document.querySelectorAll('.btn-book-hotel');
  const modal = document.getElementById('hotel-booking-modal');
  const closeModal = modal?.querySelector('.close-modal');
  
  if (!modal || !closeModal) {
    return;
  }
  
  // Book button clicks
  bookButtons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const hotelId = this.dataset.hotel;
      openHotelBookingModal(hotelId);
    });
  });
  
  // Close modal
  closeModal.addEventListener('click', function(e) {
    e.preventDefault();
    closeHotelBookingModal();
  });
  
  // Close on backdrop click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeHotelBookingModal();
    }
  });
  
  // Setup step navigation
  setupStepNavigation();
}

function openHotelBookingModal(hotelId) {
  const hotel = HOTELS.find(h => h.id === hotelId);
  if (!hotel) {
    showAlert('Error', 'Hotel not found. Please try again.');
    return;
  }
  
  const modal = document.getElementById('hotel-booking-modal');
  const summary = document.getElementById('modal-hotel-summary');
  const totalPrice = document.getElementById('hotel-total-price');
  
  if (!modal || !summary || !totalPrice) {
    return;
  }
  
  // Update modal content
  summary.innerHTML = `
    <h4>${hotel.name}</h4>
    <p>${hotel.location}</p>
    <p>Price: <strong class="price" data-price="${hotel.price}">€${hotel.price}</strong> per night</p>
  `;
  
  totalPrice.textContent = `€${hotel.price}`;
  
  // Store hotel data
  modal.dataset.hotelId = hotelId;
  
  // Reset to step 1
  resetStepForm();
  
  // Show modal with proper centering
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  document.body.style.overflow = 'hidden';
  
  // Force reflow to ensure the modal is visible and centered
  modal.offsetHeight;
}

function closeHotelBookingModal() {
  const modal = document.getElementById('hotel-booking-modal');
  if (!modal) return;
  
  modal.classList.add('hidden');
  modal.style.display = 'none';
  document.body.style.overflow = '';
  
  // Reset form
  resetStepForm();
}

// Step Form Management
let currentStep = 1;
const totalSteps = 3;

function setupStepNavigation() {
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const confirmBtn = document.getElementById('confirm-btn');
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextStep);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevStep);
  }
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', processHotelBooking);
  }
}

function resetStepForm() {
  currentStep = 1;
  updateStepDisplay();
  
  // Clear all form data
  const inputs = document.querySelectorAll('#hotel-booking-modal input, #hotel-booking-modal select, #hotel-booking-modal textarea');
  inputs.forEach(input => {
    if (input.type !== 'submit') {
      input.value = '';
    }
  });
}

function nextStep() {
  if (validateCurrentStep()) {
    if (currentStep < totalSteps) {
      currentStep++;
      updateStepDisplay();
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepDisplay();
  }
}

function validateCurrentStep() {
  const errors = [];
  
  if (currentStep === 1) {
    const roomType = document.getElementById('room-type').value;
    if (!roomType) {
      errors.push('Please select a room type');
    }
  } else if (currentStep === 2) {
    const name = document.getElementById('guest-name').value.trim();
    const email = document.getElementById('guest-email').value.trim();
    const phone = document.getElementById('guest-phone').value.trim();
    
    if (!name) {
      errors.push('Please enter your full name');
    } else if (name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (!email) {
      errors.push('Please enter your email address');
    } else if (!isValidEmail(email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!phone) {
      errors.push('Please enter your phone number');
    } else if (phone.length < 10) {
      errors.push('Phone number must be at least 10 digits');
    }
  }
  
  if (errors.length > 0) {
    showAlert('Validation Error', errors.join('<br>'));
    return false;
  }
  
  return true;
}

function updateStepDisplay() {
  // Update step indicators
  for (let i = 1; i <= totalSteps; i++) {
    const stepIndicator = document.getElementById(`step-${i}`);
    const stepContent = document.getElementById(`step-content-${i}`);
    const line = document.getElementById(`line-${i}`);
    
    if (stepIndicator) {
      stepIndicator.className = 'step-indicator';
      if (i < currentStep) {
        stepIndicator.classList.add('completed');
      } else if (i === currentStep) {
        stepIndicator.classList.add('active');
      } else {
        stepIndicator.classList.add('pending');
      }
    }
    
    if (stepContent) {
      stepContent.classList.toggle('hidden', i !== currentStep);
    }
    
    if (line && i < totalSteps) {
      line.className = 'step-line';
      if (i < currentStep) {
        line.classList.add('completed');
      }
    }
  }
  
  // Update step title and subtitle
  const stepTitle = document.getElementById('step-title');
  const stepSubtitle = document.getElementById('step-subtitle');
  
  const titles = {
    1: 'Select Room Type',
    2: 'Personal Information',
    3: 'Review & Confirm'
  };
  
  const subtitles = {
    1: 'Step 1 of 3 - Choose your room',
    2: 'Step 2 of 3 - Your details',
    3: 'Step 3 of 3 - Final confirmation'
  };
  
  if (stepTitle) stepTitle.textContent = titles[currentStep];
  if (stepSubtitle) stepSubtitle.textContent = subtitles[currentStep];
  
  // Update buttons
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const confirmBtn = document.getElementById('confirm-btn');
  
  if (prevBtn) {
    prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
  }
  
  if (nextBtn) {
    nextBtn.style.display = currentStep < totalSteps ? 'block' : 'none';
  }
  
  if (confirmBtn) {
    confirmBtn.style.display = currentStep === totalSteps ? 'block' : 'none';
  }
  
  // Update summary in step 3
  if (currentStep === 3) {
    updateBookingSummary();
  }
}

function updateBookingSummary() {
  const modal = document.getElementById('hotel-booking-modal');
  const hotelId = modal?.dataset.hotelId;
  const hotel = HOTELS.find(h => h.id === hotelId);
  
  if (!hotel) return;
  
  const roomType = document.getElementById('room-type').value;
  const name = document.getElementById('guest-name').value;
  const email = document.getElementById('guest-email').value;
  
  const summaryHotel = document.getElementById('summary-hotel');
  const summaryLocation = document.getElementById('summary-location');
  const summaryRoom = document.getElementById('summary-room');
  
  if (summaryHotel) summaryHotel.textContent = hotel.name;
  if (summaryLocation) summaryLocation.textContent = hotel.location;
  if (summaryRoom) summaryRoom.textContent = `Room Type: ${roomType.charAt(0).toUpperCase() + roomType.slice(1)}`;
}

function processHotelBooking() {
  const modal = document.getElementById('hotel-booking-modal');
  const hotelId = modal?.dataset.hotelId;
  const hotel = HOTELS.find(h => h.id === hotelId);
  
  if (!hotel) {
    showAlert('Error', 'Hotel information not found. Please try again.');
    return;
  }
  
  const formData = {
    name: document.getElementById('guest-name').value.trim(),
    email: document.getElementById('guest-email').value.trim(),
    phone: document.getElementById('guest-phone').value.trim(),
    roomType: document.getElementById('room-type').value,
    specialRequests: document.getElementById('special-requests').value.trim(),
    hotel: hotel.name,
    price: hotel.price
  };
  
  // Validate form
  if (!validateHotelBookingForm(formData)) {
    return;
  }
  
  // Show loading
  const button = modal.querySelector('.btn-confirm');
  const originalText = button.textContent;
  button.textContent = 'Processing...';
  button.disabled = true;
  
  // Simulate booking process
  setTimeout(() => {
    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();
    
    // Show success
    showHotelConfirmation(formData, confirmationCode);
    
    // Reset button
    button.textContent = originalText;
    button.disabled = false;
    
    // Close modal
    closeHotelBookingModal();
  }, 2000);
}

function validateHotelBookingForm(data) {
  const errors = [];
  
  if (!data.name) {
    errors.push('Please enter your full name');
  } else if (data.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email) {
    errors.push('Please enter your email address');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.phone) {
    errors.push('Please enter your phone number');
  } else if (data.phone.length < 10) {
    errors.push('Phone number must be at least 10 digits');
  }
  
  if (!data.roomType) {
    errors.push('Please select a room type');
  }
  
  if (errors.length > 0) {
    showAlert('Validation Error', errors.join('<br>'));
    return false;
  }
  
  return true;
}

function showHotelConfirmation(data, confirmationCode) {
  const message = `
    Hotel booking confirmed!
    
    Confirmation Code: ${confirmationCode}
    Hotel: ${data.hotel}
    Guest: ${data.name}
    Total: €${data.price}
    
    A confirmation email has been sent to ${data.email}.
  `;
  
  showAlert('Booking Confirmed!', message);
}

// ========== UTILITY FUNCTIONS ==========
function setupNavbar() {
  const burgerMenu = document.getElementById('burger-menu');
  const navbarLinks = document.getElementById('navbar-links');
  
  if (burgerMenu && navbarLinks) {
    burgerMenu.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on links
  const navLinks = navbarLinks?.querySelectorAll('.nav-link');
  navLinks?.forEach(link => {
    link.addEventListener('click', function() {
      burgerMenu?.classList.remove('active');
      navbarLinks?.classList.remove('active');
    });
  });
}

function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const checkinInput = document.getElementById('checkin-date');
  const checkoutInput = document.getElementById('checkout-date');
  
  if (checkinInput) {
    checkinInput.min = today;
    checkinInput.value = tomorrow;
  }
  
  if (checkoutInput) {
    checkoutInput.min = tomorrow;
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0];
    checkoutInput.value = dayAfterTomorrow;
  }
}

function generateConfirmationCode() {
  const prefix = 'HT';
  const randomNumber = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return `${prefix}${randomNumber}`;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showAlert(title, message) {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll('.alert-modal');
  existingAlerts.forEach(alert => alert.remove());
  
  // Create a simple alert modal
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert-modal';
  alertDiv.innerHTML = `
    <div class="alert-content">
      <div class="alert-header">
        <h3>${title}</h3>
        <button class="alert-close">&times;</button>
      </div>
      <div class="alert-body">
        <p>${message}</p>
      </div>
      <div class="alert-footer">
        <button class="alert-ok-btn">OK</button>
      </div>
    </div>
  `;
  
  // Add styles
  alertDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20000;
    animation: fadeIn 0.3s ease-out;
  `;
  
  const content = alertDiv.querySelector('.alert-content');
  content.style.cssText = `
    background: white;
    padding: 0;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
  `;
  
  const header = alertDiv.querySelector('.alert-header');
  header.style.cssText = `
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  
  const body = alertDiv.querySelector('.alert-body');
  body.style.cssText = `
    padding: 1rem 1.5rem;
    color: #374151;
    line-height: 1.6;
  `;
  
  const footer = alertDiv.querySelector('.alert-footer');
  footer.style.cssText = `
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    text-align: right;
  `;
  
  const closeBtn = alertDiv.querySelector('.alert-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const okBtn = alertDiv.querySelector('.alert-ok-btn');
  okBtn.style.cssText = `
    background: var(--primary, #ef4444);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
  `;
  
  // Add animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Event listeners
  const removeAlert = () => {
    alertDiv.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
      if (style.parentNode) {
        style.remove();
      }
    }, 300);
  };
  
  closeBtn.addEventListener('click', removeAlert);
  okBtn.addEventListener('click', removeAlert);
  
  // Close on backdrop click
  alertDiv.addEventListener('click', function(e) {
    if (e.target === alertDiv) {
      removeAlert();
    }
  });
  
  document.body.appendChild(alertDiv);
  
  // Auto remove after 8 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      removeAlert();
    }
  }, 8000);
}

// Export functions for potential use in other modules
window.HotelBooking = {
  searchHotels,
  openHotelBookingModal,
  closeHotelBookingModal,
  processHotelBooking
};
