import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ChevronRight, CheckCircle2, Phone, ArrowRight,
  DoorOpen, Grid2x2, Fence, PanelRight, TreePine,
  Layers, Sun, SlidersHorizontal, Bug,
} from 'lucide-react'
import { ScrollReveal } from '@/app/components/ScrollReveal'
import { ImageWithFallback } from '@/app/components/ImageWithFallback'

interface ServiceData {
  slug: string
  title: string
  subtitle: string
  metaTitle: string
  metaDesc: string
  heroImage: string
  icon: React.ReactNode
  intro: string
  avantages: string[]
  prestations: string[]
  image2: string
}

const servicesData: ServiceData[] = [
  {
    slug: 'portes-entree',
    title: 'Portes d\'entrée',
    subtitle: 'Sécurité, esthétique et isolation',
    metaTitle: 'Portes d\'entrée sur-mesure — LEB Menuiserie Vendée',
    metaDesc: 'Portes d\'entrée sécurisées et esthétiques, sur-mesure en Vendée. PVC, aluminium, bois. Certifié RGE Qualibat.',
    heroImage: 'https://lebmenuiserie.com/wp-content/uploads/2024/10/1.jpg',
    icon: <DoorOpen size={32} />,
    intro: 'La porte d\'entrée est le premier élément de votre maison que vous et vos visiteurs apercevez. Chez LEB Menuiserie, nous vous proposons des portes d\'entrée alliant sécurité renforcée, isolation thermique et acoustique, et esthétique soignée — entièrement sur-mesure.',
    avantages: [
      'Isolation thermique performante — économies d\'énergie garanties',
      'Serrures multipoints certifiées A2P pour votre sécurité',
      'Large choix de matériaux : PVC, aluminium, bois',
      'Finitions personnalisées : couleurs RAL, vitrages décoratifs',
      'Pose par nos menuisiers-poseurs qualifiés',
    ],
    prestations: [
      'Porte d\'entrée PVC — chaleur et isolation',
      'Porte d\'entrée aluminium — robustesse et modernité',
      'Porte d\'entrée bois — authenticité et charme',
      'Porte blindée — sécurité maximale',
      'Porte avec vitrage décoratif',
      'Porte à galandage',
    ],
    image2: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6158-scaled.jpg',
  },
  {
    slug: 'fenetres',
    title: 'Fenêtres',
    subtitle: 'Confort thermique et luminosité',
    metaTitle: 'Fenêtres sur-mesure double et triple vitrage — LEB Menuiserie',
    metaDesc: 'Fenêtres PVC, aluminium et bois sur-mesure en Vendée. Double et triple vitrage, label RGE. Devis gratuit.',
    heroImage: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6158-scaled.jpg',
    icon: <Grid2x2 size={32} />,
    intro: 'Nos fenêtres haute performance allient isolation thermique et acoustique pour maximiser votre confort tout au long de l\'année. Certifiés RGE, nos travaux de remplacement de fenêtres sont éligibles aux aides de l\'État (MaPrimeRénov\').',
    avantages: [
      'Double et triple vitrage — isolation optimale',
      'Réduction significative de la facture énergétique',
      'Éligibles MaPrimeRénov\' et aides CEE',
      'Menuiseries aluminium, PVC ou bois selon vos goûts',
      'Pose étanche et finition soignée par nos équipes',
    ],
    prestations: [
      'Fenêtre à 2 vantaux',
      'Fenêtre oscillo-battante',
      'Fenêtre de toit',
      'Fenêtre PVC blanc ou couleur',
      'Fenêtre aluminium laqué',
      'Remplacement sans travaux (rénovation)',
    ],
    image2: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1446-scaled.jpg',
  },
  {
    slug: 'portails',
    title: 'Portails et clôtures',
    subtitle: 'Délimitez et sécurisez votre propriété',
    metaTitle: 'Portails et clôtures sur-mesure — LEB Menuiserie Vendée',
    metaDesc: 'Portails battants, coulissants et motorisés sur-mesure en Vendée. Aluminium, PVC, bois. Pose et motorisation.',
    heroImage: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1446-scaled.jpg',
    icon: <Fence size={32} />,
    intro: 'Portails, clôtures et portillons : LEB Menuiserie vous accompagne dans la sécurisation et l\'embellissement de votre propriété avec des solutions sur-mesure, motorisées ou manuelles, dans des matériaux durables.',
    avantages: [
      'Sur-mesure — s\'adapte à toutes les configurations',
      'Motorisation optionnelle avec télécommande',
      'Matériaux durables : aluminium, PVC, acier galvanisé',
      'Large choix de couleurs RAL et finitions',
      'Entretien minimal garanti',
    ],
    prestations: [
      'Portail battant 1 ou 2 vantaux',
      'Portail coulissant motorisé',
      'Portail aluminium sur-mesure',
      'Portillon assorti',
      'Clôture aluminium ou PVC',
      'Automatisation de portail existant',
    ],
    image2: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/2.jpg',
  },
  {
    slug: 'baies-coulissantes',
    title: 'Baies coulissantes',
    subtitle: 'Ouvrez votre intérieur sur l\'extérieur',
    metaTitle: 'Baies coulissantes sur-mesure — LEB Menuiserie Vendée',
    metaDesc: 'Baies coulissantes aluminium et PVC sur-mesure en Vendée. Grande hauteur, galandage, vitrage feuilleté. Devis gratuit.',
    heroImage: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/2.jpg',
    icon: <PanelRight size={32} />,
    intro: 'Les baies coulissantes LEB Menuiserie créent une continuité visuelle entre votre intérieur et votre extérieur. Conçues pour maximiser la luminosité tout en garantissant une excellente isolation, elles transforment un mur en véritable tableau vivant.',
    avantages: [
      'Grande luminosité naturelle — valorise vos espaces',
      'Isolation thermique et phonique renforcée',
      'Système à galandage possible — disparaît dans le mur',
      'Vitrages feuilletés sécurisés disponibles',
      'Mouvement silencieux et fluide sur roulettes alu',
    ],
    prestations: [
      'Baie coulissante 2 vantaux',
      'Baie coulissante 3 ou 4 vantaux',
      'Baie à galandage',
      'Baie panoramique grande hauteur',
      'Double vitrage énergie',
      'Baie avec volet roulant intégré',
    ],
    image2: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6151-scaled.jpg',
  },
  {
    slug: 'pergolas',
    title: 'Pergolas',
    subtitle: 'Profitez de votre extérieur toute l\'année',
    metaTitle: 'Pergolas bioclimatiques sur-mesure — LEB Menuiserie Vendée',
    metaDesc: 'Pergolas bioclimatiques et pergolas aluminium sur-mesure en Vendée. Lames orientables, éclairage LED. Offre -10% printemps.',
    heroImage: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6151-scaled.jpg',
    icon: <TreePine size={32} />,
    intro: 'La pergola bioclimatique LEB Menuiserie vous permet de profiter de votre terrasse par tous les temps. Ses lames orientables s\'adaptent aux conditions météorologiques pour créer un espace de vie extérieur confortable et esthétique, 12 mois sur 12.',
    avantages: [
      'Lames aluminium orientables — gestion soleil et pluie',
      'Structure aluminium robuste — traitement anti-corrosion',
      'Options LED, chauffage, brumisation et stores',
      'Éligible crédit d\'impôt selon conditions',
      'Pose sur mesure par nos poseurs certifiés',
    ],
    prestations: [
      'Pergola bioclimatique à lames orientables',
      'Pergola adossée à la maison',
      'Pergola autoportée',
      'Pergola avec toit fixe ou vitré',
      'Éclairage LED intégré',
      'Fermetures latérales stores ou vitrage',
    ],
    image2: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1681-scaled.jpg',
  },
  {
    slug: 'portes-garage',
    title: 'Portes de garage',
    subtitle: 'Accès pratique et sécurisé',
    metaTitle: 'Portes de garage sur-mesure motorisées — LEB Menuiserie Vendée',
    metaDesc: 'Portes de garage sectionnelles, basculantes et enroulables sur-mesure en Vendée. Motorisation, télécommande. Devis gratuit.',
    heroImage: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1681-scaled.jpg',
    icon: <Layers size={32} />,
    intro: 'La porte de garage est un élément essentiel de votre maison, pour la sécurité comme pour l\'esthétique. LEB Menuiserie vous propose un large choix de modèles — sectionnelles, basculantes, enroulables — avec ou sans motorisation, sur-mesure.',
    avantages: [
      'Motorisation silencieuse avec télécommande',
      'Isolation thermique renforcée — évite les ponts thermiques',
      'Sécurité anti-intrusion intégrée',
      'Grand choix de finitions : lisse, cannelé, bois, vitré',
      'Maintenance et SAV assurés par nos équipes',
    ],
    prestations: [
      'Porte de garage sectionnelle plafond',
      'Porte de garage basculante débordante',
      'Porte de garage enroulable',
      'Motorisation neuve ou sur porte existante',
      'Porte avec vitrage — apport lumineux',
      'Porte acier ou aluminium sur-mesure',
    ],
    image2: 'https://lebmenuiserie.com/wp-content/uploads/2024/10/1.jpg',
  },
  {
    slug: 'stores-exterieurs',
    title: 'Stores extérieurs',
    subtitle: 'Protection solaire et valorisation de façade',
    metaTitle: 'Stores extérieurs sur-mesure — LEB Menuiserie Vendée',
    metaDesc: 'Stores banne, coffre et verticaux sur-mesure en Vendée. Motorisation, toiles haute résistance UV. Devis gratuit.',
    heroImage: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6158-scaled.jpg',
    icon: <Sun size={32} />,
    intro: 'Les stores extérieurs LEB Menuiserie protègent efficacement vos intérieurs de la chaleur solaire en été, réduisant jusqu\'à 80% la montée en température. Motorisés ou manuels, ils se fondent harmonieusement dans l\'architecture de votre maison.',
    avantages: [
      'Réduction de la chaleur jusqu\'à 80% en été',
      'Toiles haute résistance aux UV et aux intempéries',
      'Motorisation avec détecteur de vent optionnel',
      'Large gamme de coloris et de textures',
      'Compatible avec domotique et commande vocale',
    ],
    prestations: [
      'Store banne à projection',
      'Store banne coffre intégral',
      'Store vertical extérieur',
      'Brise-soleil orientable',
      'Store à lamelles',
      'Store motorisé avec capteur solaire/vent',
    ],
    image2: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1446-scaled.jpg',
  },
  {
    slug: 'stores-interieurs',
    title: 'Stores intérieurs',
    subtitle: 'Habillage de fenêtres élégant et fonctionnel',
    metaTitle: 'Stores intérieurs sur-mesure — LEB Menuiserie Vendée',
    metaDesc: 'Stores vénitiens, enrouleurs et plissés sur-mesure en Vendée. Occultant, tamisant, jour-nuit. Devis gratuit.',
    heroImage: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6151-scaled.jpg',
    icon: <SlidersHorizontal size={32} />,
    intro: 'Les stores intérieurs LEB Menuiserie habillent vos fenêtres avec élégance tout en maîtrisant parfaitement la luminosité de chaque pièce. Sur-mesure, ils s\'adaptent à toutes les formes de fenêtres et à tous les styles d\'intérieur.',
    avantages: [
      'Contrôle précis de la luminosité',
      'Effet occultant, tamisant ou jour-nuit au choix',
      'Matières nobles : tissus, aluminium, bois naturel',
      'Compatible motorisation et domotique',
      'Installation propre et rapide par nos poseurs',
    ],
    prestations: [
      'Store enrouleur occultant ou tamisant',
      'Store vénitien aluminium ou bois',
      'Store plissé jour-nuit',
      'Store bateau à retours',
      'Store pour fenêtre de toit',
      'Store motorisé',
    ],
    image2: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/2.jpg',
  },
  {
    slug: 'moustiquaires',
    title: 'Moustiquaires',
    subtitle: 'Air frais sans les nuisances',
    metaTitle: 'Moustiquaires sur-mesure — LEB Menuiserie Vendée',
    metaDesc: 'Moustiquaires fixes, enroulables et plissées sur-mesure en Vendée. S\'adapte à toutes les menuiseries. Devis gratuit.',
    heroImage: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_1446-scaled.jpg',
    icon: <Bug size={32} />,
    intro: 'Profitez de l\'air frais estival sans les insectes. Les moustiquaires LEB Menuiserie sont fabriquées sur-mesure pour s\'adapter parfaitement à vos menuiseries existantes — fenêtres, baies coulissantes, portes-fenêtres — en préservant le design de votre logement.',
    avantages: [
      'Sur-mesure — s\'adapte à toutes les menuiseries existantes',
      'Discret — cadres fins en aluminium laqué',
      'Toile haute résistance — anti-déchirure',
      'Modèles enroulables, plissés ou fixes',
      'Pose rapide — sans perçage destructif possible',
    ],
    prestations: [
      'Moustiquaire fixe sur cadre',
      'Moustiquaire enroulable latérale',
      'Moustiquaire plissée',
      'Moustiquaire pour porte-fenêtre',
      'Moustiquaire pour baie coulissante',
      'Moustiquaire à clipser (sans perçage)',
    ],
    image2: 'https://lebmenuiserie.com/wp-content/uploads/2026/01/IMG_6158-scaled.jpg',
  },
]

export const servicesBySlug = Object.fromEntries(servicesData.map((s) => [s.slug, s]))

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? servicesBySlug[slug] : undefined

  useEffect(() => {
    if (service) {
      document.title = service.metaTitle
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', service.metaDesc)
    }
    window.scrollTo(0, 0)
  }, [service])

  if (!service) return <Navigate to="/" replace />

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full"
            loading="eager"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>
        <div className="container-custom relative z-10 fade-in">
          <nav className="flex items-center gap-2 text-white/60 text-xs font-exo mb-4" aria-label="Fil d'ariane">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <span className="text-white">{service.title}</span>
          </nav>
          <span className="inline-block text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest mb-2">
            {service.subtitle}
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            {service.title}
          </h1>
          <Link to="/contact" className="btn-primary">
            Demander un devis gratuit <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal direction="left">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] mb-5">
                  {service.icon}
                </div>
                <h2 className="font-display font-bold text-3xl text-[var(--foreground)] mb-5">
                  {service.title} sur-mesure en Vendée
                </h2>
                <p className="text-[var(--foreground-muted)] leading-relaxed mb-7 text-base">
                  {service.intro}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.avantages.map((av) => (
                    <li key={av} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                      <CheckCircle2 size={17} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      {av}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">
                    Devis gratuit <ArrowRight size={16} />
                  </Link>
                  <a href="tel:0251690124" className="btn-secondary">
                    <Phone size={16} /> 02 51 69 01 24
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="img-zoom rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src={service.image2}
                  alt={`${service.title} LEB Menuiserie`}
                  className="w-full h-80 lg:h-[440px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Nos prestations */}
      <section className="section-padding bg-[var(--background-alt)]">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-[var(--primary)] font-exo font-semibold text-sm uppercase tracking-widest">
                Nos solutions
              </span>
              <h2 className="font-display font-bold text-3xl text-[var(--foreground)] mt-2">
                Ce que nous proposons
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.prestations.map((p, i) => (
              <ScrollReveal key={p} delay={i * 60}>
                <div className="bg-white rounded-xl p-5 border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)] transition-all flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] flex-shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-medium text-[var(--foreground)]">{p}</span>
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
              Un projet {service.title.toLowerCase()} ?
            </h2>
            <p className="text-white/75 max-w-lg mx-auto mb-8">
              Nos conseillers sont à votre disposition pour étudier votre projet et vous
              proposer un devis gratuit, sans engagement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-base py-3.5 px-8">
                Demander un devis gratuit <ChevronRight size={18} />
              </Link>
              <a href="tel:0251690124" className="btn-secondary text-base py-3.5 px-8 border-white/40 text-white hover:bg-white hover:text-[var(--accent)]">
                <Phone size={18} /> 02 51 69 01 24
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
