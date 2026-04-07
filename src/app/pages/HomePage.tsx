import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Award,
  Users,
  Wrench,
  ShieldCheck,
  Phone,
  ArrowRight,
  DoorOpen,
  Grid2x2,
  Fence,
  PanelRight,
  Sun,
  Layers,
  SlidersHorizontal,
  TreePine,
  Bug,
} from 'lucide-react'
import { ScrollReveal } from '@/app/components/ScrollReveal'
import { ImageWithFallback } from '@/app/components/ImageWithFallback'

const services = [
  {
    icon: <DoorOpen size={28} />,
    title: 'Portes d\'entrée',
    desc: 'Des portes d\'entrée sécurisées et esthétiques, sur-mesure pour votre habitat.',
    image: 'https://lebmenuiserie.com/wp-content/uploads/2024/10/1.jpg',
  },
  {
    icon: <Grid2x2 size={28} />,
    title: 'Fenêtres',
    desc: 'Isolation thermique et acoustique optimale avec nos fenêtres haute performance.',
    image: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6158-scaled.jpg',
  },
  {
    icon: <Fence size={28} />,
    title: 'Portails et clôtures',
    desc: 'Sécurisez et embellissez votre propriété avec nos portails sur-mesure.',
    image: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1446-scaled.jpg',
  },
  {
    icon: <PanelRight size={28} />,
    title: 'Baies coulissantes',
    desc: 'Agrandissez visuellement vos espaces de vie avec nos baies coulissantes.',
    image: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/2.jpg',
  },
  {
    icon: <TreePine size={28} />,
    title: 'Pergolas',
    desc: 'Profitez de votre extérieur toute l\'année avec nos pergolas bioclimatiques.',
    image: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6151-scaled.jpg',
  },
  {
    icon: <Layers size={28} />,
    title: 'Portes de garage',
    desc: 'Sécurité, praticité et design pour vos accès garage.',
    image: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1681-scaled.jpg',
  },
  {
    icon: <Sun size={28} />,
    title: 'Stores extérieurs',
    desc: 'Protégez-vous du soleil tout en valorisant l\'extérieur de votre bien.',
    image: 'https://lebmenuiserie.com/wp-content/uploads/2024/10/1.jpg',
  },
  {
    icon: <SlidersHorizontal size={28} />,
    title: 'Stores intérieurs',
    desc: 'Habillage de fenêtres élégant et fonctionnel pour votre intérieur.',
    image: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6158-scaled.jpg',
  },
  {
    icon: <Bug size={28} />,
    title: 'Moustiquaires',
    desc: 'Profitez de l\'air frais sans les nuisances, solutions sur-mesure.',
    image: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1446-scaled.jpg',
  },
]

const partenaires = [
  'La Toulousaine',
  'Bubendorf',
  'Janneau',
  'Harol',
  'Belm',
]

const trustStats = [
  { value: '+50 ans', label: 'D\'expérience', icon: <Award size={24} /> },
  { value: '2', label: 'Showrooms en Vendée', icon: <Wrench size={24} /> },
  { value: 'RGE', label: 'Certifié Qualibat DCF', icon: <ShieldCheck size={24} /> },
  { value: '100%', label: 'Sur-mesure', icon: <Users size={24} /> },
]

export default function HomePage() {
  useEffect(() => {
    document.title = 'LEB Menuiserie — Installateur Conseil depuis 1973 | Fenêtres, Portes, Pergolas'
  }, [])

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'L.E.B Menuiserie',
            telephone: '02 51 69 01 24',
            email: 'leb@lebmenuiserie.fr',
            url: 'https://lebmenuiserie.com',
            foundingDate: '1973',
            address: {
              '@type': 'PostalAddress',
              streetAddress: "67 rue de l'Innovation - Route de La Rochelle",
              addressLocality: 'Fontenay-le-Comte',
              postalCode: '85200',
              addressCountry: 'FR',
            },
            openingHours: 'Mo-Fr 09:00-12:30,14:00-17:00',
            image: 'https://lebmenuiserie.com/wp-content/uploads/2019/01/logo_LEB.png',
            description:
              'LEB Menuiserie, installateur-conseil depuis 1973. Fenêtres, portes, pergolas, volets, portails — solutions sur-mesure pour particuliers et professionnels en Vendée.',
          }),
        }}
      />

      {/* ── HERO ──────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6158-scaled.jpg"
            alt="Fenêtres LEB Menuiserie"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        </div>

        {/* Promo banner */}
        <div className="absolute top-16 lg:top-20 left-0 right-0 z-10 bg-[var(--primary)] text-white text-center py-2.5 text-sm font-exo font-semibold tracking-wide">
          Offre de printemps&nbsp;: <strong className="font-extrabold">-10% sur toutes les Pergolas Bioclimatiques</strong> jusqu'au 17&nbsp;avril
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 pt-32 pb-16">
          <div className="max-w-2xl fade-in">
            <span className="inline-block text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest mb-4">
              Installateur Conseil depuis 1973
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              La menuiserie{' '}
              <span className="text-[var(--primary)]">à votre image</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
              Imaginez votre projet de menuiserie intérieure et extérieure,
              nous vous aidons à le concrétiser. Partenaires de marques
              haut-de-gamme, certifiés RGE Qualibat.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-shimmer btn-primary text-base py-3.5 px-7 pulse-glow">
                Demander un devis gratuit
                <ChevronRight size={18} />
              </Link>
              <a
                href="tel:0251690124"
                className="btn-secondary text-base py-3.5 px-7 border-white/50 text-white hover:bg-white hover:text-[var(--foreground)]"
              >
                <Phone size={18} />
                02 51 69 01 24
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50">
          <span className="text-xs font-exo tracking-widest uppercase">Défiler</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* ── TRUST STATS ───────────────────────────── */}
      <section className="bg-[var(--background-alt)] border-b border-[var(--border)]">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustStats.map((stat, i) => (
              <ScrollReveal key={stat.value} delay={i * 100}>
                <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] mb-3">
                    {stat.icon}
                  </div>
                  <div className="font-display font-extrabold text-2xl text-[var(--foreground)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--foreground-muted)]">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────── */}
      <section className="section-padding bg-white" id="prestations">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest">
                Ce que nous faisons
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--foreground)] mt-2">
                Nos différentes prestations
              </h2>
              <p className="text-[var(--foreground-muted)] mt-4 max-w-xl mx-auto">
                Menuiseries intérieures et extérieures, sur-mesure, posées par nos propres artisans.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 60}>
                <Link
                  to="/contact"
                  className="group flex flex-col rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
                >
                  <div className="img-zoom h-52 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)]">
                      {service.icon}
                    </div>
                    <h3 className="font-display font-bold text-lg text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)] flex-1">{service.desc}</p>
                    <span className="text-[var(--primary)] text-sm font-exo font-semibold flex items-center gap-1 mt-1">
                      En savoir plus <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERGOLA PROMO ─────────────────────────── */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6151-scaled.jpg"
            alt="Pergola bioclimatique"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-[var(--primary)]/90" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <ScrollReveal>
            <span className="inline-block bg-white/20 text-white text-xs font-exo font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Offre de printemps
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl mb-4">
              Vous souhaitez agrandir votre espace de vie ?
            </h2>
            <p className="text-white/85 text-lg max-w-xl mx-auto mb-8">
              Profitez de notre offre de printemps sur tous les modèles de Pergolas
              Bioclimatiques — <strong>10% de réduction jusqu'au 17 avril</strong>
            </p>
            <Link to="/contact" className="btn-dark text-base py-3.5 px-8 inline-flex">
              Je profite de l'offre
              <ChevronRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── À PROPOS 50/50 ────────────────────────── */}
      <section className="section-padding bg-[var(--background-alt)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="img-zoom rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src="https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1681-scaled.jpg"
                  alt="L'équipe LEB Menuiserie"
                  className="w-full h-80 lg:h-96"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <span className="text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest">
                  Qui sommes-nous
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--foreground)] mt-2 mb-5">
                  L.E.B menuiserie, Installateur Conseil{' '}
                  <span className="text-[var(--primary)]">depuis plus de 50 ans</span>
                </h2>
                <p className="text-[var(--foreground-muted)] leading-relaxed mb-5">
                  Imaginez votre projet de menuiserie intérieure et extérieure, nous vous
                  aidons à le concrétiser. Nous travaillons en partenariat avec des
                  fournisseurs garantissant des produits de haute-qualité.
                </p>
                <p className="text-[var(--foreground-muted)] leading-relaxed mb-6">
                  Détenteur du label <strong className="text-[var(--foreground)]">RGE</strong>,
                  nos travaux sont éligibles aux aides financières de l'État pour la
                  rénovation énergétique. Deux showrooms en Vendée pour vous accueillir
                  et vous conseiller sur tous vos projets.
                </p>
                <div className="flex flex-wrap gap-3 mb-7">
                  {['RGE Certifié', 'Qualibat DCF', '+50 ans d\'expérience', 'Sur-mesure'].map((badge) => (
                    <span
                      key={badge}
                      className="bg-white border border-[var(--border)] text-[var(--foreground-muted)] text-xs font-exo font-medium px-3 py-1.5 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <Link to="/contact" className="btn-primary">
                  Le sur-mesure au service de votre habitat
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SHOWROOMS ─────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest">
                Venez nous rencontrer
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--foreground)] mt-2">
                Visitez nos SHOWROOMS
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Showroom Fontenay-le-Comte',
                address: "67 rue de l'Innovation\nRoute de La Rochelle\n85200 Fontenay-le-Comte",
                phone: '02 51 69 01 24',
                tel: '0251690124',
                hours: 'Lun–Ven : 9h–12h30 et 14h–17h',
                note: '(rendez-vous en dehors de ces horaires)',
                mapsUrl: 'https://maps.google.com/?q=67+rue+de+l+Innovation+85200+Fontenay-le-Comte',
              },
              {
                name: 'Showroom Antigny',
                address: 'Rue des Plantes\nRoute de Fontenay-le-Comte\n85120 Antigny',
                phone: '02 51 50 21 58',
                tel: '0251502158',
                hours: 'Lun–Ven : 9h–12h30 et 14h–17h',
                note: '',
                mapsUrl: 'https://maps.google.com/?q=Rue+des+Plantes+85120+Antigny',
              },
            ].map((showroom, i) => (
              <ScrollReveal key={showroom.name} delay={i * 150}>
                <div className="bg-[var(--background-alt)] rounded-2xl p-7 border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)] transition-all">
                  <h3 className="font-display font-bold text-xl text-[var(--foreground)] mb-4">
                    {showroom.name}
                  </h3>
                  <div className="space-y-3 text-sm text-[var(--foreground-muted)]">
                    <div className="flex gap-2.5">
                      <MapPin size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <span className="whitespace-pre-line">{showroom.address}</span>
                    </div>
                    <div className="flex gap-2.5">
                      <Phone size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <a href={`tel:${showroom.tel}`} className="hover:text-[var(--primary)] transition-colors font-medium">
                        {showroom.phone}
                      </a>
                    </div>
                    <div className="flex gap-2.5">
                      <Clock size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <div>
                        <div>{showroom.hours}</div>
                        {showroom.note && (
                          <div className="text-xs text-[var(--foreground-light)] mt-0.5">{showroom.note}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <a
                    href={showroom.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary mt-5 text-xs py-2 px-4"
                  >
                    Voir sur la carte
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTENAIRES ───────────────────────────── */}
      <section className="py-12 bg-[var(--background-alt)] border-t border-[var(--border)]">
        <div className="container-custom">
          <ScrollReveal>
            <p className="text-center text-sm text-[var(--foreground-muted)] font-exo uppercase tracking-widest mb-8">
              Nos partenaires fabricants
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12">
              {partenaires.map((p) => (
                <span
                  key={p}
                  className="font-display font-bold text-lg text-[var(--foreground-light)] hover:text-[var(--primary)] transition-colors cursor-default"
                >
                  {p}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────── */}
      <section className="section-padding bg-[var(--accent)]">
        <div className="container-custom text-center text-white">
          <ScrollReveal>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl mb-4">
              Confiez-nous votre projet
            </h2>
            <p className="text-white/75 max-w-lg mx-auto mb-8 text-lg">
              Contactez nos équipes pour un devis personnalisé et gratuit.
              Nous intervenons sur toute la Vendée et le secteur de La Rochelle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-base py-3.5 px-8">
                Demander un devis gratuit
                <ChevronRight size={18} />
              </Link>
              <a href="tel:0251690124" className="btn-secondary text-base py-3.5 px-8 border-white/40 text-white hover:bg-white hover:text-[var(--accent)]">
                <Phone size={18} />
                02 51 69 01 24
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

// Needed for icons in JSX above
import { MapPin, Clock } from 'lucide-react'
