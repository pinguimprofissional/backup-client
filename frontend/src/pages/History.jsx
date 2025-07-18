
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/history")
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Histórico</h2>
      <ul className="space-y-2">
        {history.map((item, idx) => (
          <li key={idx} className="bg-white p-2 rounded shadow">
            <strong>{item.action}</strong> - {item.status} - {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
