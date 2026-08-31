// Consulta de CEP (ViaCEP). API pública, sem chave e sem dependências:
// enviamos apenas o CEP digitado. Erro de rede/CEP inexistente vira `null`
// para a tela exibir o aviso inline.
const ENDPOINT = (cep) => `https://viacep.com.br/ws/${cep}/json/`

/**
 * @param {string} cep CEP com ou sem máscara.
 * @returns {Promise<{logradouro,bairro,cidade,estado}|null>}
 */
export async function lookupCep(cep) {
  const d = String(cep || '').replace(/\D/g, '')
  if (d.length !== 8) return null
  try {
    const res = await fetch(ENDPOINT(d))
    if (!res.ok) return null
    const json = await res.json()
    if (json.erro) return null
    return {
      logradouro: json.logradouro || '',
      bairro: json.bairro || '',
      cidade: json.localidade || '',
      estado: json.uf || '',
    }
  } catch {
    return null
  }
}
