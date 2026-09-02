import { blogArtigo1, blogArtigo2, blogArtigo3, icArrowRight } from '../assets/index.js'
import Reveal from './Reveal.jsx'

// Seção "Blog Contabinex" — 3 chamadas de artigo + botão para a listagem.
// Frame do Figma: bloco de 1920 x 622 começando em y=3849 (a faixa cinza é
// desenhada em Backgrounds.jsx).
const SECTION_TOP = 3849
const CONTENT_TOP = SECTION_TOP + 72
const CONTENT_LEFT = 270
const CONTENT_WIDTH = 1380

// TODO: o blog ainda não existe. Quando houver URL (ou rota), preencher aqui —
// os cards e o botão viram links automaticamente.
export const BLOG_HREF = null
const artigoHref = () => BLOG_HREF

const ARTIGOS = [
  {
    img: blogArtigo1,
    tag: 'Contabilidade',
    title: '5 erros contábeis que podem custar caro para sua empresa',
    excerpt: 'Identifique os principais desvios que podem levar a multas, atrasos e perda de controle financeiro.',
  },
  {
    img: blogArtigo2,
    tag: 'Impostos',
    title: 'Simples Nacional vs. Lucro Presumido: qual regime tributário escolher?',
    excerpt: 'Compare alíquotas, obrigações e benefícios para tomar a melhor decisão para o seu negócio.',
  },
  {
    img: blogArtigo3,
    tag: 'Gestão Fiscal',
    title: 'Como organizar suas obrigações fiscais e evitar multas',
    excerpt: 'Roteiro prático para manter guias, certidões e prazos sob controle com menos burocracia.',
  },
]

/** "Ler mais →" / "Ver todos os artigos": vira <a> assim que houver destino. */
function MaybeLink({ href, className, style, children }) {
  const Cmp = href ? 'a' : 'div'
  return (
    <Cmp {...(href ? { href } : null)} className={className} style={{ ...style, cursor: href ? 'pointer' : 'default' }}>
      {children}
    </Cmp>
  )
}

export default function Blog() {
  return (
    <>
      {/* Âncora estável (sem transform do Reveal) */}
      <div id="sec-blog" className="abs" aria-hidden="true" style={{ left: 0, top: SECTION_TOP, width: 1, height: 1 }} />

      <div
        className="abs"
        style={{ left: CONTENT_LEFT, top: CONTENT_TOP, width: CONTENT_WIDTH, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}
      >
        <Reveal style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
          <p style={{ color: 'var(--teal)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.36px', whiteSpace: 'nowrap' }}>
            BLOG CONTABINEX
          </p>
          <h2 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 46, letterSpacing: '-1.84px', whiteSpace: 'nowrap' }}>
            Conteúdo que fortalece sua gestão
          </h2>
        </Reveal>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', justifyContent: 'center', width: '100%' }}>
          {ARTIGOS.map((a, i) => (
            <Reveal key={a.title} delay={i * 90} style={{ flex: '1 0 0', minWidth: 0 }}>
              <MaybeLink
                href={artigoHref(a)}
                className="box-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  height: 360,
                  padding: 16,
                  background: 'var(--white)',
                  border: '2px solid var(--teal)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                }}
              >
                <img
                  src={a.img}
                  alt=""
                  style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }}
                />
                <span
                  style={{ alignSelf: 'flex-start', background: 'var(--teal)', color: 'var(--white)', fontWeight: 700, fontSize: 12, letterSpacing: '-0.24px', padding: '6px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}
                >
                  {a.tag}
                </span>
                <p style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 18, lineHeight: '24px', letterSpacing: '-0.36px' }}>
                  {a.title}
                </p>
                <p style={{ color: 'var(--gray)', fontWeight: 500, fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px' }}>
                  {a.excerpt}
                </p>
                <span style={{ marginTop: 'auto', color: 'var(--teal)', fontWeight: 700, fontSize: 14, letterSpacing: '-0.28px', textDecoration: 'underline' }}>
                  Ler mais →
                </span>
              </MaybeLink>
            </Reveal>
          ))}
        </div>

        <Reveal delay={270}>
          <MaybeLink
            href={BLOG_HREF}
            className="box-cta box-cta--navy"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', background: 'var(--navy)', borderRadius: 40 }}
          >
            <span style={{ color: 'var(--white)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.32px', whiteSpace: 'nowrap' }}>
              Ver todos os artigos
            </span>
            <img src={icArrowRight} alt="" style={{ width: 18, height: 18, flexShrink: 0 }} />
          </MaybeLink>
        </Reveal>
      </div>
    </>
  )
}
