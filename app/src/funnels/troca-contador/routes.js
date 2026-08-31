// Funil B — Troca de Contador. Cada tela vive na sua própria pasta.
// Entrada: CTA "Trocar de Contador" (landing) → Tela 02-B (captura de lead)
// → Tela 07 (validação) → Tela 08 (consulta RF) → Tela 07/1 → Tela 12.
import CapturaLead from '../nova-abertura/captura-lead/index.jsx'
import ValidacaoCnpj from './validacao-cnpj/index.jsx'
import LoadingReceita from './loading-receita/index.jsx'
import ConfirmacaoTroca from './confirmacao-troca/index.jsx'
import UploadContrato from './upload-contrato/index.jsx'
import ErroCnpj from './erro-cnpj/index.jsx'
import ErroUpload from './erro-upload/index.jsx'
import Confirmacao from './confirmacao/index.jsx'

export default [
  { path: '#/trocar-contador', Component: CapturaLead, props: { variant: 'contador' } },
  { path: '#/trocar-contador/validacao', Component: ValidacaoCnpj },
  { path: '#/trocar-contador/consultando', Component: LoadingReceita },
  { path: '#/trocar-contador/confirmar-troca', Component: ConfirmacaoTroca },
  { path: '#/trocar-contador/erro-cnpj', Component: ErroCnpj },
  { path: '#/trocar-contador/confirmacao', Component: Confirmacao },
  // Fora do caminho principal desde a revisão do roteiro: os documentos passam
  // a ser pedidos depois, dentro da plataforma. Telas mantidas e acessíveis
  // por URL até o dono confirmar a remoção.
  { path: '#/trocar-contador/upload', Component: UploadContrato },
  { path: '#/trocar-contador/erro-upload', Component: ErroUpload },
]
