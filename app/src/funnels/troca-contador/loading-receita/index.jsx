import { useEffect } from 'react'
import {
  DesktopStage,
  Responsive,
  navigate,
  Logo,
  Watermark,
  Title,
  Divider,
  MobileShell,
  MTitle,
} from '../../../core/index.js'

// Tela 08 — Loading Receita Federal. Estado de espera enquanto consulta a RF.
// Auto-avança para a confirmação da troca após ~2.5s. Frame do Figma: 1920 x ~1420.
const DESIGN_W = 1920
const DESIGN_H = 1420
const NEXT = '#/trocar-contador/confirmar-troca'
const CENTER = DESIGN_W / 2

const SPINNER_CSS = `@keyframes tc-spin { to { transform: rotate(360deg) } }`

function useAutoAdvance() {
  useEffect(() => {
    const t = setTimeout(() => navigate(NEXT), 2500)
    return () => clearTimeout(t)
  }, [])
}

function Spinner({ size = 64, thickness = 6 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${thickness}px solid var(--teal-light)`,
        borderTopColor: 'var(--teal)',
        animation: 'tc-spin 0.9s linear infinite',
      }}
    />
  )
}

function Desktop() {
  useAutoAdvance()
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <style>{SPINNER_CSS}</style>
      <Logo />
      <Watermark />
      <Title left={166} top={335}>Troca de Contador</Title>
      <div
        className="abs"
        style={{ left: 166, top: 413, color: 'var(--gray)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal', whiteSpace: 'nowrap' }}
      >
        Para iniciarmos o processo de migração da sua escrita contábil,
        <br />
        precisamos localizar sua empresa na Receita Federal.
      </div>

      <div className="abs" style={{ left: CENTER, top: 646, transform: 'translateX(-50%)' }}>
        <Spinner />
      </div>

      <Divider left={CENTER - 160} top={753} />

      <div
        className="abs"
        style={{ left: CENTER, top: 791, transform: 'translateX(-50%)', color: 'var(--gray)', fontWeight: 600, fontSize: 40, letterSpacing: '-1.2px', textAlign: 'center', whiteSpace: 'nowrap', lineHeight: '50px' }}
      >
        <p>Conectando à Receita Federal</p>
        <p>e validando dados cadastrais...</p>
        <p style={{ color: 'var(--teal)', fontWeight: 800 }}>Por favor, não feche esta página.</p>
      </div>

      <Divider left={CENTER - 160} top={985} />

      <Divider left={317} top={1177} width={1286} />
      <div className="abs" style={{ left: 677, top: 1245, width: 566, height: 75, background: 'var(--teal-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--gray)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', whiteSpace: 'nowrap' }}>
          Clique aqui para falar com um assistente
        </span>
      </div>
    </DesktopStage>
  )
}

function Mobile() {
  useAutoAdvance()
  return (
    <MobileShell back={null} align="center">
      <style>{SPINNER_CSS}</style>
      <MTitle>Troca de Contador</MTitle>
      <div style={{ margin: '48px 0 28px' }}>
        <Spinner size={56} thickness={5} />
      </div>
      <div style={{ width: 120, height: 3, background: 'var(--teal)', margin: '0 auto 24px', borderRadius: 2 }} />
      <p style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 22, lineHeight: 1.35, letterSpacing: '-0.5px' }}>
        Conectando à Receita Federal e validando dados cadastrais...
      </p>
      <p style={{ color: 'var(--teal)', fontWeight: 800, fontSize: 22, marginTop: 14, letterSpacing: '-0.5px' }}>
        Por favor, não feche esta página.
      </p>
    </MobileShell>
  )
}

export default function LoadingReceita() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
