import { normalizarTexto } from '../utils/br.js'

// Base de atividades (CNAE) usada pelo auto-complete das Telas 03, 05 e 06.
//
// ⚠️ Recorte curado para o front-end: cobre as atividades mais buscadas e
// TODAS as profissões regulamentadas por conselho de classe (que são o gatilho
// da Tela 04B). A lista completa da Receita/IBGE deve vir do backend — este
// arquivo é a fonte local enquanto não existe esse contrato.
//
// conselho: id em data/conselhos.js quando a atividade é regulamentada.
//           Regulamentada ⇒ vetada ao MEI ⇒ Tela 04B (Classes Profissionais).
// mei:      false quando a atividade não é permitida ao MEI por outro motivo.

export const CNAES = [
  // --- Regulamentadas por conselho de classe (vetadas ao MEI) ---
  { code: '8630-5/03', label: 'Atividade médica ambulatorial restrita a consultas', conselho: 'crm' },
  { code: '8630-5/02', label: 'Atividade médica ambulatorial com recursos para exames complementares', conselho: 'crm' },
  { code: '6911-7/01', label: 'Serviços advocatícios', conselho: 'oab' },
  { code: '7112-0/00', label: 'Serviços de engenharia', conselho: 'crea' },
  { code: '7119-7/03', label: 'Serviços de desenho técnico ligados à engenharia', conselho: 'crea' },
  { code: '8650-0/03', label: 'Atividades de psicologia e psicanálise', conselho: 'crp' },
  { code: '8630-5/04', label: 'Atividade odontológica', conselho: 'cro' },
  { code: '6920-6/01', label: 'Atividades de contabilidade', conselho: 'crc' },
  { code: '8650-0/01', label: 'Atividades de enfermagem', conselho: 'coren' },
  { code: '7111-1/00', label: 'Serviços de arquitetura', conselho: 'cau' },
  { code: '8650-0/04', label: 'Atividades de fisioterapia', conselho: 'crefito' },
  { code: '8650-0/05', label: 'Atividades de terapia ocupacional', conselho: 'crefito' },
  { code: '8650-0/02', label: 'Atividades de profissionais da nutrição', conselho: 'crn' },
  { code: '4771-7/01', label: 'Comércio varejista de produtos farmacêuticos (farmácia)', conselho: 'crf' },
  { code: '7500-1/00', label: 'Atividades veterinárias', conselho: 'crmv' },
  { code: '8650-0/06', label: 'Atividades de fonoaudiologia', conselho: 'cofen-psi' },
  { code: '7020-4/00', label: 'Atividades de consultoria em gestão empresarial', conselho: 'cra' },
  { code: '8800-6/00', label: 'Serviços de assistência social sem alojamento', conselho: 'cress' },
  { code: '7490-1/03', label: 'Serviços de agronomia e consultoria agrícola', conselho: 'crea' },
  { code: '7210-0/00', label: 'Pesquisa e desenvolvimento em ciências físicas e naturais', conselho: 'crbio' },

  // --- Permitidas ao MEI (comércio) ---
  { code: '4781-4/00', label: 'Comércio varejista de artigos do vestuário e acessórios' },
  { code: '4772-5/00', label: 'Comércio varejista de cosméticos, produtos de perfumaria e higiene' },
  { code: '4744-0/99', label: 'Comércio varejista de materiais de construção em geral' },
  { code: '4789-0/99', label: 'Comércio varejista de outros produtos não especificados' },
  { code: '4761-0/03', label: 'Comércio varejista de artigos de papelaria' },
  { code: '4763-6/02', label: 'Comércio varejista de artigos esportivos' },
  { code: '4753-9/00', label: 'Comércio varejista de eletrodomésticos e equipamentos de áudio e vídeo' },
  { code: '4712-1/00', label: 'Comércio varejista de mercadorias em geral (minimercado)' },
  { code: '4729-6/99', label: 'Comércio varejista de produtos alimentícios em geral' },
  { code: '4785-7/99', label: 'Comércio varejista de outros artigos usados' },

  // --- Permitidas ao MEI (serviços) ---
  { code: '5611-2/01', label: 'Restaurantes e similares' },
  { code: '5611-2/03', label: 'Lanchonetes, casas de chá, de sucos e similares' },
  { code: '5620-1/04', label: 'Fornecimento de alimentos preparados para consumo domiciliar' },
  { code: '9602-5/01', label: 'Cabeleireiros, manicure e pedicure' },
  { code: '9602-5/02', label: 'Atividades de estética e outros serviços de cuidados com a beleza' },
  { code: '8592-9/99', label: 'Ensino de arte e cultura' },
  { code: '8599-6/04', label: 'Treinamento em desenvolvimento profissional e gerencial' },
  { code: '9313-1/00', label: 'Atividades de condicionamento físico' },
  { code: '4321-5/00', label: 'Instalação e manutenção elétrica' },
  { code: '4322-3/01', label: 'Instalações hidráulicas, sanitárias e de gás' },
  { code: '4330-4/04', label: 'Serviços de pintura de edifícios em geral' },
  { code: '4520-0/01', label: 'Serviços de manutenção e reparação mecânica de veículos' },
  { code: '9529-1/99', label: 'Reparação e manutenção de objetos e equipamentos pessoais' },
  { code: '8121-4/00', label: 'Limpeza em prédios e domicílios' },
  { code: '4923-0/02', label: 'Serviço de transporte de passageiros — locação de automóveis com motorista' },
  { code: '5320-2/02', label: 'Serviços de entrega rápida (motoboy)' },
  { code: '7420-0/01', label: 'Atividades de produção de fotografias, exceto aérea e submarina' },
  { code: '7319-0/02', label: 'Promoção de vendas' },
  { code: '9001-9/02', label: 'Produção musical' },
  { code: '1412-6/01', label: 'Confecção de peças do vestuário sob medida' },
  { code: '1091-1/02', label: 'Fabricação de produtos de padaria e confeitaria' },
  { code: '3299-0/99', label: 'Fabricação de produtos diversos (artesanato)' },

  // --- Não permitidas ao MEI (sem conselho de classe) ---
  { code: '6201-5/01', label: 'Desenvolvimento de programas de computador sob encomenda', mei: false },
  { code: '6202-3/00', label: 'Desenvolvimento e licenciamento de programas customizáveis', mei: false },
  { code: '7311-4/00', label: 'Agências de publicidade', mei: false },
  { code: '6822-6/00', label: 'Gestão e administração da propriedade imobiliária', mei: false },
  { code: '6810-2/01', label: 'Compra e venda de imóveis próprios', mei: false },
  { code: '4611-7/00', label: 'Representantes comerciais e agentes do comércio', mei: false },
  { code: '8511-2/00', label: 'Educação infantil — creche', mei: false },
  { code: '4930-2/02', label: 'Transporte rodoviário de carga intermunicipal e interestadual', mei: false },
]

/** Atividade é regulamentada por conselho de classe? (gatilho da Tela 04B) */
export const isRegulamentada = (cnae) => Boolean(cnae && cnae.conselho)

/** Atividade é permitida ao MEI? Regulamentada nunca é. */
export const permiteMei = (cnae) => Boolean(cnae) && !cnae.conselho && cnae.mei !== false

/** Busca por código ou descrição (auto-complete a partir de 3 caracteres). */
export function searchCnae(term, limit = 8) {
  const q = normalizarTexto(term)
  if (q.length < 3) return []
  const digits = q.replace(/\D/g, '')
  return CNAES.filter(
    (c) =>
      normalizarTexto(c.label).includes(q) ||
      (digits.length >= 3 && c.code.replace(/\D/g, '').includes(digits))
  ).slice(0, limit)
}

/** Rótulo canônico usado nos campos: "8630-5/03 — Atividade médica…". */
export const cnaeLabel = (c) => `${c.code} — ${c.label}`

/** Reencontra a atividade a partir do rótulo salvo no estado do funil. */
export const findCnaeByLabel = (label) => CNAES.find((c) => cnaeLabel(c) === label)
