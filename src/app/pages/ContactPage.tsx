import { useEffect, useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { ScrollReveal } from '@/app/components/ScrollReveal'
import { supabase, type ContactInsert } from '@/app/lib/supabase'
import { validateEmail, validatePhone, sanitizeInput } from '@/app/lib/utils'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const services = [
  'Fenêtres', 'Portes d\'entrée', 'Portails et clôtures', 'Baies coulissantes',
  'Pergolas / Carports', 'Portes de garage', 'Stores extérieurs', 'Stores intérieurs',
  'Volets', 'Moustiquaires', 'Menuiserie industrielle', 'Autre',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    adresse: '', ville: '', objet: '', service: '', message: '',
    honeypot: '', // anti-spam
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [state, setState] = useState<FormState>('idle')

  useEffect(() => {
    document.title = 'Contact — LEB Menuiserie | Devis gratuit Vendée'
    window.scrollTo(0, 0)
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nom.trim()) e.nom = 'Votre nom est requis'
    if (!form.email.trim()) e.email = 'Votre adresse email est requise'
    else if (!validateEmail(form.email)) e.email = 'Adresse email invalide'
    if (form.telephone && !validatePhone(form.telephone)) e.telephone = 'Numéro de téléphone invalide'
    if (!form.message.trim()) e.message = 'Votre message est requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honeypot) return // bot silencieux

    if (!validate()) return

    setState('submitting')

    const payload: ContactInsert = {
      nom: sanitizeInput(form.nom),
      prenom: sanitizeInput(form.prenom),
      email: sanitizeInput(form.email).toLowerCase(),
      telephone: sanitizeInput(form.telephone),
      adresse: sanitizeInput(form.adresse),
      ville: sanitizeInput(form.ville),
      message: sanitizeInput(form.message),
      service: form.service,
      objet: sanitizeInput(form.objet),
      source: 'website',
    }

    try {
      const { error } = await supabase.from('contacts').insert(payload)
      if (error) throw error
      setState('success')
      setForm({ nom: '', prenom: '', email: '', telephone: '', adresse: '', ville: '', objet: '', service: '', message: '', honeypot: '' })
    } catch {
      setState('error')
    }
  }

  const field = (name: keyof typeof form) => ({
    value: form[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [name]: e.target.value })),
  })

  return (
    <>
      {/* Hero */}
      <section className="pt-10 pb-12 bg-gradient-to-br from-[var(--background-alt)] to-white border-b border-[var(--border)]">
        <div className="container-custom fade-in">
          <span className="text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest">
            Nous joindre
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--foreground)] mt-2 mb-4">
            Contact
          </h1>
          <p className="text-[var(--foreground-muted)] text-lg max-w-xl">
            Remplissez le formulaire ci-dessous, nous vous contacterons dans les meilleurs délais.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Formulaire */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                {state === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 bg-green-50 rounded-2xl border border-green-100">
                    <CheckCircle size={52} className="text-green-500 mb-4" />
                    <h2 className="font-display font-bold text-2xl text-[var(--foreground)] mb-2">
                      Message envoyé !
                    </h2>
                    <p className="text-[var(--foreground-muted)]">
                      Nous avons bien reçu votre demande. Notre équipe vous contactera dans les meilleurs délais.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Honeypot */}
                    <input
                      type="text"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="hidden"
                      {...field('honeypot')}
                    />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label="Votre nom *" error={errors.nom}>
                        <input
                          type="text"
                          placeholder="Dupont"
                          className={inputCls(errors.nom)}
                          autoComplete="family-name"
                          {...field('nom')}
                        />
                      </FormField>
                      <FormField label="Votre prénom">
                        <input
                          type="text"
                          placeholder="Jean"
                          className={inputCls()}
                          autoComplete="given-name"
                          {...field('prenom')}
                        />
                      </FormField>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label="Votre adresse de messagerie *" error={errors.email}>
                        <input
                          type="email"
                          placeholder="jean.dupont@email.fr"
                          className={inputCls(errors.email)}
                          autoComplete="email"
                          {...field('email')}
                        />
                      </FormField>
                      <FormField label="Votre téléphone" error={errors.telephone}>
                        <input
                          type="tel"
                          placeholder="06 00 00 00 00"
                          className={inputCls(errors.telephone)}
                          autoComplete="tel"
                          {...field('telephone')}
                        />
                      </FormField>
                    </div>

                    <FormField label="Votre adresse">
                      <input
                        type="text"
                        placeholder="12 rue des Lilas"
                        className={inputCls()}
                        autoComplete="street-address"
                        {...field('adresse')}
                      />
                    </FormField>

                    <FormField label="Votre ville et code postal">
                      <input
                        type="text"
                        placeholder="Fontenay-le-Comte 85200"
                        className={inputCls()}
                        autoComplete="address-level1"
                        {...field('ville')}
                      />
                    </FormField>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label="Prestation concernée">
                        <select className={inputCls()} {...field('service')}>
                          <option value="">— Choisir un service —</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </FormField>
                      <FormField label="Objet">
                        <input
                          type="text"
                          placeholder="Demande de devis"
                          className={inputCls()}
                          {...field('objet')}
                        />
                      </FormField>
                    </div>

                    <FormField label="Votre message *" error={errors.message}>
                      <textarea
                        rows={5}
                        placeholder="Décrivez votre projet..."
                        className={inputCls(errors.message) + ' resize-none'}
                        {...field('message')}
                      />
                    </FormField>

                    {state === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg p-3">
                        <AlertCircle size={16} />
                        Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={state === 'submitting'}
                      className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60"
                    >
                      {state === 'submitting' ? 'Envoi en cours...' : (
                        <>
                          Envoyer ma demande <Send size={16} />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-[var(--foreground-muted)] text-center">
                      Vos données sont utilisées uniquement pour répondre à votre demande.
                    </p>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Info contact */}
            <aside className="space-y-6">
              <ScrollReveal delay={150}>
                <ContactCard
                  title="Showroom Fontenay-le-Comte"
                  items={[
                    { icon: <MapPin size={15} />, text: "67 rue de l'Innovation\nRoute de La Rochelle\n85200 Fontenay-le-Comte" },
                    { icon: <Phone size={15} />, text: '02 51 69 01 24', href: 'tel:0251690124' },
                    { icon: <Clock size={15} />, text: 'Lun–Ven : 9h–12h30 et 14h–17h' },
                  ]}
                />
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <ContactCard
                  title="Showroom Antigny"
                  items={[
                    { icon: <MapPin size={15} />, text: 'Rue des Plantes\nRoute de Fontenay-le-Comte\n85120 Antigny' },
                    { icon: <Phone size={15} />, text: '02 51 50 21 58', href: 'tel:0251502158' },
                    { icon: <Clock size={15} />, text: 'Lun–Ven : 9h–12h30 et 14h–17h' },
                  ]}
                />
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <div className="bg-[var(--primary-light)] rounded-xl p-5 border border-[var(--primary)]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={16} className="text-[var(--primary)]" />
                    <span className="font-display font-bold text-sm text-[var(--foreground)]">Email</span>
                  </div>
                  <a href="mailto:leb@lebmenuiserie.fr" className="text-[var(--primary)] text-sm font-medium hover:underline">
                    leb@lebmenuiserie.fr
                  </a>
                  <div className="mt-3 text-xs text-[var(--foreground-muted)]">
                    Secteur La Rochelle : <a href="tel:0603219630" className="hover:text-[var(--primary)]">06 03 21 96 30</a>
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

function inputCls(err?: string) {
  return `w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 ${
    err
      ? 'border-red-400 bg-red-50'
      : 'border-[var(--border)] bg-white hover:border-[var(--primary)]/50 focus:border-[var(--primary)]'
  }`
}

function FormField({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--foreground)]">{label}</label>
      {children}
      {error && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{error}</span>}
    </div>
  )
}

function ContactCard({ title, items }: { title: string; items: { icon: React.ReactNode; text: string; href?: string }[] }) {
  return (
    <div className="bg-[var(--background-alt)] rounded-xl p-5 border border-[var(--border)]">
      <h3 className="font-display font-bold text-base text-[var(--foreground)] mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-[var(--foreground-muted)]">
            <span className="text-[var(--primary)] flex-shrink-0 mt-0.5">{item.icon}</span>
            {item.href ? (
              <a href={item.href} className="hover:text-[var(--primary)] transition-colors whitespace-pre-line">
                {item.text}
              </a>
            ) : (
              <span className="whitespace-pre-line">{item.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
