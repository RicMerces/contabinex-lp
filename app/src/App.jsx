import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Backgrounds from './components/Backgrounds.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ecossistema from './components/Ecossistema.jsx'
import Planos from './components/Planos.jsx'
import Expansao from './components/Expansao.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import Footer from './components/Footer.jsx'
import MobileApp from './mobile/MobileApp.jsx'

const DESIGN_W = 1920
const DESIGN_H = 5455

// Abaixo desta largura (celular) troca o "palco" escalado pelo layout móvel.
// Tablet e desktop (>= 768px) continuam no palco escalado, como antes.
const MOBILE_BREAKPOINT = 767

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

/**
 * Escala o "palco" de 1920px para a largura da janela, mantendo
 * exatamente o grid, as proporções e o espaçamento do Figma.
 */
function useStageScale() {
  const canvasRef = useRef(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = canvasRef.current
    if (!el) return

    const update = () => {
      const w = el.clientWidth
      setScale(w / DESIGN_W)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return { canvasRef, scale }
}

export default function App() {
  const isMobile = useIsMobile()
  const { canvasRef, scale } = useStageScale()

  // Ajusta a altura do wrapper para acompanhar o palco escalado
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.height = `${DESIGN_H * scale}px`
    }
  }, [scale, canvasRef])

  if (isMobile) {
    return <MobileApp />
  }

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
