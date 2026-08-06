import {
  DesktopStage,
  Responsive,
  useFunnel,
  Logo,
  Watermark,
  Title,
  Divider,
  SectionHeading,
  PrimaryButton,
  AssistantBar,
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MPrimaryButton,
  MAssistantBar,
} from '../../../core/index.js'

// Tela 07/1 — Confirmação da Troca. Ponto de fricção intencional antes do upload:
// "Quer mesmo trocar de contador?". Confirmar → upload; cancelar → landing.
// Frame do Figma: 1920 x ~1650.
const DESIGN_W = 1920
const DESIGN_H = 1650
const CONFIRM = '#/trocar-contador/upload'
const CANCEL = '#/'

function Desktop() {
  const { data } = useFunnel()
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title left={170} top={333}>Confirmação da Troca</Title>
      <div className="abs" style={{ left: 170, top: 411, color: 'var(--gray)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal', whiteSpace: 'nowrap' }}>
        Encontramos sua empresa na Receita Federal.
        <br />
        Confira os dados e confirme para prosseguir.
      </div>

      <Divider left={170} top={570} />
      <SectionHeading left={170} top={595}>Quer mesmo trocar de contador?</SectionHeading>
      <p className="abs" style={{ left: 170, top: 643, color: 'var(--gray)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
        A partir daqui, cuidamos de toda a comunicação com o seu contador atual.
      </p>

      <div className="abs" style={{ left: 170, top: 730, width: 807, minHeight: 90, background: 'var(--teal-light)', borderRadius: 10, padding: '20px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
        <span style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.5px' }}>Empresa localizada</span>
        <span style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.6px' }}>
          CNPJ {data.cnpj || '00.000.000/0001-00'}
        </span>
      </div>

      <PrimaryButton left={170} top={900} width={400} href={CONFIRM}>Sim, quero trocar</PrimaryButton>
      <a className="abs box-cta" href={CANCEL} style={{ left: 600, top: 900, width: 320, height: 49, border: '2px solid var(--teal)', borderRadius: 5, color: 'var(--teal)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Não, voltar
      </a>

      <AssistantBar dividerTop={1406} barTop={1474} />
    </DesktopStage>
  )
}

function Mobile() {
  const { data } = useFunnel()
  return (
    <MobileShell back="#/" align="left">
      <MTitle>Confirmação da Troca</MTitle>
      <MSub>Encontramos sua empresa na Receita Federal. Confira os dados e confirme para prosseguir.</MSub>
      <MDivider />
      <MHeading>Quer mesmo trocar de contador?</MHeading>
      <MSub>A partir daqui, cuidamos de toda a comunicação com o seu contador atual.</MSub>
      <div style={{ width: '100%', maxWidth: 520, margin: '20px auto 0', background: 'var(--teal-light)', borderRadius: 12, padding: '16px 18px' }}>
        <div style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 14 }}>Empresa localizada</div>
        <div style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 18, marginTop: 4 }}>CNPJ {data.cnpj || '00.000.000/0001-00'}</div>
      </div>
      <MPrimaryButton href={CONFIRM} variant="teal">Sim, quero trocar</MPrimaryButton>
      <MPrimaryButton href={CANCEL} variant="outline">Não, voltar</MPrimaryButton>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function ConfirmacaoTroca() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
