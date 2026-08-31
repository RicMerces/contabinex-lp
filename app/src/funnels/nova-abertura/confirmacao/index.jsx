import {
  DesktopStage,
  Responsive,
  Logo,
  Watermark,
  Title,
  Divider,
  SectionHeading,
  SectionSub,
  FormColumn,
  FlowSteps,
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MSteps,
  MPrimaryButton,
} from '../../../core/index.js'
import checkWhite from '../../../assets/icons/check-white.svg'

// Tela 11 — Confirmação: Abertura de Empresa (Funil A).
// Compartilhada pelos três planos (MEI, Simples Nacional e Classes).
// Os documentos são solicitados depois, já dentro da plataforma.
const DESIGN_W = 1920
const DESIGN_H = 1600
const HOME = '#/'
// TODO: o painel do cliente ainda não existe neste app — quando a URL for
// definida, trocar aqui (hoje o CTA volta para a landing).
const PAINEL = '#/'

const HEADING = 'Sua Jornada Começou!'
const BODY = 'Parabéns por dar o primeiro passo para formalizar o seu negócio com a CONTABINEX.'
const PASSOS = [
  'Nossa equipe técnica revisará os dados enviados para garantir que tudo esteja em conformidade com as regras da Receita Federal.',
  'Entraremos em contato via WhatsApp ou E-mail em até 48 horas úteis para os próximos passos da abertura.',
  'Você receberá acesso ao nosso painel de controle para acompanhar o status do seu CNPJ em tempo real.',
]

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
      <div className="abs" style={{ left: 169, top: 311 }}>
        <SuccessBadge />
      </div>
      <Title top={470}>{HEADING}</Title>
      <SectionSub left={169} top={550} width={1100}>{BODY}</SectionSub>
      <Divider left={169} top={640} />
      <SectionHeading left={169} top={676}>O que acontece agora?</SectionHeading>

      <FormColumn top={760} width={1100} gap={40}>
        <FlowSteps items={PASSOS} />
        <div style={{ display: 'flex', gap: 24 }}>
          <a className="box-cta" href={HOME} style={{ background: 'var(--teal)', color: 'var(--white)', fontWeight: 600, fontSize: 22, padding: '18px 36px', borderRadius: 40, display: 'inline-flex' }}>
            Voltar ao Início
          </a>
          <a className="box-cta" href={PAINEL} style={{ background: 'var(--white)', border: '2px solid var(--teal)', color: 'var(--teal)', fontWeight: 600, fontSize: 22, padding: '18px 36px', borderRadius: 40, display: 'inline-flex' }}>
            Conhecer o Painel
          </a>
        </div>
      </FormColumn>
    </DesktopStage>
  )
}

function Mobile() {
  return (
    <MobileShell back={null} align="left">
      <div style={{ marginTop: 12 }}>
        <SuccessBadge size={96} />
      </div>
      <MTitle>{HEADING}</MTitle>
      <MSub>{BODY}</MSub>
      <MDivider />
      <MHeading>O que acontece agora?</MHeading>
      <MSteps items={PASSOS} />
      <MPrimaryButton href={HOME} variant="teal">Voltar ao Início</MPrimaryButton>
      <MPrimaryButton href={PAINEL} variant="outline">Conhecer o Painel</MPrimaryButton>
    </MobileShell>
  )
}

export default function Confirmacao() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
