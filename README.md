# 1Now — Trip Overdue Manager

A feature demo for [1Now](https://1now.ai), built for Turo hosts who manage multi-car fleets.

---

## What this feature is

The Trip Overdue Manager is a real-time operations dashboard that sits inside the 1Now platform. It gives fleet operators a single screen showing every active rental, which ones are late, how late they are, and what to do about it — all without opening a separate tool, making a phone call first, or doing any mental math.

---

## What problem it solves

When a renter doesn't return a car on time, a Turo host loses money in at least three ways:

1. **Unpaid extra time.** The renter is using the car beyond what they paid for, and nothing gets charged automatically.
2. **Downstream booking conflict.** If another customer is picking up that same car soon, the host has no warning until it's too late.
3. **Manual follow-up cost.** The host has to notice the problem themselves, look up the renter's number, call or text them, and then figure out what to charge — all while managing other bookings.

This feature removes all three. It detects overdue returns the moment they happen, calculates the extension fee instantly, flags any upcoming booking conflict with the same car, and lets the operator charge or warn the renter in one tap — without leaving the screen.

---

## What is mocked and why

This is a frontend-only demo. No backend, no user accounts, no live data.

| What looks real | What it actually does | Why it's mocked |
|---|---|---|
| Live countdown timers | Driven by `Date.now()` offsets set at page load | Real GPS return-time data would come from a Turo API integration not yet scoped |
| "Charge extension" button | Records the action in local React state, shows a confirmation | Real charging would go through Stripe Connect on the host's account |
| "Send warning" / "Prepare reminder" | Updates button state and shows a toast | Real SMS delivery would use Twilio or a similar provider |
| "Dial now" in the call modal | Opens the device's native phone dialer via `tel:` | Real in-app calling would require a VOIP provider (e.g. Twilio Voice) |
| GPS location + distance | Static strings in `src/lib/trips.js` | Live location tracking requires device GPS consent and a mapping service |
| Renter profiles and ratings | Hardcoded in trip data | Would pull from the Turo host API or 1Now's own renter database |
| Next-booking conflict countdown | Hardcoded `minutes` field in trip data | Would be computed from the host's actual Turo calendar |

The mock data in `src/lib/trips.js` covers four scenarios deliberately: one active trip with no issue, one returning soon, one 45 minutes overdue with a next booking in 2 hours, and one 3 hours overdue with a next booking arriving in 30 minutes. These four cases exercise every state the UI can reach.

---

## Stack

- Vite + React 19
- Tailwind CSS v3
- Lucide React (icons)
- No backend, no router, no state management library

## Run locally

```bash
npm install
npm run dev
```
