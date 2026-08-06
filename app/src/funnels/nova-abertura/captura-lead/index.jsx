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

// Tela 02 — Captura de Lead (etapa 1/4). Primeira captura de lead do app.
// Layout compartilhado entre os funis; muda apenas o título (variant).
// Frame do Figma: 1920 x 1700.
const DESIGN_W = 1920
const DESIGN_H = 1700

const VARIANTS = {
  // Funil A — Nova Abertura
  'novo-cnpj': { top: 'Vamos começar a', bottom: 'planejar o seu novo CNPJ', next: '#/abrir-empresa/qualificacao' },
  // Funil B — Troca de Contador (entrada alternativa)
  contador: { top: 'Vamos iniciar a', bottom: 'sua troca de contador', next: '#/trocar-contador/validacao' },
  // Funil C — Triagem (entender o negócio)
  empresa: { top: 'Vamos começar a', bottom: 'entender o seu negócio', next: '#/descobrir-plano/diagnostico' },
}

const FIELDS = [
  { id: 'nome', label: 'Nome completo', type: 'text', autoComplete: 'name', placeholder: 'Seu nome completo', labelLeft: 165, labelTop: 710, inputTop: 743 },
  { id: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', placeholder: 'voce@email.com', labelLeft: 174, labelTop: 847, inputTop: 878 },
  { id: 'celular', label: 'Celular', type: 'tel', autoComplete: 'tel', placeholder: '(00) 00000-0000', labelLeft: 174, labelTop: 983, inputTop: 1013 },
]

function useLeadForm(variant) {
  const v = VARIANTS[variant] || VARIANTS['novo-cnpj']
  const { data, patch } = useFunnel()
  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    patch({ nome: fd.get('nome'), email: fd.get('email'), celular: fd.get('celular') })
    navigate(v.next)
  }
  return { v, data, onSubmit }
}

function Desktop({ variant }) {
  const { v, data, onSubmit } = useLeadForm(variant)
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title>
        {v.top}
        <br />
        {v.bottom}
      </Title>
      <Divider left={168} top={525} />
      <SectionHeading left={165} top={562}>Dados Pessoais e Acesso</SectionHeading>
      <SectionSub left={166} top={610}>Preencha os dados abaixo para iniciar sua jornada digital.</SectionSub>

      <form onSubmit={onSubmit}>
        {FIELDS.map((f) => (
          <Field key={f.id} {...f} defaultValue={data[f.id]} />
        ))}
        <PrimaryButton step="1/4" />
      </form>

      <AssistantBar />
    </DesktopStage>
  )
}

function Mobile({ variant }) {
  const { v, data, onSubmit } = useLeadForm(variant)
  return (
    <MobileShell back="#/" align="left">
      <MTitle>{`${v.top} ${v.bottom}`}</MTitle>
      <MDivider />
      <MHeading>Dados Pessoais e Acesso</MHeading>
      <MSub>Preencha os dados abaixo para iniciar sua jornada digital.</MSub>
      <MForm onSubmit={onSubmit}>
        {FIELDS.map((f) => (
          <MField key={f.id} id={f.id} label={f.label} type={f.type} placeholder={f.placeholder} autoComplete={f.autoComplete} defaultValue={data[f.id]} />
        ))}
        <MPrimaryButton step="1/4">Avançar</MPrimaryButton>
      </MForm>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function CapturaLead({ variant = 'novo-cnpj' }) {
  return <Responsive desktop={() => <Desktop variant={variant} />} mobile={() => <Mobile variant={variant} />} />
}
