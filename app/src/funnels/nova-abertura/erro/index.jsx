import {
  DesktopStage,
  Responsive,
  Logo,
  Watermark,
  Title,
  Divider,
  SectionSub,
  PrimaryButton,
  AssistantBar,
  MobileShell,
  MTitle,
  MDivider,
  MSub,
  MPrimaryButton,
  MAssistantBar,
} from '../../../core/index.js'
import alertTriangle from '../../../assets/icons/alert-triangle.svg'

// Tela 08E (Funil A) — Erro na consulta à Receita Federal.
// Recuperação: tentar novamente (volta ao formulário) ou voltar ao início.
const DESIGN_W = 1920
const DESIGN_H = 1200
const RETRY = '#/abrir-empresa/qualificacao'
const HOME = '#/'

const HEADING = 'Não foi possível concluir a consulta'
const BODY =
  'A consulta à Receita Federal falhou ou os dados não foram localizados. Confira as informações enviadas e tente novamente — nenhuma solicitação foi registrada.'

function Desktop() {
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <img className="abs" src={alertTriangle} alt="" style={{ left: 170, top: 333, width: 96, height: 96 }} />
      <Title left={170} top={460} width={1100}>{HEADING}</Title>
      <SectionSub left={170} top={545} width={1100}>{BODY}</SectionSub>
      <Divider left={170} top={680} />
      <PrimaryButton left={170} top={760} width={280} href={RETRY}>Tentar novamente</PrimaryButton>
      <a className="abs box-btn box-btn--outline" href={HOME} style={{ left: 480, top: 760, width: 280, height: 49, background: 'var(--white)', border: '1px solid var(--teal)', borderRadius: 5, color: 'var(--gray)', fontWeight: 600, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Voltar ao início
      </a>
      <AssistantBar dividerTop={960} barTop={1028} />
    </DesktopStage>
  )
}

function Mobile() {
  return (
    <MobileShell back={RETRY} align="center">
      <img src={alertTriangle} alt="" style={{ width: 72, height: 72, marginTop: 16 }} />
      <MTitle>{HEADING}</MTitle>
      <MDivider />
      <MSub>{BODY}</MSub>
      <MPrimaryButton href={RETRY} variant="teal">Tentar novamente</MPrimaryButton>
      <MPrimaryButton href={HOME} variant="outline">Voltar ao início</MPrimaryButton>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function ErroAbertura() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
