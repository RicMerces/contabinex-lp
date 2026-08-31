import CapturaLead from './captura-lead/index.jsx'
import Qualificacao from './qualificacao/index.jsx'
import AlertaSimples from './alerta-simples/index.jsx'
import AlertaClasses from './alerta-classes/index.jsx'
import DadosMei from './dados-mei/index.jsx'
import DadosEmpresa from './dados-empresa/index.jsx'
import DadosClasses from './dados-classes/index.jsx'
import Processando from './processando/index.jsx'
import ErroAbertura from './erro/index.jsx'
import Confirmacao from './confirmacao/index.jsx'

// Funil A — Nova Abertura. Cada tela em sua própria pasta.
// path: hash da rota. Component: componente da tela. props: opcionais.
export default [
  { path: '#/abrir-empresa', Component: CapturaLead, props: { variant: 'novo-cnpj' } },
  // Plano escolhido direto na landing: captura o lead e pula a qualificação.
  { path: '#/abrir-empresa/simples', Component: CapturaLead, props: { variant: 'simples' } },
  { path: '#/abrir-empresa/classes', Component: CapturaLead, props: { variant: 'classes' } },
  { path: '#/abrir-empresa/qualificacao', Component: Qualificacao },
  { path: '#/abrir-empresa/alerta-simples', Component: AlertaSimples },
  { path: '#/abrir-empresa/alerta-classes', Component: AlertaClasses },
  { path: '#/abrir-empresa/dados-mei', Component: DadosMei },
  { path: '#/abrir-empresa/dados-empresa', Component: DadosEmpresa },
  { path: '#/abrir-empresa/dados-classes', Component: DadosClasses },
  { path: '#/abrir-empresa/processando', Component: Processando },
  { path: '#/abrir-empresa/erro', Component: ErroAbertura },
  { path: '#/abrir-empresa/confirmacao', Component: Confirmacao },
]
