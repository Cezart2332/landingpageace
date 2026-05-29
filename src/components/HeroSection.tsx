const headlineWords = ['Software', 'that', 'moves', 'your', 'business', 'forward']

function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <span className="hero-badge hero-reveal">
          Software solutions for growing teams
        </span>
        <h1 className="hero-title">
          {headlineWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={`hero-word ${i >= 3 ? 'hero-word-accent' : ''}`}
            >
              {word}
            </span>
          ))}
        </h1>
        <p className="hero-sub hero-reveal">
          ACE Technologies designs, builds, and ships custom software—from cloud
          platforms to integrations that connect your entire stack.
        </p>
        <div className="hero-actions hero-reveal">
          <a href="#contact" className="btn btn-primary">
            Book a discovery call
          </a>
          <a href="#solutions" className="btn btn-secondary">
            View solutions
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
