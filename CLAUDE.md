# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SkyMove** is a frontend-only travel booking platform that allows users to book flights and airport transfers (taxis) in a single seamless transaction. This is an academic project built with vanilla JavaScript, HTML5, and CSS3, with no backend or database.

**Tech Stack:**
- HTML5 (semantic markup)
- CSS3 (custom styles + Tailwind-like utilities)
- Vanilla JavaScript ES6+ (modules)
- Vite for development server
- Service Worker for PWA capabilities

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Data Flow
User Input → Search Form → Filter Mock Data → Display Results → Select Flight → Booking Modal → Add Taxi/Driver Options → Simulate Payment → Confirmation

### Page Structure
- **index.html**: Landing page with hero section, features, destinations carousel, team section, testimonials, and FAQ
- **search.html**: Search form, flight results grid, and booking/confirmation modals

### Module Dependencies
```
search.js (main entry point)
├─ data.js (AIRPORTS, FLIGHTS, DRIVERS mock data)
├─ booking.js (modal logic, form validation)
└─ utils.js (helper functions - if exists)
```

### Key JavaScript Modules

**js/data.js**
- `AIRPORTS`: Array of airport objects with code, city, name, country
- `FLIGHTS`: Array of flight objects (id, airline, from/to objects, times, price)
- `TRANSFERS`: Object keyed by airport code with taxi options
- `DRIVERS`: Object keyed by airport code with driver profiles (name, vehicle, rating, price)

**js/search.js** (main module)
- `setupAutocomplete(inputId, dropdownId)`: Implements airport search with suggestions
- `setupSearchForm()`: Handles search form submission and flight filtering
- `displayFlights(results)`: Renders flight cards to results grid
- `setupTripTypeToggle()`: Shows/hides return date field
- `setDefaultDates()`: Sets departure to tomorrow, return to +7 days
- Modal management for booking, details, alerts, confirmation

**js/booking.js** (legacy - functionality now in search.js)
- Original booking modal logic (deprecated, merged into search.js)

### Data Structure

**Flight Object:**
```javascript
{
  id: number,
  airline: string,
  airlineCode: string,
  from: { code: string, city: string, name: string, country: string },
  to: { code: string, city: string, name: string, country: string },
  departureTime: string,
  arrivalTime: string,
  duration: string,
  stops: string,
  price: number
}
```

**Driver Object:**
```javascript
{
  id: string,
  name: string,
  vehicle: string,
  rating: number,
  price: number,
  notes: string
}
```

### State Management
- No global state library
- Uses DOM data attributes for IDs (data-flight-id, data-code)
- Event delegation for dynamic elements
- Local variables within functions for component state

## Important Implementation Details

### Search & Autocomplete
- Autocomplete shows airport suggestions filtered by city or code
- Uses `data-code` attribute to store selected airport IATA code
- Fallback logic derives IATA from input like "Paris CDG" → "CDG"
- Search simulates 1-second API delay with loading spinner

### URL Parameters
Landing page search form redirects to search.html with query params:
- `from`, `to`: Airport IATA codes
- `trip`: "one-way" or "round-trip"
- `depart`, `return`: ISO date strings
- `passengers`: Number of passengers

Search page reads these params on load and auto-populates form/results.

### Booking Modal
- Opens when user clicks "Select Flight" on any flight card
- Displays flight summary, passenger form, taxi options, and driver selection
- Taxi options: Radio buttons with price (None/Economy/Comfort/Premium)
- Driver selection: Radio cards with visual feedback (highlight selected)
- Real-time price calculation: Flight + Taxi + Driver
- Form validation before payment simulation
- EmailJS integration (optional, non-blocking) sends booking confirmation

### Payment Simulation
- 1.2 second delay with loading spinner
- Generates confirmation code: "SK" + 9 random alphanumeric chars
- Shows confirmation modal with QR code (Paytm placeholder)
- No actual payment processing

### Modal System
Four modals managed in search.js:
1. **Booking Modal**: Main booking flow
2. **Details Modal**: Flight details view
3. **Alert Modal**: Error/info messages
4. **Confirmation Modal**: Success screen post-booking

All modals:
- Use `.modal-overlay.hidden` for visibility
- Set `body { overflow: hidden }` when open
- Close on backdrop click or close button
- Slide-in animation via CSS classes

### Service Worker (sw.js)
- Caches static assets (HTML, CSS, JS, images)
- Network-first strategy for API-like requests
- Cache-first strategy for static assets
- Provides offline fallback

### EmailJS Integration
- Optional email notification on booking
- Config in js/email-config.js (service ID, template ID, public key)
- Non-blocking: booking proceeds even if email fails
- Template variables: name, phone, email, flight, taxi, driver, total

## Code Style

### JavaScript
- ES6+ syntax: const/let, arrow functions, template literals
- Async/await for promises (avoid .then())
- Descriptive variable names
- Use modules (import/export)
- Comments in French for complex logic (per team preference)
- Error handling with try/catch

### HTML
- Semantic HTML5 tags (header, nav, section, footer)
- All form inputs have labels
- Meaningful IDs and classes
- Mobile-first responsive design

### CSS
- Custom CSS variables in styles/base.css
- Component styles in styles/components.css
- Page-specific styles in styles/landing.css
- BEM naming convention for custom classes
- Mobile breakpoints: 640px, 768px, 1024px

## Common Patterns

### Date Handling
```javascript
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const formatted = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD
```

### Price Calculation
```javascript
function updateTotalPrice() {
  const flightPrice = currentFlight.price;
  const taxiPrice = selectedTaxiRadio ? parseFloat(selectedTaxiRadio.dataset.price) : 0;
  const driverPrice = selectedDriverRadio ? findDriverPrice(selectedDriverRadio.value) : 0;
  const total = flightPrice + taxiPrice + driverPrice;
  document.getElementById('total-price').textContent = `€${total}`;
}
```

### Event Delegation
```javascript
resultsGrid.addEventListener('click', e => {
  const selectButton = e.target.closest('.btn-select');
  if (selectButton) {
    const flightId = parseInt(selectButton.dataset.flightId, 10);
    // Handle selection
  }
});
```

## What NOT to Include

- No backend code (Node.js, PHP, Python)
- No database (PostgreSQL, MongoDB, etc.)
- No real API calls (Amadeus, Skyscanner)
- No authentication/login system
- No localStorage/sessionStorage (intentionally avoided)
- No jQuery or heavy frameworks (React, Vue)
- No build configuration changes (Vite config is minimal)

## Testing Checklist

Before considering work complete:
- [ ] Works on Chrome desktop
- [ ] Works on mobile (use DevTools device toolbar)
- [ ] No console errors
- [ ] Search form validates properly
- [ ] Autocomplete shows suggestions
- [ ] Flight cards render correctly
- [ ] Booking modal opens/closes
- [ ] Price calculates correctly (flight + taxi + driver)
- [ ] Form validation works
- [ ] Confirmation modal shows after booking
- [ ] Service worker registers without errors

## Common Pitfalls

1. **Import paths**: Use relative paths (`./data.js` not `/data.js`)
2. **Script tags**: Need `type="module"` for ES6 modules
3. **Date format**: Input type="date" requires YYYY-MM-DD
4. **Z-index conflicts**: Modal backdrop at 1000, content at 1001
5. **Event listeners**: Avoid duplicate listeners (use `removeEventListener` first)
6. **Data attributes**: Use `getAttribute('data-code')` not `.dataCode`
7. **Modal overflow**: Always restore `body { overflow: auto }` on close

## File Structure

```
travel-booking/
├── index.html              # Landing page
├── search.html             # Search & booking page
├── styles/
│   ├── base.css           # CSS variables, reset, typography
│   ├── components.css     # Cards, buttons, forms, modals
│   └── landing.css        # Landing page specific styles
├── js/
│   ├── data.js            # Mock data (airports, flights, drivers, taxis)
│   ├── search.js          # Main search & booking logic
│   ├── booking.js         # Legacy (deprecated)
│   ├── email-config.js    # EmailJS configuration
│   └── utils.js           # Helper functions (if exists)
├── data/
│   └── mockData.js        # Alternative mock data location
├── public/
│   └── member/            # Team member photos
├── sw.js                  # Service worker for PWA
└── package.json           # Vite dependencies
```

## Language Preferences

- **All text in web pages**: English (landing/search pages, buttons, labels)
- **Code comments**: French (per team preference)
- **Variable names**: English (standard convention)

## Future Enhancements (Mentioned in PROJECT.md)

These are NOT implemented but mentioned for context:
- Backend with Node.js/Express + Supabase
- Real payment integration (Notchpay/Stripe)
- User authentication
- Real flight APIs (Amadeus, Skyscanner)
- Email automation (SendGrid)
- Migration to Next.js 14

## Contact Info (For Demo)

- Phone: +91 866 246 9000
- Email: support@skymove.com
- Location: KL University, Vijayawada, India
