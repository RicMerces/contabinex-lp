import AlertaScreen from '../shared/AlertaScreen.jsx'

// Tela 04B — Alerta: Atividade Restrita no MEI → Classes Profissionais.
// Gatilho: atividade regulamentada por conselho de classe (Tela 03).
export default function AlertaClasses() {
  return (
    <AlertaScreen
      heading="Atividade Restrita no MEI"
      body="Identificamos que a atividade ou profissão selecionada é regulamentada por conselho de classe e, por lei, não possui permissão para atuar como MEI. Não se preocupe! Para que você possa emitir suas notas fiscais e exercer sua profissão com total tranquilidade, direcionamos o seu perfil de forma automática para o nosso Plano de Classes Profissionais."
      ctaLabel="Continuar para Classes Profissionais"
      ctaHref="#/abrir-empresa/dados-classes"
      backHref="#/abrir-empresa/qualificacao"
      plano="classes"
    />
  )
}
