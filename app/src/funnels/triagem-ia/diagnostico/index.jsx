import { useState } from 'react'
import { DesktopStage, Responsive, useFunnel, navigate, Logo, Watermark, MobileShell } from '../../../core/index.js'

// Tela 10 — Diagnóstico IA (Funil C). 4 perguntas consultivas; a classificação
// acontece em segundo plano (regra determinística) e joga o usuário no
// resultado certo (MEI / Simples / Classes). Frame do Figma: 1920 x 1400.
const DESIGN_W = 1920
const DESIGN_H = 1400

// Perguntas + opções (copy do Figma). Layout em fluxo — gap controla o espaçamento.
const QUESTIONS = [
  {
    id: 'faturamento',
    lead: 'Perfeito! Pergunta 1 de 4:',
    text: 'Qual é a estimativa de faturamento bruto do seu negócio por ano?',
    options: [
      { value: 'ate81', label: 'Até R$ 81 mil / ano' },
      { value: 'acima81', label: 'Acima de R$ 81 mil / ano' },
    ],
  },
  {
    id: 'regulamentada',
    lead: 'Ótimo. Pergunta 2 de 4:',
    text: 'A sua atividade exige formação superior e registro em conselho de classe (como CRM, OAB, CREA, CRP)?',
    options: [
      { value: 'sim', label: 'Sim, sou profissional liberal regulamentado' },
      { value: 'nao', label: 'Não, é uma atividade comum (Comércio, Serviços Gerais, TI)' },
    ],
  },
  {
    id: 'socios',
    lead: 'Entendido. Pergunta 3 de 4:',
    text: 'Em relação à estrutura dos donos, você terá sócios no negócio?',
    options: [
      { value: 'nao', label: 'Não, serei o único titular' },
      { value: 'sim', label: 'Sim, teremos mais sócios' },
    ],
  },
  {
    id: 'funcionarios',
    lead: 'Para finalizar! Pergunta 4 de 4:',
    text: 'Quantos funcionários registrados você planeja contratar inicialmente?',
    options: [
      { value: 'ate1', label: 'Nenhum ou no máximo 1 funcionário' },
      { value: '2mais', label: '2 ou mais funcionários' },
    ],
  },
]

// Classificação determinística (proxy da "IA"), conforme regra do Figma:
// - profissão regulamentada        → Classes
// - faturamento > 81k / sócios / 2+ funcionários → Simples
// - caso contrário                 → MEI
function classify(answers) {
  if (answers.regulamentada === 'sim') return 'classes'
  if (answers.faturamento === 'acima81' || answers.socios === 'sim' || answers.funcionarios === '2mais') return 'simples'
  return 'mei'
}

const RESULT_ROUTE = {
  mei: '#/descobrir-plano/resultado-mei',
  simples: '#/descobrir-plano/resultado-simples',
  classes: '#/descobrir-plano/resultado-classes',
}

function useQuiz() {
  const { patch } = useFunnel()
  const [answers, setAnswers] = useState({})
  const select = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }))
  const complete = QUESTIONS.every((q) => answers[q.id])
  const submit = () => {
    if (!complete) return
    const planoSugerido = classify(answers)
    patch({ planoSugerido, respostasTriagem: answers })
    navigate(RESULT_ROUTE[planoSugerido])
  }
  return { answers, select, complete, submit }
}

function Checkbox({ selected }) {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        flex: '0 0 22px',
        borderRadius: 5,
        border: `1px solid ${selected ? 'var(--teal)' : '#606062'}`,
        background: selected ? 'var(--teal)' : 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--white)',
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {selected ? '✓' : ''}
    </div>
  )
}

function Desktop() {
  const { answers, select, complete, submit } = useQuiz()
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo left={124} top={119} />
      <Watermark left={1089} top={199} />
      <h1 className="abs" style={{ left: 163, top: 300, color: 'var(--navy)', fontWeight: 700, fontSize: 48, letterSpacing: '-0.96px', whiteSpace: 'nowrap' }}>
        Meu tipo de Empresa
      </h1>
      <div className="abs" style={{ left: 163, top: 390, width: 320, height: 3, background: 'var(--teal)' }} />

      <div className="abs" style={{ left: 163, top: 430, width: 1200, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {QUESTIONS.map((q) => (
          <div key={q.id}>
            <p style={{ color: 'var(--teal)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.6px', lineHeight: 1.2, margin: 0 }}>{q.lead}</p>
            <p style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', lineHeight: 1.3, margin: '2px 0 0' }}>{q.text}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => select(q.id, opt.value)}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  <Checkbox selected={answers[q.id] === opt.value} />
                  <span style={{ color: 'var(--gray)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.6px' }}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 8 }}>
          <button
            type="button"
            onClick={submit}
            disabled={!complete}
            className="box-btn"
            style={{ width: 320, height: 56, background: 'var(--teal)', borderRadius: 8, border: 'none', color: 'var(--white)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.36px', cursor: complete ? 'pointer' : 'not-allowed', opacity: complete ? 1 : 0.5, boxShadow: '0px 4px 4px rgba(0,0,0,0.1)' }}
          >
            Descobrir meu perfil
          </button>
          <p style={{ color: '#868686', fontSize: 14, fontWeight: 600, letterSpacing: '-0.28px', margin: '12px 0 0' }}>2/4</p>
        </div>
      </div>
    </DesktopStage>
  )
}

function Mobile() {
  const { answers, select, complete, submit } = useQuiz()
  return (
    <MobileShell back="#/descobrir-plano" align="left">
      <h1 className="wz-title">Meu tipo de Empresa</h1>
      <div className="wz-divider" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
        {QUESTIONS.map((q) => (
          <div key={q.id}>
            <p style={{ color: 'var(--teal)', fontWeight: 700, fontSize: 15, margin: 0 }}>{q.lead}</p>
            <p style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 15, lineHeight: 1.3, margin: '2px 0 0' }}>{q.text}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => select(q.id, opt.value)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  <Checkbox selected={answers[q.id] === opt.value} />
                  <span style={{ color: 'var(--gray)', fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="wz-actions">
        <button type="button" className="wz-btn wz-btn--teal" onClick={submit} disabled={!complete} style={{ opacity: complete ? 1 : 0.5 }}>
          Descobrir meu perfil
        </button>
      </div>
    </MobileShell>
  )
}

export default function Diagnostico() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
