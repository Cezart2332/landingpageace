import type { Translations } from '@/i18n/translations'

type Props = {
  cta: Translations['cta']
}

export default function CtaBanner({ cta }: Props) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band-inner" data-reveal>
        <div className="cta-band-copy">
          <h2 id="cta-band-title" className="cta-band-title">
            {cta.title}
          </h2>
          <p className="cta-band-desc">{cta.description}</p>
        </div>
        <a href="#contact" className="btn btn-primary btn-lg cta-band-btn">
          {cta.button}
        </a>
      </div>
    </section>
  )
}
