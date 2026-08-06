import { DesktopStage, Responsive, Logo, MobileShell } from '../../../core/index.js'
import fundo from '../../../assets/img/triagem-intro-fundo.png'
import assistente from '../../../assets/img/triagem-intro-assistente.png'

// Tela 09 — Intro: Assistente Virtual (Funil C — Triagem com IA).
// Boas-vindas da assistente + CTA "Vamos começar" → diagnóstico.
// Frame do Figma: 1920 x 1322.
const DESIGN_W = 1920
const DESIGN_H = 1322
const NEXT = '#/descobrir-plano/diagnostico'

function Desktop() {
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo left={126} top={124} />
      <h1
        className="abs"
        style={{ left: 162, top: 268, color: 'var(--navy)', fontWeight: 700, fontSize: 48, letterSpacing: '-0.96px', whiteSpace: 'nowrap' }}
      >
        Meu tipo de Empresa
      </h1>

      {/* Painel gradiente */}
      <div className="abs" style={{ left: 302, top: 441, width: 1418, height: 800, overflow: 'hidden' }}>
        <img src={fundo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Assistente virtual (foto) */}
      <div className="abs" style={{ left: 163, top: 375, width: 638, height: 866, pointerEvents: 'none' }}>
        <img src={assistente} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Texto de boas-vindas (alinhado à direita) */}
      <div
        className="abs"
        style={{ left: 732, top: 549, width: 814, textAlign: 'right', color: 'var(--white)', letterSpacing: '-1.2px' }}
      >
        <p style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2 }}>Olá! Eu sou a assistente virtual</p>
        <p style={{ fontSize: 36, lineHeight: 1.2 }}>
          <span style={{ fontWeight: 700 }}>da CONTABINEX </span>
          <span style={{ fontWeight: 400 }}>e vou te ajudar</span>
        </p>
        <p style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.2 }}>a descobrir o modelo de empresa</p>
        <p style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.2 }}>ideal para a sua realidade.</p>
        <p style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.2, marginTop: 56 }}>Para isso, preparei um roteiro rápido</p>
        <p style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.2 }}>de apenas 4 perguntas cruciais:</p>
      </div>

      {/* CTA */}
      <a
        className="abs box-btn"
        href={NEXT}
        style={{ left: 1073, top: 1053, width: 381, height: 75, background: 'var(--teal)', borderRadius: 10, color: 'var(--white)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Vamos começar
      </a>
    </DesktopStage>
  )
}

function Mobile() {
  return (
    <MobileShell back="#/" align="center">
      <h1 className="wz-title">Meu tipo de Empresa</h1>
      <div className="wz-divider" />
      <img
        src={assistente}
        alt="Assistente virtual da CONTABINEX"
        style={{ width: 220, height: 'auto', margin: '8px auto 0', objectFit: 'contain' }}
      />
      <p style={{ color: 'var(--gray)', fontWeight: 700, fontSize: 20, lineHeight: 1.3, marginTop: 20 }}>
        Olá! Eu sou a assistente virtual da CONTABINEX
      </p>
      <p style={{ color: 'var(--gray)', fontWeight: 500, fontSize: 16, lineHeight: 1.45, marginTop: 10, maxWidth: 520 }}>
        E vou te ajudar a descobrir o modelo de empresa ideal para a sua realidade. Para isso, preparei um roteiro rápido de apenas 4 perguntas cruciais.
      </p>
      <div className="wz-actions">
        <a className="wz-btn wz-btn--teal" href={NEXT}>Vamos começar</a>
      </div>
    </MobileShell>
  )
}

export default function Intro() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
