import { useEffect, useState } from 'react'
import Backgrounds from './components/Backgrounds.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ecossistema from './components/Ecossistema.jsx'
import Planos from './components/Planos.jsx'
import Expansao from './components/Expansao.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import Footer from './components/Footer.jsx'
import MobileApp from './mobile/MobileApp.jsx'
import LeadCapture from './screens/LeadCapture.jsx'
import useStageScale from './hooks/useStageScale.js'

const DESIGN_W = 1920
const DESIGN_H = 5455

// Abaixo desta largura (celular) troca o "palco" escalado pelo layout móvel.
// Tablet e desktop (>= 768px) continuam no palco escalado, como antes.
const MOBILE_BREAKPOINT = 767

// Rotas por hash (sem dependência de router). Cada hash renderiza uma tela.
const ROUTES = {
  '#/trocar-contador': { variant: 'contador' },
  '#/abrir-empresa': { variant: 'empresa' },
}

/** Observa a media query e retorna true em telas móveis. */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

/** Rota atual baseada em window.location.hash. */
function useHashRoute() {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''))

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}

function Landing() {
  const { canvasRef, scale } = useStageScale(DESIGN_W, DESIGN_H)

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
  const isMobile = useIsMobile()
  const route = useHashRoute()

  // Toda troca de rota começa no topo (evita cair no meio da nova tela).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  if (isMobile) {
    return <MobileApp />
  }

  const screen = ROUTES[route]
  if (screen) {
    return <LeadCapture variant={screen.variant} />
  }

  return <Landing />
}
