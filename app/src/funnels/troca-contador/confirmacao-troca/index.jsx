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
  FlowError,
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MCard,
  MSteps,
  MPrimaryButton,
  MAssistantBar,
} from '../../../core/index.js'

// Tela 07/1 — Confirmação da Troca de Contador (etapa 3/4).
// Exibe os dados retornados pela Receita Federal (somente leitura) e coleta o
// aceite do termo de autorização. Situação cadastral diferente de ATIVA
// bloqueia o avanço.
const DESIGN_W = 1920
const DESIGN_H = 1900
const CONFIRM = '#/trocar-contador/confirmacao'
const CANCEL = '#/trocar-contador/validacao'

const TITULO = 'Empresa Localizada com Sucesso!'
const SUBTITULO = 'Confirme os dados abaixo antes de prosseguir'
const AUTORIZACOES = [
  'Iniciar o processo de migração da sua escrita contábil',
  'Solicitar a transferência de responsabilidade junto à Receita Federal',
  'Contatar o seu contador anterior para solicitar os documentos necessários',
]
const BLOQUEIO =
  'A situação cadastral desta empresa não está ATIVA na Receita Federal. Fale com o nosso suporte para regularizar antes de seguir com a troca de contador.'

function useConfirmacao() {
  const { data, patch } = useFunnel()
  const empresa = data.empresa || {}
  const ativa = (empresa.situacao || '').toUpperCase() === 'ATIVA'
  const [erro, setErro] = useState('')

  const confirmar = () => {
    if (!ativa) return setErro(BLOQUEIO)
    // O aceite tem valor jurídico: o backend deve registrar data/hora e IP.
    patch({ autorizacaoTroca: true })
    navigate(CONFIRM)
  }

  return { empresa, ativa, erro, confirmar }
}

/** Linha "rótulo → valor" dos dados vindos da Receita Federal. */
function Dado({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.5px' }}>{label}</span>
      <span style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.6px' }}>{value || '—'}</span>
    </div>
  )
}

function Badge({ ativa, children }) {
  return (
    <span style={{ alignSelf: 'flex-start', background: ativa ? 'var(--teal)' : '#c0392b', color: 'var(--white)', fontWeight: 700, fontSize: 18, letterSpacing: '0.5px', padding: '8px 18px', borderRadius: 20 }}>
      {children}
    </span>
  )
}

function Desktop() {
  const f = useConfirmacao()
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title left={170} top={333} width={1200}>{TITULO}</Title>
      <SectionSub left={170} top={411} width={1100}>{SUBTITULO}</SectionSub>

      <Divider left={170} top={570} />
      <SectionHeading left={170} top={595}>Dados encontrados na Receita Federal</SectionHeading>

      <FormColumn left={170} top={680} width={900} gap={28}>
        <div style={{ background: 'var(--teal-light)', borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Dado label="Razão Social" value={f.empresa.razaoSocial} />
          <Dado label="CNPJ" value={f.empresa.cnpj} />
          <Dado label="Endereço" value={f.empresa.endereco} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 18 }}>Situação Cadastral</span>
            <Badge ativa={f.ativa}>{f.empresa.situacao || 'INDISPONÍVEL'}</Badge>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.84px' }}>Termo de Autorização</p>
          <p style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 22 }}>Ao confirmar, você autoriza a CONTABINEX a:</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {AUTORIZACOES.map((t) => (
              <li key={t} style={{ display: 'flex', gap: 14, color: 'var(--gray)', fontSize: 22, lineHeight: 1.4 }}>
                <span style={{ color: 'var(--teal)', fontWeight: 700 }}>•</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <FlowError>{f.erro}</FlowError>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button type="button" onClick={f.confirmar} className="box-btn" style={{ height: 75, padding: '0 40px', background: 'var(--teal)', borderRadius: 10, color: 'var(--white)', fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center' }}>
            Confirmar Troca de Contador
          </button>
          <a href={CANCEL} className="box-btn box-btn--outline" style={{ height: 75, padding: '0 40px', background: 'var(--white)', border: '1px solid var(--teal)', borderRadius: 10, color: 'var(--gray)', fontWeight: 600, fontSize: 20, display: 'flex', alignItems: 'center' }}>
            Cancelar
          </a>
          <span style={{ color: 'var(--teal)', fontWeight: 600, fontSize: 40, letterSpacing: '-1.2px', lineHeight: '75px' }}>3/4</span>
        </div>
      </FormColumn>

      <AssistantBar dividerTop={1650} barTop={1718} />
    </DesktopStage>
  )
}

function Mobile() {
  const f = useConfirmacao()
  return (
    <MobileShell back={CANCEL} align="left">
      <MTitle>{TITULO}</MTitle>
      <MSub>{SUBTITULO}</MSub>
      <MDivider />
      <MHeading>Dados encontrados na Receita Federal</MHeading>
      <MCard tone="light">
        <div><strong style={{ color: 'var(--navy)' }}>Razão Social</strong><p>{f.empresa.razaoSocial || '—'}</p></div>
        <div><strong style={{ color: 'var(--navy)' }}>CNPJ</strong><p>{f.empresa.cnpj || '—'}</p></div>
        <div><strong style={{ color: 'var(--navy)' }}>Endereço</strong><p>{f.empresa.endereco || '—'}</p></div>
        <Badge ativa={f.ativa}>{f.empresa.situacao || 'INDISPONÍVEL'}</Badge>
      </MCard>
      <MHeading>Termo de Autorização</MHeading>
      <MSub>Ao confirmar, você autoriza a CONTABINEX a:</MSub>
      <MSteps items={AUTORIZACOES} />
      {f.erro && <span className="wz-error" style={{ marginTop: 16 }}>{f.erro}</span>}
      <MPrimaryButton step="3/4" type="button" onClick={f.confirmar}>Confirmar Troca de Contador</MPrimaryButton>
      <MPrimaryButton href={CANCEL} variant="outline">Cancelar</MPrimaryButton>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function ConfirmacaoTroca() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
