/** Remove fragment in-page (#solucoes, #sec-*) sem tocar em rotas de funil (#/...). */
function clearLandingHash() {
  const hash = window.location.hash
  if (!hash || hash === '#' || hash.startsWith('#/')) return
  history.replaceState(null, '', window.location.pathname + window.location.search)
}

/** Rola até o topo da página. */
export function scrollToTop() {
  clearLandingHash()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** Rola suavemente até o elemento — só scroll, sem mudar a URL. */
export function scrollToId(id, { offset = 0 } = {}) {
  const el = document.getElementById(id)
  if (!el) return

  clearLandingHash()
  const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - offset)
  window.scrollTo({ top, behavior: 'smooth' })
}
