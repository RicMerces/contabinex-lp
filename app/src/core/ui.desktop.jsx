import { useState } from 'react'
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
  align = 'left',
  children,
}) {
  const centered = align === 'center'
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
    textAlign: centered ? 'center' : 'left',
  }
  return (
    <>
      <label
        htmlFor={id}
        className="abs"
        style={{
          left: centered ? left : labelLeft,
          top: labelTop,
          width: centered ? width : 'auto',
          color: 'var(--gray)',
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: '-0.6px',
          whiteSpace: 'nowrap',
          textAlign: centered ? 'center' : 'left',
        }}
      >
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

/* ============================================================
   Primitivas de FLUXO (desktop) — vivem dentro de um <FormColumn>,
   que é o único elemento posicionado de forma absoluta no palco 1920.
   Servem para os formulários longos (Telas 05, 06 e 06/1), onde manter
   um `top` por campo seria impraticável — o conteúdo é dinâmico (sócios).
   ============================================================ */

const LABEL_STYLE = { color: 'var(--gray)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px' }
const INPUT_STYLE = {
  width: '100%',
  height: 75,
  border: `1px solid ${FIELD_BORDER}`,
  borderRadius: 10,
  padding: '0 24px',
  fontSize: 22,
  color: 'var(--navy)',
  background: 'var(--white)',
}

/** Coluna de formulário: único nó absoluto; o conteúdo flui dentro dela. */
export function FormColumn({ left = 169, top = 700, width = 807, gap = 30, children, ...rest }) {
  return (
    <div className="abs" style={{ left, top, width, display: 'flex', flexDirection: 'column', gap }} {...rest}>
      {children}
    </div>
  )
}

/** Campos lado a lado (ex.: Cidade / Estado / País). */
export function FlowRow({ gap = 24, children }) {
  return <div style={{ display: 'flex', gap, alignItems: 'flex-end' }}>{children}</div>
}

/** Cabeçalho de bloco dentro da coluna (ex.: "Estrutura Societária"). */
export function FlowSection({ title, sub, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.84px' }}>{title}</p>
      {sub && <p style={{ ...LABEL_STYLE, fontWeight: 500, lineHeight: 1.4 }}>{sub}</p>}
      {children}
    </div>
  )
}

/** Observação de apoio (verde-água). */
export function FlowNote({ children }) {
  return <p style={{ color: 'var(--teal)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.54px', lineHeight: 1.4 }}>{children}</p>
}

/** Mensagem de erro inline abaixo de um campo. */
export function FlowError({ children }) {
  return children ? <span style={{ color: '#c0392b', fontWeight: 600, fontSize: 16, letterSpacing: '-0.4px' }}>{children}</span> : null
}

/** Campo em fluxo: label + input (ou select/textarea). */
export function FlowField({ id, label, hint, error, as = 'input', type = 'text', flex, children, ...rest }) {
  const Cmp = as === 'select' ? 'select' : as === 'textarea' ? 'textarea' : 'input'
  const style = { ...INPUT_STYLE, ...(as === 'textarea' ? { height: 120, padding: '18px 24px', resize: 'vertical' } : null), ...(error ? { border: '1px solid #c0392b' } : null) }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex }}>
      {label && <label htmlFor={id} style={LABEL_STYLE}>{label}</label>}
      <Cmp id={id} name={id} type={as === 'input' ? type : undefined} className="field-input" style={style} {...rest}>
        {children}
      </Cmp>
      {hint && !error && <span style={{ ...LABEL_STYLE, fontWeight: 500, fontSize: 16 }}>{hint}</span>}
      <FlowError>{error}</FlowError>
    </div>
  )
}

/** Grupo de opções exclusivas (visual do Figma: quadrado 22px + rótulo). */
export function FlowRadio({ legend, options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {legend && <p style={{ ...LABEL_STYLE }}>{legend}</p>}
      {options.map((o) => (
        <div
          key={o.value}
          role="radio"
          aria-checked={value === o.value}
          tabIndex={0}
          onClick={() => onChange(o.value)}
          onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && (e.preventDefault(), onChange(o.value))}
          style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
        >
          <span
            style={{ flex: '0 0 auto', width: 22, height: 22, borderRadius: 5, border: '1px solid var(--gray)', background: value === o.value ? 'var(--teal)' : 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {value === o.value && <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--white)' }} />}
          </span>
          <span style={{ color: 'var(--gray)', fontWeight: 500, fontSize: 20, letterSpacing: '-0.6px' }}>{o.label}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * Campo de busca com sugestões (CNAE, conselho de classe).
 * `search(term)` devolve a lista de itens; `itemLabel(item)` o rótulo exibido.
 */
export function FlowAutocomplete({ id, label, placeholder, hint, error, value, onChange, onSelect, search, itemLabel }) {
  const [open, setOpen] = useState(false)
  const items = open ? search(value || '') : []
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
      {label && <label htmlFor={id} style={LABEL_STYLE}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          name={id}
          autoComplete="off"
          className="field-input"
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => { onChange(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          style={{ ...INPUT_STYLE, ...(error ? { border: '1px solid #c0392b' } : null) }}
        />
        {open && items.length > 0 && (
          <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, zIndex: 20, listStyle: 'none', background: 'var(--white)', border: `1px solid ${FIELD_BORDER}`, borderRadius: 10, maxHeight: 320, overflowY: 'auto', boxShadow: '0 10px 24px rgba(51,55,111,0.15)' }}>
            {items.map((it, i) => (
              <li
                key={i}
                onMouseDown={(e) => { e.preventDefault(); onSelect(it); setOpen(false) }}
                style={{ padding: '14px 20px', fontSize: 18, color: 'var(--navy)', cursor: 'pointer', borderBottom: i < items.length - 1 ? '1px solid var(--teal-light)' : 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {itemLabel(it)}
              </li>
            ))}
          </ul>
        )}
      </div>
      {hint && !error && <span style={{ ...LABEL_STYLE, fontWeight: 500, fontSize: 16 }}>{hint}</span>}
      <FlowError>{error}</FlowError>
    </div>
  )
}

/** Linha de ações do formulário: Voltar + Avançar + indicador de passo. */
export function FlowActions({ backHref, onBack, submitLabel = 'Avançar', step, disabled }) {
  const BTN = { width: 137, height: 49, borderRadius: 5, fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 10 }}>
      {(backHref || onBack) &&
        (onBack ? (
          <button type="button" onClick={onBack} className="box-btn box-btn--outline" style={{ ...BTN, background: 'var(--white)', border: '1px solid var(--teal)', color: 'var(--gray)' }}>Voltar</button>
        ) : (
          <a href={backHref} className="box-btn box-btn--outline" style={{ ...BTN, background: 'var(--white)', border: '1px solid var(--teal)', color: 'var(--gray)' }}>Voltar</a>
        ))}
      <button type="submit" disabled={disabled} className="box-btn" style={{ ...BTN, width: 'auto', padding: '0 28px', background: 'var(--teal)', color: 'var(--white)', opacity: disabled ? 0.55 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
        {submitLabel}
      </button>
      {step && <span style={{ color: 'var(--teal)', fontWeight: 600, fontSize: 40, letterSpacing: '-1.2px', lineHeight: '49px' }}>{step}</span>}
    </div>
  )
}

/** Modal de alerta/decisão sobreposto à tela (overlay escuro + card). */
export function Modal({ icon, heading, body, actions, designW = 1920, designH = 1700 }) {
  return (
    <>
      <div className="abs" style={{ left: 0, top: 0, width: designW, height: designH, background: 'rgba(0,0,0,0.5)', zIndex: 50 }} />
      <div
        className="abs"
        style={{ left: designW / 2 - 400, top: 420, width: 800, padding: 60, background: 'var(--white)', borderRadius: 12, boxShadow: '0px 10px 15px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center', zIndex: 51 }}
      >
        {icon && <img src={icon} alt="" style={{ width: 80, height: 80 }} />}
        <p style={{ color: 'var(--navy)', fontWeight: 600, fontSize: 40, letterSpacing: '-1.2px' }}>{heading}</p>
        <p style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.66px', lineHeight: 1.45 }}>{body}</p>
        {actions}
      </div>
    </>
  )
}

/** CTA principal do modal (pílula verde-água). */
export function ModalCta({ href, onClick, children }) {
  const Cmp = href ? 'a' : 'button'
  return (
    <Cmp
      {...(href ? { href } : { type: 'button', onClick })}
      className="box-cta"
      style={{ background: 'var(--teal)', color: 'var(--white)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.66px', padding: '18px 36px', borderRadius: 40, display: 'inline-flex' }}
    >
      {children}
    </Cmp>
  )
}

/** Ação secundária do modal (link discreto). */
export function ModalLink({ href, onClick, children }) {
  const Cmp = href ? 'a' : 'button'
  return (
    <Cmp {...(href ? { href } : { type: 'button', onClick })} style={{ color: 'var(--teal)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.54px', cursor: 'pointer' }}>
      {children}
    </Cmp>
  )
}

/** Lista numerada de próximos passos (telas de confirmação). */
export function FlowSteps({ items }) {
  return (
    <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'left' }}>
      {items.map((t, i) => (
        <li key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <span style={{ flex: '0 0 auto', width: 36, height: 36, borderRadius: '50%', background: 'var(--teal)', color: 'var(--white)', fontWeight: 700, fontSize: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {i + 1}
          </span>
          <p style={{ color: 'var(--gray)', fontWeight: 500, fontSize: 22, lineHeight: 1.45, letterSpacing: '-0.5px' }}>{t}</p>
        </li>
      ))}
    </ol>
  )
}
