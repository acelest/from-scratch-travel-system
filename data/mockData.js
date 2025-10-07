export const flights = [
  // Paris CDG flights
  {
    id: 1,
    from: { code: 'CDG', city: 'Paris' },
    to: { code: 'JFK', city: 'New York' },
    airline: 'Air France',
    departureTime: '10:00 AM',
    arrivalTime: '12:30 PM',
    duration: '7h 30m',
    stops: 'Non-stop',
    price: 540,
    badge: 'Best Price'
  },
  {
    id: 2,
    from: { code: 'CDG', city: 'Paris' },
    to: { code: 'JFK', city: 'New York' },
    airline: 'Delta Airlines',
    departureTime: '02:45 PM',
    arrivalTime: '05:20 PM',
    duration: '8h 35m',
    stops: 'Non-stop',
    price: 625,
    badge: null
  },
  {
    id: 3,
    from: { code: 'CDG', city: 'Paris' },
    to: { code: 'LHR', city: 'London' },
    airline: 'British Airways',
    departureTime: '08:30 AM',
    arrivalTime: '09:00 AM',
    duration: '1h 30m',
    stops: 'Non-stop',
    price: 89,
    badge: 'Best Price'
  },
  {
    id: 4,
    from: { code: 'CDG', city: 'Paris' },
    to: { code: 'HND', city: 'Tokyo' },
    airline: 'Japan Airlines',
    departureTime: '11:30 AM',
    arrivalTime: '07:15 AM',
    duration: '11h 45m',
    stops: 'Non-stop',
    price: 780,
    badge: 'Fastest'
  },
  {
    id: 5,
    from: { code: 'CDG', city: 'Paris' },
    to: { code: 'DXB', city: 'Dubai' },
    airline: 'Emirates',
    departureTime: '09:15 AM',
    arrivalTime: '06:45 PM',
    duration: '6h 30m',
    stops: 'Non-stop',
    price: 450,
    badge: null
  },
  {
    id: 6,
    from: { code: 'CDG', city: 'Paris' },
    to: { code: 'BCN', city: 'Barcelona' },
    airline: 'Vueling',
    departureTime: '07:00 AM',
    arrivalTime: '08:50 AM',
    duration: '1h 50m',
    stops: 'Non-stop',
    price: 95,
    badge: 'Best Price'
  },

  // London LHR flights
  {
    id: 7,
    from: { code: 'LHR', city: 'London' },
    to: { code: 'CDG', city: 'Paris' },
    airline: 'Air France',
    departureTime: '10:15 AM',
    arrivalTime: '12:45 PM',
    duration: '1h 30m',
    stops: 'Non-stop',
    price: 92,
    badge: null
  },
  {
    id: 8,
    from: { code: 'LHR', city: 'London' },
    to: { code: 'JFK', city: 'New York' },
    airline: 'British Airways',
    departureTime: '11:00 AM',
    arrivalTime: '02:15 PM',
    duration: '7h 15m',
    stops: 'Non-stop',
    price: 510,
    badge: 'Best Price'
  },
  {
    id: 9,
    from: { code: 'LHR', city: 'London' },
    to: { code: 'HND', city: 'Tokyo' },
    airline: 'British Airways',
    departureTime: '01:20 PM',
    arrivalTime: '09:05 AM',
    duration: '11h 45m',
    stops: 'Non-stop',
    price: 820,
    badge: 'Fastest'
  },
  {
    id: 10,
    from: { code: 'LHR', city: 'London' },
    to: { code: 'DXB', city: 'Dubai' },
    airline: 'Emirates',
    departureTime: '08:45 AM',
    arrivalTime: '07:30 PM',
    duration: '6h 45m',
    stops: 'Non-stop',
    price: 420,
    badge: null
  },

  // New York JFK flights
  {
    id: 11,
    from: { code: 'JFK', city: 'New York' },
    to: { code: 'CDG', city: 'Paris' },
    airline: 'Air France',
    departureTime: '06:00 PM',
    arrivalTime: '07:30 AM',
    duration: '7h 30m',
    stops: 'Non-stop',
    price: 560,
    badge: null
  },
  {
    id: 12,
    from: { code: 'JFK', city: 'New York' },
    to: { code: 'LHR', city: 'London' },
    airline: 'British Airways',
    departureTime: '08:30 PM',
    arrivalTime: '08:45 AM',
    duration: '6h 15m',
    stops: 'Non-stop',
    price: 495,
    badge: 'Best Price'
  },
  {
    id: 13,
    from: { code: 'JFK', city: 'New York' },
    to: { code: 'HND', city: 'Tokyo' },
    airline: 'Japan Airlines',
    departureTime: '01:00 PM',
    arrivalTime: '04:30 PM',
    duration: '13h 30m',
    stops: 'Non-stop',
    price: 890,
    badge: null
  },

  // Dubai DXB flights
  {
    id: 14,
    from: { code: 'DXB', city: 'Dubai' },
    to: { code: 'SYD', city: 'Sydney' },
    airline: 'Emirates',
    departureTime: '10:15 AM',
    arrivalTime: '06:05 AM',
    duration: '13h 50m',
    stops: '1 Stop',
    price: 1150,
    badge: null
  },
  {
    id: 15,
    from: { code: 'DXB', city: 'Dubai' },
    to: { code: 'CDG', city: 'Paris' },
    airline: 'Emirates',
    departureTime: '03:00 AM',
    arrivalTime: '07:45 AM',
    duration: '7h 45m',
    stops: 'Non-stop',
    price: 470,
    badge: null
  },
  {
    id: 16,
    from: { code: 'DXB', city: 'Dubai' },
    to: { code: 'LHR', city: 'London' },
    airline: 'Emirates',
    departureTime: '02:30 AM',
    arrivalTime: '06:50 AM',
    duration: '7h 20m',
    stops: 'Non-stop',
    price: 440,
    badge: 'Best Price'
  },

  // Tokyo HND flights
  {
    id: 17,
    from: { code: 'HND', city: 'Tokyo' },
    to: { code: 'CDG', city: 'Paris' },
    airline: 'Air France',
    departureTime: '10:30 PM',
    arrivalTime: '04:15 AM',
    duration: '12h 45m',
    stops: 'Non-stop',
    price: 795,
    badge: null
  },
  {
    id: 18,
    from: { code: 'HND', city: 'Tokyo' },
    to: { code: 'LHR', city: 'London' },
    airline: 'Japan Airlines',
    departureTime: '11:00 PM',
    arrivalTime: '05:30 AM',
    duration: '12h 30m',
    stops: 'Non-stop',
    price: 835,
    badge: null
  },
  {
    id: 19,
    from: { code: 'HND', city: 'Tokyo' },
    to: { code: 'JFK', city: 'New York' },
    airline: 'ANA',
    departureTime: '05:00 PM',
    arrivalTime: '04:00 PM',
    duration: '12h 00m',
    stops: 'Non-stop',
    price: 870,
    badge: 'Fastest'
  },

  // Barcelona BCN flights
  {
    id: 20,
    from: { code: 'BCN', city: 'Barcelona' },
    to: { code: 'CDG', city: 'Paris' },
    airline: 'Vueling',
    departureTime: '06:30 PM',
    arrivalTime: '08:20 PM',
    duration: '1h 50m',
    stops: 'Non-stop',
    price: 98,
    badge: 'Best Price'
  },
  {
    id: 21,
    from: { code: 'BCN', city: 'Barcelona' },
    to: { code: 'LHR', city: 'London' },
    airline: 'British Airways',
    departureTime: '09:15 AM',
    arrivalTime: '10:35 AM',
    duration: '2h 20m',
    stops: 'Non-stop',
    price: 110,
    badge: null
  },

  // Sydney SYD flights
  {
    id: 22,
    from: { code: 'SYD', city: 'Sydney' },
    to: { code: 'DXB', city: 'Dubai' },
    airline: 'Emirates',
    departureTime: '09:00 PM',
    arrivalTime: '05:30 AM',
    duration: '14h 30m',
    stops: '1 Stop',
    price: 1200,
    badge: null
  }
];

export const taxis = {
  JFK: {
    destination: 'Manhattan',
    options: {
      Economy: { price: 52, duration: '~50 min', vehicle: 'Standard Sedan' },
      Business: { price: 80, duration: '~45 min', vehicle: 'Luxury Sedan' },
      Van: { price: 100, duration: '~55 min', vehicle: 'Minivan (6-8 pers.)' }
    }
  },
  HND: {
    destination: 'Central Tokyo',
    options: {
      Economy: { price: 70, duration: '~60 min', vehicle: 'Standard Sedan' },
      Business: { price: 110, duration: '~50 min', vehicle: 'Luxury Sedan' },
      Van: { price: 150, duration: '~65 min', vehicle: 'Minivan (6-8 pers.)' }
    }
  },
  SYD: {
    destination: 'Sydney CBD',
    options: {
      Economy: { price: 45, duration: '~30 min', vehicle: 'Standard Sedan' },
      Business: { price: 75, duration: '~25 min', vehicle: 'Luxury Sedan' },
      Van: { price: 90, duration: '~35 min', vehicle: 'Minivan (6-8 pers.)' }
    }
  },
  BCN: {
    destination: 'Barcelona Center',
    options: {
      Economy: { price: 25, duration: '~25 min', vehicle: 'Standard Sedan' },
      Business: { price: 40, duration: '~20 min', vehicle: 'Luxury Sedan' },
      Van: { price: 55, duration: '~30 min', vehicle: 'Minivan (6-8 pers.)' }
    }
  },
  CDG: {
    destination: 'Paris Center',
    options: {
      Economy: { price: 35, duration: '~45 min', vehicle: 'Standard Sedan' },
      Business: { price: 60, duration: '~40 min', vehicle: 'Luxury Sedan' },
      Van: { price: 85, duration: '~50 min', vehicle: 'Minivan (6-8 pers.)' }
    }
  },
  LHR: {
    destination: 'Central London',
    options: {
      Economy: { price: 40, duration: '~60 min', vehicle: 'Standard Sedan' },
      Business: { price: 70, duration: '~50 min', vehicle: 'Luxury Sedan' },
      Van: { price: 95, duration: '~65 min', vehicle: 'Minivan (6-8 pers.)' }
    }
  },
  DXB: {
    destination: 'Dubai Downtown',
    options: {
      Economy: { price: 30, duration: '~30 min', vehicle: 'Standard Sedan' },
      Business: { price: 55, duration: '~25 min', vehicle: 'Luxury Sedan' },
      Van: { price: 75, duration: '~35 min', vehicle: 'Minivan (6-8 pers.)' }
    }
  }
};
