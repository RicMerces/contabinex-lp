import { heroBg, engenheiros, btnAbrirEmpresa, icEncontrar, icTrocar } from '../assets/index.js'
import Reveal from './Reveal.jsx'
import { scrollToId } from '../utils/scroll.js'

export default function Hero() {
  return (
    <>
      {/* Fundo azul arredondado atrás da imagem */}
      <Reveal className="abs" delay={80} style={{ left: 968, top: 187, width: 952, height: 710, overflow: 'hidden' }}>
        <img src={heroBg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Reveal>

      {/* Grupo de engenheiros */}
      <Reveal
        className="abs"
        variant="fromRight"
        delay={140}
        style={{ left: 1094, top: 120, width: 826, height: 774, '--anim-dur': 'var(--anim-dur-slide)', '--anim-slide': '160px' }}
      >
        <img src={engenheiros} alt="Equipe de profissionais" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Reveal>

      {/* Título principal */}
      <Reveal
        as="h1"
        className="abs"
        delay={0}
        style={{
          left: 165,
          top: 266,
          width: 652,
          color: 'var(--navy)',
          fontWeight: 700,
          fontSize: 64,
          lineHeight: 'normal',
          letterSpacing: '-1.28px',
        }}
      >
        Simplifique sua<br />contabilidade.
      </Reveal>

      {/* Subtítulo */}
      <Reveal
        as="h2"
        className="abs"
        delay={150}
        style={{
          left: 164,
          top: 421,
          fontWeight: 700,
          fontSize: 36,
          lineHeight: 'normal',
          letterSpacing: '-0.48px',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: 'var(--navy)' }}>Menos burocracia. </span>
        <span style={{ color: 'var(--teal)' }}>Mais tempo </span>
        <br />
        <span style={{ color: 'var(--teal)' }}>para o seu negócio.</span>
      </Reveal>

      {/* Linha decorativa */}
      <Reveal className="abs" delay={230} style={{ left: 167, top: 524, width: 190, height: 3, background: 'var(--teal)' }} />

      {/* Parágrafo descritivo */}
      <Reveal
        as="p"
        className="abs"
        delay={300}
        style={{
          left: 165,
          top: 557,
          color: 'var(--gray)',
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 'normal',
          whiteSpace: 'nowrap',
        }}
      >
        A CONTABINEX une contabilidade digital, tecnologia e<br />
        atendimento especializado para empresas que buscam mais<br />
        controle e crescimento.
      </Reveal>

      {/* CTA 1 — Encontrar o Plano Ideal */}
      <Reveal className="abs" delay={420} style={{ left: 314, top: 851, width: 398, height: 73 }}>
        <button
          type="button"
          className="box-cta box-cta--light"
          onClick={() => scrollToId('sec-planos')}
          style={{ position: 'absolute', inset: 0, background: 'var(--teal-light)', borderRadius: 60, overflow: 'hidden', width: '100%', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <img src={icEncontrar} alt="" style={{ position: 'absolute', left: 27, top: '50%', transform: 'translateY(-50%)', width: 44, height: 50 }} />
          <span
            style={{
              position: 'absolute',
              left: 101,
              top: 12,
              color: 'var(--navy)',
              fontWeight: 600,
              fontSize: 20,
              lineHeight: 'normal',
              whiteSpace: 'nowrap',
            }}
          >
            Encontrar o Plano Ideal<br />para Minha Empresa
          </span>
        </button>
      </Reveal>

      {/* CTA 2 — Abrir uma Empresa (fundo em SVG do Figma) */}
      <Reveal className="abs" delay={470} style={{ left: 762, top: 851, width: 398, height: 73 }}>
        <a
          className="box-cta box-cta--svg"
          href="#/abrir-empresa"
          style={{ position: 'absolute', inset: 0, borderRadius: 36.5, overflow: 'hidden' }}
        >
          <img src={btnAbrirEmpresa} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          <span
            style={{
              position: 'absolute',
              left: 114,
              top: 24,
              color: 'var(--navy)',
              fontWeight: 600,
              fontSize: 20,
              lineHeight: 'normal',
              whiteSpace: 'nowrap',
            }}
          >
            Abrir uma Empresa
          </span>
        </a>
      </Reveal>

      {/* CTA 3 — Trocar de Contador */}
      <Reveal className="abs" delay={520} style={{ left: 1209, top: 851, width: 398, height: 73 }}>
        <a
          className="box-cta box-cta--light"
          href="#/trocar-contador"
          style={{ position: 'absolute', inset: 0, background: 'var(--teal-light)', borderRadius: 60, overflow: 'hidden' }}
        >
          <img src={icTrocar} alt="" style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', width: 56, height: 46 }} />
          <span
            style={{
              position: 'absolute',
              left: 108,
              top: 24,
              color: 'var(--navy)',
              fontWeight: 600,
              fontSize: 20,
              lineHeight: 'normal',
              whiteSpace: 'nowrap',
            }}
          >
            Trocar de Contador
          </span>
        </a>
      </Reveal>
    </>
  )
}
