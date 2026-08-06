import {
  DesktopStage,
  Responsive,
  Logo,
  Watermark,
  Title,
  Divider,
  SectionHeading,
  MobileShell,
} from '../../../core/index.js'
import alertTriangle from '../../../assets/icons/alert-triangle.svg'

// Tela 04A — Alerta: Enquadramento MEI Inviável → Simples Nacional.
// Modal de redirecionamento sobre a Qualificação esmaecida.
const DESIGN_W = 1920
const DESIGN_H = 1700
const CTA = '#/abrir-empresa/dados-empresa'
const BACK = '#/abrir-empresa/qualificacao'

const HEADING = 'Enquadramento MEI Inviável'
const BODY =
  'Com base nos dados informados (faturamento previsto ou quantidade de funcionários), seu modelo de negócio excede os limites legais permitidos para o regime de Microempreendedor Individual (MEI). Para garantir a total segurança fiscal e a regularidade da sua empresa perante a Receita Federal, sua jornada foi atualizada automaticamente para o Plano Simples Nacional (Microempresa).'
const CTA_LABEL = 'Continuar para Simples Nacional'

function Desktop() {
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title top={311}>
        Qual é o perfil da
        <br />
        sua futura empresa?
      </Title>
      <Divider left={169} top={529} />
      <SectionHeading left={169} top={565}>Dados da Empresa e Atividade</SectionHeading>

      {/* Overlay escuro */}
      <div className="abs" style={{ left: 0, top: 0, width: DESIGN_W, height: DESIGN_H, background: 'rgba(0,0,0,0.5)' }} />

      {/* Card modal */}
      <div className="abs" style={{ left: 560, top: 500, width: 800, padding: 60, background: 'var(--white)', borderRadius: 12, boxShadow: '0px 10px 15px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, textAlign: 'center' }}>
        <img src={alertTriangle} alt="" style={{ width: 80, height: 80 }} />
        <p style={{ color: 'var(--navy)', fontWeight: 600, fontSize: 40, letterSpacing: '-1.2px' }}>{HEADING}</p>
        <p style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal' }}>{BODY}</p>
        <a className="box-cta" href={CTA} style={{ background: 'var(--teal)', color: 'var(--white)', fontWeight: 600, fontSize: 24, letterSpacing: '-0.72px', padding: '20px 40px', borderRadius: 40, display: 'inline-flex' }}>
          {CTA_LABEL}
        </a>
        <a href={BACK} style={{ color: 'var(--teal)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.54px' }}>Voltar e corrigir meus dados</a>
      </div>
    </DesktopStage>
  )
}

function Mobile() {
  return (
    <MobileShell back={BACK} align="center">
      <img src={alertTriangle} alt="" style={{ width: 72, height: 72, marginTop: 12 }} />
      <h1 className="wz-title" style={{ marginTop: 20 }}>{HEADING}</h1>
      <p className="wz-sub" style={{ marginTop: 16 }}>{BODY}</p>
      <div className="wz-actions">
        <a className="wz-btn wz-btn--teal" href={CTA}>{CTA_LABEL}</a>
        <a className="wz-step" href={BACK} style={{ textDecoration: 'underline' }}>Voltar e corrigir meus dados</a>
      </div>
    </MobileShell>
  )
}

export default function AlertaSimples() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
