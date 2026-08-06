import CapturaLead from './captura-lead/index.jsx'

// Funil A — Nova Abertura. Cada tela em sua própria pasta.
// path: hash da rota. Component: componente da tela. props: opcionais.
export default [
  { path: '#/abrir-empresa', Component: CapturaLead, props: { variant: 'novo-cnpj' } },
]
