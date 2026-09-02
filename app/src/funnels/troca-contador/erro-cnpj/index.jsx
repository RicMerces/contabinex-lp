import {
  DesktopStage,
  Responsive,
  useFunnel,
  navigate,
  Logo,
  Watermark,
  Title,
  Divider,
  SectionSub,
  AssistantBar,
  FormColumn,
  MobileShell,
  MTitle,
  MDivider,
  MSub,
  MPrimaryButton,
  MAssistantBar,
} from '../../../core/index.js'
import alertTriangle from '../../../assets/icons/alert-triangle.svg'

// Tela 08/E — Erro: CNPJ não encontrado na Receita Federal.
// Três recuperações: tentar de novo com os dados preenchidos, informar outro
// CNPJ (limpa os campos) ou falar com um consultor.
const DESIGN_W = 1920
const DESIGN_H = 1300
const TELA_07 = '#/trocar-contador/validacao'
const ASSISTENTE = '#/descobrir-plano'

const TITULO = 'CNPJ Não Encontrado'
const SUBTITULO = 'Falha na validação dos dados cadastrais.'
const BODY =
  'Não conseguimos localizar o CNPJ informado na base de dados da Receita Federal. Verifique se os números foram digitados corretamente ou se o registro está ativo.'

/** "Informar outro CNPJ" volta para a Tela 07 com os campos limpos. */
function useAcoes() {
  const { patch } = useFunnel()
  const outroCnpj = () => {
    patch({ cnpj: '', cpfSocio: '', empresa: null })
    navigate(TELA_07)
  }
  return { outroCnpj }
}

function Desktop() {
  const { outroCnpj } = useAcoes()
  const BTN = { height: 60, padding: '0 32px', borderRadius: 10, fontWeight: 600, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <img className="abs" src={alertTriangle} alt="" style={{ left: 170, top: 333, width: 96, height: 96 }} />
      <Title left={170} top={470} width={1100}>{TITULO}</Title>
      <SectionSub left={170} top={548} width={1100}>{SUBTITULO}</SectionSub>
      <Divider left={170} top={620} />
      <SectionSub left={170} top={660} width={1100}>{BODY}</SectionSub>

      <FormColumn left={170} top={800} width={1100}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <a href={TELA_07} className="box-btn" style={{ ...BTN, background: 'var(--teal)', color: 'var(--white)' }}>Tentar Novamente</a>
          <button type="button" onClick={outroCnpj} className="box-btn box-btn--outline" style={{ ...BTN, background: 'var(--white)', border: '1px solid var(--teal)', color: 'var(--teal)' }}>Informar outro CNPJ</button>
          <a href={ASSISTENTE} className="box-cta box-cta--light" style={{ ...BTN, background: 'var(--teal-light)', color: 'var(--gray)' }}>Falar com consultor</a>
        </div>
      </FormColumn>

      <AssistantBar dividerTop={1060} barTop={1128} />
    </DesktopStage>
  )
}

function Mobile() {
  const { outroCnpj } = useAcoes()
  return (
    <MobileShell back={TELA_07} align="center">
      <img src={alertTriangle} alt="" style={{ width: 72, height: 72, marginTop: 16 }} />
      <MTitle>{TITULO}</MTitle>
      <MSub>{SUBTITULO}</MSub>
      <MDivider />
      <MSub>{BODY}</MSub>
      <MPrimaryButton href={TELA_07} variant="teal">Tentar Novamente</MPrimaryButton>
      <MPrimaryButton type="button" onClick={outroCnpj} variant="outline">Informar outro CNPJ</MPrimaryButton>
      <MPrimaryButton href={ASSISTENTE} variant="light">Falar com consultor</MPrimaryButton>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function ErroCnpj() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
