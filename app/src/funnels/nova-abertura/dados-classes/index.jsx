import {
  DesktopStage,
  Responsive,
  useFunnel,
  navigate,
  Logo,
  Watermark,
  Title,
  Divider,
  SectionHeading,
  SectionSub,
  Field,
  PrimaryButton,
  AssistantBar,
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MField,
  MForm,
  MPrimaryButton,
  MAssistantBar,
} from '../../../core/index.js'

// Tela 06/1 — Dados Classes Profissionais (etapa 3/4).
// Ponto de saída do fluxo controlado (pagamento é externo). Frame 1920 x 1700.
const DESIGN_W = 1920
const DESIGN_H = 1700
const BACK = '#/abrir-empresa/qualificacao'
const NEXT = '#/abrir-empresa/confirmacao'

const FIELDS = [
  { id: 'nomeFantasia', label: 'Nome Fantasia', placeholder: 'Como sua empresa será conhecida', labelTop: 710, inputTop: 743 },
  { id: 'profissao', label: 'Profissão regulamentada', placeholder: 'Ex.: Médico, Advogado, Engenheiro', labelTop: 847, inputTop: 878 },
  { id: 'registroConselho', label: 'Registro no conselho de classe', placeholder: 'Ex.: CRM / OAB / CREA — nº de registro', labelTop: 983, inputTop: 1013 },
]

function Desktop() {
  const { data, patch } = useFunnel()
  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    patch({ nomeFantasia: fd.get('nomeFantasia'), profissao: fd.get('profissao'), registroConselho: fd.get('registroConselho') })
    navigate(NEXT)
  }
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title top={311}>
        Vamos aos dados
        <br />
        da sua empresa
      </Title>
      <Divider left={169} top={529} />
      <SectionHeading left={169} top={565}>Dados das Classes Profissionais</SectionHeading>
      <SectionSub left={169} top={614} width={1200}>
        Preencha as informações abaixo para concluirmos o seu registro profissional.
      </SectionSub>

      <form onSubmit={onSubmit}>
        {FIELDS.map((f) => (
          <Field key={f.id} id={f.id} label={f.label} labelLeft={169} left={169} labelTop={f.labelTop} inputTop={f.inputTop} placeholder={f.placeholder} defaultValue={data[f.id]} />
        ))}
        <a className="abs box-btn box-btn--outline" href={BACK} style={{ left: 169, top: 1170, width: 137, height: 49, background: 'var(--white)', border: '1px solid var(--teal)', borderRadius: 5, color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Voltar
        </a>
        <PrimaryButton left={336} top={1170} step="3/4" />
      </form>

      <AssistantBar />
    </DesktopStage>
  )
}

function Mobile() {
  const { data, patch } = useFunnel()
  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    patch({ nomeFantasia: fd.get('nomeFantasia'), profissao: fd.get('profissao'), registroConselho: fd.get('registroConselho') })
    navigate(NEXT)
  }
  return (
    <MobileShell back={BACK} align="left">
      <MTitle>Vamos aos dados da sua empresa</MTitle>
      <MDivider />
      <MHeading>Dados das Classes Profissionais</MHeading>
      <MSub>Preencha as informações abaixo para concluirmos o seu registro profissional.</MSub>
      <MForm onSubmit={onSubmit}>
        {FIELDS.map((f) => (
          <MField key={f.id} id={f.id} label={f.label} placeholder={f.placeholder} defaultValue={data[f.id]} />
        ))}
        <MPrimaryButton step="3/4">Avançar</MPrimaryButton>
      </MForm>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function DadosClasses() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
