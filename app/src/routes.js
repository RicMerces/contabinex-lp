import novaAbertura from './funnels/nova-abertura/routes.js'
import trocaContador from './funnels/troca-contador/routes.js'
import triagemIa from './funnels/triagem-ia/routes.js'
import { normalizeHash } from './core/index.js'

// Registro central de rotas dos funis. Cada funil exporta seu próprio array
// (funnels/<funil>/routes.js), então adicionar telas não mexe neste arquivo.
export const routes = [...novaAbertura, ...trocaContador, ...triagemIa]

/** Encontra a rota correspondente ao hash atual (ou undefined = landing). */
export function matchRoute(hash) {
  const h = normalizeHash(hash)
  if (!h) return undefined
  return routes.find((r) => r.path === h)
}
