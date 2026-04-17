import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import './App.css'

export default function App() {
  const [active, setActive] = useState('Dashboard')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Mobile overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Sidebar — always visible md+, slide-in drawer on mobile */}
      <div className={`fixed inset-y-0 left-0 z-50 md:static md:flex transition-transform duration-200 ${
        mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <Navbar
          active={active}
          onNavigate={(label) => { setActive(label); setMobileNavOpen(false) }}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <span className="text-base font-semibold text-slate-800">📣 SalesNotify</span>
          <div className="w-9" />
        </div>

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
