# TRAVEL BOOKING PLATFORM - PROJECT CONTEXT

## PROJECT OVERVIEW

Create a modern travel booking platform focused on **flight booking with airport transfer add-on**. The user books a flight as the main service and can optionally add taxi/transfer service for a seamless travel experience.

## TIME CONSTRAINT

- **1 HOUR DEADLINE** - Frontend only, functional prototype
- Teacher review tomorrow - must be impressive and complete
- Focus on visual appeal and smooth user experience

## TECHNICAL STACK

- **HTML5** (vanilla, no frameworks)
- **Tailwind CSS** (CDN version)
- **Vanilla JavaScript** (ES6+, modern syntax)
- **No backend** - use mock data only
- **Mobile-first** responsive design

## DESIGN SYSTEM

### Colors

- **Primary**: White (#ffffff)
- **Secondary**: Dark gray/black (#1f2937, #374151)
- **Accent**: Red (#ef4444) - for CTAs and highlights
- **Background**: Gradients and subtle grays

### Typography

- Modern font (Inter, System fonts)
- Clear hierarchy (h1, h2, body text)
- Readable sizes and spacing

### Components Style

- Clean, minimal, modern
- Subtle shadows and hover effects
- Smooth transitions (200-300ms)
- Professional look that impresses

## PROJECT STRUCTURE

```
travel-booking/
├── index.html          # LANDING PAGE (main entry)
├── search.html         # SEARCH & BOOKING PAGE
├── styles/
│   └── main.css       # Custom styles + Tailwind
├── js/
│   ├── landing.js     # Landing page animations
│   ├── search.js      # Flight search logic
│   ├── booking.js     # Booking modal logic
│   └── data.js        # Mock data (flights + transfers)
└── README.md
```

## USER JOURNEY

1. **Landing Page** (index.html)

   - Hero section with compelling copy
   - Features showcase
   - Strong CTA button → leads to search.html

2. **Search & Booking** (search.html)
   - Flight search form
   - Results display with filters
   - Booking modal with transfer add-on
   - Complete booking flow

## LANDING PAGE (index.html) REQUIREMENTS

### Hero Section

- Full-screen hero with dark gradient background
- **Main headline**: "Your Journey Starts Here" or similar
- **Subheadline**: "Book flights and airport transfers in one seamless experience"
- **CTA Button**: Large red button "Start Booking" → redirects to search.html
- Modern typography, smooth animations

### Features Section

Three main features with icons:

1. **Easy Flight Booking** (✈️ icon)
   - "Compare prices and book the best flights"
2. **Airport Transfers** (🚗 icon)
   - "Add taxi service directly to your booking"
3. **Seamless Experience** (✅ icon)
   - "One booking, complete journey coverage"

### Social Proof Section

- Statistics: "10,000+ flights booked", "500+ destinations"
- 2-3 customer testimonials with placeholder photos
- Builds credibility

### Footer

- Company info, links (About, Contact, Terms)
- Social media icons
- Professional appearance

## SEARCH PAGE (search.html) REQUIREMENTS

### Flight Search Form

- **From/To**: Airport inputs with **dropdown suggestions** (Paris CDG, London LHR, etc. - predefined list, no real API)
- **Dates**: Date pickers with **today as minimum date**
- **Passengers**: Dropdown selector (1-9 passengers)
- **Trip Type**: Toggle switch One-way/Round-trip with **smooth animation**
- **Search Button**: Prominent red button with **loading spinner** during search

### Results Section

- Flight cards in responsive grid (2-3 columns desktop)
- Each card shows: airline logo, times, duration, stops, price
- **"Best Price" badges** on cheapest options
- **"Direct Flight" badges** on no-stop flights
- "Book Now" buttons with **hover animations**
- Sort dropdown: Price, Duration, Departure time with **instant re-ordering**
- **Loading skeleton** while "searching" (2-3 sec delay for realism)

### Filters Sidebar

- Price range slider
- Airlines checkboxes
- Departure time (Morning, Afternoon, Evening)
- Number of stops (Direct, 1 stop, 2+ stops)

### Booking Modal

Multi-step booking process:

1. **Flight Summary**: Selected flight details
2. **Passenger Info**: Name, email, phone form
3. **Transfer Add-on**:
   - "Need airport transfer?"
   - Taxi options: Economy (€25), Business (€45), Van (€65)
   - Add to booking toggle
4. **Payment**: Total price (flight + transfer), payment form

## MOCK DATA REQUIREMENTS

### Flight Data (20+ entries)

```javascript
{
  id: 1,
  airline: "Air France",
  from: "Paris CDG",
  to: "London LHR",
  departure: "08:30",
  arrival: "09:45",
  duration: "1h 15m",
  stops: 0,
  price: 156
}
```

### Transfer Data

```javascript
{
  airport: "CDG",
  city: "Paris",
  transfers: [
    { type: "Economy", price: 25, duration: "45min", vehicle: "Sedan" },
    { type: "Business", price: 45, duration: "45min", vehicle: "Mercedes" },
    { type: "Van", price: 65, duration: "45min", vehicle: "8-seater" }
  ]
}
```

### Key UI Details for Realism

#### Airport Input Suggestions

```javascript
// Predefined airport list for dropdown
const airports = [
  { code: "CDG", city: "Paris", name: "Charles de Gaulle" },
  { code: "LHR", city: "London", name: "Heathrow" },
  { code: "FCO", city: "Rome", name: "Fiumicino" },
  { code: "MAD", city: "Madrid", name: "Barajas" },
  // Show max 5 suggestions, filter as user types
];
```

#### Interactive Elements

- **Date inputs**: Disable past dates, highlight today
- **Passenger selector**: Dropdown with icons (adults/children)
- **Search button**: Shows loading spinner for 2-3 seconds
- **Filter sliders**: Real-time price range updates
- **Sort dropdown**: Instant results re-ordering animation

#### Visual Feedback

- **Form validation**: Red borders for empty required fields
- **Loading states**: Skeleton cards while "searching"
- **Success states**: Green checkmarks on completed steps
- **Hover effects**: Cards lift up, buttons change color
- **Empty states**: "No flights found" with cute illustration

#### Booking Modal Polish

- **Progress bar** at top showing current step (1/4, 2/4, etc.)
- **Form auto-validation**: Email format, phone numbers
- **Payment form**: Fake card input with formatting (•••• •••• •••• 1234)
- **Confirmation page**: "Booking confirmed!" with animated checkmark

## KEY INTERACTIONS (JavaScript)

### Micro-Interactions for Professional Feel

- **Input focus states**: Subtle border glow and label animation
- **Button loading**: Spinner replaces text during actions
- **Card animations**: Smooth scale on hover, selected state
- **Modal transitions**: Slide-in from right, backdrop blur
- **Form steps**: Smooth slide between booking steps
- **Success animations**: Bouncing checkmarks, confetti effect (optional)
- **Error handling**: Shake animation for invalid inputs
- Smooth scroll animations
- Hero text reveal animation
- CTA button hover effects
- Redirect to search.html on button click

### Search Page

- Flight search with real-time filtering
- Sort functionality
- Modal open/close with smooth animations
- Multi-step booking flow
- Form validation
- Transfer add-on integration

## PERFORMANCE REQUIREMENTS

- Fast loading (CDN resources)
- Smooth animations (60fps)
- Mobile responsive
- Works on all modern browsers

## SUCCESS CRITERIA

- **Visual Impact**: Must impress the teacher at first glance
- **Functionality**: All features work smoothly
- **Professional**: Looks like a real booking platform
- **Complete**: Full user journey from landing to booking
- **Responsive**: Perfect on mobile and desktop

## PRIORITY ORDER (1 HOUR)

1. **Landing page structure + hero** (15min) - CRITICAL
2. **Search page + flight results** (15min) - CRITICAL
3. **Booking modal + transfer addon** (15min) - CORE FEATURE
4. **Styling + animations** (10min) - POLISH
5. **Testing + bug fixes** (5min) - FINAL CHECK

### Additional Polish Details

- **Realistic airline logos**: Use text/icons (AF, BA, LH) instead of images
- **Price formatting**: Always show currency symbol (€156, $203)
- **Time formatting**: Consistent 24h format (08:30, 14:45)
- **Responsive breakpoints**: Perfect mobile experience
- **Touch-friendly**: Larger tap targets on mobile
- **Keyboard navigation**: Tab through forms properly
- **Loading timeouts**: Realistic search delays (2-3 seconds)
- **Data persistence**: Remember form values if user goes back

### Smart Default Values

- **Default route**: Paris → London (popular route)
- **Default dates**: Today + 7 days for departure
- **Default passengers**: 1 adult
- **Popular destinations**: Show frequently searched routes
- **Smart suggestions**: "People also search: Paris → Madrid"
- Focus on **VISUAL APPEAL** first - this gets graded tomorrow
- Make it look **PROFESSIONAL** and modern
- **Seamless experience** is key - everything should flow smoothly
- Use **real-looking data** for credibility
- **Mobile-first** - many users will view on phones

Remember: This is a **frontend showcase project**. Make it beautiful, functional, and impressive!
