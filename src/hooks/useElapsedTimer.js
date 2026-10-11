import { useEffect, useState } from 'react'

export function useElapsedTimer() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(v => v + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return elapsed
}
