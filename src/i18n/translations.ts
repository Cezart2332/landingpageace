import type { Locale } from './types'

export type Translations = {
  meta: {
    title: string
    description: string
  }
  a11y: {
    mainNav: string
    openMenu: string
    closeMenu: string
    companies: string
    metrics: string
    stars: string
    siteNav: string
    companyNav: string
    switchToRo: string
    switchToEn: string
    prevProject: string
    nextProject: string
    openProject: string
    closeModal: string
  }
  nav: {
    solutions: string
    portfolio: string
    why: string
    process: string
    faq: string
    contact: string
    bookCall: string
  }
  hero: {
    badge: string
    rotating: string[]
    headline: string[]
    sub: string
    ctaPrimary: string
    ctaSecondary: string
  }
  stats: {
    projects: string
    satisfaction: string
    experience: string
    support: string
    experienceSuffix: string
  }
  trust: {
    label: string
  }
  solutions: {
    label: string
    title: string
    description: string
    items: { title: string; description: string }[]
  }
  why: {
    label: string
    title: string
    description: string
    items: { title: string; description: string }[]
  }
  process: {
    label: string
    title: string
    description: string
    items: { title: string; description: string }[]
  }
  testimonials: {
    label: string
    title: string
    description: string
    items: { quote: string; name: string; role: string; initials: string }[]
  }
  faq: {
    label: string
    title: string
    description: string
    items: { q: string; a: string }[]
  }
  cta: {
    title: string
    description: string
    button: string
  }
  contact: {
    label: string
    title: string
    description: string
    location: string
    formName: string
    formEmail: string
    formMessage: string
    placeholderName: string
    placeholderEmail: string
    placeholderMessage: string
    submit: string
    errorRequired: string
    errorEmail: string
    successTitle: string
    successMessage: string
    sendAnother: string
  }
  footer: {
    tagline: string
    site: string
    company: string
    clients: string
    rights: string
    privacyPolicy: string
    termsOfService: string
  }
  portfolio: {
    label: string
    title: string
    viewAll: string
    visitSite: string
    items: {
      id: string
      title: string
      category: string
      year: string
      tag: string
      description: string
      url: string
    }[]
  }
  marquee: {
    items: string[]
  }
}

const ro: Translations = {
  meta: {
    title: 'ACE Technologies - Soluții software',
    description:
      'ACE Technologies - software personalizat, platforme cloud, integrări și automatizare pentru echipe în creștere.',
  },
  a11y: {
    mainNav: 'Navigare principală',
    openMenu: 'Deschide meniul',
    closeMenu: 'Închide meniul',
    companies: 'Companii cu care lucrăm',
    metrics: 'Indicatori companie',
    stars: '5 din 5 stele',
    siteNav: 'Site',
    companyNav: 'Companie',
    switchToRo: 'Română',
    switchToEn: 'English',
    prevProject: 'Proiectul anterior',
    nextProject: 'Proiectul următor',
    openProject: 'Vezi detalii proiect',
    closeModal: 'Închide fereastra',
  },
  nav: {
    solutions: 'Soluții',
    portfolio: 'Portofoliu',
    why: 'De ce noi',
    process: 'Proces',
    faq: 'Întrebări',
    contact: 'Contact',
    bookCall: 'Programează un call',
  },
  hero: {
    badge: 'ACE Technologies',
    rotating: ['Web Design', 'Web Development', 'Native App Development'],
    headline: ['Software', 'care', 'îți', 'propulsează', 'afacerea', 'înainte'],
    sub: 'ACE Technologies proiectează, construiește și livrează software personalizat, de la platforme cloud la integrări care conectează întregul tău stack.',
    ctaPrimary: 'Programează un call de descoperire',
    ctaSecondary: 'Vezi soluțiile',
  },
  stats: {
    projects: 'Proiecte livrate',
    satisfaction: 'Satisfacția clienților',
    experience: 'Experiență în industrie',
    support: 'Acoperire suport',
    experienceSuffix: ' ani',
  },
  trust: {
    label: 'Au încredere echipe care construiesc software modern',
  },
  solutions: {
    label: 'Ce construim',
    title: 'Soluții care cresc odată cu tine',
    description:
      'De la MVP la enterprise, livrăm software aliniat obiectivelor tale de business și realității tehnice.',
    items: [
      {
        title: 'Aplicații personalizate',
        description:
          'Aplicații web și mobile adaptate fluxurilor tale de lucru, nu invers.',
      },
      {
        title: 'Cloud și SaaS',
        description:
          'Arhitectură cloud scalabilă, produse SaaS multi-tenant și deploy-uri fiabile.',
      },
      {
        title: 'Integrări API',
        description:
          'Conectăm CRM-uri, ERP-uri, gateway-uri de plată și tool-uri terțe într-un flux unic.',
      },
      {
        title: 'Automatizare',
        description:
          'Reducem munca manuală cu pipeline-uri inteligente, boți și automatizare de procese.',
      },
      {
        title: 'Suport și mentenanță',
        description:
          'Monitorizare continuă, actualizări și suport dedicat ca software-ul tău să rămână performant.',
      },
    ],
  },
  why: {
    label: 'De ce ACE Technologies',
    title: 'Parteneriat, nu doar cod',
    description:
      'Lucrăm ca o extensie a echipei tale: transparenți, receptivi și concentrați pe rezultate care contează pentru business-ul tău.',
    items: [
      {
        title: 'Livrare rapidă',
        description:
          'Cicluri de livrare agile și milestone-uri clare, ca să vezi progres în fiecare săptămână, nu peste luni.',
      },
      {
        title: 'Construit pentru durată',
        description:
          'Securitate, testare și arhitectură mentenabilă fac parte din fiecare build, nu ca un gând ulterior.',
      },
      {
        title: 'Claritate full-stack',
        description:
          'O singură echipă de la design la deploy. Fără goluri la predare, fără aruncarea vinații între furnizori.',
      },
    ],
  },
  process: {
    label: 'Cum lucrăm',
    title: 'Un proces construit pentru claritate',
    description:
      'Fără cutii negre. Ai vizibilitate în fiecare etapă: de la descoperire la producție.',
    items: [
      {
        title: 'Descoperire',
        description:
          'Cartografiem obiectivele, utilizatorii și constrângerile, iar apoi definim un roadmap și un scope clar.',
      },
      {
        title: 'Construcție',
        description:
          'Livrare agile cu milestone-uri transparente, stack modern și calitate integrată.',
      },
      {
        title: 'Lansare',
        description:
          'Lansăm, monitorizăm și iterăm. Rămânem alături de tine la rollout și după.',
      },
    ],
  },
  testimonials: {
    label: 'Povești de la clienți',
    title: 'Au încredere echipe care livrează',
    description:
      'Parteneri din logistică, fintech și SaaS se bazează pe ACE Technologies pentru software care performează.',
    items: [
      {
        quote:
          'ACE Technologies ne-a livrat platforma înainte de termen. Echipa lor a înțeles domeniul nostru din prima zi.',
        name: 'Sarah Mitchell',
        role: 'CTO, Northline Logistics',
        initials: 'SM',
      },
      {
        quote:
          'Doar munca de integrare ne-a economisit sute de ore. Cod curat, comunicare clară, rezultate reale.',
        name: 'James Okonkwo',
        role: 'Director operațiuni, Finova',
        initials: 'JO',
      },
      {
        quote:
          'Am trecut de la haosul foilor de calcul la un dashboard unificat în trei luni. Îi recomand cu căldură.',
        name: 'Elena Vasquez',
        role: 'Fondator, CraftScale',
        initials: 'EV',
      },
    ],
  },
  faq: {
    label: 'Întrebări frecvente',
    title: 'Întrebări comune',
    description:
      'Răspunsuri rapide înainte să ne contactezi. Detaliem orice la un call de descoperire.',
    items: [
      {
        q: 'Ce tipuri de proiecte preluați?',
        a: 'Construim aplicații web personalizate, platforme SaaS, integrări și sisteme de automatizare, de la MVP-uri greenfield la modernizarea sistemelor legacy.',
      },
      {
        q: 'Cât durează un proiect tipic?',
        a: 'MVP-urile sunt livrate adesea în 8–14 săptămâni. Platformele mai mari sunt livrate în milestone-uri, ca să obții valoare devreme și constant.',
      },
      {
        q: 'Lucrați cu echipe existente?',
        a: 'Da. Ne integrăm alături de inginerii și designerii tăi sau operăm ca echipă independentă, în funcție de nevoie.',
      },
      {
        q: 'Ce tehnologii folosiți?',
        a: 'Alegem stack-ul per proiect, frecvent React, TypeScript, Node, servicii cloud-native pe AWS sau Azure și pattern-uri API validate.',
      },
    ],
  },
  cta: {
    title: 'Hai să transformăm ideea ta în software de producție',
    description:
      'Programează un call de descoperire gratuit. Conturăm scope, timeline și abordarea potrivită, fără obligații.',
    button: 'Începe un proiect',
  },
  contact: {
    label: 'Contactează-ne',
    title: 'Gata să construim ceva mare?',
    description:
      'Spune-ne despre proiectul tău. De obicei răspundem în maxim o zi lucrătoare.',
    location: 'Remote-first · Livrare la nivel global',
    formName: 'Nume',
    formEmail: 'Email',
    formMessage: 'Mesaj',
    placeholderName: 'Maria Popescu',
    placeholderEmail: 'maria@companie.ro',
    placeholderMessage: 'Spune-ne despre proiect, timeline și obiective...',
    submit: 'Trimite mesajul',
    errorRequired: 'Te rugăm să completezi toate câmpurile.',
    errorEmail: 'Te rugăm să introduci o adresă de email validă.',
    successTitle: 'Mulțumim!',
    successMessage: 'Am primit mesajul tău și revenim în curând.',
    sendAnother: 'Trimite alt mesaj',
  },
  footer: {
    tagline:
      'Software personalizat, platforme cloud și integrări pentru echipe care trebuie să se miște rapid fără compromisuri.',
    site: 'Site',
    company: 'Companie',
    clients: 'Clienți',
    rights: 'Toate drepturile rezervate.',
    privacyPolicy: 'Politică de Confidențialitate',
    termsOfService: 'Termeni și Condiții',
  },
  portfolio: {
    label: 'Portofoliu',
    title: 'Proiecte care vorbesc de la sine',
    viewAll: 'Vezi toate proiectele',
    visitSite: 'Vizitează site-ul',
    items: [
      {
        id: '01',
        title: 'Nexus Platform',
        category: 'SaaS',
        year: '2024',
        tag: 'Platformă web',
        description:
          'Platformă multi-tenant pentru echipe care gestionează proiecte, clienți și facturare într-un singur loc. Am livrat onboarding rapid, roluri granulare și rapoarte în timp real.',
        url: 'https://nexus-platform.io',
      },
      {
        id: '02',
        title: 'FlowMetrics',
        category: 'Analytics',
        year: '2024',
        tag: 'Dashboard',
        description:
          'Dashboard de analytics pentru echipe de produs, cu funnel-uri personalizabile și alerte pe Slack. Date agregate din mai multe surse, fără query-uri manuale.',
        url: 'https://flowmetrics.app',
      },
      {
        id: '03',
        title: 'VaultPay',
        category: 'Fintech',
        year: '2025',
        tag: 'Aplicație mobile',
        description:
          'Aplicație mobilă de plăți B2B cu autentificare biometrică și reconciliere automată. Fluxuri conforme PCI, testate pe iOS și Android înainte de lansare.',
        url: 'https://vaultpay.co',
      },
      {
        id: '04',
        title: 'OriginCMS',
        category: 'Content Platform',
        year: '2025',
        tag: 'Platformă web',
        description:
          'Headless CMS pentru site-uri editoriale, cu preview live și workflow de publicare pe mai multe canale. Echipele de marketing își gestionează conținutul fără deploy.',
        url: 'https://origincms.dev',
      },
      {
        id: '05',
        title: 'PulseOps',
        category: 'DevOps',
        year: '2025',
        tag: 'Tool intern',
        description:
          'Panou intern pentru monitorizarea pipeline-urilor CI/CD și a incidentelor. Vizualizare unificată a statusului serviciilor, cu notificări configurabile per echipă.',
        url: 'https://pulseops.internal',
      },
    ],
  },
  marquee: {
    items: [
      'Software care propulsează',
      'Design care impresionează',
      'Deadline-uri respectate',
      'Cod care durează',
      'Clienți care revin',
      'Soluții fără compromisuri',
    ],
  },
}

const en: Translations = {
  meta: {
    title: 'ACE Technologies - Software Solutions',
    description:
      'ACE Technologies - custom software, cloud platforms, integrations, and automation for growing teams.',
  },
  a11y: {
    mainNav: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    companies: 'Companies we work with',
    metrics: 'Company metrics',
    stars: '5 out of 5 stars',
    siteNav: 'Site',
    companyNav: 'Company',
    switchToRo: 'Română',
    switchToEn: 'English',
    prevProject: 'Previous project',
    nextProject: 'Next project',
    openProject: 'View project details',
    closeModal: 'Close dialog',
  },
  nav: {
    solutions: 'Solutions',
    portfolio: 'Portfolio',
    why: 'Why us',
    process: 'Process',
    faq: 'FAQ',
    contact: 'Contact',
    bookCall: 'Book a call',
  },
  hero: {
    badge: 'ACE Technologies',
    rotating: ['Web Design', 'Web Development', 'Native App Development'],
    headline: ['Software', 'that', 'moves', 'your', 'business', 'forward'],
    sub: 'ACE Technologies designs, builds, and ships custom software, from cloud platforms to integrations that connect your entire stack.',
    ctaPrimary: 'Book a discovery call',
    ctaSecondary: 'View solutions',
  },
  stats: {
    projects: 'Projects delivered',
    satisfaction: 'Client satisfaction',
    experience: 'Industry experience',
    support: 'Support coverage',
    experienceSuffix: ' yrs',
  },
  trust: {
    label: 'Trusted by teams building modern software',
  },
  solutions: {
    label: 'What we build',
    title: 'Solutions that scale with you',
    description:
      'From MVP to enterprise, we deliver software that fits your business goals and technical reality.',
    items: [
      {
        title: 'Custom Applications',
        description:
          'Tailored web and mobile apps built around your workflows, not the other way around.',
      },
      {
        title: 'Cloud & SaaS',
        description:
          'Scalable cloud architecture, multi-tenant SaaS products, and reliable deployments.',
      },
      {
        title: 'API Integrations',
        description:
          'Connect CRMs, ERPs, payment gateways, and third-party tools into one seamless flow.',
      },
      {
        title: 'Automation',
        description:
          'Reduce manual work with intelligent pipelines, bots, and process automation.',
      },
      {
        title: 'Support & Maintenance',
        description:
          'Ongoing monitoring, updates, and dedicated support so your software stays sharp.',
      },
    ],
  },
  why: {
    label: 'Why ACE Technologies',
    title: 'Partnership, not just code',
    description:
      'We work as an extension of your team: transparent, responsive, and focused on outcomes that matter to your business.',
    items: [
      {
        title: 'Ship faster',
        description:
          'Lean delivery cycles and clear milestones so you see progress every week, not months from now.',
      },
      {
        title: 'Built to last',
        description:
          'Security, testing, and maintainable architecture are part of every build, not an afterthought.',
      },
      {
        title: 'Full-stack clarity',
        description:
          'One team owns design through deployment. No handoff gaps, no vendor finger-pointing.',
      },
    ],
  },
  process: {
    label: 'How we work',
    title: 'A process built for clarity',
    description:
      'No black boxes. You get visibility at every stage, from discovery to production.',
    items: [
      {
        title: 'Discover',
        description:
          'We map your goals, users, and constraints, then define a clear roadmap and scope.',
      },
      {
        title: 'Build',
        description:
          'Agile delivery with transparent milestones, modern stack, and quality baked in.',
      },
      {
        title: 'Ship',
        description:
          'Launch, monitor, and iterate. We stay with you through rollout and beyond.',
      },
    ],
  },
  testimonials: {
    label: 'Client stories',
    title: 'Trusted by teams who ship',
    description:
      'Partners across logistics, fintech, and SaaS rely on ACE Technologies for software that performs.',
    items: [
      {
        quote:
          'ACE Technologies delivered our platform ahead of schedule. Their team understood our domain from day one.',
        name: 'Sarah Mitchell',
        role: 'CTO, Northline Logistics',
        initials: 'SM',
      },
      {
        quote:
          'The integration work alone saved us hundreds of hours. Clean code, clear communication, real results.',
        name: 'James Okonkwo',
        role: 'Operations Director, Finova',
        initials: 'JO',
      },
      {
        quote:
          'We went from spreadsheet chaos to a unified dashboard in three months. Could not recommend them more.',
        name: 'Elena Vasquez',
        role: 'Founder, CraftScale',
        initials: 'EV',
      },
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Common questions',
    description:
      "Quick answers before you reach out. We're happy to go deeper on a discovery call.",
    items: [
      {
        q: 'What types of projects do you take on?',
        a: 'We build custom web apps, SaaS platforms, integrations, and automation systems, from greenfield MVPs to modernizing legacy systems.',
      },
      {
        q: 'How long does a typical project take?',
        a: 'MVPs often ship in 8–14 weeks. Larger platforms are delivered in phased milestones so you get value early and often.',
      },
      {
        q: 'Do you work with existing teams?',
        a: 'Yes. We embed alongside your engineers and designers, or operate as a standalone squad depending on what you need.',
      },
      {
        q: 'What technologies do you use?',
        a: 'We choose the stack per project, commonly React, TypeScript, Node, cloud-native services on AWS or Azure, and proven API patterns.',
      },
    ],
  },
  cta: {
    title: "Let's turn your idea into production software",
    description:
      "Book a free discovery call. We'll outline scope, timeline, and the right approach, with no obligation.",
    button: 'Start a project',
  },
  contact: {
    label: 'Get in touch',
    title: 'Ready to build something great?',
    description:
      'Tell us about your project. We typically respond within one business day.',
    location: 'Remote-first · Worldwide delivery',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    placeholderName: 'Jane Smith',
    placeholderEmail: 'jane@company.com',
    placeholderMessage: 'Tell us about your project, timeline, and goals...',
    submit: 'Send message',
    errorRequired: 'Please fill in all fields.',
    errorEmail: 'Please enter a valid email address.',
    successTitle: 'Thank you!',
    successMessage: "We've received your message and will be in touch soon.",
    sendAnother: 'Send another message',
  },
  footer: {
    tagline:
      'Custom software, cloud platforms, and integrations for teams that need to move fast without cutting corners.',
    site: 'Site',
    company: 'Company',
    clients: 'Clients',
    rights: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
  portfolio: {
    label: 'Portfolio',
    title: 'Projects that speak for themselves',
    viewAll: 'View all projects',
    visitSite: 'Visit website',
    items: [
      {
        id: '01',
        title: 'Nexus Platform',
        category: 'SaaS',
        year: '2024',
        tag: 'Web platform',
        description:
          'Multi-tenant platform for teams managing projects, clients, and billing in one place. We shipped fast onboarding, granular roles, and real-time reporting.',
        url: 'https://nexus-platform.io',
      },
      {
        id: '02',
        title: 'FlowMetrics',
        category: 'Analytics',
        year: '2024',
        tag: 'Dashboard',
        description:
          'Analytics dashboard for product teams with custom funnels and Slack alerts. Data aggregated from multiple sources without manual queries.',
        url: 'https://flowmetrics.app',
      },
      {
        id: '03',
        title: 'VaultPay',
        category: 'Fintech',
        year: '2025',
        tag: 'Mobile app',
        description:
          'B2B mobile payments app with biometric auth and automatic reconciliation. PCI-compliant flows, tested on iOS and Android before launch.',
        url: 'https://vaultpay.co',
      },
      {
        id: '04',
        title: 'OriginCMS',
        category: 'Content Platform',
        year: '2025',
        tag: 'Web platform',
        description:
          'Headless CMS for editorial sites with live preview and multi-channel publishing workflows. Marketing teams update content without deploys.',
        url: 'https://origincms.dev',
      },
      {
        id: '05',
        title: 'PulseOps',
        category: 'DevOps',
        year: '2025',
        tag: 'Internal tool',
        description:
          'Internal panel for CI/CD pipeline and incident monitoring. Unified service status view with configurable alerts per team.',
        url: 'https://pulseops.internal',
      },
    ],
  },
  marquee: {
    items: [
      'Software that scales',
      'Design that impresses',
      'Deadlines that stick',
      'Code that lasts',
      'Clients that return',
      'Zero compromises',
    ],
  },
}

export const translations: Record<Locale, Translations> = { ro, en }
