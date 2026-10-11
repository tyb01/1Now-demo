import { Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CallModal({ trip, onClose }) {
  function dial() {
    window.location.href = `tel:${trip.phone.replace(/[^+\d]/g, '')}`
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Call ${trip.name}`}
        className="isolate w-full max-w-sm rounded-lg border border-border p-6 shadow-xl"
        style={{ backgroundColor: '#ffffff' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-success/10 text-success">
            <Phone className="h-5 w-5" />
          </span>
          <Button variant="ghost" size="icon" aria-label="Close" onClick={onClose}>
            <X />
          </Button>
        </div>

        <h2 className="text-xl font-bold">Call renter</h2>
        <p className="mt-1 text-sm text-muted-foreground">{trip.vehicle} · {trip.plate}</p>

        <div className="my-5 flex items-center gap-4 rounded-md bg-secondary p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs font-bold text-muted-foreground">
            {trip.initials}
          </span>
          <div>
            <p className="text-sm font-bold">{trip.name}</p>
            <p className="mt-0.5 font-mono text-base font-semibold text-primary">{trip.phone}</p>
          </div>
        </div>

        <p className="mb-5 text-xs leading-5 text-muted-foreground">
          Tapping "Dial now" will open your device's phone app.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" autoFocus onClick={dial}>
            <Phone className="h-4 w-4" /> Dial now
          </Button>
        </div>
      </div>
    </div>
  )
}
