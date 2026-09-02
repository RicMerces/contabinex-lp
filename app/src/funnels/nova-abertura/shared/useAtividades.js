import { useState } from 'react'
import { cnaeLabel, findCnaeByLabel } from '../../../data/cnae.js'

// Atividade principal (CNAE) + atividades secundárias, compartilhadas pelas
// Telas 05 e 06. A principal já vem preenchida do que o lead respondeu na
// Tela 03 — nunca pedimos de novo o que já está no estado do funil.
export default function useAtividades(data = {}) {
  const [principal, setPrincipal] = useState(data.ramo || '')
  const [secundarias, setSecundarias] = useState(data.atividadesSecundarias || [])
  const [termo, setTermo] = useState('')

  const adicionarSecundaria = (item) => {
    const label = cnaeLabel(item)
    setSecundarias((prev) => (prev.includes(label) ? prev : [...prev, label]))
    setTermo('')
  }
  const removerSecundaria = (label) => setSecundarias((prev) => prev.filter((l) => l !== label))

  const cnaePrincipal = findCnaeByLabel(principal)
  const valores = { ramo: principal, cnae: cnaePrincipal?.code || null, atividadesSecundarias: secundarias }

  return { principal, setPrincipal, cnaePrincipal, secundarias, adicionarSecundaria, removerSecundaria, termo, setTermo, valores }
}

/** Opções de "Forma de atuação" (como o negócio opera). */
export const FORMAS_ATUACAO = [
  'Estabelecimento fixo',
  'Internet / comércio eletrônico',
  'Em local fixo fora da loja (feira, quiosque)',
  'Porta a porta, postos móveis ou por ambulantes',
  'Televendas',
  'Correio / entrega em domicílio',
  'Prestação de serviço no endereço do cliente',
]
