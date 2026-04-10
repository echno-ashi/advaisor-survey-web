'use client';
// import { useState } from 'react'
import { useRouter } from 'next/navigation';
const WIZARD_STEPS = [
  { n: 1, label: 'Choose your path' },
  { n: 2, label: 'Tell us your situation' },
  { n: 3, label: 'We analyse your answers' },
  { n: 4, label: 'Your recommendation' },
  { n: 5, label: 'Start free trial' },
]

// currentStep: which of the 5 wizard steps is active (1-5)
export default function Layout({ children, currentStep = 1 }) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f3ee' }}>

      {/* Top nav */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <span className="font-semibold text-gray-900 text-sm">advAlsor</span>
          <span className="hidden sm:block text-gray-300 mx-2">|</span>
          <span className="hidden sm:block text-gray-500 text-sm">Find your AI agent</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => {
  console.log('CLICKED');
  router.push('/');
}} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share link
          </button>
        </div>
      </nav>

      <div className="flex flex-1">

        {/* Sidebar — always shows the fixed 5 wizard steps */}
        <aside className="hidden lg:flex flex-col w-72 bg-gray-900 text-white p-6 sticky top-[53px] h-[calc(100vh-53px)] overflow-y-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-white">advAlsor</span>
          </div>

          <div className="mt-4 mb-8">
            <h2 className="text-xl font-semibold leading-snug">
              Find your{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#fbbf24' }}>perfect</span>{' '}
              AI agent.
            </h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              A few questions. A personalised recommendation. A free trial — all in under 5 minutes.
            </p>
          </div>

          {/* Fixed 5-step wizard — always shown */}
          <nav className="flex flex-col gap-1">
            {WIZARD_STEPS.map((step) => {
              const done   = step.n < currentStep
              const active = step.n === currentStep
              return (
                <div
                  key={step.n}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-gray-800' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                    done   ? 'bg-green-500 text-white' :
                    active ? 'bg-white text-gray-900' :
                             'bg-gray-700 text-gray-400'
                  }`}>
                    {done ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : step.n}
                  </div>
                  <span className={`text-sm ${
                    active ? 'text-white font-medium' :
                    done   ? 'text-gray-300' :
                             'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              )
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-800">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Free 14-day trial · No credit card · No account until you're ready
              </p>
            </div>
          </div>
        </aside>

        {/* Page content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
