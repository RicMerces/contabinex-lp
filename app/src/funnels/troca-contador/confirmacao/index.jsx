import {
  DesktopStage,
  Responsive,
  Logo,
  Watermark,
  Title,
  Divider,
  PrimaryButton,
  AssistantBar,
  MobileShell,
  MTitle,
  MDivider,
  MSub,
  MPrimaryButton,
  MAssistantBar,
} from '../../../core/index.js'
import checkIcon from '../../../assets/icons/check.svg'

// Tela 12 — Confirmação (sucesso) do Funil B. Solicitação de troca recebida.
// CTA volta para a landing. Frame do Figma: 1920 x ~1200.
const DESIGN_W = 1920
const DESIGN_H = 1200
const HOME = '#/'

function CheckBadge({ size = 96 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={checkIcon} alt="" style={{ width: size * 0.5, height: size * 0.5, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
    </div>
  )
}

function Desktop() {
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <div className="abs" style={{ left: 170, top: 333 }}>
        <CheckBadge />
      </div>
      <Title left={170} top={460}>Solicitação recebida!</Title>
      <div className="abs" style={{ left: 170, top: 545, color: 'var(--gray)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal', whiteSpace: 'nowrap' }}>
        Recebemos sua solicitação de troca de contador. Nossa equipe já iniciou
        <br />
        a migração e entrará em contato em breve para dar sequência ao processo.
      </div>

      <Divider left={170} top={680} />

      <PrimaryButton left={170} top={760} width={360} href={HOME}>Voltar ao início</PrimaryButton>

      <AssistantBar dividerTop={960} barTop={1028} />
    </DesktopStage>
  )
}

function Mobile() {
  return (
    <MobileShell back={null} align="center">
      <div style={{ margin: '20px 0 24px' }}>
        <CheckBadge size={84} />
      </div>
      <MTitle>Solicitação recebida!</MTitle>
      <MDivider />
      <MSub>Recebemos sua solicitação de troca de contador. Nossa equipe já iniciou a migração e entrará em contato em breve para dar sequência ao processo.</MSub>
      <MPrimaryButton href={HOME} variant="teal">Voltar ao início</MPrimaryButton>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function Confirmacao() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
