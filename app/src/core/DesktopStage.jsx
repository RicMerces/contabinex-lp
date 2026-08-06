import useStageScale from '../hooks/useStageScale.js'

// Palco escalado: renderiza um frame fixo (designW x designH, coordenadas
// idênticas ao Figma) e o escala para a largura da janela. Todas as telas
// desktop usam este wrapper; os filhos são posicionados de forma absoluta
// (classe .abs) com as coordenadas do Figma.
export default function DesktopStage({ designW, designH, children, style }) {
  const { canvasRef, scale } = useStageScale(designW, designH)

  return (
    <div className="canvas" ref={canvasRef}>
      <div
        className="stage"
        style={{ transform: `scale(${scale})`, width: designW, height: designH, ...style }}
      >
        {children}
      </div>
    </div>
  )
}
