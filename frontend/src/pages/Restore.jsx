import { useState } from 'react'
import axios from 'axios'

export default function Restore() {
  const [form, setForm] = useState({
    host: '',
    port: 22,
    username: '',
    password: '',
    remote_file: '',
    output_dir: '',
    key: ''
  })
  const [msg, setMsg] = useState('')

  const restoreBackup = async () => {
    const formData = new FormData()
    Object.keys(form).forEach(k => formData.append(k, form[k]))

    try {
      const res = await axios.post('http://localhost:8000/restore', formData)
      setMsg(res.data.msg)
    } catch (err) {
      console.error(err)
      setMsg('Erro ao restaurar backup')
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Restaurar Backup</h2>

      <input placeholder="Servidor SSH" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, host: e.target.value })} />

      <input placeholder="Porta (22)" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, port: e.target.value })} />

      <input placeholder="Usuário" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, username: e.target.value })} />

      <input placeholder="Senha" type="password" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <input placeholder="Caminho remoto do backup" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, remote_file: e.target.value })} />

      <input placeholder="Destino local para extração" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, output_dir: e.target.value })} />

      <input placeholder="Chave de criptografia" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, key: e.target.value })} />

      <button onClick={restoreBackup} className="bg-green-600 text-white px-4 py-2 rounded">
        Restaurar
      </button>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  )
}
