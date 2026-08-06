import { createContext, useContext, useMemo, useState } from 'react'

// Estado compartilhado entre os funis. Guarda o que o lead já respondeu para
// não pedir de novo (ver fluxo.md — "data injection" do Funil C para A/B, e a
// persistência do lead capturado na Tela 02).
//
// Formato livre e progressivo: cada tela faz `patch({ campo: valor })`.
// Ex.: { nome, email, celular, faturamento, funcionarios, ramo,
//        cnpj, cpfSocio, planoSugerido: 'mei' | 'simples' | 'classes' }

const FunnelContext = createContext(null)

export function FunnelStateProvider({ children }) {
  const [data, setData] = useState({})

  const value = useMemo(
    () => ({
      data,
      /** Mescla campos no estado do funil. */
      patch: (fields) => setData((prev) => ({ ...prev, ...fields })),
      /** Zera o estado (recomeçar o fluxo). */
      reset: () => setData({}),
    }),
    [data]
  )

  return <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
}

/** Acessa { data, patch, reset }. Seguro fora do provider (retorna no-op). */
export function useFunnel() {
  return (
    useContext(FunnelContext) || {
      data: {},
      patch: () => {},
      reset: () => {},
    }
  )
}
