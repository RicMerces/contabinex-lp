import { useState } from 'react'
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
  FlowError,
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
import { maskCelular, isValidEmail } from '../../../utils/br.js'

// Tela 02 — Captura de Lead (etapa 1/4). Primeira captura de lead do app.
// Layout compartilhado; muda o título, o destino e o plano já escolhido
// (quando o usuário selecionou um plano direto na landing, ele pula a
// qualificação e o alerta correspondente — ver fluxo.md).
// Frame do Figma: 1920 x 1700.
const DESIGN_W = 1920
const DESIGN_H = 1700

const VARIANTS = {
  // Funil A — Nova Abertura (passa pela qualificação e pelo enquadramento)
  'novo-cnpj': { top: 'Vamos começar a', bottom: 'planejar o seu novo CNPJ', next: '#/abrir-empresa/qualificacao' },
  // Funil A — plano escolhido direto na landing (sem passar pelos alertas)
  simples: { top: 'Vamos começar a', bottom: 'planejar o seu Simples Nacional', next: '#/abrir-empresa/dados-empresa', plano: 'simples' },
  classes: { top: 'Vamos começar a', bottom: 'planejar a sua Classe Profissional', next: '#/abrir-empresa/dados-classes', plano: 'classes' },
  // Funil B — Troca de Contador (Tela 02-B)
  contador: { top: 'Vamos iniciar a', bottom: 'sua troca de contador', next: '#/trocar-contador/validacao' },
}

const FIELDS = [
  { id: 'nome', label: 'Nome completo', type: 'text', autoComplete: 'name', placeholder: 'Seu nome completo', labelLeft: 165, labelTop: 710, inputTop: 743 },
  { id: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', placeholder: 'voce@email.com', labelLeft: 174, labelTop: 847, inputTop: 878 },
  { id: 'celular', label: 'Celular', type: 'tel', autoComplete: 'tel', placeholder: '(00) 00000-0000', labelLeft: 174, labelTop: 983, inputTop: 1013 },
]

function useLeadForm(variant) {
  const v = VARIANTS[variant] || VARIANTS['novo-cnpj']
  const { data, patch } = useFunnel()
  const [nome, setNome] = useState(data.nome || '')
  const [email, setEmail] = useState(data.email || '')
  const [celular, setCelular] = useState(data.celular || '')
  const [erro, setErro] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!nome.trim()) return setErro('Informe o seu nome completo.')
    if (!isValidEmail(email)) return setErro('Informe um e-mail válido.')
    if (celular.replace(/\D/g, '').length < 10) return setErro('Informe um celular válido com DDD.')
    setErro('')
    patch({ nome, email, celular, ...(v.plano ? { planoSugerido: v.plano, origemPlano: 'landing' } : null) })
    navigate(v.next)
  }

  const values = { nome, email, celular }
  const setters = { nome: setNome, email: setEmail, celular: (x) => setCelular(maskCelular(x)) }
  return { v, values, setters, erro, onSubmit }
}

function Desktop({ variant }) {
  const { v, values, setters, erro, onSubmit } = useLeadForm(variant)
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
          <Field key={f.id} {...f} value={values[f.id]} onChange={(e) => setters[f.id](e.target.value)} />
        ))}
        <div className="abs" style={{ left: 165, top: 1125, width: 807 }}>
          <FlowError>{erro}</FlowError>
        </div>
        <PrimaryButton step="1/4" />
      </form>

      <AssistantBar />
    </DesktopStage>
  )
}

function Mobile({ variant }) {
  const { v, values, setters, erro, onSubmit } = useLeadForm(variant)
  return (
    <MobileShell back="#/" align="left">
      <MTitle>{`${v.top} ${v.bottom}`}</MTitle>
      <MDivider />
      <MHeading>Dados Pessoais e Acesso</MHeading>
      <MSub>Preencha os dados abaixo para iniciar sua jornada digital.</MSub>
      <MForm onSubmit={onSubmit}>
        {FIELDS.map((f) => (
          <MField key={f.id} id={f.id} label={f.label} type={f.type} placeholder={f.placeholder} autoComplete={f.autoComplete} value={values[f.id]} onChange={(e) => setters[f.id](e.target.value)} />
        ))}
        {erro && <span className="wz-error">{erro}</span>}
        <MPrimaryButton step="1/4">Avançar</MPrimaryButton>
      </MForm>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function CapturaLead({ variant = 'novo-cnpj' }) {
  return <Responsive desktop={() => <Desktop variant={variant} />} mobile={() => <Mobile variant={variant} />} />
}
