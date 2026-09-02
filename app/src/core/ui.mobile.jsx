import { useState } from 'react'
import { logoContabinex } from '../assets/index.js'
import './wizard.css'

// Primitivas MÓVEIS das telas de funil — coluna única centralizada.
// Estilo em wizard.css (classes .wz-*).

/** Casca da tela: header (voltar + logo) + main. `align` controla alinhamento. */
export function MobileShell({ back = '#/', align = 'center', children }) {
  return (
    <div className="wz-root">
      <header className="wz-header">
        {back ? (
          <a className="wz-back" href={back} aria-label="Voltar">←</a>
        ) : (
          <span />
        )}
        <a href="#/" aria-label="Início">
          <img className="wz-header__logo" src={logoContabinex} alt="CONTABINEX" />
        </a>
        <span />
      </header>
      <main className={`wz-main${align === 'left' ? ' wz-main--left' : ''}`}>{children}</main>
    </div>
  )
}

export function MTitle({ children }) {
  return <h1 className="wz-title">{children}</h1>
}
export function MDivider() {
  return <div className="wz-divider" />
}
export function MHeading({ children }) {
  return <p className="wz-heading">{children}</p>
}
export function MSub({ children }) {
  return <p className="wz-sub">{children}</p>
}

/** Campo móvel: label + input/select/textarea. */
export function MField({ id, label, as = 'input', type = 'text', value, defaultValue, onChange, placeholder, autoComplete, align = 'left', hint, error, children, ...rest }) {
  const centered = align === 'center'
  return (
    <div className={`wz-field${centered ? ' wz-field--center' : ''}${error ? ' wz-field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {as === 'select' ? (
        <select id={id} name={id} value={value} defaultValue={defaultValue} onChange={onChange} {...rest}>
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea id={id} name={id} value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} {...rest} />
      ) : (
        <input id={id} name={id} type={type} value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} {...rest} />
      )}
      {hint && !error && <span className="wz-hint">{hint}</span>}
      {error && <span className="wz-error">{error}</span>}
    </div>
  )
}

export function MForm({ onSubmit, children }) {
  return (
    <form className="wz-form" onSubmit={onSubmit}>
      {children}
    </form>
  )
}

/** Ação móvel: passo (ex.: "1/4") + botão. Fora de <form>: passe href. */
export function MPrimaryButton({ children = 'Avançar', step, variant = 'teal', type = 'submit', onClick, href, form }) {
  const Cmp = href ? 'a' : 'button'
  const extra = href ? { href } : { type, onClick, form }
  return (
    <div className="wz-actions">
      {step && <span className="wz-step">{step}</span>}
      <Cmp className={`wz-btn wz-btn--${variant}`} {...extra}>
        {children}
      </Cmp>
    </div>
  )
}

export function MAssistantBar({ href = '#/descobrir-plano', children = 'Clique aqui para falar com um assistente' }) {
  return (
    <div className="wz-assistant">
      <a href={href}>{children}</a>
    </div>
  )
}

/** Bloco de seção do formulário móvel (título + descrição). */
export function MSection({ title, sub, children }) {
  return (
    <section className="wz-section">
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
      {children}
    </section>
  )
}

/** Grupo de opções exclusivas (móvel). */
export function MRadio({ legend, options, value, onChange }) {
  return (
    <fieldset className="wz-radio">
      {legend && <legend>{legend}</legend>}
      {options.map((o) => (
        <label key={o.value} className={value === o.value ? 'is-on' : undefined}>
          <input type="radio" checked={value === o.value} onChange={() => onChange(o.value)} />
          <span>{o.label}</span>
        </label>
      ))}
    </fieldset>
  )
}

/** Campo de busca com sugestões (móvel). */
export function MAutocomplete({ id, label, placeholder, hint, error, value, onChange, onSelect, search, itemLabel }) {
  const [open, setOpen] = useState(false)
  const items = open ? search(value || '') : []
  return (
    <div className={`wz-field wz-ac${error ? ' wz-field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        autoComplete="off"
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && items.length > 0 && (
        <ul className="wz-ac__list">
          {items.map((it, i) => (
            <li key={i} onMouseDown={(e) => { e.preventDefault(); onSelect(it); setOpen(false) }}>
              {itemLabel(it)}
            </li>
          ))}
        </ul>
      )}
      {hint && !error && <span className="wz-hint">{hint}</span>}
      {error && <span className="wz-error">{error}</span>}
    </div>
  )
}

/** Cartão de destaque (dados retornados, bloco de sócio, avisos). */
export function MCard({ title, children, tone = 'light' }) {
  return (
    <div className={`wz-card wz-card--${tone}`}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  )
}

/** Lista de bullets ("O que acontece agora?", "Próximas etapas"). */
export function MSteps({ items }) {
  return (
    <ol className="wz-steps">
      {items.map((t, i) => (
        <li key={i}><span>{i + 1}</span><p>{t}</p></li>
      ))}
    </ol>
  )
}
