'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import type { Translations } from '@/i18n/translations'

export type PortfolioItem = Translations['portfolio']['items'][number]

type Props = {
  item: PortfolioItem | null
  closeLabel: string
  visitLabel: string
  onClose: () => void
}

export default function PortfolioModal({
  item,
  closeLabel,
  visitLabel,
  onClose,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!item) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="portfolio-modal">
      <button
        type="button"
        className="portfolio-modal-backdrop"
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div
        className="portfolio-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
      >
        <button
          ref={closeRef}
          type="button"
          className="portfolio-modal-close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="portfolio-modal-meta">
          <span className="portfolio-category">{item.category}</span>
          <span className="portfolio-year">{item.year}</span>
        </div>

        <h3 id="portfolio-modal-title" className="portfolio-modal-title">
          {item.title}
        </h3>
        <span className="portfolio-tag">{item.tag}</span>

        <p className="portfolio-modal-desc">{item.description}</p>

        <a
          href={item.url}
          className="btn btn-primary portfolio-modal-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {visitLabel}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
