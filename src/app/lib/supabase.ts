import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ContactInsert = {
  nom: string
  prenom?: string
  email: string
  telephone?: string
  adresse?: string
  ville?: string
  message: string
  service?: string
  objet?: string
  source?: string
}
