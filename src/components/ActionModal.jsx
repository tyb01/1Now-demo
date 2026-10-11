import { CreditCard, MessageSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ActionModal({ action, onClose, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
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
            {action.type === 'warning'
              ? <MessageSquare className="h-5 w-5" />
              : <CreditCard className="h-5 w-5" />}
          </span>
          <Button variant="ghost" size="icon" aria-label="Close dialog" onClick={onClose}>
            <X />
          </Button>
        </div>

        <h2 id="action-title" className="text-xl font-bold">
          {action.type === 'warning' ? 'Send a return reminder' : 'Collect extension fee'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {action.trip.name} · {action.trip.vehicle}
        </p>

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
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button autoFocus onClick={onConfirm}>
            {action.type === 'warning'
              ? <><MessageSquare /> Prepare reminder</>
              : <><CreditCard /> Record ${action.trip.charge} extension</>}
          </Button>
        </div>
      </div>
    </div>
  )
}
