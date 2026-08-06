import useIsMobile from './useIsMobile.js'

// Escolhe o layout desktop (palco escalado) ou móvel (coluna) conforme a
// viewport. Cada tela passa dois render-props / componentes.
export default function Responsive({ desktop, mobile }) {
  const isMobile = useIsMobile()
  const Cmp = isMobile ? mobile : desktop
  return <Cmp />
}
