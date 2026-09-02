// Conselhos de classe (profissões regulamentadas). Lista fixa mantida pelo
// time de produto — nenhuma API externa. Usada na Tela 06/1 (Seção A) e como
// alvo do pré-preenchimento vindo da Tela 03 (via CNAE).
export const CONSELHOS = [
  { id: 'crm', sigla: 'CRM', nome: 'Conselho Regional de Medicina' },
  { id: 'oab', sigla: 'OAB', nome: 'Ordem dos Advogados do Brasil' },
  { id: 'crea', sigla: 'CREA', nome: 'Conselho Regional de Engenharia e Agronomia' },
  { id: 'crp', sigla: 'CRP', nome: 'Conselho Regional de Psicologia' },
  { id: 'cro', sigla: 'CRO', nome: 'Conselho Regional de Odontologia' },
  { id: 'crc', sigla: 'CRC', nome: 'Conselho Regional de Contabilidade' },
  { id: 'coren', sigla: 'COREN', nome: 'Conselho Regional de Enfermagem' },
  { id: 'cau', sigla: 'CAU', nome: 'Conselho de Arquitetura e Urbanismo' },
  { id: 'crefito', sigla: 'CREFITO', nome: 'Conselho Regional de Fisioterapia e Terapia Ocupacional' },
  { id: 'crn', sigla: 'CRN', nome: 'Conselho Regional de Nutrição' },
  { id: 'crf', sigla: 'CRF', nome: 'Conselho Regional de Farmácia' },
  { id: 'crmv', sigla: 'CRMV', nome: 'Conselho Regional de Medicina Veterinária' },
  { id: 'cofecon', sigla: 'CORECON', nome: 'Conselho Regional de Economia' },
  { id: 'cra', sigla: 'CRA', nome: 'Conselho Regional de Administração' },
  { id: 'cress', sigla: 'CRESS', nome: 'Conselho Regional de Serviço Social' },
  { id: 'crb', sigla: 'CRB', nome: 'Conselho Regional de Biblioteconomia' },
  { id: 'crbio', sigla: 'CRBio', nome: 'Conselho Regional de Biologia' },
  { id: 'cofen-psi', sigla: 'CRFa', nome: 'Conselho Regional de Fonoaudiologia' },
]

/** Rótulo de exibição: "CRM — Conselho Regional de Medicina". */
export const conselhoLabel = (c) => `${c.sigla} — ${c.nome}`

export const findConselho = (id) => CONSELHOS.find((c) => c.id === id)
