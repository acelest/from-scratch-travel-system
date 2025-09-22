export const flights = [
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
    id: 3,
    from: { code: 'DXB', city: 'Dubai' },
    to: { code: 'SYD', city: 'Sydney' },
    airline: 'Emirates',
    departureTime: '10:15 AM',
    arrivalTime: '06:05 AM',
    duration: '13h 50m',
    stops: '1 Stop (in SIN)',
    price: 1150,
    badge: null
  },
    {
    id: 4,
    from: { code: 'ORY', city: 'Paris' },
    to: { code: 'BCN', city: 'Barcelona' },
    airline: 'Vueling',
    departureTime: '07:00 AM',
    arrivalTime: '08:45 AM',
    duration: '1h 45m',
    stops: 'Non-stop',
    price: 95,
    badge: 'Best Price'
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
  }
};
