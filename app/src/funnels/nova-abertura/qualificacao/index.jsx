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
  PrimaryButton,
  AssistantBar,
  FIELD_BORDER,
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
import checkWhite from '../../../assets/icons/check-white.svg'

// Tela 03 — Qualificação (etapa 2/4). Perfil da empresa: faturamento,
// nº de funcionários e ramo de atividade. Frame do Figma: 1920 x 1700.
const DESIGN_W = 1920
const DESIGN_H = 1700
const BACK = '#/abrir-empresa'
const NEXT = '#/abrir-empresa/dados-empresa'

const FATURAMENTO = [
  { value: 'ate-81k', label: 'Até R$ 81.000,00 por ano (Média de R$ 6.750,00/mês)' },
  { value: 'acima-81k', label: 'Acima de R$ 81.000,00 por ano' },
]
const FUNCIONARIOS = [
  { value: 'ate-1', label: 'Nenhum ou no máximo 1 funcionário' },
  { value: '2-ou-mais', label: '2 ou mais funcionários' },
]

/** Opção tipo "radio" no layout do Figma (quadrado 22px + rótulo). */
function Opt({ squareTop, labelTop, checked, onSelect, children }) {
  return (
    <>
      <div
        onClick={onSelect}
        className="abs"
        style={{ left: 177, top: squareTop, width: 22, height: 22, borderRadius: 5, border: '1px solid var(--gray)', background: checked ? 'var(--teal)' : 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        {checked && <img src={checkWhite} alt="" style={{ width: 14, height: 14 }} />}
      </div>
      <div
        onClick={onSelect}
        className="abs"
        style={{ left: 213, top: labelTop, color: 'var(--gray)', fontWeight: 500, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap', cursor: 'pointer' }}
      >
        {children}
      </div>
    </>
  )
}

function Desktop() {
  const { data, patch } = useFunnel()
  const [faturamento, setFaturamento] = useState(data.faturamento || '')
  const [funcionarios, setFuncionarios] = useState(data.funcionarios || '')

  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    patch({ faturamento, funcionarios, ramo: fd.get('ramo') })
    navigate(NEXT)
  }

  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title top={311}>
        Qual é o perfil da
        <br />
        sua futura empresa?
      </Title>
      <Divider left={169} top={529} />
      <SectionHeading left={169} top={565}>Dados da Empresa e Atividade</SectionHeading>
      <SectionSub left={169} top={614} width={1200}>
        Para identificarmos o modelo de empresa ideal e evitar riscos fiscais, precisamos entender um pouco sobre o formato do seu negócio.
      </SectionSub>

      <form onSubmit={onSubmit}>
        <p className="abs" style={{ left: 169, top: 713, color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
          1. Qual é a estimativa de faturamento bruto do seu negócio?
        </p>
        {FATURAMENTO.map((o, i) => (
          <Opt key={o.value} squareTop={760 + i * 35} labelTop={758 + i * 35} checked={faturamento === o.value} onSelect={() => setFaturamento(o.value)}>
            {o.label}
          </Opt>
        ))}

        <p className="abs" style={{ left: 169, top: 854, color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
          2. Quantos funcionários você precisará contratar inicialmente?
        </p>
        {FUNCIONARIOS.map((o, i) => (
          <Opt key={o.value} squareTop={900 + i * 35} labelTop={898 + i * 35} checked={funcionarios === o.value} onSelect={() => setFuncionarios(o.value)}>
            {o.label}
          </Opt>
        ))}

        <p className="abs" style={{ left: 169, top: 999, color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
          3. Qual é o ramo de atividade ou profissão da sua empresa?
        </p>
        <input
          id="ramo"
          name="ramo"
          defaultValue={data.ramo}
          placeholder="Campo de busca com auto-complete"
          className="abs field-input"
          style={{ left: 169, top: 1046, width: 568, height: 75, border: `1px solid ${FIELD_BORDER}`, borderRadius: 10, padding: '0 24px', fontSize: 20, color: 'var(--navy)', background: 'var(--white)' }}
        />

        <a className="abs box-btn box-btn--outline" href={BACK} style={{ left: 496, top: 1216, width: 137, height: 49, background: 'var(--white)', border: '1px solid var(--teal)', borderRadius: 5, color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Voltar
        </a>
        <PrimaryButton left={663} top={1216} step="2/4" />
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
    patch({ faturamento: fd.get('faturamento'), funcionarios: fd.get('funcionarios'), ramo: fd.get('ramo') })
    navigate(NEXT)
  }
  return (
    <MobileShell back={BACK} align="left">
      <MTitle>Qual é o perfil da sua futura empresa?</MTitle>
      <MDivider />
      <MHeading>Dados da Empresa e Atividade</MHeading>
      <MSub>Para identificarmos o modelo de empresa ideal e evitar riscos fiscais, precisamos entender um pouco sobre o formato do seu negócio.</MSub>
      <MForm onSubmit={onSubmit}>
        <MField id="faturamento" label="Estimativa de faturamento bruto" as="select" defaultValue={data.faturamento || ''}>
          <option value="" disabled>Selecione…</option>
          {FATURAMENTO.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </MField>
        <MField id="funcionarios" label="Nº de funcionários" as="select" defaultValue={data.funcionarios || ''}>
          <option value="" disabled>Selecione…</option>
          {FUNCIONARIOS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </MField>
        <MField id="ramo" label="Ramo de atividade ou profissão" placeholder="Ex.: Comércio de roupas" defaultValue={data.ramo} />
        <MPrimaryButton step="2/4">Avançar</MPrimaryButton>
      </MForm>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function Qualificacao() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
