# Livraison — LEB Menuiserie
Généré le 2026-04-07 par Gandji Studio

## Résumé
- **Client** : L.E.B Menuiserie — Installateur Conseil depuis 1973
- **Site de démo** : lebmenuiserie.netlify.app *(à configurer après déploiement)*
- **Admin** : /espace-admin
- **Stack** : React 18 + TypeScript + Vite 5 + Tailwind CSS v4 + Supabase + Netlify

---

## Pages créées

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | `HomePage.tsx` | Accueil : Hero, stats, services, promo pergola, à propos, showrooms, partenaires, CTA |
| `/menuiserie-industrielle` | `MenuiserieIndustriellePage.tsx` | Offre pro, galerie réalisations |
| `/recrutement` | `RecrutementPage.tsx` | Offre menuisier-poseur H/F |
| `/contact` | `ContactPage.tsx` | Formulaire devis → Supabase, infos showrooms |
| `/login` | `LoginPage.tsx` | Authentification Supabase Auth |
| `/espace-admin` | `AdminPage.tsx` | Dashboard messages/devis + newsletter |

---

## Supabase — Tables créées

Exécuter `supabase/schema.sql` dans l'éditeur SQL Supabase.

| Table | Description |
|-------|-------------|
| `contacts` | Formulaires de contact / demandes de devis |
| `newsletter` | Abonnés newsletter |
| `services` | Gestion des prestations (admin) |
| `realisations` | Galerie de réalisations (admin) |

**Bucket Storage** : `images` (public)

---

## Variables d'environnement requises

```bash
# Netlify → Site settings → Environment variables
VITE_SUPABASE_URL=https://XXXX.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_SITE_URL=https://lebmenuiserie.com
```

**GitHub Secrets** (pour CI/CD) :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL`
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

---

## Déploiement Netlify (drag & drop immédiat)

```bash
npm run build
# Glisser le dossier dist/ sur netlify.com/drop
```

---

## Pour mettre en ligne définitivement

1. **Supabase** : Créer un projet → exécuter `supabase/schema.sql`
2. **Supabase Auth** : Créer un compte admin pour le client
3. **Netlify** : Déposer `dist/` → configurer les variables d'environnement
4. **DNS** : Connecter le domaine `lebmenuiserie.com` dans Netlify (Site settings → Domain management)
5. **GitHub** : `gh repo create gandji-studio/lebmenuiserie-site --private --source=. --push`
6. Redéployer avec le vrai domaine dans `VITE_SITE_URL`

---

## Fonctionnalités actives

- [x] Formulaire de contact → Supabase (avec honeypot anti-spam)
- [x] Dashboard admin protégé (Supabase Auth)
- [x] Mobile sticky bar (Appeler / Devis)
- [x] Animations scroll reveal (IntersectionObserver)
- [x] Navigation sticky avec blur
- [x] Code splitting React Router (lazy loading)
- [x] SEO : meta tags, JSON-LD LocalBusiness
- [x] Headers de sécurité Netlify
- [x] RLS Supabase activée
- [x] Build < 300KB (hors Supabase)
- [ ] Newsletter (table prête, formulaire à ajouter)
- [ ] E-commerce (non applicable — artisan de services)

---

## Identité visuelle extraite du site original

| Variable | Valeur |
|----------|--------|
| `--primary` | `#02aed6` (cyan LEB) |
| `--secondary` | `#0037c9` (bleu) |
| `--accent` | `#282b2d` (dark) |
| Typographie | Raleway + Exo + Lato |
| Certifications | RGE, Qualibat DCF |
| Partenaires | La Toulousaine, Bubendorf, Janneau, Harol, Belm |

---

*Développé par Gandji Studio — 2026*
