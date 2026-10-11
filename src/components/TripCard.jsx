import {
  ArrowDownLeft, ArrowUpRight,
  Check, CheckCheck, Clock3,
  CreditCard, MapPin, MessageSquare, Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { duration } from '@/lib/trips'
import jeep from '@/assets/jeep.jpg'
import dodge from '@/assets/dodge.jpg'
import bmw from '@/assets/bmw.jpg'
import tesla from '@/assets/tesla.jpg'

const photos = { jeep, dodge, bmw, tesla }

const VEHICLE_TYPE = {
  jeep: 'SUV',
  dodge: 'Coupe',
  bmw: 'Sedan',
  tesla: 'Electric SUV',
}

export function TripCard({ trip, elapsed, sent, charged, onAction, onCall }) {
  const overdue = trip.status === 'overdue'
  const time = duration(trip.seconds + (overdue ? elapsed : -elapsed))

  return (
    <article className="trip-card" aria-label={`${trip.name}'s trip`}>
      <div className="px-5 pt-4 max-sm:px-4">

        {/* Status + GPS */}
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
              <span>{VEHICLE_TYPE[trip.id]}</span>
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
                className="mt-0.5 block text-[10px] text-muted-foreground transition-colors hover:text-primary"
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
                <span className="ml-1 rounded bg-danger-soft px-1.5 py-0.5 text-[9px] font-medium text-destructive">
                  At risk
                </span>
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

      {/* Actions footer */}
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
              {charged
                ? <><Check /> Recorded</>
                : <><CreditCard /> Collect ${trip.charge}<ArrowUpRight className="!h-3 !w-3" /></>}
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
            {sent
              ? <><CheckCheck /> Reminder prepared</>
              : <><MessageSquare />{overdue ? 'Send warning' : 'Send reminder'}</>}
          </Button>
          <button
            aria-label={`Call ${trip.name}`}
            onClick={onCall}
            className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-card px-4 text-[11px] font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Phone className="h-3.5 w-3.5" /> Call
          </button>
        </div>
      </div>
    </article>
  )
}
