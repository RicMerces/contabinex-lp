import {
  DesktopStage,
  Responsive,
  useFunnel,
  navigate,
  Logo,
  Watermark,
  Title,
  Divider,
  SectionHeading,
  Modal,
  ModalCta,
  ModalLink,
  MobileShell,
} from '../../../core/index.js'
import alertTriangle from '../../../assets/icons/alert-triangle.svg'

// Casca compartilhada dos alertas de desvio do Funil A (Telas 04A, 04B e o
// alerta de CPF já vinculado a CNPJ). Modal sobreposto à tela de origem
// esmaecida — o conteúdo (título, texto, destino) vem de cada tela.
const DESIGN_W = 1920
const DESIGN_H = 1700

function Desktop({ heading, body, ctaLabel, ctaHref, backHref, backLabel, plano, bgTitle, bgHeading }) {
  const { patch } = useFunnel()
  const seguir = () => {
    patch({ planoSugerido: plano, origemPlano: 'alerta' })
    navigate(ctaHref)
  }
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title top={311}>{bgTitle}</Title>
      <Divider left={169} top={529} />
      <SectionHeading left={169} top={565}>{bgHeading}</SectionHeading>

      <Modal
        icon={alertTriangle}
        heading={heading}
        body={body}
        designW={DESIGN_W}
        designH={DESIGN_H}
        actions={
          <>
            <ModalCta onClick={seguir}>{ctaLabel}</ModalCta>
            <ModalLink href={backHref}>{backLabel}</ModalLink>
          </>
        }
      />
    </DesktopStage>
  )
}

function Mobile({ heading, body, ctaLabel, ctaHref, backHref, backLabel, plano }) {
  const { patch } = useFunnel()
  const seguir = () => {
    patch({ planoSugerido: plano, origemPlano: 'alerta' })
    navigate(ctaHref)
  }
  return (
    <MobileShell back={backHref} align="center">
      <img src={alertTriangle} alt="" style={{ width: 72, height: 72, marginTop: 12 }} />
      <h1 className="wz-title" style={{ marginTop: 20 }}>{heading}</h1>
      <p className="wz-sub" style={{ marginTop: 16 }}>{body}</p>
      <div className="wz-actions">
        <button type="button" className="wz-btn wz-btn--teal" onClick={seguir}>{ctaLabel}</button>
        <a className="wz-step" href={backHref} style={{ textDecoration: 'underline' }}>{backLabel}</a>
      </div>
    </MobileShell>
  )
}

export default function AlertaScreen(props) {
  const p = {
    backLabel: 'Voltar e corrigir meus dados',
    bgTitle: (
      <>
        Qual é o perfil da
        <br />
        sua futura empresa?
      </>
    ),
    bgHeading: 'Dados da Empresa e Atividade',
    ...props,
  }
  return <Responsive desktop={() => <Desktop {...p} />} mobile={() => <Mobile {...p} />} />
}
