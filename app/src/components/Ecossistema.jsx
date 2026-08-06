import { infraBand, ecoGestao, ecoSuporte, ecoEmissao, ecoCentralDocs } from '../assets/index.js'
import Reveal from './Reveal.jsx'

const CARDS = [
  {
    cardLeft: 281,
    icon: ecoGestao,
    iconLeft: 399,
    iconW: 64,
    iconH: 69,
    textLeft: 317,
    title: 'Gestão & Inteligência',
    body: 'Contabilidade digital integral conectada a um sistema de gestão empresarial intuitivo, centralizando sua organização financeira.',
  },
  {
    cardLeft: 633,
    icon: ecoSuporte,
    iconLeft: 750,
    iconW: 67,
    iconH: 63,
    textLeft: 669,
    title: 'Suporte com IA',
    body: 'Inteligência Artificial nativa integrada à plataforma para sanar dúvidas operacionais e oferecer orientação imediata.',
  },
  {
    cardLeft: 985,
    icon: ecoEmissao,
    iconLeft: 1108,
    iconW: 53,
    iconH: 71,
    textLeft: 1015,
    title: 'Emissão de Notas',
    body: 'Emissor de notas fiscais integrado e simplificado, estruturado para agilizar a rotina diária da sua equipe.',
  },
  {
    cardLeft: 1337,
    icon: ecoCentralDocs,
    iconLeft: 1458,
    iconW: 59,
    iconH: 72,
    textLeft: 1365,
    title: 'Central de Documentos',
    body: 'Ambiente seguro e automatizado para o arquivamento, recepção e controle de certidões e guias fiscais.',
  },
]

const ICON_CENTER_Y = 1544

export default function Ecossistema() {
  return (
    <>
      {/* Linha divisória superior */}
      <Reveal className="abs" delay={0} style={{ left: 800, top: 1018, width: 320, height: 3, background: 'var(--teal)' }} />

      {/* Título da seção */}
      <Reveal
        as="h2"
        variant="cx"
        className="abs"
        delay={0}
        style={{
          left: '50%',
          top: 1072,
          color: 'var(--navy)',
          fontWeight: 700,
          fontSize: 46,
          lineHeight: 'normal',
          letterSpacing: '-1.84px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        O elo estratégico entre a precisão<br />e a sua liberdade.
      </Reveal>

      {/* Subtítulo */}
      <Reveal
        as="p"
        variant="cx"
        className="abs"
        delay={150}
        style={{
          left: '50%',
          top: 1200,
          color: 'var(--teal)',
          fontWeight: 500,
          fontSize: 24,
          lineHeight: 'normal',
          letterSpacing: '-0.48px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        Enquanto você cuida do crescimento da empresa, a<br />CONTABINEX cuida da burocracia.
      </Reveal>

      {/* Faixa de infraestrutura (imagem de fundo) */}
      <Reveal className="abs" delay={0} style={{ left: 223, top: 1288, width: 1473, height: 550 }}>
        <img src={infraBand} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Reveal>

      {/* Títulos sobre a faixa */}
      <Reveal
        as="p"
        variant="cx"
        className="abs"
        delay={120}
        style={{
          left: '50%',
          top: 1341,
          color: 'var(--white)',
          fontWeight: 700,
          fontSize: 32,
          letterSpacing: '-1.28px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        INFRAESTRUTURA MODERNA
      </Reveal>
      <Reveal
        as="p"
        variant="cx"
        className="abs"
        delay={200}
        style={{
          left: '50%',
          top: 1385,
          color: 'var(--white)',
          fontWeight: 700,
          fontSize: 48,
          letterSpacing: '-1.92px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        Ecossistema Tecnológico
      </Reveal>

      {/* Cards */}
      {CARDS.map((c, i) => (
        <Reveal key={c.title} className="abs" delay={i * 80} style={{ left: c.cardLeft, top: 1481, width: 300, height: 384 }}>
          <div className="box-card" style={{ position: 'absolute', inset: 0 }}>
            <div className="box-card__surface" />
            <img
              className="abs"
              src={c.icon}
              alt=""
              style={{
                left: c.iconLeft - c.cardLeft,
                top: ICON_CENTER_Y - 1481 - c.iconH / 2,
                width: c.iconW,
                height: c.iconH,
              }}
            />
            <div className="abs" style={{ left: c.textLeft - c.cardLeft, top: 118, width: 248 }}>
              <p style={{ color: '#000', fontWeight: 700, fontSize: 20, lineHeight: '25px', letterSpacing: '-0.8px', marginBottom: 12 }}>
                {c.title}
              </p>
              <p style={{ color: '#000', fontWeight: 500, fontSize: 16, lineHeight: '24px' }}>{c.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </>
  )
}
