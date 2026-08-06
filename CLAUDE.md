# Contabinex — Regras de Criação de Telas (para IA) + Guardrails

Instruções persistentes para qualquer IA que crie ou edite **telas de funil** neste
repositório. Carregado automaticamente pelo Claude Code. Companheiro do
[`fluxo.md`](./fluxo.md) (mapa de navegação do produto).

Stack: **React + Vite + CSS puro** (sem router, sem lib de form, sem CSS-in-JS, sem Tailwind).
Código do app em `app/src/`.

---

## 0. Fonte da verdade — leia ANTES de começar

1. **`fluxo.md` manda na navegação.** Toda tela, funil, passo (`1/4`…), decisão e
   destino sai de lá. Se a tela/decisão não está no `fluxo.md`, **pergunte** — não invente fluxo.
2. **Figma manda no layout** (coordenadas, cores, textos), via `get_design_context`
   (skill `figma-design-to-code`).
3. **Divergência Figma × `fluxo.md` → o `fluxo.md` vence no roteamento.**
   Exemplo já decidido: o Figma tem capturas de lead "02-B/02-C" para os Funis B e C,
   mas o `fluxo.md` faz o **Funil B** entrar direto na **Validação CNPJ (Tela 07)** e o
   **Funil C** no **Assistente (Tela 09)**. Seguimos o `fluxo.md`.

Os 3 funis:

| Funil | Pasta | Raiz | Entrada (CTA na landing) |
|---|---|---|---|
| A — Nova Abertura | `funnels/nova-abertura/` | `#/abrir-empresa` | Abrir Empresa · Ativar MEI · Selecionar Simples |
| B — Troca de Contador | `funnels/troca-contador/` | `#/trocar-contador` | Trocar de Contador |
| C — Triagem com IA | `funnels/triagem-ia/` | `#/descobrir-plano` | Consultar Categoria · Descobrir Meu Plano |

---

## 1. Onde as coisas vivem

```
app/src/
  core/                       # infra + primitivas COMPARTILHADAS (não duplicar)
    index.js                  # barrel: importe tudo daqui
    DesktopStage.jsx          # palco escalado 1920 (desktop)
    Responsive.jsx            # escolhe desktop|mobile
    ui.desktop.jsx            # Logo, Watermark, Title, Divider, SectionHeading,
                              #   SectionSub, Field, PrimaryButton, AssistantBar
    ui.mobile.jsx (+wizard.css) # MobileShell, MTitle, MField, MForm, ... (.wz-*)
    FunnelState.jsx           # useFunnel() → { data, patch, reset }
    routing.js                # useHashRoute, navigate, normalizeHash
    useIsMobile.js            # breakpoint 768
  funnels/<funil>/<tela>/index.jsx   # UMA tela por pasta
  funnels/<funil>/routes.js          # rotas do funil (array)
  routes.js                          # agrega os funis (NÃO editar ao add tela)
  hooks/useStageScale.js
```

---

## 2. Como criar uma tela nova (passo a passo)

1. **Confirme no `fluxo.md`**: id, funil, passo, campos, tela anterior, próxima/decisão.
2. **Pegue o layout do Figma** com `get_design_context` (carregue a skill `figma-design-to-code` antes). Anote o frame (ex.: `1920 × 1700`) e as coordenadas.
3. Crie `app/src/funnels/<funil>/<slug>/index.jsx`.
4. Implemente `Desktop()` e `Mobile()` usando **só primitivas do `core/`**; exporte via `<Responsive>`.
5. **Registre a rota** em `app/src/funnels/<funil>/routes.js`: `{ path, Component, props? }`.
6. Ligue navegação: `back` = tela anterior; `next`/decisão via `navigate()`.
7. Persista dados com `useFunnel().patch({...})`; leia defaults de `data`.
8. `npx vite build` e **verifique no browser em desktop E mobile**.

Esqueleto mínimo (siga `funnels/nova-abertura/qualificacao/index.jsx` como referência viva):

```jsx
import { DesktopStage, Responsive, useFunnel, navigate,
         Logo, Watermark, Title, Divider, SectionHeading, SectionSub,
         Field, PrimaryButton, AssistantBar,
         MobileShell, MTitle, MDivider, MHeading, MSub, MField, MForm,
         MPrimaryButton, MAssistantBar } from '../../../core/index.js'

const DESIGN_W = 1920, DESIGN_H = 1700   // frame do Figma
const BACK = '#/abrir-empresa'
const NEXT = '#/abrir-empresa/proxima'

function Desktop() {
  const { data, patch } = useFunnel()
  const onSubmit = (e) => { e.preventDefault(); patch({ /* campos */ }); navigate(NEXT) }
  return (
    <DesktopStage designW={DESIGN_W} designH={DESIGN_H}>
      <Logo /><Watermark />
      <Title top={335}>Linha 1<br />Linha 2</Title>
      {/* ... coordenadas EXATAS do Figma ... */}
      <PrimaryButton step="2/4" />
      <AssistantBar />
    </DesktopStage>
  )
}
function Mobile() { /* mesma lógica com MobileShell/MField/... */ }
export default function MinhaTela() {
  return <Responsive desktop={() => <Desktop />} mobile={() => <Mobile />} />
}
```

---

## 3. Layout desktop (palco escalado)

- Envolva em `<DesktopStage designW={1920} designH={<altura do frame>}>`.
- Posicione com a classe `.abs` e **coordenadas exatas do Figma** (`left/top/width/height` em px do frame de 1920). O palco é escalado para a largura da janela — não use `%`, `vw` nem media queries no desktop.
- Prefira as **primitivas** (`Logo`, `Watermark`, `Title`, `Divider`, `SectionHeading`, `SectionSub`, `Field`, `PrimaryButton`, `AssistantBar`). As props de posição (`left`, `top`, …) sobrescrevem os defaults.
- **Cores só via CSS vars**: `var(--navy)` `#33376f`, `var(--teal)` `#62abb2`, `var(--teal-light)` `#dce8ea`, `var(--gray)` `#606062`, `var(--white)`. Borda de input = `FIELD_BORDER` (exportado). Não hardcode hex fora disso.
- Fonte Montserrat é herdada — não defina `font-family`.

---

## 4. Layout mobile (coluna única)

- Envolva em `<MobileShell back={BACK} align="left|center">` e use `MTitle`, `MDivider`, `MHeading`, `MSub`, `MForm`, `MField`, `MPrimaryButton`, `MAssistantBar`.
- Estilo em `core/wizard.css` (classes `.wz-*`). **Nada de posicionamento absoluto no mobile** — é fluxo em coluna.
- Mobile é uma **reescrita semântica** do mesmo conteúdo (não escala o palco), com **os mesmos dados, estado e navegação** do desktop.

---

## 5. Responsividade

- `export default` **sempre** via `<Responsive desktop={…} mobile={…} />`. As duas versões são obrigatórias.
- Breakpoint: **< 768px = mobile** (não alterar). A landing mobile é o `MobileApp` — não mexer.

---

## 6. Roteamento

- Hash routing, sem lib. `path` sempre `'#/<funil>'` (raiz) ou `'#/<funil>/<etapa>'` (sub-rota).
- Avançar: `navigate(hash)`. Voltar/links: `<a href={hash}>`.
- **Decisão/branching**: compute o próximo hash a partir de `useFunnel().data` e chame `navigate()` condicional (ex.: elegível a MEI? → `dados-mei`, senão → `dados-empresa`). As regras estão no `fluxo.md`.
- Registre só no `routes.js` **do funil**; o `app/src/routes.js` agrega automaticamente.
- O `App` já reseta o scroll ao topo em toda troca de rota — não recrie isso.

---

## 7. Estado do funil (persistência e data injection)

- `useFunnel()` → `{ data, patch, reset }`. `patch({ campo: valor })` mescla; leia defaults de `data[campo]`.
- **Nunca peça de novo** algo que já está em `data`. Persista o que o lead respondeu.
- Funil C classifica e **injeta** o resultado no Funil A/B (`planoSugerido: 'mei'|'simples'|'classes'`, etc.). Propague — o usuário não repete o que já deu.

---

## 8. Assets e ícones

- Use o barrel `assets/index.js` (ou import direto de `assets/icons/*.svg`). **Reaproveite** o que já existe.
- **Não** redesenhe SVG à mão nem invente ícone. Faltando asset, exporte do Figma e **comite** o arquivo.
- **Nunca** deixe URL de asset do Figma (`figma.com/api/mcp/asset/...`) em código comitado — expira em ~7 dias.

---

## 9. Animações

- Entrada opcional via `<Reveal>` (primitiva `blur-rise`). O CSS já respeita `prefers-reduced-motion`.
- Sem bounce/scale/slide lateral (salvo as variantes já existentes). Navbar e footer não animam.

---

## GUARDRAILS — o que NÃO fazer

- ❌ **Não adicione dependências.** Nada de router, lib de form, styled-components, Tailwind, UI kits. Stack = React + Vite + CSS puro.
- ❌ **Não duplique primitivas.** Se o `core/` já resolve, use. Se precisa de algo novo e reutilizável, **adicione ao `core/`** em vez de copiar inline na tela.
- ❌ **Não hardcode cores/hex** — use as CSS vars.
- ❌ **Não quebre o modelo de palco escalado** (1920) no desktop, nem posicione absoluto no mobile.
- ❌ **Não invente telas, decisões ou fluxos** fora do `fluxo.md`. Divergência com o Figma → `fluxo.md` vence; se ambíguo, **pergunte**.
- ❌ **Não crie `next` circular** (apontando para a própria rota) nem para rota inexistente sem intenção clara.
- ❌ **Não colete/transmita dados sensíveis** (financeiros, documentos, credenciais) para lugar nenhum, e **não persista credenciais**. Formulários ficam com `preventDefault` até existir backend/contrato de API.
- ❌ **Não edite `app/src/routes.js`** ao adicionar tela — mexa só no `routes.js` do funil.
- ❌ **Não mexa** no `MobileApp` (landing mobile) nem na lógica de scaling ao criar telas de funil.
- ❌ **Não deixe `whiteSpace: 'nowrap'`** estourar o container — passe `width` quando o texto quebra linha.
- ⚠️ **Variantes órfãs:** `contador` e `empresa` da `captura-lead` **não são mais usadas** (Funis B e C seguem o `fluxo.md`). Não as referencie; remova quando confirmado com o dono.

---

## Checklist final (antes de concluir uma tela)

- [ ] Tela existe no `fluxo.md`; id/passo/campos/decisão conferem.
- [ ] `Desktop()` **e** `Mobile()` implementados via `<Responsive>`.
- [ ] Rota registrada no `routes.js` **do funil**; `path` segue a convenção.
- [ ] `back` e `next`/decisão corretos; **sem `next` circular**.
- [ ] Dados persistidos com `patch`; defaults lidos de `data`.
- [ ] Cores via `var()`; assets do barrel; **zero dependências novas**.
- [ ] `npx vite build` passa; verificado no browser em **desktop e mobile**.
