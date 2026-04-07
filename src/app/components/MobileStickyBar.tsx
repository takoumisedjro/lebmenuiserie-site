import { Link } from 'react-router-dom'
import { Phone, FileText } from 'lucide-react'

export function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div
        className="grid grid-cols-2 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
        style={{
          background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
        }}
      >
        <a
          href="tel:0251690124"
          className="flex items-center justify-center gap-2 py-4 text-white font-exo font-semibold text-sm uppercase tracking-wider border-r border-white/20 active:bg-white/10 transition-colors"
        >
          <Phone size={18} />
          Appeler
        </a>
        <Link
          to="/contact"
          className="flex items-center justify-center gap-2 py-4 text-white font-exo font-semibold text-sm uppercase tracking-wider active:bg-white/10 transition-colors"
        >
          <FileText size={18} />
          Devis gratuit
        </Link>
      </div>
    </div>
  )
}
