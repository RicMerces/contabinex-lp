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
  FlowRadio,
  FlowAutocomplete,
  FlowActions,
  FlowError,
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MSection,
  MForm,
  MField,
  MRadio,
  MAutocomplete,
  MPrimaryButton,
  MAssistantBar,
  MCard,
} from '../../../core/index.js'
import { searchCnae, cnaeLabel } from '../../../data/cnae.js'
import { maskCpf, isValidCpf } from '../../../utils/br.js'
import useEndereco from '../shared/useEndereco.js'
import useAtividades, { FORMAS_ATUACAO } from '../shared/useAtividades.js'
import { useSocios, SociosDesktop, SociosMobile } from '../shared/Socios.jsx'

// Tela 06 — Abrir Empresa (Plano Simples Nacional), etapa 3/4.
// Três seções: A) dados da empresa e atividade, B) estrutura societária,
// C) informações operacionais (pró-labore e contratação CLT).
// Origens: Tela 04A, alerta de CPF com CNPJ na Tela 05, ou escolha direta na landing.
const DESIGN_W = 1920
const BASE_H = 3150
const BACK = '#/abrir-empresa/qualificacao'
const NEXT = '#/abrir-empresa/confirmacao'

const TITULO = 'Plano Simples Nacional'
const SUBTITULO =
  'O caminho simples para empreender legalizado, com controle do próprio dinheiro e a certeza de que você está protegido pelo sistema.'

const PROLABORE = [
  { value: '1-salario', label: 'Apenas 01 Salário Mínimo (para fins de INSS)' },
  { value: 'acima-1-salario', label: 'Acima de 01 Salário Mínimo' },
  { value: 'sem-prolabore', label: 'Não haverá retirada de Pró-labore inicialmente' },
]
const CLT = [
  { value: 'nao', label: 'Não planejo contratar agora' },
  { value: '1-3', label: 'Sim, pretendo contratar de 1 a 3 funcionários' },
  { value: 'mais-3', label: 'Sim, pretendo contratar mais de 3 funcionários' },
]

function useDadosEmpresa() {
  const { data, patch } = useFunnel()
  const [cpf, setCpfState] = useState(data.cpf || '')
  const [erroCpf, setErroCpf] = useState('')
  const [razaoSocial, setRazaoSocial] = useState(data.razaoSocial || '')
  const [nomeFantasia, setNomeFantasia] = useState(data.nomeFantasia || '')
  const [formaAtuacao, setFormaAtuacao] = useState(data.formaAtuacao || '')
  const [prolabore, setProlabore] = useState(data.prolabore || '')
  const [clt, setClt] = useState(data.clt || '')
  const [erro, setErro] = useState('')
  const end = useEndereco(data)
  const ativ = useAtividades(data)
  const soc = useSocios(data)

  const setCpf = (valor) => {
    const v = maskCpf(valor)
    setCpfState(v)
    setErroCpf(v.replace(/\D/g, '').length === 11 && !isValidCpf(v) ? 'CPF inválido. Confira os números digitados.' : '')
  }

  const submit = (e) => {
    e.preventDefault()
    if (!isValidCpf(cpf)) return setErro('Informe um CPF válido para continuar.')
    if (!razaoSocial.trim()) return setErro('Informe a Razão Social da empresa.')
    if (!ativ.cnaePrincipal) return setErro('Selecione a atividade principal (CNAE) na lista de sugestões.')
    if (!end.completo) return setErro('Preencha o endereço completo da atividade (CEP, endereço, cidade, estado e país).')
    if (!formaAtuacao) return setErro('Selecione a forma de atuação do seu negócio.')
    const erroSocios = soc.validar()
    if (erroSocios) return setErro(erroSocios)
    if (!prolabore) return setErro('Informe a estimativa de retirada de pró-labore.')
    if (!clt) return setErro('Informe a previsão de contratação de funcionários.')
    setErro('')
    patch({ ...ativ.valores, ...end.valores, ...soc.valores, cpf, razaoSocial, nomeFantasia, formaAtuacao, prolabore, clt, planoSugerido: 'simples' })
    navigate(NEXT)
  }

  return { cpf, setCpf, erroCpf, razaoSocial, setRazaoSocial, nomeFantasia, setNomeFantasia, formaAtuacao, setFormaAtuacao, prolabore, setProlabore, clt, setClt, erro, submit, end, ativ, soc }
}

function Chips({ itens, onRemove }) {
  if (!itens.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {itens.map((l) => (
        <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--teal-light)', color: 'var(--navy)', borderRadius: 20, padding: '8px 16px', fontSize: 16, fontWeight: 600 }}>
          {l}
          <button type="button" onClick={() => onRemove(l)} aria-label={`Remover ${l}`} style={{ color: 'var(--gray)', fontWeight: 700 }}>×</button>
        </span>
      ))}
    </div>
  )
}

function Desktop() {
  const f = useDadosEmpresa()
  const extra = f.soc.temSocios === 'sim' ? 120 + f.soc.socios.length * 440 : 0
  const designH = BASE_H + extra
  return (
    <DesktopStage designW={DESIGN_W} designH={designH}>
      <Logo />
      <Watermark />
      <Title top={311}>{TITULO}</Title>
      <SectionSub left={169} top={395} width={1100}>{SUBTITULO}</SectionSub>
      <Divider left={169} top={529} />
      <SectionHeading left={169} top={565}>Dados da Empresa e Atividade</SectionHeading>
      <SectionSub left={169} top={614} width={1200}>O primeiro passo para construirmos uma parceria de sucesso.</SectionSub>

      <form onSubmit={f.submit}>
        <FormColumn top={700} width={807}>
          <FlowField id="cpf" label="Seu CPF" value={f.cpf} error={f.erroCpf} onChange={(e) => f.setCpf(e.target.value)} placeholder="000.000.000-00" inputMode="numeric" />
          <FlowField id="razaoSocial" label="Razão Social" value={f.razaoSocial} onChange={(e) => f.setRazaoSocial(e.target.value)} placeholder="Ex: Contabinex Serviços Contábeis Ltda" />
          <FlowField id="nomeFantasia" label="Nome Fantasia (opcional)" value={f.nomeFantasia} onChange={(e) => f.setNomeFantasia(e.target.value)} placeholder="Como sua empresa será conhecida" />

          <FlowAutocomplete
            id="atividade"
            label="Atividade principal (CNAE)"
            placeholder="Digite a atividade ou o código CNAE"
            hint="Base CNAE — digite ao menos 3 caracteres e escolha na lista."
            value={f.ativ.principal}
            onChange={f.ativ.setPrincipal}
            onSelect={(item) => f.ativ.setPrincipal(cnaeLabel(item))}
            search={searchCnae}
            itemLabel={cnaeLabel}
          />
          <FlowAutocomplete
            id="atividadesSecundarias"
            label="Atividades secundárias (se houver)"
            placeholder="Busque e selecione para adicionar"
            value={f.ativ.termo}
            onChange={f.ativ.setTermo}
            onSelect={f.ativ.adicionarSecundaria}
            search={searchCnae}
            itemLabel={cnaeLabel}
          />
          <Chips itens={f.ativ.secundarias} onRemove={f.ativ.removerSecundaria} />

          <FlowRow>
            <FlowField flex={1} id="cep" label="CEP" value={f.end.cep} error={f.end.erroCep} hint={f.end.buscando ? 'Consultando o CEP…' : undefined} onChange={(e) => f.end.setCep(e.target.value)} placeholder="00000-000" inputMode="numeric" />
            <FlowField flex={2} id="cidade" label="Cidade" value={f.end.cidade} onChange={(e) => f.end.setCidade(e.target.value)} placeholder="Preenchida pelo CEP" />
          </FlowRow>
          <FlowRow>
            <FlowField flex={1} id="estado" label="Estado" value={f.end.estado} onChange={(e) => f.end.setEstado(e.target.value)} placeholder="UF" />
            <FlowField flex={1} id="pais" label="País" value={f.end.pais} onChange={(e) => f.end.setPais(e.target.value)} />
          </FlowRow>
          <FlowField id="endereco" label="Endereço da atividade" value={f.end.endereco} onChange={(e) => f.end.setEndereco(e.target.value)} placeholder="Rua, número, complemento e bairro" />

          <FlowField id="formaAtuacao" label="Forma de atuação" as="select" value={f.formaAtuacao} onChange={(e) => f.setFormaAtuacao(e.target.value)}>
            <option value="" disabled>Selecione…</option>
            {FORMAS_ATUACAO.map((o) => <option key={o} value={o}>{o}</option>)}
          </FlowField>

          <FlowSection title="Estrutura Societária" sub="Define se a empresa terá sócios ou será constituída como empresa individual.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 10 }}>
              <SociosDesktop s={f.soc} aviso="Cadastre todos os sócios, incluindo você. A soma das participações deve totalizar 100%." />
            </div>
          </FlowSection>

          <FlowSection title="Informações Operacionais Complementares" sub="Usamos estas respostas para o planejamento tributário e o enquadramento fiscal adequado.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 10 }}>
              <FlowRadio legend="Qual a estimativa de retirada de Pró-labore dos sócios?" options={PROLABORE} value={f.prolabore} onChange={f.setProlabore} />
              <FlowRadio legend="Você pretende contratar funcionários registrados (CLT) nos próximos meses?" options={CLT} value={f.clt} onChange={f.setClt} />
            </div>
          </FlowSection>

          <FlowError>{f.erro}</FlowError>
          <FlowActions backHref={BACK} step="3/4" />
        </FormColumn>
      </form>

      <AssistantBar dividerTop={designH - 270} barTop={designH - 200} />
    </DesktopStage>
  )
}

function Mobile() {
  const f = useDadosEmpresa()
  return (
    <MobileShell back={BACK} align="left">
      <MTitle>{TITULO}</MTitle>
      <MSub>{SUBTITULO}</MSub>
      <MDivider />
      <MHeading>Dados da Empresa e Atividade</MHeading>
      <MSub>O primeiro passo para construirmos uma parceria de sucesso.</MSub>
      <MForm onSubmit={f.submit}>
        <MField id="cpf" label="Seu CPF" value={f.cpf} error={f.erroCpf} onChange={(e) => f.setCpf(e.target.value)} placeholder="000.000.000-00" inputMode="numeric" />
        <MField id="razaoSocial" label="Razão Social" value={f.razaoSocial} onChange={(e) => f.setRazaoSocial(e.target.value)} placeholder="Ex: Contabinex Serviços Contábeis Ltda" />
        <MField id="nomeFantasia" label="Nome Fantasia (opcional)" value={f.nomeFantasia} onChange={(e) => f.setNomeFantasia(e.target.value)} placeholder="Como sua empresa será conhecida" />
        <MAutocomplete id="atividade" label="Atividade principal (CNAE)" placeholder="Digite a atividade ou o código CNAE" hint="Digite ao menos 3 caracteres e escolha na lista." value={f.ativ.principal} onChange={f.ativ.setPrincipal} onSelect={(item) => f.ativ.setPrincipal(cnaeLabel(item))} search={searchCnae} itemLabel={cnaeLabel} />
        <MAutocomplete id="atividadesSecundarias" label="Atividades secundárias (se houver)" placeholder="Busque e selecione para adicionar" value={f.ativ.termo} onChange={f.ativ.setTermo} onSelect={f.ativ.adicionarSecundaria} search={searchCnae} itemLabel={cnaeLabel} />
        {f.ativ.secundarias.length > 0 && (
          <MCard tone="light">
            {f.ativ.secundarias.map((l) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, color: 'var(--navy)' }}>
                <span>{l}</span>
                <button type="button" onClick={() => f.ativ.removerSecundaria(l)} aria-label={`Remover ${l}`} style={{ fontWeight: 700 }}>×</button>
              </div>
            ))}
          </MCard>
        )}
        <MField id="cep" label="CEP" value={f.end.cep} error={f.end.erroCep} hint={f.end.buscando ? 'Consultando o CEP…' : undefined} onChange={(e) => f.end.setCep(e.target.value)} placeholder="00000-000" inputMode="numeric" />
        <MField id="endereco" label="Endereço da atividade" value={f.end.endereco} onChange={(e) => f.end.setEndereco(e.target.value)} placeholder="Rua, número, complemento e bairro" />
        <MField id="cidade" label="Cidade" value={f.end.cidade} onChange={(e) => f.end.setCidade(e.target.value)} />
        <MField id="estado" label="Estado" value={f.end.estado} onChange={(e) => f.end.setEstado(e.target.value)} />
        <MField id="pais" label="País" value={f.end.pais} onChange={(e) => f.end.setPais(e.target.value)} />
        <MField id="formaAtuacao" label="Forma de atuação" as="select" value={f.formaAtuacao} onChange={(e) => f.setFormaAtuacao(e.target.value)}>
          <option value="" disabled>Selecione…</option>
          {FORMAS_ATUACAO.map((o) => <option key={o} value={o}>{o}</option>)}
        </MField>
      </MForm>

      <MSection title="Estrutura Societária" sub="Define se a empresa terá sócios ou será constituída como empresa individual.">
        <SociosMobile s={f.soc} aviso="Cadastre todos os sócios, incluindo você. A soma das participações deve totalizar 100%." />
      </MSection>

      <MSection title="Informações Operacionais Complementares" sub="Usamos estas respostas para o planejamento tributário e o enquadramento fiscal adequado.">
        <MRadio legend="Qual a estimativa de retirada de Pró-labore dos sócios?" options={PROLABORE} value={f.prolabore} onChange={f.setProlabore} />
        <MRadio legend="Você pretende contratar funcionários registrados (CLT) nos próximos meses?" options={CLT} value={f.clt} onChange={f.setClt} />
      </MSection>

      {f.erro && <span className="wz-error" style={{ marginTop: 16 }}>{f.erro}</span>}
      <MPrimaryButton step="3/4" onClick={f.submit} type="button">Avançar</MPrimaryButton>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function DadosEmpresa() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
