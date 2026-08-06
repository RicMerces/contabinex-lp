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

// Tela 08/1E — Erro: falha no upload do Contrato Social.
// Duas recuperações: tentar novamente → upload; informar outro CNPJ → validação.
// Frame do Figma: 1920 x ~1200.
const DESIGN_W = 1920
const DESIGN_H = 1200
const RETRY = '#/trocar-contador/upload'
const OTHER_CNPJ = '#/trocar-contador'

function Badge({ size = 96 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--teal-light)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: size * 0.55, lineHeight: 1 }}>
      !
    </div>
  )
}

function Desktop() {
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <div className="abs" style={{ left: 170, top: 333 }}>
        <Badge />
      </div>
      <Title left={170} top={460}>Falha no upload</Title>
      <div className="abs" style={{ left: 170, top: 545, color: 'var(--gray)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal', whiteSpace: 'nowrap' }}>
        Não foi possível enviar o seu Contrato Social. Isso pode ter ocorrido
        <br />
        por instabilidade na conexão ou pelo tamanho do arquivo.
      </div>

      <Divider left={170} top={680} />

      <PrimaryButton left={170} top={760} width={360} href={RETRY}>Tentar novamente</PrimaryButton>
      <a className="abs box-cta" href={OTHER_CNPJ} style={{ left: 560, top: 760, width: 360, height: 49, border: '2px solid var(--teal)', borderRadius: 5, color: 'var(--teal)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Informar outro CNPJ
      </a>

      <AssistantBar dividerTop={960} barTop={1028} />
    </DesktopStage>
  )
}

function Mobile() {
  return (
    <MobileShell back="#/trocar-contador/upload" align="center">
      <div style={{ margin: '20px 0 24px' }}>
        <Badge size={80} />
      </div>
      <MTitle>Falha no upload</MTitle>
      <MDivider />
      <MSub>Não foi possível enviar o seu Contrato Social. Isso pode ter ocorrido por instabilidade na conexão ou pelo tamanho do arquivo.</MSub>
      <MPrimaryButton href={RETRY} variant="teal">Tentar novamente</MPrimaryButton>
      <MPrimaryButton href={OTHER_CNPJ} variant="outline">Informar outro CNPJ</MPrimaryButton>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function ErroUpload() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
