import type { Translations } from '@/i18n/translations'

type Props = {
  cta: Translations['cta']
}

export default function CtaBanner({ cta }: Props) {
  return (
    <section className="cta-banner" data-reveal>
      <div className="container cta-banner-inner">
        <div className="cta-banner-copy">
          <h2 className="cta-banner-title">{cta.title}</h2>
          <p className="cta-banner-desc">{cta.description}</p>
        </div>
        <a href="#contact" className="btn btn-primary btn-lg">
          {cta.button}
        </a>
      </div>
    </section>
  )
}
