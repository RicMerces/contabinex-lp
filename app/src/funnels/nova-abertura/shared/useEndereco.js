import { useState } from 'react'
import { maskCep } from '../../../utils/br.js'
import { lookupCep } from '../../../services/viacep.js'

// Bloco de endereço compartilhado pelas Telas 05, 06 e 06/1.
// CEP completo (8 dígitos) dispara a consulta ao ViaCEP e preenche
// logradouro, bairro, cidade e estado. País fica fixo em "Brasil".
export default function useEndereco(data = {}) {
  const [cep, setCepState] = useState(data.cep || '')
  const [endereco, setEndereco] = useState(data.endereco || '')
  const [cidade, setCidade] = useState(data.cidade || '')
  const [estado, setEstado] = useState(data.estado || '')
  const [pais, setPais] = useState(data.pais || 'Brasil')
  const [buscando, setBuscando] = useState(false)
  const [erroCep, setErroCep] = useState('')

  const setCep = async (valor) => {
    const v = maskCep(valor)
    setCepState(v)
    setErroCep('')
    if (v.replace(/\D/g, '').length !== 8) return
    setBuscando(true)
    const res = await lookupCep(v)
    setBuscando(false)
    if (!res) return setErroCep('CEP não encontrado. Confira o número ou preencha o endereço manualmente.')
    setEndereco([res.logradouro, res.bairro].filter(Boolean).join(' — '))
    setCidade(res.cidade)
    setEstado(res.estado)
  }

  const valores = { cep, endereco, cidade, estado, pais }
  const completo = Boolean(cep && endereco && cidade && estado && pais)

  return { ...valores, setCep, setEndereco, setCidade, setEstado, setPais, buscando, erroCep, valores, completo }
}
