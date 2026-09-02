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
  FlowField,
  FlowAutocomplete,
  FlowActions,
  FlowError,
  Modal,
  ModalCta,
  ModalLink,
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MForm,
  MField,
  MAutocomplete,
  MPrimaryButton,
  MAssistantBar,
  MCard,
} from '../../../core/index.js'
import { searchCnae, cnaeLabel } from '../../../data/cnae.js'
import { maskCpf, isValidCpf } from '../../../utils/br.js'
import { consultarCpf } from '../../../services/receita.js'
import useEndereco from '../shared/useEndereco.js'
import useAtividades, { FORMAS_ATUACAO } from '../shared/useAtividades.js'

// Tela 05 — Abrir Empresa (Plano MEI), etapa 3/4.
// Dados da empresa e atividade + endereço (ViaCEP). Ao completar o CPF,
// consultamos a Receita Federal: se já houver CNPJ vinculado, o modal
// redireciona a jornada para o Simples Nacional (Tela 06).
const DESIGN_W = 1920
const DESIGN_H = 2250
const BACK = '#/abrir-empresa/qualificacao'
const NEXT = '#/abrir-empresa/processando'
const SIMPLES = '#/abrir-empresa/dados-empresa'

const TITULO = 'Plano MEI'
const SUBTITULO =
  'O caminho simples para empreender legalizado, com controle do próprio dinheiro e a certeza de que você está protegido pelo sistema.'

/** Estado, validação e navegação — compartilhados entre desktop e mobile. */
function useDadosMei() {
  const { data, patch } = useFunnel()
  const [cpf, setCpfState] = useState(data.cpf || '')
  const [erroCpf, setErroCpf] = useState('')
  const [nomeFantasia, setNomeFantasia] = useState(data.nomeFantasia || '')
  const [formaAtuacao, setFormaAtuacao] = useState(data.formaAtuacao || '')
  const [erro, setErro] = useState('')
  const [modalCnpj, setModalCnpj] = useState(false)
  const end = useEndereco(data)
  const ativ = useAtividades(data)

  const setCpf = async (valor) => {
    const v = maskCpf(valor)
    setCpfState(v)
    setErroCpf('')
    if (v.replace(/\D/g, '').length < 11) return
    if (!isValidCpf(v)) return setErroCpf('CPF inválido. Confira os números digitados.')
    // Consulta Receita Federal: CPF já vinculado a um CNPJ ativo?
    const { possuiCnpj } = await consultarCpf(v)
    if (possuiCnpj) setModalCnpj(true)
  }

  const irParaSimples = () => {
    patch({ ...ativ.valores, ...end.valores, cpf, nomeFantasia, formaAtuacao, planoSugerido: 'simples', origemPlano: 'cpf-com-cnpj' })
    navigate(SIMPLES)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!isValidCpf(cpf)) return setErro('Informe um CPF válido para continuar.')
    if (!ativ.cnaePrincipal) return setErro('Selecione a atividade principal (CNAE) na lista de sugestões.')
    if (!end.completo) return setErro('Preencha o endereço completo da atividade (CEP, endereço, cidade, estado e país).')
    if (!formaAtuacao) return setErro('Selecione a forma de atuação do seu negócio.')
    setErro('')
    patch({ ...ativ.valores, ...end.valores, cpf, nomeFantasia, formaAtuacao, planoSugerido: 'mei' })
    navigate(NEXT)
  }

  return { cpf, setCpf, erroCpf, nomeFantasia, setNomeFantasia, formaAtuacao, setFormaAtuacao, erro, modalCnpj, setModalCnpj, irParaSimples, submit, end, ativ }
}

/** Lista das atividades secundárias já escolhidas. */
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
  const f = useDadosMei()
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
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

          <FlowError>{f.erro}</FlowError>
          <FlowActions backHref={BACK} step="3/4" />
        </FormColumn>
      </form>

      <AssistantBar dividerTop={2020} barTop={2090} />

      {f.modalCnpj && (
        <Modal
          heading="CPF vinculado a CNPJ existente"
          body="Com base nos dados informados, seu CPF consta como vinculado a um CNPJ já existente, o que impossibilita a abertura no regime de Microempreendedor Individual (MEI). Para garantir a total segurança fiscal e a regularidade da sua empresa perante a Receita Federal, sua jornada foi atualizada automaticamente para o Plano Simples Nacional (Microempresa)."
          designW={DESIGN_W}
          designH={DESIGN_H}
          actions={
            <>
              <ModalCta onClick={f.irParaSimples}>Ir para plano Simples Nacional</ModalCta>
              <ModalLink onClick={() => f.setModalCnpj(false)}>Voltar e corrigir meus dados</ModalLink>
            </>
          }
        />
      )}
    </DesktopStage>
  )
}

function Mobile() {
  const f = useDadosMei()
  if (f.modalCnpj) {
    return (
      <MobileShell back={null} align="center">
        <MTitle>CPF vinculado a CNPJ existente</MTitle>
        <MSub>
          Com base nos dados informados, seu CPF consta como vinculado a um CNPJ já existente, o que impossibilita a abertura no regime de Microempreendedor Individual (MEI). Para garantir a total segurança fiscal e a regularidade da sua empresa perante a Receita Federal, sua jornada foi atualizada automaticamente para o Plano Simples Nacional (Microempresa).
        </MSub>
        <div className="wz-actions">
          <button type="button" className="wz-btn wz-btn--teal" onClick={f.irParaSimples}>Ir para plano Simples Nacional</button>
          <button type="button" className="wz-step" style={{ textDecoration: 'underline' }} onClick={() => f.setModalCnpj(false)}>Voltar e corrigir meus dados</button>
        </div>
      </MobileShell>
    )
  }
  return (
    <MobileShell back={BACK} align="left">
      <MTitle>{TITULO}</MTitle>
      <MSub>{SUBTITULO}</MSub>
      <MDivider />
      <MHeading>Dados da Empresa e Atividade</MHeading>
      <MSub>O primeiro passo para construirmos uma parceria de sucesso.</MSub>
      <MForm onSubmit={f.submit}>
        <MField id="cpf" label="Seu CPF" value={f.cpf} error={f.erroCpf} onChange={(e) => f.setCpf(e.target.value)} placeholder="000.000.000-00" inputMode="numeric" />
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
        {f.erro && <span className="wz-error">{f.erro}</span>}
        <MPrimaryButton step="3/4">Avançar</MPrimaryButton>
      </MForm>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function DadosMei() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
