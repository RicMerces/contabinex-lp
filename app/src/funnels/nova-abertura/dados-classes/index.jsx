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
  FlowRow,
  FlowSection,
  FlowField,
  FlowAutocomplete,
  FlowActions,
  FlowError,
  FlowNote,
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MSection,
  MForm,
  MField,
  MAutocomplete,
  MPrimaryButton,
  MAssistantBar,
  MCard,
} from '../../../core/index.js'
import { CONSELHOS, conselhoLabel, findConselho } from '../../../data/conselhos.js'
import { normalizarTexto } from '../../../utils/br.js'
import useEndereco from '../shared/useEndereco.js'
import { useSocios, SociosDesktop, SociosMobile } from '../shared/Socios.jsx'

// Tela 06/1 — Abrir Empresa (Plano Classes Profissionais), etapa 3/4.
// Seções: A) identificação da categoria (conselho de classe), B) dados de
// constituição (endereço de exercício da profissão), C) estrutura societária.
// Não há bloco de informações operacionais (pró-labore / CLT) neste plano.
const DESIGN_W = 1920
const BASE_H = 2600
// Quem entra direto pela landing faz 3 etapas e volta para a captura de lead
// (Tela 02). Quem cai aqui pelo alerta 04B continua no fluxo de 4 etapas.
const BACK_LANDING = '#/abrir-empresa/classes'
const BACK_QUALIFICACAO = '#/abrir-empresa/qualificacao'
const NEXT = '#/abrir-empresa/confirmacao'

// ⚠️ Enquanto só há operação para advogados, o único conselho ofertado é a OAB.
// Para abrir outras categorias, basta acrescentar os ids aqui (data/conselhos.js).
const CONSELHOS_DISPONIVEIS = ['oab']
const AVISO_CATEGORIA =
  'No momento, a abertura pela plataforma está disponível apenas para advogados (OAB). Para as demais categorias, fale com um assistente que cuidamos do seu caso.'

const TITULO = 'Plano Classes Profissionais'
const SUBTITULO =
  'O caminho simples para empreender legalizado, com controle do próprio dinheiro e a certeza de que você está protegido pelo sistema.'
const AVISO_SOCIOS =
  'Em sociedades de profissionais regulamentados, todos os sócios precisam ter habilitação no mesmo conselho de classe (ex.: uma sociedade de advogados só pode ter advogados como sócios).'
const INSTRUCAO_ENDERECO =
  'Indique o endereço onde exercerá a profissão (consultório, escritório ou coworking) para a checagem de viabilidade urbana.'

/** Busca no dropdown de conselhos (lista fixa, sem API externa). */
const OFERTADOS = CONSELHOS.filter((c) => CONSELHOS_DISPONIVEIS.includes(c.id))
const searchConselhos = (termo) => {
  const q = normalizarTexto(termo)
  if (!q) return OFERTADOS
  return OFERTADOS.filter((c) => normalizarTexto(conselhoLabel(c)).includes(q))
}

function useDadosClasses() {
  const { data, patch } = useFunnel()
  const direto = data.origemPlano === 'landing'
  const step = direto ? '2/3' : '3/4'
  const back = direto ? BACK_LANDING : BACK_QUALIFICACAO
  // A profissão escolhida na Tela 03 já pré-seleciona o conselho (data injection).
  const conselhoInicial = findConselho(data.conselho)
  const [conselho, setConselho] = useState(conselhoInicial ? conselhoLabel(conselhoInicial) : '')
  const [conselhoId, setConselhoId] = useState(conselhoInicial?.id || null)
  const [registro, setRegistro] = useState(data.registroConselho || '')
  const [nomeFantasia, setNomeFantasia] = useState(data.nomeFantasia || '')
  const [erro, setErro] = useState('')
  const end = useEndereco(data)
  const soc = useSocios(data)

  const escolherConselho = (c) => { setConselho(conselhoLabel(c)); setConselhoId(c.id) }

  const submit = (e) => {
    e.preventDefault()
    if (!conselhoId) return setErro('Selecione o conselho de classe na lista.')
    if (!CONSELHOS_DISPONIVEIS.includes(conselhoId)) return setErro(AVISO_CATEGORIA)
    if (!end.completo) return setErro('Preencha o endereço completo onde exercerá a profissão (CEP, endereço, cidade, estado e país).')
    const erroSocios = soc.validar()
    if (erroSocios) return setErro(erroSocios)
    setErro('')
    patch({ ...end.valores, ...soc.valores, conselho: conselhoId, registroConselho: registro, nomeFantasia, planoSugerido: 'classes' })
    navigate(NEXT)
  }

  return { conselho, setConselho, conselhoId, escolherConselho, registro, setRegistro, nomeFantasia, setNomeFantasia, erro, submit, end, soc, step, back }
}

function Desktop() {
  const f = useDadosClasses()
  const extra = f.soc.temSocios === 'sim' ? 120 + f.soc.socios.length * 440 : 0
  const designH = BASE_H + extra
  return (
    <DesktopStage designW={DESIGN_W} designH={designH}>
      <Logo />
      <Watermark />
      <Title top={311}>{TITULO}</Title>
      <SectionSub left={169} top={395} width={1100}>{SUBTITULO}</SectionSub>
      <Divider left={169} top={529} />
      <SectionHeading left={169} top={565}>Identificação da Categoria</SectionHeading>
      <SectionSub left={169} top={614} width={1200}>O primeiro passo para construirmos uma parceria de sucesso.</SectionSub>

      <form onSubmit={f.submit}>
        <FormColumn top={700} width={807}>
          <FlowNote>⚠️ {AVISO_CATEGORIA}</FlowNote>
          <FlowAutocomplete
            id="conselho"
            label="Conselho de Classe / Profissão Regulamentada"
            placeholder="Busque pelo conselho (ex.: CRM, OAB, CREA)"
            value={f.conselho}
            onChange={f.setConselho}
            onSelect={f.escolherConselho}
            search={searchConselhos}
            itemLabel={conselhoLabel}
          />
          <FlowField
            id="registroConselho"
            label="Registro Profissional (opcional)"
            value={f.registro}
            onChange={(e) => f.setRegistro(e.target.value)}
            placeholder="Número de registro no conselho"
            hint="Caso ainda não tenha o registro ativo ou esteja em transição, pode deixar este campo em branco."
          />

          <FlowSection title="Dados de Constituição da Empresa">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 10 }}>
              <FlowField id="nomeFantasia" label="Nome Fantasia (opcional)" value={f.nomeFantasia} onChange={(e) => f.setNomeFantasia(e.target.value)} placeholder="Como sua empresa será conhecida" />
              <FlowRow>
                <FlowField flex={1} id="cep" label="CEP" value={f.end.cep} error={f.end.erroCep} hint={f.end.buscando ? 'Consultando o CEP…' : undefined} onChange={(e) => f.end.setCep(e.target.value)} placeholder="00000-000" inputMode="numeric" />
                <FlowField flex={2} id="cidade" label="Cidade" value={f.end.cidade} onChange={(e) => f.end.setCidade(e.target.value)} placeholder="Preenchida pelo CEP" />
              </FlowRow>
              <FlowRow>
                <FlowField flex={1} id="estado" label="Estado" value={f.end.estado} onChange={(e) => f.end.setEstado(e.target.value)} placeholder="UF" />
                <FlowField flex={1} id="pais" label="País" value={f.end.pais} onChange={(e) => f.end.setPais(e.target.value)} />
              </FlowRow>
              <FlowField id="endereco" label="Endereço da atividade" value={f.end.endereco} onChange={(e) => f.end.setEndereco(e.target.value)} placeholder="Rua, número, complemento e bairro" hint={INSTRUCAO_ENDERECO} />
            </div>
          </FlowSection>

          <FlowSection title="Estrutura Societária" sub="Define se a empresa terá sócios ou será constituída como empresa individual.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 10 }}>
              <SociosDesktop s={f.soc} aviso={AVISO_SOCIOS} />
            </div>
          </FlowSection>

          <FlowError>{f.erro}</FlowError>
          <FlowActions backHref={f.back} step={f.step} />
        </FormColumn>
      </form>

      <AssistantBar dividerTop={designH - 270} barTop={designH - 200} />
    </DesktopStage>
  )
}

function Mobile() {
  const f = useDadosClasses()
  return (
    <MobileShell back={f.back} align="left">
      <MTitle>{TITULO}</MTitle>
      <MSub>{SUBTITULO}</MSub>
      <MDivider />
      <MHeading>Identificação da Categoria</MHeading>
      <MSub>O primeiro passo para construirmos uma parceria de sucesso.</MSub>
      <MForm onSubmit={f.submit}>
        <MCard tone="light">
          <p style={{ color: 'var(--navy)', fontSize: 14, lineHeight: 1.45 }}>⚠️ {AVISO_CATEGORIA}</p>
        </MCard>
        <MAutocomplete id="conselho" label="Conselho de Classe / Profissão Regulamentada" placeholder="Busque pelo conselho (ex.: CRM, OAB, CREA)" value={f.conselho} onChange={f.setConselho} onSelect={f.escolherConselho} search={searchConselhos} itemLabel={conselhoLabel} />
        <MField id="registroConselho" label="Registro Profissional (opcional)" value={f.registro} onChange={(e) => f.setRegistro(e.target.value)} placeholder="Número de registro no conselho" hint="Caso ainda não tenha o registro ativo ou esteja em transição, pode deixar este campo em branco." />
      </MForm>

      <MSection title="Dados de Constituição da Empresa">
        <MField id="nomeFantasia" label="Nome Fantasia (opcional)" value={f.nomeFantasia} onChange={(e) => f.setNomeFantasia(e.target.value)} placeholder="Como sua empresa será conhecida" />
        <MField id="cep" label="CEP" value={f.end.cep} error={f.end.erroCep} hint={f.end.buscando ? 'Consultando o CEP…' : undefined} onChange={(e) => f.end.setCep(e.target.value)} placeholder="00000-000" inputMode="numeric" />
        <MField id="endereco" label="Endereço da atividade" value={f.end.endereco} onChange={(e) => f.end.setEndereco(e.target.value)} placeholder="Rua, número, complemento e bairro" hint={INSTRUCAO_ENDERECO} />
        <MField id="cidade" label="Cidade" value={f.end.cidade} onChange={(e) => f.end.setCidade(e.target.value)} />
        <MField id="estado" label="Estado" value={f.end.estado} onChange={(e) => f.end.setEstado(e.target.value)} />
        <MField id="pais" label="País" value={f.end.pais} onChange={(e) => f.end.setPais(e.target.value)} />
      </MSection>

      <MSection title="Estrutura Societária" sub="Define se a empresa terá sócios ou será constituída como empresa individual.">
        <SociosMobile s={f.soc} aviso={AVISO_SOCIOS} />
      </MSection>

      {f.erro && <span className="wz-error" style={{ marginTop: 16 }}>{f.erro}</span>}
      <MPrimaryButton step={f.step} type="button" onClick={f.submit}>Avançar</MPrimaryButton>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function DadosClasses() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
