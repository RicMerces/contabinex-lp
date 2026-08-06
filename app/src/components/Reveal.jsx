import { useEffect, useRef } from 'react'

// Primitiva única de animação da landing: "blur-rise".
// O elemento entra desfocado + transparente + alguns px abaixo e resolve
// para nítido + opaco + posição final. Dispara na entrada em viewport,
// uma única vez (once). Toda a aparência vem das classes .reveal no CSS.
//
// variant:
//   'plain'     → elementos sem transform próprio
//   'cx'        → elementos centralizados com translateX(-50%) (compõe a subida)
//   'fromRight' → entrada deslizando da direita para a esquerda
//   'fromLeft'  → entrada deslizando da esquerda para a direita
// delay: atraso em ms (cascata / stagger entre irmãos), aplicado via --d.
const VARIANT_CLASS = {
  plain: 'reveal',
  cx: 'reveal reveal--cx',
  fromRight: 'reveal reveal--from-right',
  fromLeft: 'reveal reveal--from-left',
}

// --- Rede de segurança compartilhada ---------------------------------------
// O IntersectionObserver pode NÃO disparar em "pulos" de rolagem (clique em
// âncora, tecla End, arrastar a barra), o que deixaria seções puladas presas
// em opacity:0 — invisíveis para sempre. Este scan garante que qualquer
// elemento "once" já visível OU já rolado por cima da viewport receba is-in.
// É síncrono no scroll (não depende de rAF, que pausa em aba em segundo plano)
// e barato: só relê a posição dos elementos ainda pendentes. Elementos que
// entram normalmente continuam animando pelo IO.
const guard = new Set()
let listening = false

function scan() {
  if (!guard.size) return
  const h = window.innerHeight
  guard.forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.top < h * 0.9 || r.bottom <= 0) {
      el.classList.add('is-in')
      guard.delete(el)
    }
  })
}
function ensureListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', scan, { passive: true })
  window.addEventListener('resize', scan, { passive: true })
}
// ---------------------------------------------------------------------------

export default function Reveal({
  as: Tag = 'div',
  variant = 'plain',
  delay = 0,
  once = true,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // prefers-reduced-motion: mostra o estado final sem animar.
    // (o CSS já neutraliza, mas garantimos a visibilidade caso o IO não dispare)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }

    // Libera a GPU quando a transição termina (remove will-change)
    const onDone = (e) => {
      if (e.target === el) el.classList.add('anim-done')
    }
    el.addEventListener('transitionend', onDone)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          guard.delete(el)
          if (once) io.unobserve(el)
        } else if (!once) {
          el.classList.remove('is-in', 'anim-done')
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)

    // Rede de segurança apenas para elementos "once" (revelação garantida).
    if (once) {
      guard.add(el)
      ensureListening()
      scan() // checagem inicial (elementos já visíveis/pulados no load)
    }

    return () => {
      io.disconnect()
      guard.delete(el)
      el.removeEventListener('transitionend', onDone)
    }
  }, [once])

  const cls = [VARIANT_CLASS[variant] || 'reveal', className].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={cls} style={{ ...style, '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}
