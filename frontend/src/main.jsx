import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Backup from "./pages/Backup"
import "./index.css"

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/backup" element={<Backup />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
