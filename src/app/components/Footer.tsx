import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--accent)] text-white">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + présentation */}
          <div className="lg:col-span-1">
            <div className="inline-block bg-white rounded-lg px-4 py-2 mb-4">
              <img
                src="https://lebmenuiserie.com/wp-content/uploads/2019/01/logo_LEB.png"
                alt="LEB Menuiserie"
                className="h-10 w-auto object-contain"
                width={160}
                height={40}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Installateur Conseil depuis 1973. Imaginez votre projet de menuiserie
              intérieure et extérieure, nous vous aidons à le concrétiser.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/lebmenuiserie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LEB Menuiserie sur Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--primary)] transition-colors text-xs font-bold"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/lebmenuiserie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LEB Menuiserie sur Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-5 text-[var(--primary)]">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Accueil', to: '/' },
                { label: 'Menuiserie industrielle', to: '/menuiserie-industrielle' },
                { label: 'Recrutement', to: '/recrutement' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom Fontenay */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-5 text-[var(--primary)]">
              Showroom Fontenay
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm text-white/70">
                <MapPin size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <span>67 rue de l'Innovation<br />Route de La Rochelle<br />85200 Fontenay-le-Comte</span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Phone size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <a href="tel:0251690124" className="hover:text-white transition-colors">
                  02 51 69 01 24
                </a>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Clock size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <span>Lun–Ven : 9h–12h30 / 14h–17h</span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Mail size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <a href="mailto:leb@lebmenuiserie.fr" className="hover:text-white transition-colors">
                  leb@lebmenuiserie.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom Antigny */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-5 text-[var(--primary)]">
              Showroom Antigny
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm text-white/70">
                <MapPin size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <span>Rue des Plantes<br />Route de Fontenay-le-Comte<br />85120 Antigny</span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Phone size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <a href="tel:0251502158" className="hover:text-white transition-colors">
                  02 51 50 21 58
                </a>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Clock size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <span>Lun–Ven : 9h–12h30 / 14h–17h</span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Phone size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <span>Secteur La Rochelle : 06 03 21 96 30</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/50">
            © {year} L.E.B Menuiserie. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/50">
              RGE — Qualibat DCF
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
