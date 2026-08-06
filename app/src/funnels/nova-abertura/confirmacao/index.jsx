import {
  DesktopStage,
  Responsive,
  Logo,
  Watermark,
  MobileShell,
} from '../../../core/index.js'
import checkWhite from '../../../assets/icons/check-white.svg'

// Tela 11 — Confirmação (Funil A). Tela de sucesso após a coleta de dados.
// (O pagamento é externo; aqui apenas confirmamos o recebimento.) Frame 1920 x 1700.
const DESIGN_W = 1920
const DESIGN_H = 1700
const HOME = '#/'

const HEADING = 'Cadastro concluído com sucesso!'
const BODY =
  'Recebemos os seus dados. Nossa equipe já está cuidando de tudo e, em breve, entraremos em contato para finalizar a abertura da sua empresa.'

/** Selo de sucesso: círculo verde-água com um "check" branco. */
function SuccessBadge({ size = 120 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(98,171,178,0.35)' }}>
      <img src={checkWhite} alt="" style={{ width: size * 0.5, height: size * 0.5 }} />
    </div>
  )
}

function Desktop() {
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <div className="abs" style={{ left: 460, top: 540, width: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, textAlign: 'center' }}>
        <SuccessBadge />
        <h1 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 48, letterSpacing: '-0.96px', lineHeight: 'normal' }}>{HEADING}</h1>
        <p style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal', maxWidth: 820 }}>{BODY}</p>
        <a className="box-cta" href={HOME} style={{ background: 'var(--teal)', color: 'var(--white)', fontWeight: 600, fontSize: 24, letterSpacing: '-0.72px', padding: '20px 40px', borderRadius: 40, display: 'inline-flex' }}>
          Voltar para o início
        </a>
      </div>
    </DesktopStage>
  )
}

function Mobile() {
  return (
    <MobileShell back={HOME} align="center">
      <div style={{ marginTop: 24 }}>
        <SuccessBadge size={96} />
      </div>
      <h1 className="wz-title" style={{ marginTop: 24 }}>{HEADING}</h1>
      <p className="wz-sub" style={{ marginTop: 16 }}>{BODY}</p>
      <div className="wz-actions">
        <a className="wz-btn wz-btn--teal" href={HOME}>Voltar para o início</a>
      </div>
    </MobileShell>
  )
}

export default function Confirmacao() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
