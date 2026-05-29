'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  items: string[]
  /** Smaller variant for navbar — no prefix, tighter layout */
  compact?: boolean
}

const VISIBLE_MS = 2600   // how long each phrase stays
const TRANSITION_MS = 380 // fade-out + slide-out duration

export default function RotatingText({ items, compact = false }: Props) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'in' | 'out'>('in')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const cycle = () => {
      /* Start exit animation */
      setPhase('out')

      timerRef.current = setTimeout(() => {
        /* Swap to next item then start entrance */
        setIndex(prev => (prev + 1) % items.length)
        setPhase('in')

        /* Schedule next cycle */
        timerRef.current = setTimeout(cycle, VISIBLE_MS)
      }, TRANSITION_MS)
    }

    timerRef.current = setTimeout(cycle, VISIBLE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`rotating-text-wrap${compact ? ' rotating-text-wrap--compact' : ''}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {!compact && (
        <span className="rotating-text-prefix">Specializați în</span>
      )}
      <span className={`rotating-text-phrase rotating-text-phrase--${phase}`}>
        {items[index]}
      </span>
    </div>
  )
}
