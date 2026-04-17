interface CallInfo {
  clientName: string
  company: string
  rep: string
  outcome: 'Interested' | 'Not Interested' | 'Follow-up' | 'No Answer'
  summary: string
}

interface NewCallDialogProps {
  onClose: () => void
}

const outcomeStyles: Record<string, string> = {
  'Interested':     'bg-emerald-50 text-emerald-700',
  'Not Interested': 'bg-red-50 text-red-600',
  'Follow-up':      'bg-amber-50 text-amber-700',
  'No Answer':      'bg-slate-100 text-slate-500',
}

const mockCall: CallInfo = {
  clientName: 'Jordan Mitchell',
  company: 'Acme Corp',
  rep: 'Sara L.',
  outcome: 'Interested',
  summary: 'Prospect is ready to move forward with the Enterprise plan. Demo scheduled with the technical team for next week. Budget confirmed for Q2.',
}

export default function NewCallDialog({ onClose }: NewCallDialogProps) {
  const handleSend = () => {
    // placeholder — will call backend notification endpoint
    alert('Notification sent to Google Chat!')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">New Call</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Client</p>
              <p className="text-sm font-medium text-slate-700">{mockCall.clientName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Company</p>
              <p className="text-sm font-medium text-slate-700">{mockCall.company}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Sales Rep</p>
              <p className="text-sm font-medium text-slate-700">{mockCall.rep}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Call Outcome</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${outcomeStyles[mockCall.outcome]}`}>
                {mockCall.outcome}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-1">Summary</p>
            <p className="text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100 leading-relaxed">
              {mockCall.summary}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            Send Notification to Google Chat
          </button>
        </div>
      </div>
    </div>
  )
}
