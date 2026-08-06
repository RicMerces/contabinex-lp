import { DesktopStage, Responsive, useFunnel, navigate, Logo, MobileShell } from '../../core/index.js'
import fundo from '../../assets/img/triagem-resultado-fundo.png'
import assistente from '../../assets/img/triagem-resultado-assistente.png'
import selo from '../../assets/img/triagem-selo.png'

// Telas 10/1, 10/2, 10/3 — Resultado da triagem (Funil C).
// Layout compartilhado; muda o plano, a descrição e o CTA (data injection
// para o funil A). Frame do Figma: 1920 x 1312.
const DESIGN_W = 1920
const DESIGN_H = 1312

// plano = chave salva em data.planoSugerido (mei | simples | classes)
export const VARIANTS = {
  mei: {
    plano: 'mei',
    label: 'MEI',
    labelSize: 36,
    desc: 'Ideal para quem está começando, fatura até R$ 81k e não possui sócios.',
    cta: 'Quero abrir como MEI',
    href: '#/abrir-empresa/dados-mei',
  },
  simples: {
    plano: 'simples',
    label: 'Simples Nacional',
    labelSize: 34,
    desc: 'O modelo mais seguro para empresas com sócios ou faturamento em crescimento.',
    cta: 'Quero abrir com Simples Nacional',
    href: '#/abrir-empresa/dados-empresa',
  },
  classes: {
    plano: 'classes',
    label: 'Plano de Classes',
    labelSize: 34,
    desc: 'A estrutura perfeita para profissionais liberais regulamentados (Médicos, Advogados, etc).',
    cta: 'Quero abrir com Plano de Classes',
    href: '#/abrir-empresa/dados-classes',
  },
}

function useResultCta(v) {
  const { patch } = useFunnel()
  return (e) => {
    e.preventDefault()
    patch({ planoSugerido: v.plano })
    navigate(v.href)
  }
}

function Desktop({ v }) {
  const onCta = useResultCta(v)
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo left={126} top={124} />
      <h1 className="abs" style={{ left: 165, top: 281, color: 'var(--navy)', fontWeight: 700, fontSize: 48, letterSpacing: '-0.96px', whiteSpace: 'nowrap' }}>
        Meu tipo de Empresa
      </h1>

      {/* Painel gradiente */}
      <div className="abs" style={{ left: 338, top: 440, width: 1286, height: 726, overflow: 'hidden', borderRadius: 40 }}>
        <img src={fundo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Assistente virtual */}
      <div className="abs" style={{ left: 1119, top: 303, width: 591, height: 863, pointerEvents: 'none' }}>
        <img src={assistente} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Selo verificado */}
      <div className="abs" style={{ left: 649, top: 514, width: 199, height: 208, pointerEvents: 'none' }}>
        <img src={selo} alt="Perfil verificado" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Headline + chip + descrição (bloco fluido, sem quebras órfãs) */}
      <div
        className="abs"
        style={{
          left: 500,
          top: 720,
          width: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 18,
        }}
      >
        <h2 style={{ margin: 0, color: 'var(--white)', fontWeight: 700, fontSize: 40, letterSpacing: '-1.2px', lineHeight: 1.15 }}>
          Seu perfil empresarial
          <br />
          foi identificado!
        </h2>
        <div
          style={{
            width: '100%',
            maxWidth: 420,
            minHeight: 72,
            borderRadius: 20,
            background: 'rgba(98,171,178,0.26)',
            boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 20px',
          }}
        >
          <span style={{ color: 'var(--teal-light)', fontWeight: 700, fontSize: v.labelSize, letterSpacing: '-1px', whiteSpace: 'nowrap' }}>{v.label}</span>
        </div>
        <p style={{ margin: 0, maxWidth: 440, color: 'var(--white)', fontWeight: 500, fontSize: 22, letterSpacing: '-0.4px', lineHeight: 1.35 }}>
          {v.desc}
        </p>
      </div>

      {/* CTA — data injection para o funil A */}
      <a
        href={v.href}
        onClick={onCta}
        className="abs box-btn"
        style={{ left: 761, top: 1196, width: 398, height: 56, background: 'var(--teal)', borderRadius: 20, color: 'var(--white)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.54px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 2px rgba(0,0,0,0.25)' }}
      >
        {v.cta}
      </a>
      <p className="abs" style={{ left: 761, top: 1262, width: 398, textAlign: 'center', color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: 14, letterSpacing: '-0.42px' }}>
        Dados serão preenchidos automaticamente
      </p>
    </DesktopStage>
  )
}

function Mobile({ v }) {
  const onCta = useResultCta(v)
  return (
    <MobileShell back="#/descobrir-plano/diagnostico" align="center">
      <h1 className="wz-title">Meu tipo de Empresa</h1>
      <div className="wz-divider" />
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          margin: '10px auto 0',
          borderRadius: 28,
          padding: '28px 20px 32px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--teal) 0%, var(--navy) 65%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.18)',
        }}
      >
        <img src={selo} alt="Perfil verificado" style={{ width: 96, height: 'auto', objectFit: 'contain' }} />
        <p style={{ color: 'var(--white)', fontWeight: 700, fontSize: 26, lineHeight: 1.15, letterSpacing: '-0.8px', marginTop: 16 }}>
          Seu perfil empresarial foi identificado!
        </p>
        <div style={{ width: '100%', maxWidth: 320, marginTop: 18, borderRadius: 16, background: 'rgba(98,171,178,0.26)', boxShadow: '0px 4px 4px rgba(0,0,0,0.25)', padding: '16px 12px' }}>
          <span style={{ color: 'var(--teal-light)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.8px' }}>{v.label}</span>
        </div>
        <p style={{ color: 'var(--white)', fontWeight: 500, fontSize: 16, lineHeight: 1.4, marginTop: 16, maxWidth: 340 }}>{v.desc}</p>
      </div>
      <div className="wz-actions">
        <a className="wz-btn wz-btn--teal" href={v.href} onClick={onCta}>{v.cta}</a>
        <span style={{ color: 'var(--gray)', fontSize: 13, fontWeight: 500 }}>Dados serão preenchidos automaticamente</span>
      </div>
    </MobileShell>
  )
}

export default function Resultado({ variant }) {
  const v = VARIANTS[variant]
  return <Responsive desktop={() => <Desktop v={v} />} mobile={() => <Mobile v={v} />} />
}
