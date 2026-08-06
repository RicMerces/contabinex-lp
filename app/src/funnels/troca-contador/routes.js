// Funil B — Troca de Contador. Cada tela vive na sua própria pasta.
// Entrada: CTA "Trocar de Contador" (landing) → Tela 07 (Validação CNPJ/CPF).
import ValidacaoCnpj from './validacao-cnpj/index.jsx'
import LoadingReceita from './loading-receita/index.jsx'
import ConfirmacaoTroca from './confirmacao-troca/index.jsx'
import UploadContrato from './upload-contrato/index.jsx'
import ErroCnpj from './erro-cnpj/index.jsx'
import ErroUpload from './erro-upload/index.jsx'
import Confirmacao from './confirmacao/index.jsx'

export default [
  { path: '#/trocar-contador', Component: ValidacaoCnpj },
  { path: '#/trocar-contador/consultando', Component: LoadingReceita },
  { path: '#/trocar-contador/confirmar-troca', Component: ConfirmacaoTroca },
  { path: '#/trocar-contador/upload', Component: UploadContrato },
  { path: '#/trocar-contador/erro-cnpj', Component: ErroCnpj },
  { path: '#/trocar-contador/erro-upload', Component: ErroUpload },
  { path: '#/trocar-contador/confirmacao', Component: Confirmacao },
]
