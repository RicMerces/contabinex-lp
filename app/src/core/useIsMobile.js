import { useEffect, useState } from 'react'

// Abaixo desta largura (celular) as telas trocam o "palco" escalado (1920)
// pelo layout móvel nativo (coluna centralizada). Tablet/desktop (>= 768px)
// seguem no palco escalado. Mesmo breakpoint usado pela landing.
export const MOBILE_BREAKPOINT = 767

/** Retorna true quando a viewport é de celular (<= MOBILE_BREAKPOINT). */
export default function useIsMobile() {
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
