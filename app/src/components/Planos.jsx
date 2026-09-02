import { icCheck, icArrow } from '../assets/index.js'
import Reveal from './Reveal.jsx'

// Seção "Planos sob medida" — 3 cards (MEI, Simples Nacional, Classes Profissionais)
const PLANS = [
  {
    cardLeft: 270,
    cardWidth: 426,
    title: 'Plano MEI',
    subtitle: 'Ideal para autônomos e microempreendedores.',
    benefits: [
      'Contabilidade digital completa e controle financeiro',
      'Emissão mensal de guias DAS e entrega da Declaração Anual',
      '3 notas fiscais gratuitas por competência',
      'Suporte e orientação por Inteligência Artificial',
    ],
    price: '79,90',
    ctaText: 'Ativar Plano MEI',
    ctaHref: '#/abrir-empresa', // Funil A — Nova Abertura
  },
  {
    cardLeft: 747,
    cardWidth: 427,
    title: 'Plano Simples Nacional',
    subtitle: 'Ideal para empresas em crescimento. (ME e EPP)',
    benefits: [
      'Apuração tributária especializada e entrega de obrigações acessórias',
      'Painel empresarial com relatórios gerenciais estruturados',
      '3 notas fiscais gratuitas por competência',
      'Atendimento digital e suporte por IA integrada',
    ],
    price: '179,90',
    ctaText: 'Selecionar Simples Nacional',
    ctaHref: '#/abrir-empresa/simples', // Funil A — plano já escolhido (pula a qualificação)
  },
  {
    cardLeft: 1226,
    cardWidth: 426,
    title: 'Plano Classes Profissionais',
    subtitle: 'Ideal para médicos, advogados e engenheiros.',
    benefits: [
      'Contabilidade completa adaptada à regulamentação da sua categoria',
      'Painel de gestão financeira dedicado',
      'Habilitação para inclusão de módulos operacionais específicos da profissão',
      'Atendimento digital especializado',
    ],
    price: '349,90',
    ctaText: 'Consultar Minha Categoria',
    ctaHref: '#/abrir-empresa/classes', // Funil A — plano já escolhido (pula a qualificação)
  },
]

const CARD_TOP = 2104
const CARD_HEIGHT = 679
/* Encosta na borda do card (3px = espessura da borda) — igual ao mobile */
const HEADER_INSET = 3
const CONTENT_X = 58
const PRICE_X = 39
const PRICE_TOP = 2280
const BODY_TOP = 2377
const CTA_TOP = 2687

export default function Planos() {
  return (
    <>
      {/* Âncora estável (sem transform do Reveal — evita scroll bugado na nav) */}
      <div id="sec-planos" className="abs" aria-hidden="true" style={{ left: 0, top: 1940, width: 1, height: 1 }} />
      {/* Título da seção */}
      <Reveal
        as="p"
        variant="cx"
        className="abs"
        delay={0}
        style={{
          left: '50%',
          top: 1982,
          color: 'var(--teal)',
          fontWeight: 700,
          fontSize: 32,
          lineHeight: '25px',
          letterSpacing: '-1.28px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        ESCOLHA SEU MODELO
      </Reveal>
      <Reveal
        as="h2"
        variant="cx"
        className="abs"
        delay={150}
        style={{
          left: '50%',
          top: 2015,
          color: 'var(--navy)',
          fontWeight: 700,
          fontSize: 46,
          lineHeight: 'normal',
          letterSpacing: '-1.84px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        Planos sob medida para o seu negócio
      </Reveal>

      {PLANS.map((p, i) => (
        <Reveal
          key={p.title}
          className="abs"
          delay={i * 90}
          style={{ left: p.cardLeft, top: CARD_TOP, width: p.cardWidth, height: CARD_HEIGHT }}
        >
          <div className="box-plan" style={{ position: 'absolute', inset: 0 }}>
            <div className="box-plan__body" />

            <div
              className="box-plan__header abs"
              style={{
                left: HEADER_INSET,
                top: HEADER_INSET,
                width: p.cardWidth - HEADER_INSET * 2,
                boxSizing: 'border-box',
                padding: '16px 20px 10px',
                background: 'var(--navy)',
                /* Topo acompanha o card; base reta — igual ao mobile */
                borderTopLeftRadius: 17,
                borderTopRightRadius: 17,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <p
                style={{
                  color: 'var(--white)',
                  fontWeight: 700,
                  fontSize: 20,
                  lineHeight: '25px',
                  letterSpacing: '-0.8px',
                  marginBottom: 6,
                }}
              >
                {p.title}
              </p>
              <p
                style={{
                  color: 'var(--white)',
                  fontWeight: 500,
                  fontSize: 18,
                  lineHeight: '25px',
                  letterSpacing: '-0.8px',
                }}
              >
                {p.subtitle}
              </p>
            </div>

            {/* "a partir de" + valor mensal */}
            <div className="abs" style={{ left: PRICE_X, top: PRICE_TOP - CARD_TOP }}>
              <p style={{ color: 'var(--gray)', fontWeight: 500, fontSize: 12, lineHeight: '15px' }}>a partir de</p>
              <p style={{ lineHeight: '40px', whiteSpace: 'nowrap' }}>
                <span style={{ color: 'var(--teal-strong)', fontWeight: 700, fontSize: 32 }}>R$ {p.price}</span>
                <span style={{ color: 'var(--gray)', fontWeight: 500, fontSize: 16 }}>/mês</span>
              </p>
            </div>

            <div className="abs" style={{ left: CONTENT_X - 34, top: BODY_TOP - CARD_TOP, width: p.cardWidth - CONTENT_X - 24 }}>
              {p.benefits.map((b, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                  <img src={icCheck} alt="" style={{ width: 20, height: 20, flexShrink: 0, marginTop: 3 }} />
                  <p style={{ color: '#000', fontWeight: 500, fontSize: 18, lineHeight: '25px', letterSpacing: '-0.72px' }}>{b}</p>
                </div>
              ))}
            </div>

            <a
              className="box-cta box-cta--navy abs"
              href={p.ctaHref}
              style={{
                left: CONTENT_X,
                top: CTA_TOP - CARD_TOP,
                width: p.cardWidth - CONTENT_X * 2,
                height: 53,
                background: 'var(--navy)',
                borderRadius: 40,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                padding: '0 20px',
                boxSizing: 'border-box',
              }}
            >
              <span
                style={{
                  color: 'var(--white)',
                  fontWeight: 700,
                  fontSize: 15,
                  lineHeight: '20px',
                  letterSpacing: '-0.4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minWidth: 0,
                }}
              >
                {p.ctaText}
              </span>
              <img src={icArrow} alt="" style={{ width: 30, height: 30, flexShrink: 0 }} />
            </a>
          </div>
        </Reveal>
      ))}
    </>
  )
}
