import { useState } from 'react'
import NewCallDialog from './NewCallDialog'

const statCards = [
  { label: 'Total Calls Today', value: '142', change: '+12%', up: true },
  { label: 'Active Reps', value: '18', change: '+3', up: true },
  { label: 'Avg Call Duration', value: '4m 32s', change: '-0:08', up: false },
  { label: 'Conversions', value: '34', change: '+8%', up: true },
]

const recentCalls = [
  { contact: 'Acme Corp', rep: 'Sara L.', duration: '6m 12s', status: 'Converted', ok: true },
  { contact: 'BlueSky Ltd', rep: 'Tom R.', duration: '2m 44s', status: 'Follow-up', ok: false },
  { contact: 'Nova Inc', rep: 'Priya K.', duration: '8m 01s', status: 'Converted', ok: true },
  { contact: 'Peak Solutions', rep: 'James W.', duration: '1m 20s', status: 'No answer', ok: false },
]

const topReps = [
  { name: 'Priya K.', calls: 28, initials: 'PK' },
  { name: 'Sara L.', calls: 24, initials: 'SL' },
  { name: 'Tom R.', calls: 19, initials: 'TR' },
  { name: 'James W.', calls: 15, initials: 'JW' },
]

export default function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      {dialogOpen && <NewCallDialog onClose={() => setDialogOpen(false)} />}
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-400">Thursday, April 17 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
            🔔
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-white" />
          </button>
          <button
            onClick={() => setDialogOpen(true)}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">
            + New Call
          </button>
        </div>
      </header>

      {/* Page body */}
      <main className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-5">
          {statCards.map(({ label, value, change, up }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">{label}</p>
              <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
              <span className={`inline-flex items-center gap-1 text-xs font-medium ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                {up ? '▲' : '▼'} {change}
              </span>
            </div>
          ))}
        </div>

        {/* Content row */}
        <div className="grid grid-cols-3 gap-5">
          {/* Recent calls table */}
          <div className="col-span-2 bg-white rounded-xl border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700">Recent Calls</h2>
              <button className="text-xs text-violet-600 hover:text-violet-800 font-medium">
                View all →
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 font-medium border-b border-slate-100">
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Rep</th>
                  <th className="px-5 py-3">Duration</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentCalls.map((row) => (
                  <tr key={row.contact} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-700">{row.contact}</td>
                    <td className="px-5 py-3 text-slate-500">{row.rep}</td>
                    <td className="px-5 py-3 text-slate-500">{row.duration}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top reps */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700">Top Reps Today</h2>
            </div>
            <ul className="px-5 py-3 space-y-3">
              {topReps.map(({ name, calls, initials }) => (
                <li key={name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold flex items-center justify-center shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{name}</p>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-violet-400"
                        style={{ width: `${(calls / 28) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{calls}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
