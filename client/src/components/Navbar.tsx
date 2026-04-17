const navLinks = [
  { label: 'Dashboard', icon: '▦' },
  { label: 'Calls', icon: '📞' },
  { label: 'Contacts', icon: '👤' },
  { label: 'Reports', icon: '📊' },
  { label: 'Settings', icon: '⚙' },
]

interface NavbarProps {
  active: string
  onNavigate: (label: string) => void
}

export default function Navbar({ active, onNavigate }: NavbarProps) {
  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-200">
        <span className="text-lg font-semibold text-slate-800 tracking-tight">
          📣 SalesNotify
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map(({ label, icon }) => {
          const isActive = label === active
          return (
            <button
              key={label}
              onClick={() => onNavigate(label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
              )}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-slate-200 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-sm font-semibold">
          LN
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">Lena N.</p>
          <p className="text-xs text-slate-400 truncate">Admin</p>
        </div>
      </div>
    </aside>
  )
}
