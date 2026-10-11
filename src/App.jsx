// Out of scope: real GPS tracking, real SMS (Twilio), real Stripe payments, authentication.

import { useEffect, useState } from 'react'
import {
  ArrowDownLeft, ArrowRight, ArrowUpRight,
  Bell, CarFront, Check, CheckCheck, ChevronDown,
  Clock3, CreditCard, MapPin, MessageSquare,
  Phone, Search, ShieldCheck, SlidersHorizontal,
  TriangleAlert, X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trips, duration } from '@/lib/trips'
import jeep from '@/assets/jeep.jpg'
import dodge from '@/assets/dodge.jpg'
import bmw from '@/assets/bmw.jpg'
import tesla from '@/assets/tesla.jpg'

const photos = { jeep, dodge, bmw, tesla }
const filters = [
  { id: 'all', label: 'All trips', count: 4 },
  { id: 'overdue', label: 'Overdue', count: 2 },
  { id: 'soon', label: 'Due soon', count: 1 },
  { id: 'active', label: 'On trip', count: 1 },
]

export default function App() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [action, setAction] = useState(null)
  const [notice, setNotice] = useState('')
  const [sent, setSent] = useState([])
  const [charged, setCharged] = useState([])
  const [sort, setSort] = useState('urgency')
  const [showSort, setShowSort] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [callTarget, setCallTarget] = useState(null)

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(v => v + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 5000)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') { setAction(null); setCallTarget(null) }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  let visible = trips.filter(trip =>
    (filter === 'all' || trip.status === filter) &&
    `${trip.name} ${trip.vehicle} ${trip.plate}`.toLowerCase().includes(query.toLowerCase())
  )
  if (sort === 'name') visible = [...visible].sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'return') visible = [...visible].sort(
    (a, b) => (a.status === 'overdue' ? -a.seconds : a.seconds) - (b.status === 'overdue' ? -b.seconds : b.seconds)
  )

  function confirmAction() {
    if (!action) return
    if (action.type === 'warning') {
      setSent(v => [...v, action.trip.id])
      setNotice(`Demo warning prepared for ${action.trip.name}.`)
    } else {
      setCharged(v => [...v, action.trip.id])
      setNotice(`Demo extension of $${action.trip.charge} recorded. No payment was taken.`)
    }
    setAction(null)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="page-width flex h-[76px] items-center justify-between gap-4 max-sm:h-16">
          <a href="/" className="flex items-center gap-3" aria-label="1Now Trip Manager home">
            <img src="/1now-logo.webp" alt="1Now" className="h-7 w-auto" />
            <span className="ml-3 border-l border-border pl-5 text-sm font-medium max-sm:hidden">
              Trip Manager
            </span>
          </a>
          <div className="flex items-center gap-5 max-sm:gap-3">
            <span className="flex items-center gap-2 text-xs text-muted-foreground max-sm:hidden">
              <span className="live-dot" /> Live updates
            </span>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-muted-foreground"
              >
                <Bell />
                <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
              </Button>
              {showNotifications && (
                <div className="absolute right-0 top-12 z-20 w-72 rounded-lg border border-border bg-card p-4 shadow-lg">
                  <p className="font-semibold text-sm">2 bookings need attention</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Marcus Webb and Destiny Hall are overdue. Their vehicles have upcoming bookings.
                  </p>
                  <Button variant="link" className="mt-2 p-0" onClick={() => { setFilter('overdue'); setShowNotifications(false) }}>
                    View overdue trips <ArrowRight />
                  </Button>
                </div>
              )}
            </div>
            <div className="h-6 border-l border-border" />
            <div className="relative">
              <Button
                variant="ghost"
                className="gap-2 px-0 hover:bg-transparent"
                aria-label="Account menu"
                onClick={() => setShowProfile(!showProfile)}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">
                  AT
                </span>
                <span className="text-sm max-sm:hidden">Alex Taylor</span>
                <ChevronDown className="text-muted-foreground max-sm:hidden" />
              </Button>
              {showProfile && (
                <div className="absolute right-0 top-12 z-20 w-52 rounded-lg border border-border bg-card p-4 shadow-lg">
                  <p className="text-sm font-semibold">Alex Taylor</p>
                  <p className="mt-1 text-xs text-muted-foreground">Los Angeles · Fleet manager</p>
                  <span className="mt-3 inline-block rounded bg-secondary px-2 py-1 text-xs">Demo workspace</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="page-width pb-8 pt-9 max-sm:pt-6">
        {/* Page title */}
        <div className="mb-7 flex items-center justify-between max-sm:mb-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Workspace</span><span>/</span><span className="text-foreground">Trip Manager</span>
            </div>
            <h1 className="text-[30px] font-extrabold max-sm:text-[26px]">Every trip. Under control.</h1>
            <p className="mt-2 text-sm text-muted-foreground">A little visibility. A lot less chasing.</p>
          </div>
          <span className="flex items-center gap-2 text-xs text-muted-foreground max-sm:hidden">
            <Clock3 className="h-3.5 w-3.5" /> Today, 12:45 PM
          </span>
        </div>

        {/* Stats */}
        <section aria-label="Rental overview" className="mb-6 grid grid-cols-4 gap-4 max-sm:grid-cols-2 max-sm:gap-3">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Cars on trip</span>
              <CarFront className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-3xl font-bold">4</span>
              <span className="mb-1 text-xs text-muted-foreground">active rentals</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Overdue returns</span>
              <Clock3 className="h-4 w-4 text-destructive" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-3xl font-bold text-destructive">2</span>
              <span className="mb-1 text-xs text-destructive">need attention</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Extension fees</span>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-3xl font-bold">
                ${245 - charged.reduce((total, id) => total + (trips.find(t => t.id === id)?.charge ?? 0), 0)}
              </span>
              <span className="mb-1 text-xs text-muted-foreground">to collect</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Bookings at risk</span>
              <TriangleAlert className="h-4 w-4 text-warning" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-3xl font-bold">2</span>
              <span className="mb-1 text-xs text-warning">coming up today</span>
            </div>
          </div>
        </section>

        {/* Conflict banner */}
        <section
          className="mb-8 flex items-center gap-4 rounded-lg border border-destructive/15 bg-danger-soft px-5 py-4 max-sm:items-start max-sm:px-4"
          aria-label="Booking conflicts"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <TriangleAlert className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h2 className="text-sm font-bold">Two late returns. Two upcoming bookings.</h2>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              <span className="font-semibold text-foreground">Destiny's Dodge</span> is booked in{' '}
              {Math.max(0, 30 - Math.floor(elapsed / 60))} min.{' '}
              <span className="font-semibold text-foreground">Marcus's Jeep</span> is booked in{' '}
              {duration(119 * 60 - elapsed)}.
            </p>
            <Button
              variant="link"
              className="mt-2 h-auto p-0 text-xs text-destructive sm:hidden"
              onClick={() => setFilter('overdue')}
            >
              Review overdue trips <ArrowRight />
            </Button>
          </div>
          <Button
            variant="outline"
            className="shrink-0 border-destructive/20 bg-card text-xs max-sm:hidden"
            onClick={() => {
              setFilter('overdue')
              document.getElementById('active-trips')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            Review trips <ArrowRight />
          </Button>
        </section>

        {/* Trips section */}
        <section id="active-trips" className="scroll-mt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold">
              Active trips{' '}
              <span className="ml-2 align-middle font-sans text-sm font-normal text-muted-foreground">4</span>
            </h2>
            <span className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="live-dot" /> Updating live
            </span>
          </div>

          {/* Filters + search */}
          <div className="mb-5 mt-4 flex items-center justify-between gap-4 border-b border-border max-sm:flex-wrap max-sm:gap-2">
            <div className="flex gap-6 max-sm:w-full max-sm:justify-between max-sm:gap-3">
              {filters.map(item => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="filter-button gap-2 hover:bg-transparent"
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                  <span className={`rounded px-1.5 py-0.5 text-[10px] ${filter === item.id ? 'bg-secondary text-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {item.count}
                  </span>
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3 max-sm:mb-3 max-sm:w-full">
              <label className="flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3 max-sm:flex-1">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  aria-label="Search trips"
                  placeholder="Search trips…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-36 bg-transparent text-xs outline-none placeholder:text-muted-foreground max-sm:w-full"
                />
              </label>
              <div className="relative">
                <Button
                  variant="ghost"
                  className="h-8 gap-2 px-2 text-xs text-muted-foreground"
                  onClick={() => setShowSort(!showSort)}
                  aria-expanded={showSort}
                >
                  <SlidersHorizontal />
                  <span className="max-sm:hidden">
                    {sort === 'urgency' ? 'Urgency' : sort === 'name' ? 'Renter name' : 'Return time'}
                  </span>
                  <ChevronDown className="!h-3 !w-3" />
                </Button>
                {showSort && (
                  <div className="absolute right-0 top-10 z-10 w-40 rounded-md border border-border bg-card p-1 shadow-md">
                    {[{ id: 'urgency', label: 'Urgency' }, { id: 'return', label: 'Return time' }, { id: 'name', label: 'Renter name' }].map(item => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className="w-full justify-between text-xs"
                        onClick={() => { setSort(item.id); setShowSort(false) }}
                      >
                        {item.label}
                        {sort === item.id && <Check />}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trip cards grid */}
          <div className="grid grid-cols-2 items-start gap-5 max-md:grid-cols-1">
            {visible.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                elapsed={elapsed}
                sent={sent.includes(trip.id)}
                charged={charged.includes(trip.id)}
                onAction={type => setAction({ type, trip })}
                onCall={() => setCallTarget(trip)}
              />
            ))}
          </div>

          {visible.length === 0 && (
            <div className="py-16 text-center">
              <Search className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
              <h3 className="font-semibold">No matching trips</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try another renter, vehicle, or license plate.</p>
              <Button variant="link" onClick={() => { setQuery(''); setFilter('all') }}>Clear filters</Button>
            </div>
          )}
        </section>

        {/* Value footer */}
        <section
          className="mt-9 grid grid-cols-3 gap-7 border-t border-border pt-7 max-sm:grid-cols-1 max-sm:gap-5"
          aria-label="Trip management benefits"
        >
          {[
            { icon: Clock3, title: 'Never miss an overdue minute', text: 'Live return tracking, so nothing slips through the cracks.' },
            { icon: CreditCard, title: 'Less chasing. More collecting.', text: 'Extension fees calculated and ready when you are.' },
            { icon: ShieldCheck, title: 'Keep your next booking on track', text: 'Spot conflicts early. Give your next renter a smooth start.' },
          ].map(item => (
            <div key={item.title} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary">
                <item.icon className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-xs font-bold">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-8 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>© 2026 1Now</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3" /> A little peace of mind, built in.
          </span>
        </footer>
      </main>

      {/* Toast notice */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex w-max max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-3 rounded-lg border border-border bg-primary px-5 py-4 text-sm text-primary-foreground shadow-lg"
        >
          <CheckCheck className="h-5 w-5 shrink-0" />
          {notice}
          <Button variant="ghost" size="icon" aria-label="Dismiss notification" className="shrink-0 text-primary-foreground hover:bg-primary/80" onClick={() => setNotice('')}>
            <X />
          </Button>
        </div>
      )}

      {/* Call confirmation modal */}
      {callTarget && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          onClick={() => setCallTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Call ${callTarget.name}`}
            className="isolate w-full max-w-sm rounded-lg border border-border p-6 shadow-xl"
            style={{ backgroundColor: '#ffffff' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-success/10 text-success">
                <Phone className="h-5 w-5" />
              </span>
              <Button variant="ghost" size="icon" aria-label="Close" onClick={() => setCallTarget(null)}>
                <X />
              </Button>
            </div>

            <h2 className="text-xl font-bold">Call renter</h2>
            <p className="mt-1 text-sm text-muted-foreground">{callTarget.vehicle} · {callTarget.plate}</p>

            <div className="my-5 flex items-center gap-4 rounded-md bg-secondary p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-xs font-bold text-muted-foreground border border-border">
                {callTarget.initials}
              </span>
              <div>
                <p className="font-bold text-sm">{callTarget.name}</p>
                <p className="text-base font-mono font-semibold text-primary mt-0.5">{callTarget.phone}</p>
              </div>
            </div>

            <p className="mb-5 text-xs leading-5 text-muted-foreground">
              Tapping "Dial now" will open your device's phone app.
            </p>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setCallTarget(null)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                autoFocus
                onClick={() => {
                  window.location.href = `tel:${callTarget.phone.replace(/[^+\d]/g, '')}`
                  setCallTarget(null)
                }}
              >
                <Phone className="h-4 w-4" /> Dial now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Action modal */}
      {action && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          onClick={() => setAction(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="action-title"
            className="isolate w-full max-w-md rounded-lg border border-border p-6 shadow-xl"
            style={{ backgroundColor: '#ffffff' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary">
                {action.type === 'warning' ? <MessageSquare className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
              </span>
              <Button variant="ghost" size="icon" aria-label="Close dialog" onClick={() => setAction(null)}>
                <X />
              </Button>
            </div>
            <h2 id="action-title" className="text-xl font-bold">
              {action.type === 'warning' ? 'Send a return reminder' : 'Collect extension fee'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{action.trip.name} · {action.trip.vehicle}</p>
            <div className="my-5 rounded-md bg-secondary p-4 text-sm leading-6">
              {action.type === 'warning'
                ? `Hi ${action.trip.name.split(' ')[0]}, your ${action.trip.vehicle} was due at ${action.trip.due} today. Please return your vehicle or contact us to arrange an extension.`
                : (
                  <>
                    <div className="flex justify-between">
                      <span>1-day extension</span>
                      <span className="font-bold">${action.trip.charge}</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">1 day at ${action.trip.charge}/day</p>
                  </>
                )}
            </div>
            <p className="mb-5 text-xs leading-5 text-muted-foreground">
              Demo preview only.{' '}
              {action.type === 'warning' ? 'No message will be sent.' : 'No real payment will be processed.'}
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAction(null)}>Cancel</Button>
              <Button autoFocus onClick={confirmAction}>
                {action.type === 'warning'
                  ? <><MessageSquare /> Prepare reminder</>
                  : <><CreditCard /> Record ${action.trip.charge} extension</>}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TripCard({ trip, elapsed, sent, charged, onAction, onCall }) {
  const overdue = trip.status === 'overdue'
  const time = duration(trip.seconds + (overdue ? elapsed : -elapsed))

  return (
    <article className="trip-card" aria-label={`${trip.name}'s trip`}>
      <div className="px-5 pt-4 max-sm:px-4">
        {/* Status + GPS row */}
        <div className="flex items-center justify-between">
          <span className={`trip-status status-${trip.status}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {overdue ? 'Overdue' : trip.status === 'soon' ? 'Due soon' : 'On trip'}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-success" /> GPS updated just now
          </span>
        </div>

        {/* Vehicle + photo */}
        <div className="my-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-extrabold">{trip.vehicle}</h3>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono font-medium text-foreground">
                {trip.plate}
              </span>
              <span>·</span>
              <span>
                {trip.id === 'jeep' ? 'SUV' : trip.id === 'dodge' ? 'Coupe' : trip.id === 'bmw' ? 'Sedan' : 'Electric SUV'}
              </span>
            </div>
          </div>
          <img src={photos[trip.id]} alt={trip.vehicle} className="vehicle-photo" width={126} height={82} />
        </div>

        {/* Timer block */}
        <div className={`flex items-center justify-between rounded-md px-3.5 py-3 ${
          overdue ? 'bg-danger-soft' : trip.status === 'soon' ? 'bg-warning-soft' : 'bg-secondary'
        }`}>
          <div>
            <p className={`text-[17px] font-bold ${
              overdue ? 'text-destructive' : trip.status === 'soon' ? 'text-warning' : 'text-foreground'
            }`}>
              {overdue ? `${time} overdue` : `Returns in ${time}`}
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {overdue ? 'Was due' : 'Due'} today at{' '}
              <span className="font-medium text-foreground">{trip.due}</span>
            </p>
          </div>
          <Clock3 className={`h-5 w-5 ${
            overdue ? 'text-destructive/60' : trip.status === 'soon' ? 'text-warning/60' : 'text-muted-foreground'
          }`} />
        </div>

        {/* Renter + location */}
        <div className="my-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-muted-foreground">
              {trip.initials}
            </span>
            <div>
              <p className="text-xs font-bold">{trip.name}</p>
              <button
                className="mt-0.5 block text-[10px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={onCall}
              >
                {trip.phone}
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-[11px] font-medium">
              <MapPin className="h-3 w-3 text-muted-foreground" />{trip.location}
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">{trip.distance} from drop-off</p>
          </div>
        </div>

        {/* Next booking */}
        {trip.next && (
          <div className="mb-4 flex items-center gap-2.5 border-t border-border pt-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-warning-soft text-warning">
              <ArrowDownLeft className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground">
                Next booking{' '}
                <span className="ml-1 rounded bg-danger-soft px-1.5 py-0.5 text-[9px] font-medium text-destructive">At risk</span>
              </p>
              <p className="mt-1 text-[11px] font-semibold">
                {trip.next.name}{' '}
                <span className="font-normal text-muted-foreground">· {trip.next.time}</span>
              </p>
            </div>
            <span className="text-xs font-semibold text-warning">
              in {duration(trip.next.minutes * 60 - elapsed)}
            </span>
          </div>
        )}
      </div>

      {/* Card footer: actions */}
      <div className="border-t border-border bg-muted/35 p-4 max-sm:px-4">
        {trip.charge && (
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground">Extension fee <span className="ml-1">· 1 day</span></p>
              <p className="mt-0.5 text-lg font-extrabold">
                ${trip.charge}
                <span className="ml-1 text-[10px] font-normal text-muted-foreground">at ${trip.charge}/day</span>
              </p>
            </div>
            <Button size="sm" disabled={charged} onClick={() => onAction('charge')} className="h-9 text-[11px]">
              {charged ? <><Check /> Recorded</> : <><CreditCard /> Collect ${trip.charge}<ArrowUpRight className="!h-3 !w-3" /></>}
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-9 flex-1 bg-card text-[11px] shadow-none"
            onClick={() => onAction('warning')}
            disabled={sent}
          >
            {sent ? <><CheckCheck /> Reminder prepared</> : <><MessageSquare />{overdue ? 'Send warning' : 'Send reminder'}</>}
          </Button>
          <button
            aria-label={`Call ${trip.name}`}
            onClick={onCall}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-card px-4 text-[11px] font-medium text-foreground transition-colors hover:bg-secondary cursor-pointer"
          >
            <Phone className="h-3.5 w-3.5" /> Call
          </button>
        </div>
      </div>
    </article>
  )
}
