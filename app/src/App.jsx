import { useEffect } from 'react'
import Backgrounds from './components/Backgrounds.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ecossistema from './components/Ecossistema.jsx'
import Planos from './components/Planos.jsx'
import Expansao from './components/Expansao.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import Footer from './components/Footer.jsx'
import MobileApp from './mobile/MobileApp.jsx'
import useStageScale from './hooks/useStageScale.js'
import { useIsMobile, useHashRoute, FunnelStateProvider } from './core/index.js'
import { matchRoute } from './routes.js'

const DESIGN_W = 1920
const DESIGN_H = 5455

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
        <CtaFinal />
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  const route = useHashRoute()

  // Toda troca de rota começa no topo (evita cair no meio da nova tela).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  const match = matchRoute(route)
  const content = match ? <match.Component {...(match.props || {})} /> : <Landing />

  return <FunnelStateProvider>{content}</FunnelStateProvider>
}
