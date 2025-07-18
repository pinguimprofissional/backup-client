
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Backup Client</h1>
      <Link to="/" className="hover:bg-blue-600 p-2 rounded">🏠 Dashboard</Link>
      <Link to="/backup" className="hover:bg-blue-600 p-2 rounded">💾 Backup</Link>
      <Link to="/restore" className="hover:bg-blue-600 p-2 rounded">📂 Restauração</Link>
      <Link to="/history" className="hover:bg-blue-600 p-2 rounded">📜 Histórico</Link>
    </div>
  );
}
