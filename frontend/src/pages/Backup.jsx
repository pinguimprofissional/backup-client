
import { useState } from "react";

export default function Backup() {
  const [msg, setMsg] = useState("");
  const runBackup = async () => {
    const res = await fetch("http://localhost:8000/api/backup", { method: "POST" });
    const data = await res.json();
    setMsg(data.msg + " em " + data.time);
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Backup</h2>
      <button onClick={runBackup} className="bg-blue-600 text-white p-2 rounded">Executar Backup</button>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}
