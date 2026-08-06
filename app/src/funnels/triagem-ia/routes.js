// Funil C — Triagem com IA. Registro das telas desta pasta.
// Entrada: CTA "Consultar Categoria" / "Descobrir Meu Plano" (Tela 01) → Intro (Tela 09).
// Fluxo: intro → diagnóstico (quiz) → resultado (MEI | Simples | Classes) → data injection no Funil A.
import Intro from './intro/index.jsx'
import Diagnostico from './diagnostico/index.jsx'
import ResultadoMei from './resultado-mei/index.jsx'
import ResultadoSimples from './resultado-simples/index.jsx'
import ResultadoClasses from './resultado-classes/index.jsx'

export default [
  { path: '#/descobrir-plano', Component: Intro },
  { path: '#/descobrir-plano/diagnostico', Component: Diagnostico },
  { path: '#/descobrir-plano/resultado-mei', Component: ResultadoMei },
  { path: '#/descobrir-plano/resultado-simples', Component: ResultadoSimples },
  { path: '#/descobrir-plano/resultado-classes', Component: ResultadoClasses },
]
