import { useState } from "react"

export default function Backup() {
  const [msg, setMsg] = useState("")

  const executeBackup = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/backup", {
        method: "POST"
      })
      const data = await res.json()
      setMsg(`✅ ${data.msg} em ${data.time}`)
    } catch (err) {
      setMsg("❌ Erro ao executar backup")
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">💾 Executar Backup</h2>
      <button
        onClick={executeBackup}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Iniciar
      </button>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  )
}
