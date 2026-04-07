import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation } from '@/app/components/Navigation'
import { Footer } from '@/app/components/Footer'
import { MobileStickyBar } from '@/app/components/MobileStickyBar'

const HomePage = lazy(() => import('@/app/pages/HomePage'))
const ServicePage = lazy(() => import('@/app/pages/ServicePage'))
const MenuiserieIndustriellePage = lazy(() => import('@/app/pages/MenuiserieIndustriellePage'))
const RecrutementPage = lazy(() => import('@/app/pages/RecrutementPage'))
const ContactPage = lazy(() => import('@/app/pages/ContactPage'))
const LoginPage = lazy(() => import('@/app/pages/LoginPage'))
const AdminPage = lazy(() => import('@/app/pages/AdminPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center text-[var(--foreground-muted)]">
      <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 'var(--header-total-height)' }} className="pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileStickyBar />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Pages fixes — déclarées AVANT /:slug pour ne pas être captées */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/menuiserie-industrielle" element={<Layout><MenuiserieIndustriellePage /></Layout>} />
          <Route path="/recrutement" element={<Layout><RecrutementPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

          {/* Pages de services — route dynamique */}
          <Route path="/:slug" element={<Layout><ServicePage /></Layout>} />

          {/* Pages admin sans layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/espace-admin" element={<AdminPage />} />

          {/* Fallback 404 */}
          <Route path="*" element={
            <Layout>
              <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 pt-28">
                <h1 className="font-display font-extrabold text-6xl text-[var(--primary)] mb-4">404</h1>
                <p className="text-[var(--foreground-muted)] text-lg mb-6">Page introuvable</p>
                <a href="/" className="btn-primary">Retour à l'accueil</a>
              </div>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
