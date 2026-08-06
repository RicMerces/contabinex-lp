import { watermarkCx, atendente } from '../assets/index.js'
import Reveal from './Reveal.jsx'

// Faixa verde-água de chamada final (o fundo teal vem de Backgrounds)
export default function CtaFinal() {
  return (
    <>
      {/* Marca d'água CX */}
      <Reveal className="abs" delay={0} style={{ left: 998, top: 3871, width: 812, height: 439, opacity: 0.16, overflow: 'hidden', pointerEvents: 'none' }}>
        <img src={watermarkCx} alt="" style={{ width: '100%', height: '100%' }} />
      </Reveal>

      {/* Atendente — entra da direita para a esquerda */}
      <Reveal
        className="abs"
        variant="fromRight"
        delay={140}
        style={{ left: 1231, top: 3741, width: 656, height: 730, '--anim-dur': 'var(--anim-dur-slide)', '--anim-slide': '160px' }}
      >
        <img src={atendente} alt="Atendente CONTABINEX" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Reveal>

      {/* Chamada */}
      <Reveal
        id="sec-contato"
        as="h2"
        className="abs"
        delay={0}
        style={{
          left: 155,
          top: 3937,
          color: 'var(--white)',
          fontWeight: 700,
          fontSize: 48,
          lineHeight: '50px',
          letterSpacing: '-1.92px',
        }}
      >
        Pronto para dar<br />o próximo passo na<br />gestão do seu negócio?
      </Reveal>

      {/* Botão */}
      <Reveal className="abs" delay={240} style={{ left: 756, top: 4284, width: 408, height: 85 }}>
        <a
          className="box-cta box-cta--light"
          href="#"
          style={{ position: 'absolute', inset: 0, background: 'var(--teal-light)', borderRadius: 50, overflow: 'hidden' }}
        >
          <span
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'var(--navy)',
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '-0.8px',
              whiteSpace: 'nowrap',
            }}
          >
            Falar com um Consultor CX
          </span>
        </a>
      </Reveal>
    </>
  )
}
