// Faixas de fundo posicionadas exatamente como no Figma (coordenadas globais)
export default function Backgrounds() {
  return (
    <>
      {/* Faixa cinza — seção Ecossistema */}
      <div className="abs" style={{ left: 0, top: 1021, width: 1920, height: 899, background: 'var(--bg-gray)' }} />
      {/* Faixa cinza — seção Expansão Premium */}
      <div className="abs" style={{ left: 0, top: 2794, width: 1920, height: 957, background: 'var(--bg-gray)' }} />
      {/* Faixa verde-água — CTA final */}
      <div className="abs" style={{ left: 0, top: 3849, width: 1920, height: 622, background: 'var(--teal)' }} />
      {/* Faixa azul — rodapé */}
      <div className="abs" style={{ left: 0, top: 4471, width: 1920, height: 984, background: 'var(--navy)' }} />
    </>
  )
}
