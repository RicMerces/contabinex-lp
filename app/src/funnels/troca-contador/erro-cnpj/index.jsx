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

// Tela 08/E — Erro: CNPJ não encontrado na Receita Federal.
// Recuperação: corrigir os dados → volta para a validação (Tela 07).
// Frame do Figma: 1920 x ~1200.
const DESIGN_W = 1920
const DESIGN_H = 1200
const RETRY = '#/trocar-contador'

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
      <Title left={170} top={460}>CNPJ não encontrado</Title>
      <div className="abs" style={{ left: 170, top: 545, color: 'var(--gray)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal', whiteSpace: 'nowrap' }}>
        Não localizamos este CNPJ na base da Receita Federal.
        <br />
        Confira se o CNPJ e o CPF do sócio administrador estão corretos.
      </div>

      <Divider left={170} top={680} />

      <PrimaryButton left={170} top={760} width={360} href={RETRY}>Corrigir dados</PrimaryButton>

      <AssistantBar dividerTop={960} barTop={1028} />
    </DesktopStage>
  )
}

function Mobile() {
  return (
    <MobileShell back="#/trocar-contador" align="center">
      <div style={{ margin: '20px 0 24px' }}>
        <Badge size={80} />
      </div>
      <MTitle>CNPJ não encontrado</MTitle>
      <MDivider />
      <MSub>Não localizamos este CNPJ na base da Receita Federal. Confira se o CNPJ e o CPF do sócio administrador estão corretos.</MSub>
      <MPrimaryButton href={RETRY} variant="teal">Corrigir dados</MPrimaryButton>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function ErroCnpj() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
