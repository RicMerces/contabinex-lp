import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Escala um "palco" de tamanho fixo (designW x designH) para a largura da
// janela, mantendo exatamente o grid e as proporções do Figma. A altura do
// wrapper (.canvas) acompanha o palco escalado. Usado tanto pela landing
// (1920 x 5455) quanto pelas telas de captura de lead (1920 x 1700).
export default function useStageScale(designW, designH) {
  const canvasRef = useRef(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = canvasRef.current
    if (!el) return

    const update = () => setScale(el.clientWidth / designW)

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [designW])

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.height = `${designH * scale}px`
    }
  }, [scale, designH])

  return { canvasRef, scale }
}
