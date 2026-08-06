# Core — kit compartilhado das telas de funil

Tudo que é comum às telas fica em `src/core/`. Cada tela fica na sua própria
pasta dentro do funil: `src/funnels/<funil>/<tela>/index.jsx`.

Funis:
- `nova-abertura` (Funil A)
- `troca-contador` (Funil B)
- `triagem-ia` (Funil C)

## Convenções

- **Cores**: use as CSS vars de `index.css` (`--navy #33376f`, `--teal #62abb2`,
  `--teal-light #dce8ea`, `--gray #606062`, `--white`). Borda de input `#868686`.
- **Fonte**: Montserrat (já global).
- **Responsivo**: cada tela exporta um componente que usa `<Responsive desktop mobile />`.
  - **Desktop** = `<DesktopStage designW={1920} designH={ALTURA_DO_FRAME}>` com filhos
    posicionados de forma absoluta (`className="abs"`) nas coordenadas EXATAS do Figma.
  - **Mobile** = `<MobileShell>` com coluna única centralizada e as primitivas `M*`.
- **Estado**: `useFunnel()` → `{ data, patch, reset }`. Salve o que o usuário digitou
  com `patch({...})` e leia de `data` (data injection entre funis — ver `fluxo.md`).
- **Navegação**: `navigate('#/...')` ou `<a href="#/...">`. A logo volta para `#/`.

## Import

```js
import {
  DesktopStage, Responsive, useFunnel, navigate,
  Logo, Watermark, Title, Divider, SectionHeading, SectionSub, Field, PrimaryButton, AssistantBar,
  MobileShell, MTitle, MDivider, MHeading, MSub, MField, MForm, MPrimaryButton, MAssistantBar,
} from '../../../core/index.js'
```

## Primitivas DESKTOP (posição absoluta, coords do Figma)

- `<Logo />` — logo top-left, volta para a landing.
- `<Watermark />` — marca d'água CX cinza (decorativa).
- `<Title left top>{...}</Title>` — título azul 48px.
- `<Divider left top width />` — linha verde-água.
- `<SectionHeading left top>` (cinza 32) / `<SectionSub left top width>` (cinza 24 bold).
- `<Field id label labelLeft labelTop inputTop left width as type placeholder defaultValue />`
  — label + input. `as="select"` (com `<option>` children) ou `as="textarea"`.
  O `name` do input = `id`; leia com FormData por esse nome.
- `<PrimaryButton left top step="1/4" />` — botão "Avançar" + passo. Dentro de `<form>` use `type="submit"`; fora, passe `href` ou `onClick`.
- `<AssistantBar dividerTop barTop />` — rodapé "falar com um assistente".

Para elementos sem primitiva (imagens, ícones, cards), use `<div className="abs" style={{ left, top, width, height }}>` diretamente. Baixe os assets do Figma e salve em `src/assets/` (adicione ao barrel `src/assets/index.js`); NÃO use as URLs remotas do Figma (expiram em ~7 dias).

## Primitivas MOBILE (coluna centralizada)

- `<MobileShell back="#/" align="center|left">...</MobileShell>` — header (voltar + logo) + main.
- `<MTitle>`, `<MDivider>`, `<MHeading>`, `<MSub>`.
- `<MForm onSubmit>` + `<MField id label as type placeholder defaultValue />`.
- `<MPrimaryButton step="1/4" variant="teal|navy|light|outline">Avançar</MPrimaryButton>`.
- `<MAssistantBar />`.
- Classes utilitárias em `wizard.css` (`.wz-btn`, `.wz-field`, etc.) para casos especiais.

## Rotas

Cada funil tem `src/funnels/<funil>/routes.js` exportando um array:

```js
import MinhaTela from './minha-tela/index.jsx'
export default [
  { path: '#/abrir-empresa/qualificacao', Component: Qualificacao },
  { path: '#/abrir-empresa/alerta-simples', Component: AlertaSimples },
]
```

`src/routes.js` junta os três arrays automaticamente — não precisa mexer nele.

## Referência

`src/funnels/nova-abertura/captura-lead/index.jsx` é o exemplo completo
(desktop + mobile + form + funnel state + navegação). Copie esse padrão.

## Mapa de telas → nó do Figma (fileKey `7AtOuyDtENlEIkp9VigGDn`)

Funil A (nova-abertura):
- captura-lead (Tela 02) `36:2` — FEITO (referência)
- qualificacao (Tela 03) `43:55` — `#/abrir-empresa/qualificacao` (2/4)
- alerta-simples (Tela 04A) `255:5` — `#/abrir-empresa/alerta-simples`
- alerta-classes (Tela 04B) `255:63` — `#/abrir-empresa/alerta-classes`
- dados-mei (Tela 05) `95:8` — `#/abrir-empresa/dados-mei` (3/4)
- dados-empresa (Tela 06) `104:158` — `#/abrir-empresa/dados-empresa` (3/4)
- dados-classes (Tela 06/1) `104:207` — `#/abrir-empresa/dados-classes` (3/4)
- confirmacao (Tela 11) `253:68` — `#/abrir-empresa/confirmacao`

Funil B (troca-contador):
- validacao-cnpj (Tela 07) `112:64` — `#/trocar-contador` (1/4)
- loading-receita (Tela 08) `113:125` — `#/trocar-contador/consultando`
- confirmacao-troca (Tela 07/1) `265:4` — `#/trocar-contador/confirmar-troca`
- upload-contrato (Tela 08/1) `114:179` — `#/trocar-contador/upload` (3/4)
- erro-cnpj (Tela 08/E) `253:8` — `#/trocar-contador/erro-cnpj`
- erro-upload (Tela 08/1E) `253:39` — `#/trocar-contador/erro-upload`
- confirmacao (Tela 12) `253:101` — `#/trocar-contador/confirmacao`

Funil C (triagem-ia):
- intro (Tela 09) `117:237` — `#/descobrir-plano`
- diagnostico (Tela 10 quiz) `124:7` — `#/descobrir-plano/diagnostico`
- resultado-mei (Tela 10/3) `138:98` — `#/descobrir-plano/resultado-mei`
- resultado-simples (Tela 10/2) `138:84` — `#/descobrir-plano/resultado-simples`
- resultado-classes (Tela 10/1) `132:59` — `#/descobrir-plano/resultado-classes`
