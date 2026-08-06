import { mulherEscritorio, premiumFolha, premiumConsultoria, premiumModulos, premiumCertificado } from '../assets/index.js'
import Reveal from './Reveal.jsx'

// Seção "Expansão Premium" — imagem + 4 pílulas de funcionalidades adicionais
const FEATURES = [
  {
    top: 3124,
    icon: premiumFolha,
    title: 'Folha de Pagamento',
    body: 'Gestão simplificada e recorrente por colaborador registrado ou sócio com pró-labore.',
  },
  {
    top: 3265,
    icon: premiumConsultoria,
    title: 'Consultoria Especializada',
    body: 'Agendamento avulso de reuniões estratégicas de 40 minutos via Google Meet diretamente pelo painel.',
  },
  {
    top: 3405,
    icon: premiumModulos,
    title: 'Módulos por Nicho',
    body: 'Ativação opcional de ferramentas dedicadas (ex: Gestão processual para Advogados ou Prontuário para Médicos).',
  },
  {
    top: 3545,
    icon: premiumCertificado,
    title: 'Certificado Digital',
    body: 'Emissão e renovação individual integrada e desimpedida para PF ou PJ.',
  },
]

const PILL_LEFT = 924
const PILL_WIDTH = 603
const PILL_HEIGHT = 97

export default function Expansao() {
  return (
    <>
      {/* Divisória superior */}
      <Reveal className="abs" delay={0} style={{ left: 800, top: 2791, width: 320, height: 3, background: 'var(--teal)' }} />

      {/* Título da seção */}
      <Reveal
        as="p"
        variant="cx"
        className="abs"
        delay={0}
        style={{
          left: '50%',
          top: 2869,
          color: 'var(--teal)',
          fontWeight: 700,
          fontSize: 32,
          lineHeight: '25px',
          letterSpacing: '-1.28px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        EXPANSÃO PREMIUM
      </Reveal>
      <Reveal
        as="h2"
        variant="cx"
        className="abs"
        delay={150}
        style={{
          left: '50%',
          top: 2936,
          color: 'var(--navy)',
          fontWeight: 700,
          fontSize: 46,
          lineHeight: '48px',
          letterSpacing: '-1.84px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        Sua empresa cresce. Sua plataforma acompanha.
      </Reveal>
      <Reveal
        as="p"
        variant="cx"
        className="abs"
        delay={280}
        style={{
          left: '50%',
          top: 2978,
          width: 740,
          color: '#000',
          fontWeight: 400,
          fontSize: 24,
          lineHeight: '30px',
          letterSpacing: '-0.96px',
          textAlign: 'center',
        }}
      >
        Adicione funcionalidades avançadas de acordo com a maturidade e a necessidade da sua operação:
      </Reveal>

      {/* Imagem — mulher no escritório (entra da esquerda para a direita) */}
      <Reveal
        className="abs"
        variant="fromLeft"
        delay={0}
        style={{ left: 270, top: 3108, width: 582, height: 554, '--anim-dur': 'var(--anim-dur-slide)', '--anim-slide': '160px' }}
      >
        <img src={mulherEscritorio} alt="Profissional no escritório" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Reveal>

      {/* Pílulas de funcionalidades — sobem em bloco (mesmo delay) */}
      {FEATURES.map((f) => (
        <Reveal
          key={f.title}
          className="abs"
          delay={0}
          style={{ left: PILL_LEFT, top: f.top, width: PILL_WIDTH, height: PILL_HEIGHT }}
        >
          <div
            className="box-pill"
            style={{
              position: 'absolute',
              inset: 0,
              border: '3px solid var(--teal)',
              borderRadius: 50,
              background: 'var(--white)',
            }}
          >
            <img
              src={f.icon}
              alt=""
              style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, objectFit: 'contain' }}
            />
            <div style={{ position: 'absolute', left: 96, top: '50%', transform: 'translateY(-50%)', width: 480 }}>
              <p style={{ color: '#000', fontWeight: 700, fontSize: 20, lineHeight: '26px', letterSpacing: '-0.8px' }}>{f.title}</p>
              <p style={{ color: '#000', fontWeight: 400, fontSize: 18, lineHeight: '26px', letterSpacing: '-0.8px' }}>{f.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </>
  )
}
