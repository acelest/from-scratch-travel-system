// ===== DATA.JS - Données mock pour les aéroports, vols et transferts =====

// Données des aéroports
export const AIRPORTS = [
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
  { code: "ORY", city: "Paris", name: "Orly", country: "France" },
  { code: "LHR", city: "Londres", name: "Heathrow", country: "Royaume-Uni" },
  { code: "LGW", city: "Londres", name: "Gatwick", country: "Royaume-Uni" },
  { code: "JFK", city: "New York", name: "John F. Kennedy", country: "USA" },
  { code: "LGA", city: "New York", name: "LaGuardia", country: "USA" },
  { code: "FCO", city: "Rome", name: "Fiumicino", country: "Italie" },
  { code: "NRT", city: "Tokyo", name: "Narita", country: "Japon" },
  { code: "HND", city: "Tokyo", name: "Haneda", country: "Japon" },
  { code: "DXB", city: "Dubai", name: "Dubai International", country: "EAU" },
  {
    code: "SYD",
    city: "Sydney",
    name: "Kingsford Smith",
    country: "Australie",
  },
  { code: "SIN", city: "Singapour", name: "Changi", country: "Singapour" },
];

// Données des vols
export const FLIGHTS = [
  {
    id: "AF001",
    airline: "Air France",
    airlineCode: "AF",
    from: "CDG",
    to: "JFK",
    departure: "10:00",
    arrival: "12:30",
    duration: "7h 30m",
    stops: 0,
    price: 540,
    currency: "€",
    date: "2025-02-15",
  },
  {
    id: "BA002",
    airline: "British Airways",
    airlineCode: "BA",
    from: "LHR",
    to: "HND",
    departure: "13:20",
    arrival: "09:05+1",
    duration: "11h 45m",
    stops: 0,
    price: 820,
    currency: "€",
    date: "2025-02-16",
  },
  {
    id: "EK003",
    airline: "Emirates",
    airlineCode: "EK",
    from: "DXB",
    to: "SYD",
    departure: "10:15",
    arrival: "06:05+1",
    duration: "13h 50m",
    stops: 1,
    price: 1150,
    currency: "€",
    date: "2025-02-17",
  },
  {
    id: "LH004",
    airline: "Lufthansa",
    airlineCode: "LH",
    from: "CDG",
    to: "FCO",
    departure: "08:30",
    arrival: "10:45",
    duration: "2h 15m",
    stops: 0,
    price: 180,
    currency: "€",
    date: "2025-02-18",
  },
  {
    id: "SQ005",
    airline: "Singapore Airlines",
    airlineCode: "SQ",
    from: "CDG",
    to: "SIN",
    departure: "23:45",
    arrival: "18:30+1",
    duration: "12h 45m",
    stops: 0,
    price: 750,
    currency: "€",
    date: "2025-02-19",
  },
];

// Données des transferts aéroport
export const TRANSFERS = {
  CDG: [
    { type: "Economy", price: 25, vehicle: "Berline", duration: "45min" },
    { type: "Comfort", price: 35, vehicle: "SUV", duration: "45min" },
    {
      type: "Premium",
      price: 50,
      vehicle: "Voiture de luxe",
      duration: "45min",
    },
  ],
  ORY: [
    { type: "Economy", price: 20, vehicle: "Berline", duration: "35min" },
    { type: "Comfort", price: 30, vehicle: "SUV", duration: "35min" },
    {
      type: "Premium",
      price: 45,
      vehicle: "Voiture de luxe",
      duration: "35min",
    },
  ],
  LHR: [
    { type: "Economy", price: 30, vehicle: "Sedan", duration: "60min" },
    { type: "Comfort", price: 40, vehicle: "SUV", duration: "60min" },
    { type: "Premium", price: 55, vehicle: "Luxury car", duration: "60min" },
  ],
  JFK: [
    { type: "Economy", price: 40, vehicle: "Sedan", duration: "90min" },
    { type: "Comfort", price: 55, vehicle: "SUV", duration: "90min" },
    { type: "Premium", price: 75, vehicle: "Luxury car", duration: "90min" },
  ],
  FCO: [
    { type: "Economy", price: 25, vehicle: "Berline", duration: "50min" },
    { type: "Comfort", price: 35, vehicle: "SUV", duration: "50min" },
    {
      type: "Premium",
      price: 50,
      vehicle: "Voiture de luxe",
      duration: "50min",
    },
  ],
};

// Données de chauffeurs mock par destination (pour l'option Taxi)
export const DRIVERS = {
  CDG: [
    {
      id: "DRV-CDG-1",
      name: "Marc L.",
      vehicle: "Peugeot 508 (Berline)",
      rating: 4.8,
      price: 25,
      notes: "Fr/En • Siège enfant dispo",
    },
    {
      id: "DRV-CDG-2",
      name: "Aïcha B.",
      vehicle: "Toyota RAV4 (SUV)",
      rating: 4.9,
      price: 35,
      notes: "Fr/En • Eau offerte",
    },
  ],
  LHR: [
    {
      id: "DRV-LHR-1",
      name: "John S.",
      vehicle: "Mercedes E-Class (Premium)",
      rating: 4.9,
      price: 55,
      notes: "En • Meet & Greet",
    },
    {
      id: "DRV-LHR-2",
      name: "Priya K.",
      vehicle: "Nissan Leaf (Eco)",
      rating: 4.7,
      price: 30,
      notes: "En • Eco-friendly",
    },
  ],
  JFK: [
    {
      id: "DRV-JFK-1",
      name: "Mike D.",
      vehicle: "Chevy Suburban (SUV)",
      rating: 4.8,
      price: 55,
      notes: "En • 6 passagers",
    },
    {
      id: "DRV-JFK-2",
      name: "Ana M.",
      vehicle: "Toyota Camry (Sedan)",
      rating: 4.7,
      price: 40,
      notes: "En/Es • Rapide",
    },
  ],
  FCO: [
    {
      id: "DRV-FCO-1",
      name: "Luca R.",
      vehicle: "Alfa Romeo Giulia (Berline)",
      rating: 4.8,
      price: 25,
      notes: "It/En • Local tips",
    },
  ],
};
