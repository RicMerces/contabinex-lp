import { logoContabinex, watermarkCx } from '../assets/index.js'
import useStageScale from '../hooks/useStageScale.js'

// Telas 02-B / 02-C — Captura de Lead (etapa 1/4). Layout idêntico entre as
// variantes; muda apenas o título. Frame do Figma: 1920 x 1700.
const DESIGN_W = 1920
const DESIGN_H = 1700

const VARIANTS = {
  // → Funil B / Troca de Contador
  contador: {
    titleTop: 'Vamos iniciar a',
    titleBottom: 'sua troca de contador',
  },
  // → Funil C / Entender o negócio (empresa)
  empresa: {
    titleTop: 'Vamos começar a',
    titleBottom: 'entender o seu negócio',
  },
}

const FIELDS = [
  { id: 'nome', label: 'Nome completo', labelLeft: 165, labelTop: 710, inputTop: 743, type: 'text', autoComplete: 'name', placeholder: 'Seu nome completo' },
  { id: 'email', label: 'E-mail', labelLeft: 174, labelTop: 847, inputTop: 878, type: 'email', autoComplete: 'email', placeholder: 'voce@email.com' },
  { id: 'celular', label: 'Celular', labelLeft: 174, labelTop: 983, inputTop: 1013, type: 'tel', autoComplete: 'tel', placeholder: '(00) 00000-0000' },
]

const GRAY = '#606062'
const BORDER = '#868686'

export default function LeadCapture({ variant = 'empresa' }) {
  const v = VARIANTS[variant] || VARIANTS.empresa
  const { canvasRef, scale } = useStageScale(DESIGN_W, DESIGN_H)

  const onSubmit = (e) => {
    e.preventDefault()
    // Próxima etapa do funil ainda não implementada (etapa 1/4).
  }

  return (
    <div className="canvas" ref={canvasRef}>
      <div className="stage" style={{ transform: `scale(${scale})`, height: DESIGN_H }}>
        {/* Logo (volta para a landing) */}
        <a className="abs" href="#/" style={{ left: 127, top: 124, width: 414, height: 120 }}>
          <img src={logoContabinex} alt="CONTABINEX — página inicial" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </a>

        {/* Marca d'água CX */}
        <div
          className="abs"
          style={{ left: 1088, top: 204, width: 788, height: 445, opacity: 0.5, overflow: 'hidden', pointerEvents: 'none', filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.1))' }}
        >
          <img src={watermarkCx} alt="" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Título */}
        <h1
          className="abs"
          style={{ left: 166, top: 335, color: 'var(--navy)', fontWeight: 700, fontSize: 48, lineHeight: 'normal', letterSpacing: '-0.96px', whiteSpace: 'nowrap' }}
        >
          {v.titleTop}
          <br />
          {v.titleBottom}
        </h1>

        {/* Divisória */}
        <div className="abs" style={{ left: 168, top: 525, width: 320, height: 3, background: 'var(--teal)' }} />

        {/* Subtítulos */}
        <p className="abs" style={{ left: 165, top: 562, color: GRAY, fontWeight: 600, fontSize: 32, letterSpacing: '-0.96px', whiteSpace: 'nowrap' }}>
          Dados Pessoais e Acesso
        </p>
        <p className="abs" style={{ left: 166, top: 610, color: GRAY, fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', whiteSpace: 'nowrap' }}>
          Preencha os dados abaixo para iniciar sua jornada digital.
        </p>

        {/* Formulário */}
        <form onSubmit={onSubmit}>
          {FIELDS.map((f) => (
            <div key={f.id}>
              <label
                htmlFor={`lead-${f.id}`}
                className="abs"
                style={{ left: f.labelLeft, top: f.labelTop, color: GRAY, fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}
              >
                {f.label}
              </label>
              <input
                id={`lead-${f.id}`}
                name={f.id}
                type={f.type}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                className="abs lead-input"
                style={{ left: 165, top: f.inputTop, width: 807, height: 75, border: `1px solid ${BORDER}`, borderRadius: 10 }}
              />
            </div>
          ))}

          {/* Ação: Avançar + passo 1/4 */}
          <button
            type="submit"
            className="abs lead-next"
            style={{ left: 835, top: 1170, width: 137, height: 49, background: 'var(--teal)', borderRadius: 5, color: 'var(--white)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px' }}
          >
            Avançar
          </button>
          <span
            className="abs"
            style={{ left: 1014, top: 1170, color: 'var(--teal)', fontWeight: 600, fontSize: 40, letterSpacing: '-1.2px', lineHeight: '49px', whiteSpace: 'nowrap' }}
          >
            1/4
          </span>
        </form>

        {/* Divisória inferior */}
        <div className="abs" style={{ left: 317, top: 1480, width: 1286, height: 3, background: 'var(--teal)' }} />

        {/* Atalho para assistente */}
        <a
          className="abs lead-assistant"
          href="#/"
          style={{ left: 677, top: 1548, width: 566, height: 75, background: 'var(--teal-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ color: GRAY, fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', whiteSpace: 'nowrap' }}>
            Clique aqui para falar com um assistente
          </span>
        </a>
      </div>
    </div>
  )
}
