
import { useState } from "react";

export default function Restore() {
  const [msg, setMsg] = useState("");
  const runRestore = async () => {
    const res = await fetch("http://localhost:8000/api/restore", { method: "POST" });
    const data = await res.json();
    setMsg(data.msg + " em " + data.time);
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Restauração</h2>
      <button onClick={runRestore} className="bg-green-600 text-white p-2 rounded">Executar Restauração</button>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}
