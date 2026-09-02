import { useState } from 'react'
import { FlowField, FlowRow, FlowNote, FlowRadio, MRadio, MField, MCard } from '../../../core/index.js'
import { maskCpf, maskPercent, isValidCpf, isValidEmail } from '../../../utils/br.js'

// Seção "Estrutura Societária" — compartilhada pelas Telas 06 (Simples
// Nacional) e 06/1 (Classes Profissionais). Regra de negócio: a soma das
// participações de todos os sócios (incluindo o titular) tem de dar 100%.

export const OPCOES_SOCIOS = [
  { value: 'nao', label: 'Não, serei o único titular (SLU / Empresa Individual)' },
  { value: 'sim', label: 'Sim, teremos mais sócios' },
]

const vazio = () => ({ nome: '', cpf: '', participacao: '', email: '' })

export function useSocios(data = {}) {
  const [temSocios, setTemSocios] = useState(data.temSocios || '')
  const [socios, setSocios] = useState(() => (data.socios?.length ? data.socios : [vazio(), vazio()]))

  const atualizar = (i, campo, valor) =>
    setSocios((prev) => prev.map((s, idx) => (idx === i ? { ...s, [campo]: valor } : s)))
  const adicionar = () => setSocios((prev) => [...prev, vazio()])
  const remover = (i) => setSocios((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev))

  const total = socios.reduce((acc, s) => acc + (Number(s.participacao) || 0), 0)

  /** @returns {string} mensagem de erro, ou '' se a seção está válida. */
  const validar = () => {
    if (!temSocios) return 'Informe se a empresa terá sócios.'
    if (temSocios === 'nao') return ''
    for (const s of socios) {
      if (!s.nome.trim()) return 'Preencha o nome completo de todos os sócios.'
      if (!isValidCpf(s.cpf)) return 'Há um CPF de sócio inválido. Confira os números informados.'
      if (!isValidEmail(s.email)) return 'Há um e-mail de sócio em formato inválido.'
      if (!s.participacao) return 'Informe a participação no capital social de cada sócio.'
    }
    if (total !== 100) return `A soma das participações precisa totalizar 100% (hoje: ${total}%).`
    return ''
  }

  const valores = { temSocios, socios: temSocios === 'sim' ? socios : [] }

  return { temSocios, setTemSocios, socios, atualizar, adicionar, remover, total, validar, valores }
}

/** Renderização desktop (dentro de um <FormColumn>). */
export function SociosDesktop({ s, aviso }) {
  return (
    <>
      <FlowRadio legend="Sua empresa terá sócios?" options={OPCOES_SOCIOS} value={s.temSocios} onChange={s.setTemSocios} />
      {s.temSocios === 'sim' && (
        <>
          {aviso && <FlowNote>{aviso}</FlowNote>}
          {s.socios.map((socio, i) => (
            <div key={i} style={{ border: '1px solid var(--teal)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 22 }}>Sócio {i + 1}</span>
                {s.socios.length > 1 && (
                  <button type="button" onClick={() => s.remover(i)} style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 16, textDecoration: 'underline' }}>
                    Remover
                  </button>
                )}
              </div>
              <FlowField id={`socio-nome-${i}`} label="Nome completo do sócio" value={socio.nome} onChange={(e) => s.atualizar(i, 'nome', e.target.value)} placeholder="Nome como consta no CPF" />
              <FlowRow>
                <FlowField flex={1} id={`socio-cpf-${i}`} label="CPF do sócio" value={socio.cpf} onChange={(e) => s.atualizar(i, 'cpf', maskCpf(e.target.value))} placeholder="000.000.000-00" inputMode="numeric" />
                <FlowField flex={1} id={`socio-part-${i}`} label="Participação no capital social (%)" value={socio.participacao} onChange={(e) => s.atualizar(i, 'participacao', maskPercent(e.target.value))} placeholder="Ex.: 50" inputMode="numeric" />
              </FlowRow>
              <FlowField id={`socio-email-${i}`} label="E-mail do sócio" type="email" value={socio.email} onChange={(e) => s.atualizar(i, 'email', e.target.value)} placeholder="socio@email.com" />
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <button type="button" onClick={s.adicionar} className="box-btn box-btn--outline" style={{ padding: '0 28px', height: 49, background: 'var(--white)', border: '1px solid var(--teal)', borderRadius: 5, color: 'var(--teal)', fontWeight: 600, fontSize: 20 }}>
              [ Adicionar Outro Sócio ]
            </button>
            <span style={{ color: s.total === 100 ? 'var(--teal)' : 'var(--gray)', fontWeight: 700, fontSize: 20 }}>
              Total: {s.total}% de 100%
            </span>
          </div>
        </>
      )}
    </>
  )
}

/** Renderização móvel. */
export function SociosMobile({ s, aviso }) {
  return (
    <>
      <MRadio legend="Sua empresa terá sócios?" options={OPCOES_SOCIOS} value={s.temSocios} onChange={s.setTemSocios} />
      {s.temSocios === 'sim' && (
        <>
          {aviso && <MCard tone="light"><p style={{ color: 'var(--navy)', fontSize: 14, lineHeight: 1.45 }}>{aviso}</p></MCard>}
          {s.socios.map((socio, i) => (
            <MCard key={i} tone="outline" title={`Sócio ${i + 1}`}>
              <MField id={`socio-nome-${i}`} label="Nome completo" value={socio.nome} onChange={(e) => s.atualizar(i, 'nome', e.target.value)} placeholder="Nome como consta no CPF" />
              <MField id={`socio-cpf-${i}`} label="CPF" value={socio.cpf} onChange={(e) => s.atualizar(i, 'cpf', maskCpf(e.target.value))} placeholder="000.000.000-00" inputMode="numeric" />
              <MField id={`socio-part-${i}`} label="Participação no capital social (%)" value={socio.participacao} onChange={(e) => s.atualizar(i, 'participacao', maskPercent(e.target.value))} placeholder="Ex.: 50" inputMode="numeric" />
              <MField id={`socio-email-${i}`} label="E-mail" type="email" value={socio.email} onChange={(e) => s.atualizar(i, 'email', e.target.value)} placeholder="socio@email.com" />
              {s.socios.length > 1 && (
                <button type="button" onClick={() => s.remover(i)} style={{ alignSelf: 'flex-start', color: 'var(--gray)', fontWeight: 600, fontSize: 14, textDecoration: 'underline' }}>
                  Remover sócio
                </button>
              )}
            </MCard>
          ))}
          <div className="wz-actions">
            <button type="button" className="wz-btn wz-btn--outline" onClick={s.adicionar}>[ Adicionar Outro Sócio ]</button>
            <span className="wz-step" style={{ color: s.total === 100 ? 'var(--teal)' : 'var(--gray)' }}>Total: {s.total}% de 100%</span>
          </div>
        </>
      )}
    </>
  )
}
