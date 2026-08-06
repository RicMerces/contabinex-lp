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
    ctaText: 'Selecionar Simples Nacional',
    ctaHref: '#/abrir-empresa', // Funil A — Nova Abertura
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
    ctaText: 'Consultar Minha Categoria',
    ctaHref: '#/descobrir-plano', // Funil C — Triagem com IA
  },
]

const CARD_TOP = 2104
const CARD_HEIGHT = 609
const HEADER_TOP = 2154
const HEADER_INSET = 10
const CONTENT_X = 58
const BODY_TOP = 2307
const CTA_TOP = 2618

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
                top: HEADER_TOP - CARD_TOP,
                width: p.cardWidth - HEADER_INSET * 2,
                /* Preenche até o início dos benefícios — headers alinhados entre cards */
                minHeight: BODY_TOP - HEADER_TOP,
                boxSizing: 'border-box',
                padding: '16px 20px',
                background: 'var(--navy)',
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
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
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 28,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--white)',
                  fontWeight: 700,
                  fontSize: 18,
                  lineHeight: '25px',
                  letterSpacing: '-0.72px',
                  whiteSpace: 'nowrap',
                }}
              >
                {p.ctaText}
              </span>
              <img
                src={icArrow}
                alt=""
                style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', width: 34, height: 34 }}
              />
            </a>
          </div>
        </Reveal>
      ))}
    </>
  )
}
