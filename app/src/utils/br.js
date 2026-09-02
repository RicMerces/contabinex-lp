// Máscaras e validações de documentos brasileiros.
// Sem dependências externas — apenas string/aritmética.

export const onlyDigits = (v) => String(v || '').replace(/\D/g, '')

/** Minúsculas sem acento — buscas em português (CNAE, conselhos). */
export const normalizarTexto = (v) =>
  String(v || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

/** 000.000.000-00 (aplica progressivamente enquanto digita). */
export function maskCpf(v) {
  const d = onlyDigits(v).slice(0, 11)
  return d
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
}

/** 00.000.000/0001-00 */
export function maskCnpj(v) {
  const d = onlyDigits(v).slice(0, 14)
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
}

/** 00000-000 */
export function maskCep(v) {
  const d = onlyDigits(v).slice(0, 8)
  return d.replace(/^(\d{5})(\d)/, '$1-$2')
}

/** (00) 00000-0000 */
export function maskCelular(v) {
  const d = onlyDigits(v).slice(0, 11)
  if (d.length <= 2) return d.replace(/^(\d{0,2})/, '($1')
  if (d.length <= 6) return d.replace(/^(\d{2})(\d+)/, '($1) $2')
  if (d.length <= 10) return d.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3')
  return d.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3')
}

/** Percentual inteiro 0–100 (participação societária). */
export function maskPercent(v) {
  const d = onlyDigits(v).slice(0, 3)
  if (!d) return ''
  return String(Math.min(100, Number(d)))
}

/** Validação de CPF por dígitos verificadores. */
export function isValidCpf(v) {
  const d = onlyDigits(v)
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false
  const calc = (len) => {
    let sum = 0
    for (let i = 0; i < len; i++) sum += Number(d[i]) * (len + 1 - i)
    const r = (sum * 10) % 11
    return r === 10 ? 0 : r
  }
  return calc(9) === Number(d[9]) && calc(10) === Number(d[10])
}

/** Validação de CNPJ por dígitos verificadores. */
export function isValidCnpj(v) {
  const d = onlyDigits(v)
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false
  const calc = (len) => {
    let pos = len - 7
    let sum = 0
    for (let i = 0; i < len; i++) {
      sum += Number(d[i]) * pos--
      if (pos < 2) pos = 9
    }
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }
  return calc(12) === Number(d[12]) && calc(13) === Number(d[13])
}

/** Formato de e-mail (checagem leve, o backend valida de verdade). */
export function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim())
}
