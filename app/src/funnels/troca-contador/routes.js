import CapturaLead from '../nova-abertura/captura-lead/index.jsx'

// Funil B — Troca de Contador.
// Entrada: CTA "Trocar de Contador" (Hero + rodapé) → captura de lead (Tela 02-B).
// Próxima etapa (Tela 07 — Validação CNPJ/CPF) ainda não existe.
export default [
  { path: '#/trocar-contador', Component: CapturaLead, props: { variant: 'contador' } },
]
