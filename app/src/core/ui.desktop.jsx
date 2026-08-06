import { logoContabinex, watermarkCx } from '../assets/index.js'

// Primitivas DESKTOP das telas de funil — posicionadas de forma absoluta
// (coordenadas do Figma, frame 1920 de largura). Cores via CSS vars de
// index.css. Reutilizadas por todas as telas dentro de um <DesktopStage>.

export const FIELD_BORDER = '#868686'

/** Logo CONTABINEX (volta para a landing). */
export function Logo({ left = 127, top = 124, width = 414, height = 120, href = '#/' }) {
  return (
    <a className="abs header-logo" href={href} aria-label="CONTABINEX — página inicial" style={{ left, top, width, height, display: 'block' }}>
      <img src={logoContabinex} alt="CONTABINEX" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </a>
  )
}

/** Marca d'água CX cinza (decorativa). */
export function Watermark({ left = 1088, top = 204, width = 788, height = 445, opacity = 0.5 }) {
  return (
    <div
      className="abs"
      style={{ left, top, width, height, opacity, overflow: 'hidden', pointerEvents: 'none', filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.1))' }}
    >
      <img src={watermarkCx} alt="" style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

/** Linha divisória verde-água. */
export function Divider({ left, top, width = 320, height = 3, color = 'var(--teal)' }) {
  return <div className="abs" style={{ left, top, width, height, background: color }} />
}

/** Título grande em azul institucional. Aceita string ou nós (com <br/>). */
export function Title({ left = 166, top = 335, width, children, fontSize = 48, color = 'var(--navy)' }) {
  return (
    <h1
      className="abs"
      style={{ left, top, width, color, fontWeight: 700, fontSize, lineHeight: 'normal', letterSpacing: '-0.96px', whiteSpace: width ? 'normal' : 'nowrap' }}
    >
      {children}
    </h1>
  )
}

/** Subtítulo de seção (cinza, 32). */
export function SectionHeading({ left = 165, top = 562, children, color = 'var(--gray)' }) {
  return (
    <p className="abs" style={{ left, top, color, fontWeight: 600, fontSize: 32, letterSpacing: '-0.96px', whiteSpace: 'nowrap' }}>
      {children}
    </p>
  )
}

/** Texto de apoio (cinza, 24, bold). */
export function SectionSub({ left = 166, top = 610, width, children, color = 'var(--gray)' }) {
  return (
    <p className="abs" style={{ left, top, width, color, fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal', whiteSpace: width ? 'normal' : 'nowrap' }}>
      {children}
    </p>
  )
}

/** Campo de formulário desktop: label + input, posicionados de forma absoluta. */
export function Field({
  id,
  label,
  labelLeft = 165,
  labelTop,
  inputTop,
  left = 165,
  width = 807,
  height = 75,
  type = 'text',
  as = 'input',
  value,
  defaultValue,
  onChange,
  placeholder,
  autoComplete,
  children,
}) {
  const inputStyle = {
    left,
    top: inputTop,
    width,
    height,
    border: `1px solid ${FIELD_BORDER}`,
    borderRadius: 10,
    padding: '0 24px',
    fontSize: 22,
    color: 'var(--navy)',
    background: 'var(--white)',
  }
  return (
    <>
      <label htmlFor={id} className="abs" style={{ left: labelLeft, top: labelTop, color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
        {label}
      </label>
      {as === 'select' ? (
        <select id={id} name={id} value={value} defaultValue={defaultValue} onChange={onChange} className="abs field-input" style={inputStyle}>
          {children}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="abs field-input"
          style={{ ...inputStyle, ...(as === 'textarea' ? { paddingTop: 18 } : null) }}
        />
      )}
    </>
  )
}

/** Botão de avanço (verde-água) + indicador de passo (ex.: "1/4"). */
export function PrimaryButton({ left = 835, top = 1170, width = 137, height = 49, children = 'Avançar', step, type = 'submit', onClick, href }) {
  const Cmp = href ? 'a' : 'button'
  const extra = href ? { href } : { type, onClick }
  return (
    <>
      <Cmp
        {...extra}
        className="abs box-btn"
        style={{ left, top, width, height, background: 'var(--teal)', borderRadius: 5, color: 'var(--white)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {children}
      </Cmp>
      {step && (
        <span
          className="abs"
          style={{ left: left + width + 42, top, color: 'var(--teal)', fontWeight: 600, fontSize: 40, letterSpacing: '-1.2px', lineHeight: `${height}px`, whiteSpace: 'nowrap' }}
        >
          {step}
        </span>
      )}
    </>
  )
}

/** Rodapé "Clique aqui para falar com um assistente" + divisória superior. */
export function AssistantBar({ dividerTop = 1480, barTop = 1548, href = '#/descobrir-plano' }) {
  return (
    <>
      <Divider left={317} top={dividerTop} width={1286} />
      <a
        className="abs box-cta box-cta--light"
        href={href}
        style={{ left: 677, top: barTop, width: 566, height: 75, background: 'var(--teal-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span style={{ color: 'var(--gray)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', whiteSpace: 'nowrap' }}>
          Clique aqui para falar com um assistente
        </span>
      </a>
    </>
  )
}
