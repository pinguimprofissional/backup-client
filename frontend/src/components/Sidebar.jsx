import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
  const { pathname } = useLocation()
  const items = [
    { path: "/", label: "Dashboard", icon: "🏠" },
    { path: "/backup", label: "Backup", icon: "💾" }
  ]
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4 border-b border-gray-700">Backup</h1>
      <nav className="flex-1 p-4 space-y-2">
        {items.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-2 rounded hover:bg-gray-700 ${
              pathname === item.path ? "bg-gray-800" : ""
            }`}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
