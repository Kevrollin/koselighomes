import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Header, WaFab } from './ui'
import { About, Contact, Experience, Home, NotFound, StayDetail, Stays } from './pages'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 60)
    else scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded focus:bg-ivory focus:px-4 focus:py-2">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/stays/:slug" element={<StayDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WaFab />
    </>
  )
}
