import { useEffect, useState } from 'react'

// Roteamento por hash, sem dependência de biblioteca (mesma abordagem já
// usada na App). Cada tela é registrada num mapa hash -> componente.
// Ex.: '#/abrir-empresa/qualificacao'.

/** Hash atual da URL (ex.: '#/trocar-contador'). '' na landing. */
export function useHashRoute() {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''))

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}

/** Navega para um hash de forma programática. */
export function navigate(hash) {
  if (typeof window === 'undefined') return
  window.location.hash = hash
}

/** Normaliza um hash para comparação ('' e '#/' equivalem à landing). */
export function normalizeHash(hash) {
  if (!hash || hash === '#' || hash === '#/') return ''
  return hash
}
