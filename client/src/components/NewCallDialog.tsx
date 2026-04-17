import { useState } from 'react'

interface CallInfo {
  clientName: string
  company: string
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
  outcome: 'Interested',
  summary: 'Prospect is ready to move forward with the Enterprise plan. Demo scheduled with the technical team for next week. Budget confirmed for Q2.',
}

export default function NewCallDialog({ onClose }: NewCallDialogProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSend = async () => {
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: mockCall.clientName,
          companyName: mockCall.company,
          callOutcome: mockCall.outcome,
          shortSummary: mockCall.summary,
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.message ?? 'Something went wrong. Please try again.')
      setStatus('success')
      setTimeout(onClose, 3500)
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      setErrorMsg(msg || 'Unable to send notification. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-xs font-semibold text-slate-400 tracking-widest uppercase">Sales Call</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Loading */}
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <svg className="w-8 h-8 text-violet-500 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-20" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-slate-400 tracking-wide">Sending…</p>
          </div>
        )}

        {/* Success */}
        {status === 'success' && (
          <div className="flex flex-col items-center px-6 py-8 gap-5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-slate-800">Sent to Google Chat</p>
              <p className="text-xs text-slate-400">Notification delivered successfully</p>
            </div>
            <div className="w-full border-t border-slate-100 pt-4 space-y-1 text-sm text-slate-600">
              <p>New call completed with <span className="font-medium text-slate-800">{mockCall.company}</span>.</p>
              <p>Outcome: <span className="font-medium text-slate-800">{mockCall.outcome}</span>.</p>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">{mockCall.summary}</p>
            </div>
          </div>
        )}

        {/* Idle / Error */}
        {(status === 'idle' || status === 'error') && (
          <>
            <div className="px-6 pb-5 space-y-4">
              <div className="space-y-0">
                <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
                  <span className="text-xs text-slate-400">Contact</span>
                  <span className="text-sm font-medium text-slate-800">{mockCall.clientName}</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
                  <span className="text-xs text-slate-400">Company</span>
                  <span className="text-sm font-medium text-slate-800">{mockCall.company}</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
                  <span className="text-xs text-slate-400">Outcome</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${outcomeStyles[mockCall.outcome]}`}>
                    {mockCall.outcome}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2">Summary</p>
                <p className="text-sm text-slate-600 leading-relaxed">{mockCall.summary}</p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
              {status === 'error' && (
                <p className="text-xs text-red-500 mb-3">{errorMsg}</p>
              )}
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                  Send Notification to Google Chat
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
