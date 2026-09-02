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
  FlowAutocomplete,
  FlowError,
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MForm,
  MRadio,
  MAutocomplete,
  MPrimaryButton,
  MAssistantBar,
} from '../../../core/index.js'
import checkWhite from '../../../assets/icons/check-white.svg'
import { searchCnae, cnaeLabel, findCnaeByLabel, isRegulamentada, permiteMei } from '../../../data/cnae.js'

// Tela 03 — Qualificação (etapa 2/4). Perfil da empresa: faturamento,
// nº de funcionários e ramo de atividade (auto-complete CNAE).
// Aqui acontece o enquadramento automático (04A / 04B). Frame: 1920 x 1700.
const DESIGN_W = 1920
const DESIGN_H = 1700
const BACK = '#/abrir-empresa'
const ALERTA_SIMPLES = '#/abrir-empresa/alerta-simples'
const ALERTA_CLASSES = '#/abrir-empresa/alerta-classes'
const DADOS_MEI = '#/abrir-empresa/dados-mei'

const FATURAMENTO = [
  { value: 'ate-81k', label: 'Até R$ 81.000,00 por ano (Média de R$ 6.750,00/mês)' },
  { value: 'acima-81k', label: 'Acima de R$ 81.000,00 por ano' },
]
const FUNCIONARIOS = [
  { value: 'ate-1', label: 'Nenhum ou no máximo 1 funcionário' },
  { value: '2-ou-mais', label: '2 ou mais funcionários' },
]

/**
 * Enquadramento automático a partir das respostas da Tela 03.
 * A atividade regulamentada tem PRIORIDADE sobre faturamento/funcionários:
 * mesmo dentro dos limites do MEI, conselho de classe → Classes Profissionais.
 */
export function enquadrar({ faturamento, funcionarios, cnae }) {
  if (cnae && isRegulamentada(cnae)) {
    return { plano: 'classes', next: ALERTA_CLASSES, conselho: cnae.conselho }
  }
  const excedeLimite = faturamento === 'acima-81k' || funcionarios === '2-ou-mais'
  if (excedeLimite || (cnae && !permiteMei(cnae))) {
    return { plano: 'simples', next: ALERTA_SIMPLES }
  }
  return { plano: 'mei', next: DADOS_MEI }
}

/** Estado + validação + decisão, compartilhados entre desktop e mobile. */
function useQualificacao() {
  const { data, patch } = useFunnel()
  const [faturamento, setFaturamento] = useState(data.faturamento || '')
  const [funcionarios, setFuncionarios] = useState(data.funcionarios || '')
  const [ramo, setRamo] = useState(data.ramo || '')
  const [cnae, setCnae] = useState(() => findCnaeByLabel(data.ramo) || null)
  const [erro, setErro] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!faturamento || !funcionarios) return setErro('Responda às duas primeiras perguntas para continuar.')
    const atividade = cnae || findCnaeByLabel(ramo)
    if (!atividade) return setErro('Selecione a atividade na lista de sugestões (digite ao menos 3 letras).')
    setErro('')
    const { plano, next, conselho } = enquadrar({ faturamento, funcionarios, cnae: atividade })
    patch({
      faturamento,
      funcionarios,
      ramo: cnaeLabel(atividade),
      cnae: atividade.code,
      conselho: conselho || null,
      planoSugerido: plano,
      origemPlano: 'qualificacao',
    })
    navigate(next)
  }

  const onPick = (item) => { setCnae(item); setRamo(cnaeLabel(item)) }
  const onType = (v) => { setRamo(v); setCnae(null) }

  return { faturamento, setFaturamento, funcionarios, setFuncionarios, ramo, onType, onPick, erro, submit }
}

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
  const q = useQualificacao()

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

      <form onSubmit={q.submit}>
        <p className="abs" style={{ left: 169, top: 713, color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
          1. Qual é a estimativa de faturamento bruto do seu negócio?
        </p>
        {FATURAMENTO.map((o, i) => (
          <Opt key={o.value} squareTop={760 + i * 35} labelTop={758 + i * 35} checked={q.faturamento === o.value} onSelect={() => q.setFaturamento(o.value)}>
            {o.label}
          </Opt>
        ))}

        <p className="abs" style={{ left: 169, top: 854, color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
          2. Quantos funcionários você precisará contratar inicialmente?
        </p>
        {FUNCIONARIOS.map((o, i) => (
          <Opt key={o.value} squareTop={900 + i * 35} labelTop={898 + i * 35} checked={q.funcionarios === o.value} onSelect={() => q.setFuncionarios(o.value)}>
            {o.label}
          </Opt>
        ))}

        <p className="abs" style={{ left: 169, top: 999, color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
          3. Qual é o ramo de atividade ou profissão da sua empresa?
        </p>
        <div className="abs" style={{ left: 169, top: 1046, width: 700 }}>
          <FlowAutocomplete
            id="ramo"
            placeholder="Digite a atividade ou o código CNAE"
            hint="Busque pela base CNAE — digite ao menos 3 caracteres e escolha na lista."
            value={q.ramo}
            onChange={q.onType}
            onSelect={q.onPick}
            search={searchCnae}
            itemLabel={cnaeLabel}
          />
        </div>

        <div className="abs" style={{ left: 169, top: 1180, width: 900 }}>
          <FlowError>{q.erro}</FlowError>
        </div>

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
  const q = useQualificacao()
  return (
    <MobileShell back={BACK} align="left">
      <MTitle>Qual é o perfil da sua futura empresa?</MTitle>
      <MDivider />
      <MHeading>Dados da Empresa e Atividade</MHeading>
      <MSub>Para identificarmos o modelo de empresa ideal e evitar riscos fiscais, precisamos entender um pouco sobre o formato do seu negócio.</MSub>
      <MForm onSubmit={q.submit}>
        <MRadio legend="1. Qual é a estimativa de faturamento bruto do seu negócio?" options={FATURAMENTO} value={q.faturamento} onChange={q.setFaturamento} />
        <MRadio legend="2. Quantos funcionários você precisará contratar inicialmente?" options={FUNCIONARIOS} value={q.funcionarios} onChange={q.setFuncionarios} />
        <MAutocomplete
          id="ramo"
          label="3. Qual é o ramo de atividade ou profissão da sua empresa?"
          placeholder="Digite a atividade ou o código CNAE"
          hint="Busque pela base CNAE — digite ao menos 3 caracteres e escolha na lista."
          error={q.erro}
          value={q.ramo}
          onChange={q.onType}
          onSelect={q.onPick}
          search={searchCnae}
          itemLabel={cnaeLabel}
        />
        <MPrimaryButton step="2/4">Avançar</MPrimaryButton>
      </MForm>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function Qualificacao() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
