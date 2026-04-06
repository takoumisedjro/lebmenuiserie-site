import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MessageSquare, Users, LogOut, RefreshCw,
  CheckCircle2, Eye, Mail, Download, AlertCircle,
  XCircle, Clock,
} from 'lucide-react'
import { supabase } from '@/app/lib/supabase'

type Contact = {
  id: string
  nom: string
  prenom?: string
  email: string
  telephone?: string
  adresse?: string
  ville?: string
  message: string
  service?: string
  objet?: string
  status: string
  created_at: string
}

type Newsletter = {
  id: string
  email: string
  type: string
  active: boolean
  created_at: string
}

type Tab = 'messages' | 'newsletter'

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-red-100 text-red-700',
  read: 'bg-orange-100 text-orange-700',
  replied: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Nouveau',
  read: 'Lu',
  replied: 'Répondu',
  done: 'Traité',
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('messages')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [newsletter, setNewsletter] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Contact | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Administration — LEB Menuiserie'
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { navigate('/login'); return }
    fetchData()
  }

  const fetchData = async () => {
    setLoading(true)
    const [c, n] = await Promise.all([
      supabase.from('contacts').select('*').order('created_at', { ascending: false }),
      supabase.from('newsletter').select('*').order('created_at', { ascending: false }),
    ])
    if (c.data) setContacts(c.data)
    if (n.data) setNewsletter(n.data)
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('contacts').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
    setContacts((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c)))
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const exportCSV = (data: Record<string, unknown>[], filename: string) => {
    if (!data.length) return
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map((r) => Object.values(r).map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
    const csv = [headers, ...rows].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = filename
    a.click()
  }

  const newCount = contacts.filter((c) => c.status === 'new').length

  return (
    <div className="min-h-screen bg-[var(--background-alt)]">
      {/* Header */}
      <div className="bg-[var(--accent)] text-white sticky top-0 z-30 shadow-lg">
        <div className="container-custom flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img
              src="https://lebmenuiserie.com/wp-content/uploads/2019/01/logo_LEB.png"
              alt="LEB Menuiserie"
              className="h-8 brightness-0 invert"
            />
            <span className="font-display font-bold text-sm hidden sm:block">Administration</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              aria-label="Rafraîchir"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
            >
              <LogOut size={14} /> Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <TabButton
            active={tab === 'messages'}
            onClick={() => setTab('messages')}
            icon={<MessageSquare size={16} />}
            label="Messages / Devis"
            badge={newCount || undefined}
          />
          <TabButton
            active={tab === 'newsletter'}
            onClick={() => setTab('newsletter')}
            icon={<Users size={16} />}
            label="Newsletter"
            badge={newsletter.filter((n) => n.active).length || undefined}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-[var(--foreground-muted)]">
            <RefreshCw size={24} className="animate-spin mr-3" /> Chargement...
          </div>
        ) : tab === 'messages' ? (
          <MessagesTab contacts={contacts} selected={selected} setSelected={setSelected} updateStatus={updateStatus} exportCSV={exportCSV} />
        ) : (
          <NewsletterTab newsletter={newsletter} exportCSV={exportCSV} />
        )}
      </div>
    </div>
  )
}

function TabButton({ active, onClick, icon, label, badge }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; label: string; badge?: number
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-exo font-semibold transition-colors ${
        active
          ? 'bg-[var(--primary)] text-white shadow-[var(--shadow-primary)]'
          : 'bg-white text-[var(--foreground-muted)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] border border-[var(--border)]'
      }`}
    >
      {icon}
      {label}
      {badge ? (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-red-500 text-white'}`}>
          {badge}
        </span>
      ) : null}
    </button>
  )
}

function MessagesTab({ contacts, selected, setSelected, updateStatus, exportCSV }: {
  contacts: Contact[]
  selected: Contact | null
  setSelected: (c: Contact | null) => void
  updateStatus: (id: string, status: string) => void
  exportCSV: (data: Record<string, unknown>[], filename: string) => void
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Liste */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <h2 className="font-display font-bold text-base text-[var(--foreground)]">
            {contacts.length} message{contacts.length > 1 ? 's' : ''}
          </h2>
          <button
            onClick={() => exportCSV(contacts as unknown as Record<string, unknown>[], 'contacts-leb.csv')}
            className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
        <div className="divide-y divide-[var(--border)] max-h-[600px] overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-[var(--foreground-muted)]">Aucun message</div>
          ) : contacts.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className={`p-4 cursor-pointer hover:bg-[var(--background-alt)] transition-colors ${selected?.id === c.id ? 'bg-[var(--primary-light)]' : ''}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="font-medium text-sm text-[var(--foreground)]">
                  {c.nom} {c.prenom}
                </div>
                <span className={`text-xs font-exo font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[c.status] || 'bg-gray-100 text-gray-600'}`}>
                  {STATUS_LABELS[c.status] || c.status}
                </span>
              </div>
              <div className="text-xs text-[var(--foreground-muted)] truncate">{c.message}</div>
              <div className="text-xs text-[var(--foreground-light)] mt-1">
                {new Date(c.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                {c.service && ` • ${c.service}`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Détail */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
        {!selected ? (
          <div className="flex flex-col items-center justify-center h-48 text-[var(--foreground-muted)] text-sm text-center">
            <MessageSquare size={32} className="mb-3 opacity-30" />
            Sélectionnez un message pour le voir
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-display font-bold text-base">{selected.nom} {selected.prenom}</div>
                <div className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  {new Date(selected.created_at).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
                </div>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Fermer" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
                <XCircle size={18} />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              {[
                { label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                { label: 'Téléphone', value: selected.telephone, href: selected.telephone ? `tel:${selected.telephone}` : undefined },
                { label: 'Adresse', value: selected.adresse },
                { label: 'Ville', value: selected.ville },
                { label: 'Prestation', value: selected.service },
                { label: 'Objet', value: selected.objet },
              ].filter((r) => r.value).map((row) => (
                <div key={row.label} className="flex gap-2">
                  <span className="text-xs font-medium text-[var(--foreground-muted)] w-20 flex-shrink-0 mt-0.5">{row.label}</span>
                  {row.href ? (
                    <a href={row.href} className="text-[var(--primary)] hover:underline break-all">{row.value}</a>
                  ) : (
                    <span className="text-[var(--foreground)]">{row.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[var(--background-alt)] rounded-lg p-3 text-sm text-[var(--foreground)] whitespace-pre-wrap">
              {selected.message}
            </div>

            {/* Actions statut */}
            <div>
              <div className="text-xs font-medium text-[var(--foreground-muted)] mb-2">Changer le statut</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => updateStatus(selected.id, key)}
                    className={`text-xs py-1.5 px-2 rounded-lg border font-exo font-medium transition-colors ${
                      selected.status === key
                        ? STATUS_COLORS[key] + ' border-transparent'
                        : 'border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                    }`}
                  >
                    {key === 'new' && <Clock size={11} className="inline mr-1" />}
                    {key === 'read' && <Eye size={11} className="inline mr-1" />}
                    {key === 'replied' && <Mail size={11} className="inline mr-1" />}
                    {key === 'done' && <CheckCircle2 size={11} className="inline mr-1" />}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={`mailto:${selected.email}?subject=Re: ${selected.objet || 'Votre demande LEB Menuiserie'}`}
              className="btn-primary w-full justify-center text-sm py-2.5"
            >
              <Mail size={15} /> Répondre par email
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

function NewsletterTab({ newsletter, exportCSV }: {
  newsletter: Newsletter[]
  exportCSV: (data: Record<string, unknown>[], filename: string) => void
}) {
  const active = newsletter.filter((n) => n.active)
  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <h2 className="font-display font-bold text-base">
          {active.length} abonné{active.length > 1 ? 's' : ''} actif{active.length > 1 ? 's' : ''}
        </h2>
        <button
          onClick={() => exportCSV(newsletter as unknown as Record<string, unknown>[], 'newsletter-leb.csv')}
          className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>
      {newsletter.length === 0 ? (
        <div className="p-8 text-center text-[var(--foreground-muted)]">Aucun abonné</div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-[var(--background-alt)] text-xs font-exo font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {newsletter.map((n) => (
              <tr key={n.id} className="hover:bg-[var(--background-alt)] transition-colors">
                <td className="px-4 py-3 text-[var(--foreground)]">{n.email}</td>
                <td className="px-4 py-3 text-[var(--foreground-muted)] capitalize">{n.type}</td>
                <td className="px-4 py-3 text-[var(--foreground-muted)]">
                  {new Date(n.created_at).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-3">
                  {n.active ? (
                    <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <CheckCircle2 size={11} /> Actif
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <AlertCircle size={11} /> Inactif
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
