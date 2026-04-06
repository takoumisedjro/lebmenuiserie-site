import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, HardHat, Ruler, Wrench, Building2 } from 'lucide-react'
import { ScrollReveal } from '@/app/components/ScrollReveal'
import { ImageWithFallback } from '@/app/components/ImageWithFallback'

const galerie = [
  'https://lebmenuiserie.com/wp-content/uploads/2024/10/1.jpg',
  'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6158-scaled.jpg',
  'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1446-scaled.jpg',
  'https://lebmenuiserie.com/wp-content/uploads/2026/01/2.jpg',
  'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6151-scaled.jpg',
  'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1681-scaled.jpg',
]

const steps = [
  { icon: <Ruler size={22} />, title: 'Étude du projet', desc: 'Analyse de vos besoins, prise de mesures et proposition technique sur-mesure.' },
  { icon: <Building2 size={22} />, title: 'Fabrication', desc: 'Menuiseries aluminium fabriquées en partenariat avec des fournisseurs certifiés.' },
  { icon: <HardHat size={22} />, title: 'Pose professionnelle', desc: 'Nos menuisiers-poseurs qualifiés interviennent sur vos chantiers avec rigueur.' },
  { icon: <Wrench size={22} />, title: 'SAV & maintenance', desc: 'Suivi après installation, dépannage et entretien pour pérenniser vos équipements.' },
]

export default function MenuiserieIndustriellePage() {
  useEffect(() => {
    document.title = 'La Menuiserie Industrielle — LEB Menuiserie | Solutions pour bâtiments professionnels'
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://lebmenuiserie.com/wp-content/uploads/2024/10/1.jpg"
            alt="Menuiserie industrielle LEB"
            className="w-full h-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="container-custom relative z-10 fade-in">
          <span className="inline-block text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest mb-3">
            Solutions professionnelles
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            La menuiserie industrielle
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-6">
            Un accompagnement sur mesure pour tous vos projets de menuiserie alu, de l'étude à la pose effectuée par nos menuisiers-poseurs.
          </p>
          <Link to="/contact" className="btn-primary">
            Nous contacter <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest">
                  Notre savoir-faire
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--foreground)] mt-2 mb-5">
                  Une équipe dédiée aux chantiers pour vos{' '}
                  <span className="text-[var(--primary)]">bâtiments professionnels</span>
                </h2>
                <p className="text-[var(--foreground-muted)] leading-relaxed mb-4">
                  Un accompagnement sur mesure pour tous vos projets de menuiserie
                  alu, de l'étude de votre projet à la pose effectuée par nos
                  menuisiers poseurs.
                </p>
                <p className="text-[var(--foreground-muted)] leading-relaxed mb-6">
                  LEB Menuiserie intervient sur les bâtiments professionnels, collectifs
                  et tertiaires. Notre équipe spécialisée assure une réponse technique
                  adaptée à chaque chantier, du logement collectif aux bâtiments industriels.
                </p>
                <Link to="/contact" className="btn-primary">
                  Soumettre un projet <ChevronRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    className={`p-5 rounded-xl border border-[var(--border)] bg-[var(--background-alt)] hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)] transition-all stagger-${i + 1}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] mb-3">
                      {step.icon}
                    </div>
                    <h3 className="font-display font-bold text-sm text-[var(--foreground)] mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="section-padding bg-[var(--background-alt)]">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-display font-bold text-3xl text-[var(--foreground)]">
                Nos réalisations
              </h2>
              <p className="text-[var(--foreground-muted)] mt-3 max-w-lg mx-auto">
                Aperçu de quelques chantiers réalisés par nos équipes.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galerie.map((img, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="img-zoom rounded-xl overflow-hidden aspect-square shadow-[var(--shadow-sm)]">
                  <ImageWithFallback src={img} alt={`Réalisation ${i + 1}`} className="w-full h-full" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--accent)]">
        <div className="container-custom text-center text-white">
          <ScrollReveal>
            <h2 className="font-display font-extrabold text-3xl mb-4">
              Un projet professionnel ?
            </h2>
            <p className="text-white/75 max-w-lg mx-auto mb-8">
              Contactez notre équipe dédiée aux chantiers industriels et collectifs pour une étude personnalisée.
            </p>
            <Link to="/contact" className="btn-primary text-base py-3.5 px-8">
              Nous contacter <ChevronRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
