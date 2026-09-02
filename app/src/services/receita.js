// Consultas à Receita Federal.
//
// ⚠️ STUB — ainda não existe backend nem contrato de API (ver fluxo.md §6).
// As funções abaixo simulam a latência e os desfechos previstos no roteiro
// para que os fluxos de alerta/erro sejam navegáveis. Substituir pelas
// chamadas reais quando o endpoint existir; a assinatura deve ser mantida.

const onlyDigits = (v) => String(v || '').replace(/\D/g, '')
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

/** CPFs de teste que respondem "já possui CNPJ" (demo da Tela 05 → alerta). */
export const CPFS_COM_CNPJ = ['111.444.777-35']

/**
 * Tela 05 — ao completar o CPF, verifica se já existe CNPJ vinculado
 * (impossibilita a abertura de MEI).
 * @returns {Promise<{possuiCnpj: boolean}>}
 */
export async function consultarCpf(cpf) {
  await delay(600)
  const d = onlyDigits(cpf)
  return { possuiCnpj: CPFS_COM_CNPJ.some((c) => onlyDigits(c) === d) }
}

/**
 * Regra de teste da Tela 08/E: CNPJ começando por "00" responde
 * "não encontrado". Qualquer outro CNPJ válido é localizado.
 */
export const cnpjDeTesteNaoEncontrado = (cnpj) => onlyDigits(cnpj).startsWith('00')

/**
 * Tela 07/08 — localiza a empresa e confere se o CPF é sócio/responsável.
 * @returns {Promise<{ok: true, empresa: {...}} | {ok: false, motivo: string}>}
 */
export async function consultarCnpj(cnpj, cpfSocio) {
  await delay(2200)
  const d = onlyDigits(cnpj)
  if (d.length !== 14 || cnpjDeTesteNaoEncontrado(d)) {
    return { ok: false, motivo: 'cnpj-nao-encontrado' }
  }
  return {
    ok: true,
    empresa: {
      razaoSocial: 'Empresa Localizada Serviços Ltda',
      cnpj,
      endereco: 'Rua Exemplo, 123 — São Paulo/SP',
      situacao: 'ATIVA',
      cpfSocio,
    },
  }
}
