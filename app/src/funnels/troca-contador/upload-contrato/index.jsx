import { useState } from 'react'
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
  PrimaryButton,
  AssistantBar,
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MPrimaryButton,
  MAssistantBar,
} from '../../../core/index.js'

// Tela 08/1 — Upload Contrato Social (etapa 3/4). Envio do contrato social da
// empresa. Avançar → confirmação (pagamento externo, fora de escopo).
// Frame do Figma: 1920 x ~1650.
const DESIGN_W = 1920
const DESIGN_H = 1650
const NEXT = '#/trocar-contador/confirmacao'

function useUpload() {
  const { data, patch } = useFunnel()
  const [fileName, setFileName] = useState(data.contratoSocial || '')
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) {
      setFileName(f.name)
      patch({ contratoSocial: f.name })
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    navigate(NEXT)
  }
  return { fileName, onFile, onSubmit }
}

function Desktop() {
  const { fileName, onFile, onSubmit } = useUpload()
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo />
      <Watermark />
      <Title left={170} top={333}>Troca de Contador</Title>
      <div className="abs" style={{ left: 170, top: 411, color: 'var(--gray)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.72px', lineHeight: 'normal', whiteSpace: 'nowrap' }}>
        Para concluirmos a migração, precisamos do seu Contrato Social
        <br />
        atualizado e assinado.
      </div>

      <Divider left={170} top={570} />
      <SectionHeading left={170} top={595}>Envie o seu Contrato Social</SectionHeading>
      <p className="abs" style={{ left: 170, top: 643, color: 'var(--gray)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
        Formatos aceitos: PDF, JPG ou PNG (até 10 MB).
      </p>

      <form onSubmit={onSubmit}>
        <label
          className="abs"
          htmlFor="contratoSocial"
          style={{ left: 170, top: 730, width: 807, height: 220, border: `2px dashed ${fileName ? 'var(--teal)' : '#868686'}`, background: fileName ? 'var(--teal-light)' : 'var(--white)', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', textAlign: 'center', padding: '0 40px' }}
        >
          <span style={{ color: 'var(--teal)', fontWeight: 800, fontSize: 40, lineHeight: 1 }}>↑</span>
          <span style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.5px' }}>
            {fileName || 'Clique para selecionar ou arraste o arquivo aqui'}
          </span>
          {fileName ? <span style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 16 }}>Arquivo selecionado — clique para trocar</span> : null}
        </label>
        <input id="contratoSocial" name="contratoSocial" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={onFile} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden' }} />

        <PrimaryButton left={170} top={1010} step="3/4" />
      </form>

      <AssistantBar dividerTop={1406} barTop={1474} />
    </DesktopStage>
  )
}

function Mobile() {
  const { fileName, onFile, onSubmit } = useUpload()
  return (
    <MobileShell back="#/trocar-contador/confirmar-troca" align="left">
      <MTitle>Troca de Contador</MTitle>
      <MSub>Para concluirmos a migração, precisamos do seu Contrato Social atualizado e assinado.</MSub>
      <MDivider />
      <MHeading>Envie o seu Contrato Social</MHeading>
      <MSub>Formatos aceitos: PDF, JPG ou PNG (até 10 MB).</MSub>
      <form className="wz-form" onSubmit={onSubmit}>
        <label
          htmlFor="contratoSocialM"
          style={{ width: '100%', minHeight: 160, border: `2px dashed ${fileName ? 'var(--teal)' : '#868686'}`, background: fileName ? 'var(--teal-light)' : 'var(--white)', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', textAlign: 'center', padding: '20px' }}
        >
          <span style={{ color: 'var(--teal)', fontWeight: 800, fontSize: 32, lineHeight: 1 }}>↑</span>
          <span style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 16 }}>
            {fileName || 'Clique para selecionar o arquivo'}
          </span>
          {fileName ? <span style={{ color: 'var(--gray)', fontWeight: 600, fontSize: 13 }}>Toque para trocar</span> : null}
        </label>
        <input id="contratoSocialM" name="contratoSocialM" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={onFile} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} />
        <MPrimaryButton step="3/4">Avançar</MPrimaryButton>
      </form>
      <MAssistantBar />
    </MobileShell>
  )
}

export default function UploadContrato() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
