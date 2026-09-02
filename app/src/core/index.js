// Barrel do core — componentes e utilidades em comum a todas as telas de funil.
export { default as useIsMobile, MOBILE_BREAKPOINT } from './useIsMobile.js'
export { default as useStageScale } from '../hooks/useStageScale.js'
export { default as DesktopStage } from './DesktopStage.jsx'
export { default as Responsive } from './Responsive.jsx'
export { FunnelStateProvider, useFunnel } from './FunnelState.jsx'
export { useHashRoute, navigate, normalizeHash } from './routing.js'

// Primitivas desktop (posicionadas de forma absoluta no palco 1920)
export {
  Logo,
  Watermark,
  Divider,
  Title,
  SectionHeading,
  SectionSub,
  Field,
  PrimaryButton,
  AssistantBar,
  FIELD_BORDER,
  FormColumn,
  FlowRow,
  FlowSection,
  FlowNote,
  FlowError,
  FlowField,
  FlowRadio,
  FlowAutocomplete,
  FlowActions,
  FlowSteps,
  Modal,
  ModalCta,
  ModalLink,
} from './ui.desktop.jsx'

// Primitivas móveis (coluna única)
export {
  MobileShell,
  MTitle,
  MDivider,
  MHeading,
  MSub,
  MField,
  MForm,
  MPrimaryButton,
  MAssistantBar,
  MSection,
  MRadio,
  MAutocomplete,
  MCard,
  MSteps,
} from './ui.mobile.jsx'
