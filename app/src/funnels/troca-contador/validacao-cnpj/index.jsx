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
  Field,
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

// Tela 07 — Validação CNPJ/CPF (etapa 1/4). Entrada do Funil B (Troca de Contador).
// Coleta CNPJ da empresa + CPF do sócio administrador para consulta na Receita Federal.
// Frame do Figma: 1920 x ~1650.
const DESIGN_W = 1920
const DESIGN_H = 1650
const NEXT = '#/trocar-contador/consultando'

const FIELDS = [
  { id: 'cnpj', label: 'CNPJ da Empresa', type: 'text', placeholder: '00.000.000/0001-00', labelTop: 733, inputTop: 766 },
  { id: 'cpfSocio', label: 'CPF do Sócio Administrador', type: 'text', placeholder: '000.000.000-00', labelTop: 870, inputTop: 903 },
]

function useCnpjForm() {
  const { data, patch } = useFunnel()
  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    patch({ cnpj: fd.get('cnpj'), cpfSocio: fd.get('cpfSocio') })
    navigate(NEXT)
  }
  return { data, onSubmit }
}

function Desktop() {
  const { data, onSubmit } = useCnpjForm()
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title left={170} top={333}>Troca de Contador</Title>
      <div
        className="abs"
        style={{ left: 170, top: 411, color: 'var(--gray)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal', whiteSpace: 'nowrap' }}
      >
        Para iniciarmos o processo de migração da sua escrita contábil,
        <br />
        precisamos localizar sua empresa na Receita Federal.
      </div>

      <Divider left={170} top={570} />
      <SectionHeading left={170} top={595}>Informe os dados da sua empresa atual</SectionHeading>
      <p className="abs" style={{ left: 170, top: 643, color: 'var(--gray)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
        O primeiro passo para construirmos uma parceria de sucesso.
      </p>

      <form onSubmit={onSubmit}>
        {FIELDS.map((f) => (
          <Field key={f.id} id={f.id} label={f.label} type={f.type} placeholder={f.placeholder} labelLeft={170} left={170} labelTop={f.labelTop} inputTop={f.inputTop} defaultValue={data[f.id]} />
        ))}

        <p className="abs" style={{ left: 170, top: 997, color: 'var(--teal)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
          Obs.: O CPF deve ser do responsável legal cadastrado no CNPJ para validação de segurança.
        </p>

        <button
          type="submit"
          className="abs box-btn"
          style={{ left: 170, top: 1093, width: 577, height: 75, background: 'var(--teal)', border: '1px solid var(--white)', borderRadius: 10, color: 'var(--white)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          [ Validar Empresa ]
        </button>
        <span className="abs" style={{ left: 865, top: 1093, color: 'var(--teal)', fontWeight: 600, fontSize: 40, letterSpacing: '-1.2px', lineHeight: '75px', whiteSpace: 'nowrap' }}>
          1/4
        </span>
      </form>

      <AssistantBar dividerTop={1406} barTop={1474} />
    </DesktopStage>
  )
}

function Mobile() {
  const { data, onSubmit } = useCnpjForm()
  return (
    <MobileShell back="#/" align="left">
      <MTitle>Troca de Contador</MTitle>
      <MSub>Para iniciarmos o processo de migração da sua escrita contábil, precisamos localizar sua empresa na Receita Federal.</MSub>
      <MDivider />
      <MHeading>Informe os dados da sua empresa atual</MHeading>
      <MSub>O primeiro passo para construirmos uma parceria de sucesso.</MSub>
      <MForm onSubmit={onSubmit}>
        {FIELDS.map((f) => (
          <MField key={f.id} id={f.id} label={f.label} type={f.type} placeholder={f.placeholder} defaultValue={data[f.id]} />
        ))}
        <MSub>Obs.: O CPF deve ser do responsável legal cadastrado no CNPJ para validação de segurança.</MSub>
        <MPrimaryButton step="1/4">Validar Empresa</MPrimaryButton>
      </MForm>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function ValidacaoCnpj() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
