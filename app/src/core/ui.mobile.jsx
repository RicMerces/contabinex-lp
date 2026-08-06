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
export function MField({ id, label, as = 'input', type = 'text', value, defaultValue, onChange, placeholder, autoComplete, children }) {
  return (
    <div className="wz-field">
      <label htmlFor={id}>{label}</label>
      {as === 'select' ? (
        <select id={id} name={id} value={value} defaultValue={defaultValue} onChange={onChange}>
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea id={id} name={id} value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input id={id} name={id} type={type} value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} />
      )}
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
