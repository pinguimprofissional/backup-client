import { useState } from 'react'
import axios from 'axios'

export default function Backup() {
  const [form, setForm] = useState({
    host: '',
    port: 22,
    username: '',
    password: '',
    remote_dir: '/tmp',
    local_dir: '',
    encrypt: true
  })
  const [msg, setMsg] = useState('')

  const runBackup = async () => {
    const res = await axios.post('http://localhost:8000/backup', form)
    setMsg(res.data.msg)
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Executar Backup</h2>
      <input placeholder="Servidor" onChange={e => setForm({...form, host: e.target.value})}/>
      <input placeholder="Usuário" onChange={e => setForm({...form, username: e.target.value})}/>
      <input placeholder="Senha" type="password" onChange={e => setForm({...form, password: e.target.value})}/>
      <input placeholder="Diretório local" onChange={e => setForm({...form, local_dir: e.target.value})}/>
      <button onClick={runBackup}>Iniciar Backup</button>
      <p>{msg}</p>
    </div>
  )
}
