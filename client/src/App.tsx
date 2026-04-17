import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import './App.css'

export default function App() {
  const [active, setActive] = useState('Dashboard')

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Navbar active={active} onNavigate={setActive} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {active === 'Dashboard' && <Dashboard />}
        {active !== 'Dashboard' && (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            {active} — coming soon
          </div>
        )}
      </div>
    </div>
  )
}
