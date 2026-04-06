-- ═══════════════════════════════════════════════════
-- LEB Menuiserie — Schéma Supabase
-- À exécuter dans l'éditeur SQL Supabase
-- ═══════════════════════════════════════════════════

-- ── CONTACTS / DEMANDES DE DEVIS ────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom         TEXT NOT NULL,
  prenom      TEXT,
  email       TEXT NOT NULL,
  telephone   TEXT,
  adresse     TEXT,
  ville       TEXT,
  message     TEXT NOT NULL,
  service     TEXT,
  objet       TEXT,
  status      TEXT NOT NULL DEFAULT 'new',  -- new / read / replied / done
  source      TEXT DEFAULT 'website',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── NEWSLETTER ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  type        TEXT DEFAULT 'particulier',
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── SERVICES (gestion contenu admin) ────────────────
CREATE TABLE IF NOT EXISTS services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom         TEXT NOT NULL,
  categorie   TEXT,
  description TEXT,
  image       TEXT,
  ordre       INTEGER DEFAULT 0,
  actif       BOOLEAN DEFAULT true
);

-- ── RÉALISATIONS ────────────────────────────────────
CREATE TABLE IF NOT EXISTS realisations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre       TEXT NOT NULL,
  categorie   TEXT,
  description TEXT,
  images      TEXT[],
  date        DATE,
  actif       BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── ROW LEVEL SECURITY ──────────────────────────────
ALTER TABLE contacts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter  ENABLE ROW LEVEL SECURITY;
ALTER TABLE services    ENABLE ROW LEVEL SECURITY;
ALTER TABLE realisations ENABLE ROW LEVEL SECURITY;

-- Contacts : insert public, lecture admin
CREATE POLICY "Public insert contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin select contacts"
  ON contacts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update contacts"
  ON contacts FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Newsletter : insert public
CREATE POLICY "Public insert newsletter"
  ON newsletter FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin select newsletter"
  ON newsletter FOR SELECT
  USING (auth.role() = 'authenticated');

-- Services : lecture publique
CREATE POLICY "Public select services"
  ON services FOR SELECT
  USING (actif = true);

CREATE POLICY "Admin all services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');

-- Réalisations : lecture publique
CREATE POLICY "Public select realisations"
  ON realisations FOR SELECT
  USING (actif = true);

CREATE POLICY "Admin all realisations"
  ON realisations FOR ALL
  USING (auth.role() = 'authenticated');

-- ── STORAGE BUCKET ──────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- ── TRIGGER updated_at ──────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
