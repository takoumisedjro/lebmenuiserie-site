import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronRight } from 'lucide-react'
import { cn } from '@/app/lib/utils'

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'La menuiserie industrielle', to: '/menuiserie-industrielle' },
  { label: 'Recrutement', to: '/recrutement' },
  { label: 'Contact', to: '/contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/92 backdrop-blur-lg shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
            : 'bg-white/95'
        )}
      >
        <div className="container-custom flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="LEB Menuiserie — Accueil">
            <img
              src="https://lebmenuiserie.com/wp-content/uploads/2019/01/logo_LEB.png"
              alt="LEB Menuiserie"
              className="h-10 lg:h-12 w-auto object-contain"
              loading="eager"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'nav-link-underline font-exo font-medium text-sm uppercase tracking-widest transition-colors duration-200',
                  pathname === link.to
                    ? 'text-[var(--primary)] active'
                    : 'text-[var(--foreground)] hover:text-[var(--primary)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:0251690124"
              className="flex items-center gap-2 text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors"
            >
              <Phone size={16} />
              <span className="font-exo">02 51 69 01 24</span>
            </a>
            <Link to="/contact" className="btn-primary text-sm py-2.5 px-5">
              Devis gratuit
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            className="lg:hidden p-2 text-[var(--foreground)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl flex flex-col transition-transform duration-300',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Header drawer */}
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <img
              src="https://lebmenuiserie.com/wp-content/uploads/2019/01/logo_LEB.png"
              alt="LEB Menuiserie"
              className="h-9 w-auto"
            />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
              className="p-1.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col p-6 gap-2 flex-1" aria-label="Navigation mobile">
            {links.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'py-3 px-4 rounded-lg font-exo font-medium text-sm uppercase tracking-wider transition-colors',
                  pathname === link.to
                    ? 'bg-[var(--primary-light)] text-[var(--primary)]'
                    : 'text-[var(--foreground)] hover:bg-[var(--background-alt)]',
                  `stagger-${i + 1}`
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact mobile */}
          <div className="p-6 border-t border-[var(--border)] space-y-3">
            <a
              href="tel:0251690124"
              className="flex items-center gap-3 p-3 rounded-lg bg-[var(--background-alt)] text-[var(--foreground)]"
            >
              <Phone size={18} className="text-[var(--primary)]" />
              <div>
                <div className="text-xs text-[var(--foreground-muted)]">Fontenay-le-Comte</div>
                <div className="font-medium text-sm">02 51 69 01 24</div>
              </div>
            </a>
            <Link to="/contact" className="btn-primary w-full justify-center">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
