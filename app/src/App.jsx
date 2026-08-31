import { useEffect } from 'react'
import Backgrounds from './components/Backgrounds.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ecossistema from './components/Ecossistema.jsx'
import Planos from './components/Planos.jsx'
import Expansao from './components/Expansao.jsx'
import Blog from './components/Blog.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import Footer from './components/Footer.jsx'
import MobileApp from './mobile/MobileApp.jsx'
import useStageScale from './hooks/useStageScale.js'
import { useIsMobile, useHashRoute, FunnelStateProvider, normalizeHash } from './core/index.js'
import { matchRoute } from './routes.js'

const DESIGN_W = 1920
const DESIGN_H = 6147

function Landing() {
  const isMobile = useIsMobile()
  const { canvasRef, scale } = useStageScale(DESIGN_W, DESIGN_H)

  if (isMobile) return <MobileApp />

  return (
    <div className="canvas" ref={canvasRef}>
      <div className="stage" style={{ transform: `scale(${scale})` }}>
        <Backgrounds />
        <Header />
        <Hero />
        <Ecossistema />
        <Planos />
        <Expansao />
        <Blog />
        <CtaFinal />
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  const route = useHashRoute()

  // Reseta scroll ao entrar em funil (#/...) ou na landing limpa.
  // Não mexe em fragments in-page — a nav mobile/desktop só faz scroll.
  useEffect(() => {
    const h = normalizeHash(route)
    if (h && !h.startsWith('#/')) return
    window.scrollTo(0, 0)
  }, [route])

  const match = matchRoute(route)
  const content = match ? <match.Component {...(match.props || {})} /> : <Landing />

  return <FunnelStateProvider>{content}</FunnelStateProvider>
}
