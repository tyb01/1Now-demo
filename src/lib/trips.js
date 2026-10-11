export const trips = [
  {
    id: 'jeep',
    name: 'Marcus Webb',
    initials: 'MW',
    phone: '+1 (213) 555-0874',
    vehicle: '2023 Jeep Wrangler',
    plate: '4DKQ991',
    status: 'overdue',
    seconds: 2708,
    due: '12:00 PM',
    location: 'West Hollywood, CA',
    distance: '4.8 mi',
    charge: 110,
    next: { name: 'Alex Kim', time: '2:45 PM', minutes: 119 },
  },
  {
    id: 'dodge',
    name: 'Destiny Hall',
    initials: 'DH',
    phone: '+1 (323) 555-0618',
    vehicle: '2021 Dodge Challenger',
    plate: '2NVQ773',
    status: 'overdue',
    seconds: 10800,
    due: '9:45 AM',
    location: 'Downtown LA, CA',
    distance: '9.3 mi',
    charge: 135,
    next: { name: 'Jordan Lee', time: '1:15 PM', minutes: 30 },
  },
  {
    id: 'bmw',
    name: 'Sofia Nguyen',
    initials: 'SN',
    phone: '+1 (818) 555-0391',
    vehicle: '2022 BMW 3 Series',
    plate: '7KLM884',
    status: 'soon',
    seconds: 1191,
    due: '1:05 PM',
    location: 'Glendale, CA',
    distance: '2.1 mi',
  },
  {
    id: 'tesla',
    name: 'James Carter',
    initials: 'JC',
    phone: '+1 (310) 555-0142',
    vehicle: '2023 Tesla Model Y',
    plate: '8TRX210',
    status: 'active',
    seconds: 19740,
    due: '6:15 PM',
    location: 'Venice Beach, CA',
    distance: '8.2 mi',
  },
]

export function duration(seconds) {
  const totalMinutes = Math.max(0, Math.floor(seconds / 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours ? `${hours}h${minutes ? ` ${minutes}m` : ''}` : `${totalMinutes}m`
}
