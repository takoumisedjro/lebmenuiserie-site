import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, CheckCircle2, ChevronRight } from 'lucide-react'
import { ScrollReveal } from '@/app/components/ScrollReveal'

const missions = [
  'Pose et installation de menuiseries extérieures (en neuf et en rénovation)',
  'Portes d\'entrée, fenêtres, portails, volets...',
  'Travail soigné',
  'Relation client',
]

const profil = [
  'Expérience en menuiserie (PVC, bois, alu)',
  'Minutie, autonomie et goût du travail bien fait',
  'Curiosité, rigueur, esprit d\'équipe et aisance dans la relation client',
  'Permis B obligatoire',
]

export default function RecrutementPage() {
  useEffect(() => {
    document.title = 'Recrutement — LEB Menuiserie | Menuisier-Poseur H/F Fontenay-le-Comte'
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="pt-10 pb-16 bg-gradient-to-br from-[var(--background-alt)] to-white border-b border-[var(--border)]">
        <div className="container-custom fade-in">
          <span className="text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest">
            Rejoignez l'équipe
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--foreground)] mt-2 mb-4">
            RECRUTEMENT
          </h1>
          <p className="text-[var(--foreground-muted)] text-lg max-w-xl">
            LEB Menuiserie recherche des talents pour renforcer ses équipes en Vendée.
          </p>
        </div>
      </section>

      {/* Offre */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <div className="bg-[var(--background-alt)] rounded-xl p-8 mb-8" style={{ boxShadow: 'inset 5px 0 0 #02aed6, 0 1px 3px rgba(0,0,0,0.08)' }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[var(--foreground)]">
                    MENUISIER-POSEUR (H/F)
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-[var(--foreground-muted)] text-sm">
                    <MapPin size={14} className="text-[var(--primary)]" />
                    <span>Fontenay-le-Comte (85)</span>
                  </div>
                </div>
                <span className="bg-[var(--primary)] text-white text-xs font-exo font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                  CDI — Temps plein
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-base text-[var(--foreground)] mb-3">
                    Missions principales
                  </h3>
                  <ul className="space-y-2">
                    {missions.map((m) => (
                      <li key={m} className="flex items-start gap-2.5 text-sm text-[var(--foreground-muted)]">
                        <CheckCircle2 size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-[var(--foreground)] mb-3">
                    Profil recherché
                  </h3>
                  <ul className="space-y-2">
                    {profil.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--foreground-muted)]">
                        <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-[var(--accent)] rounded-xl p-8 text-white">
              <h3 className="font-display font-bold text-xl mb-5">
                Postulez dès maintenant
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Mail size={16} className="text-[var(--primary)]" />
                  <a href="mailto:communication@groupedcf.fr" className="hover:text-white transition-colors">
                    communication@groupedcf.fr
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Mail size={16} className="text-[var(--primary)]" />
                  <a href="mailto:leb@lebmenuiserie.fr" className="hover:text-white transition-colors">
                    leb@lebmenuiserie.fr
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Phone size={16} className="text-[var(--primary)]" />
                  <a href="tel:0251690124" className="hover:text-white transition-colors">
                    02 51 69 01 24
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm text-white/80">
                  <MapPin size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                  <span>67 rue de l'Innovation — Route de La Rochelle<br />85200 Fontenay-le-Comte</span>
                </div>
              </div>
              <Link to="/contact" className="btn-primary">
                Envoyer une candidature <ChevronRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
