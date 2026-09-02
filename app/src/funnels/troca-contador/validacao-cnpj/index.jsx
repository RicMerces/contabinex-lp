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
  AssistantBar,
  FormColumn,
  FlowField,
  FlowNote,
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
import { maskCnpj, maskCpf, isValidCnpj, isValidCpf } from '../../../utils/br.js'

// Tela 07 — Troca de Contador (etapa 2/4). Coleta o CNPJ da empresa e o CPF
// do sócio administrador para a consulta na Receita Federal (Tela 08).
// Vem da Tela 02-B (captura de lead do Funil B). Frame do Figma: 1920 x 1650.
const DESIGN_W = 1920
const DESIGN_H = 1650
const BACK = '#/trocar-contador'
const NEXT = '#/trocar-contador/consultando'

const TITULO = 'Troca de Contador'
const SUBTITULO =
  'Para iniciarmos o processo de migração da sua escrita contábil, precisamos localizar sua empresa na Receita Federal.'
const OBS = 'Obs.: O CPF deve ser do responsável legal cadastrado no CNPJ para validação de segurança.'

function useValidacao() {
  const { data, patch } = useFunnel()
  const [cnpj, setCnpjState] = useState(data.cnpj || '')
  const [cpfSocio, setCpfState] = useState(data.cpfSocio || '')
  const [erro, setErro] = useState('')

  const setCnpj = (v) => setCnpjState(maskCnpj(v))
  const setCpfSocio = (v) => setCpfState(maskCpf(v))

  const onSubmit = (e) => {
    e.preventDefault()
    if (!isValidCnpj(cnpj)) return setErro('CNPJ inválido. Confira os números digitados.')
    if (!isValidCpf(cpfSocio)) return setErro('CPF inválido. Confira os números digitados.')
    setErro('')
    patch({ cnpj, cpfSocio })
    navigate(NEXT)
  }

  return { cnpj, setCnpj, cpfSocio, setCpfSocio, erro, onSubmit }
}

function Desktop() {
  const f = useValidacao()
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title left={170} top={333}>{TITULO}</Title>
      <SectionSub left={170} top={411} width={1100}>{SUBTITULO}</SectionSub>

      <Divider left={170} top={570} />
      <SectionHeading left={170} top={595}>Informe os dados da sua empresa atual</SectionHeading>
      <SectionSub left={170} top={643} width={1100}>O primeiro passo para construirmos uma parceria de sucesso.</SectionSub>

      <form onSubmit={f.onSubmit}>
        <FormColumn left={170} top={733} width={807}>
          <FlowField id="cnpj" label="CNPJ da Empresa" value={f.cnpj} onChange={(e) => f.setCnpj(e.target.value)} placeholder="00.000.000/0001-00" inputMode="numeric" />
          <FlowField id="cpfSocio" label="CPF do Sócio Administrador" value={f.cpfSocio} onChange={(e) => f.setCpfSocio(e.target.value)} placeholder="000.000.000-00" inputMode="numeric" />
          <FlowNote>{OBS}</FlowNote>
          <FlowError>{f.erro}</FlowError>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 10 }}>
            <a href={BACK} className="box-btn box-btn--outline" style={{ width: 137, height: 75, background: 'var(--white)', border: '1px solid var(--teal)', borderRadius: 10, color: 'var(--gray)', fontWeight: 600, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Voltar
            </a>
            <button type="submit" className="box-btn" style={{ width: 440, height: 75, background: 'var(--teal)', borderRadius: 10, color: 'var(--white)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              [ Validar Empresa ]
            </button>
            <span style={{ color: 'var(--teal)', fontWeight: 600, fontSize: 40, letterSpacing: '-1.2px', lineHeight: '75px' }}>2/4</span>
          </div>
        </FormColumn>
      </form>

      <AssistantBar dividerTop={1406} barTop={1474} />
    </DesktopStage>
  )
}

function Mobile() {
  const f = useValidacao()
  return (
    <MobileShell back={BACK} align="left">
      <MTitle>{TITULO}</MTitle>
      <MSub>{SUBTITULO}</MSub>
      <MDivider />
      <MHeading>Informe os dados da sua empresa atual</MHeading>
      <MSub>O primeiro passo para construirmos uma parceria de sucesso.</MSub>
      <MForm onSubmit={f.onSubmit}>
        <MField id="cnpj" label="CNPJ da Empresa" value={f.cnpj} onChange={(e) => f.setCnpj(e.target.value)} placeholder="00.000.000/0001-00" inputMode="numeric" />
        <MField id="cpfSocio" label="CPF do Sócio Administrador" value={f.cpfSocio} onChange={(e) => f.setCpfSocio(e.target.value)} placeholder="000.000.000-00" inputMode="numeric" hint={OBS} />
        {f.erro && <span className="wz-error">{f.erro}</span>}
        <MPrimaryButton step="2/4">Validar Empresa</MPrimaryButton>
      </MForm>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function ValidacaoCnpj() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
