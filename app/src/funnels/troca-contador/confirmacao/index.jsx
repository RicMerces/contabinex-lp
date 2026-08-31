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

// Tela 12 — Confirmação: Troca de Contador (final do Funil B).
const DESIGN_W = 1920
const DESIGN_H = 1600
// TODO: o dashboard do cliente ainda não existe neste app — quando a URL for
// definida, trocar aqui (hoje o CTA volta para a landing).
const DASHBOARD = '#/'
const ESPECIALISTA = '#/descobrir-plano'

const HEADING = 'Migração em Andamento'
const BODY = 'A transição para uma contabilidade mais eficiente já começou. Seja bem-vindo à CONTABINEX!'
const PASSOS = [
  'Iniciaremos o contato com o seu contador anterior para solicitar a transferência de documentos e arquivos digitais.',
  'Validaremos o histórico fiscal da sua empresa para garantir que não haja pendências ocultas.',
  'Você receberá um guia de boas-vindas com todas as funcionalidades da nossa plataforma digital.',
]

function CheckBadge({ size = 120 }) {
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
      <div className="abs" style={{ left: 170, top: 311 }}>
        <CheckBadge />
      </div>
      <Title left={170} top={470}>{HEADING}</Title>
      <SectionSub left={170} top={550} width={1100}>{BODY}</SectionSub>
      <Divider left={170} top={640} />
      <SectionHeading left={170} top={676}>Próximas etapas</SectionHeading>

      <FormColumn left={170} top={760} width={1100} gap={40}>
        <FlowSteps items={PASSOS} />
        <div style={{ display: 'flex', gap: 24 }}>
          <a className="box-cta" href={DASHBOARD} style={{ background: 'var(--teal)', color: 'var(--white)', fontWeight: 600, fontSize: 22, padding: '18px 36px', borderRadius: 40, display: 'inline-flex' }}>
            Ir para o Dashboard
          </a>
          <a className="box-cta" href={ESPECIALISTA} style={{ background: 'var(--white)', border: '2px solid var(--teal)', color: 'var(--teal)', fontWeight: 600, fontSize: 22, padding: '18px 36px', borderRadius: 40, display: 'inline-flex' }}>
            Falar com Especialista
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
        <CheckBadge size={96} />
      </div>
      <MTitle>{HEADING}</MTitle>
      <MSub>{BODY}</MSub>
      <MDivider />
      <MHeading>Próximas etapas</MHeading>
      <MSteps items={PASSOS} />
      <MPrimaryButton href={DASHBOARD} variant="teal">Ir para o Dashboard</MPrimaryButton>
      <MPrimaryButton href={ESPECIALISTA} variant="outline">Falar com Especialista</MPrimaryButton>
    </MobileShell>
  )
}

export default function Confirmacao() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
