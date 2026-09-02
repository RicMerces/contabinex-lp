import AlertaScreen from '../shared/AlertaScreen.jsx'

// Tela 04A — Alerta: Enquadramento MEI Inviável → Simples Nacional.
// Gatilho: faturamento acima de R$ 81 mil/ano ou 2+ funcionários (Tela 03).
export default function AlertaSimples() {
  return (
    <AlertaScreen
      heading="Enquadramento MEI Inviável"
      body="Com base nos dados informados (faturamento previsto ou quantidade de funcionários), seu modelo de negócio excede os limites legais permitidos para o regime de Microempreendedor Individual (MEI). Para garantir a total segurança fiscal e a regularidade da sua empresa perante a Receita Federal, sua jornada foi atualizada automaticamente para o Plano Simples Nacional (Microempresa)."
      ctaLabel="Continuar para Simples Nacional"
      ctaHref="#/abrir-empresa/dados-empresa"
      backHref="#/abrir-empresa/qualificacao"
      plano="simples"
    />
  )
}
