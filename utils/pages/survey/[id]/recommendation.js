import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import { getRecommendation, getStepsBySurvey, saveTrialSignup } from '../../../utils/api'

export default function RecommendationPage() {
  const router = useRouter()
  const { id: survey_id, session: session_id_param } = router.query

  const [recommendation, setRecommendation] = useState(null)
  const [steps, setSteps]                   = useState([])
  const [loading, setLoading]               = useState(true)
  const [showSystemPrompt, setShowSystemPrompt] = useState(false)
  const [showEmailForm, setShowEmailForm]   = useState(false)
  const [email, setEmail]                   = useState('')
  const [submitting, setSubmitting]         = useState(false)
  const [submitted, setSubmitted]           = useState(false)
  const [emailError, setEmailError]         = useState('')

  const sessionId = session_id_param ||
    (typeof window !== 'undefined' && localStorage.getItem("advalsor_session_id"))

  useEffect(() => {
    if (!survey_id) return
    Promise.all([
      getRecommendation(survey_id),
      getStepsBySurvey(survey_id),
    ]).then(([recRes, stepsRes]) => {
      if (recRes.code === 200)   setRecommendation(recRes.recommendation)
      if (stepsRes.code === 200) setSteps(stepsRes.steps)
      setLoading(false)
    })
  }, [survey_id])

  const handleStartTrial = () => {
    setShowEmailForm(true)
    setTimeout(() => {
      document.getElementById("email-section")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleSubmit = async () => {
    setEmailError('')
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address')
      return
    }
    setSubmitting(true)
    const res = await saveTrialSignup(sessionId, survey_id, email)
    setSubmitting(false)

    if (res.code === 200) {
      window.location.replace(`http://myadvaisor.com:4002/?email=${encodeURIComponent(email)}&mode=signup`)
      setSubmitted(true)
      localStorage.removeItem("advalsor_session_id")
      localStorage.removeItem("advalsor_survey_id")
    } else if (res.code === 409) {
      setEmailError('This email is already signed up — check your inbox!')
    } else {
      setEmailError('Something went wrong. Please try again.')
    }
  }

  if (loading) {
    return (
      <Layout currentStep={4}>
        <div className="min-h-[calc(100vh-53px)] p-6 sm:p-10" style={{ background: '#1a1a1a' }}>
          <div className="animate-pulse space-y-4 max-w-3xl">
            <div className="h-4 bg-gray-700 rounded w-1/3" />
            <div className="h-10 bg-gray-700 rounded w-2/3" />
            <div className="h-72 bg-gray-800 rounded-2xl mt-6" />
          </div>
        </div>
      </Layout>
    )
  }

  if (!recommendation) {
    return (
      <Layout currentStep={4}>
        <div className="p-10 text-gray-400">Recommendation not found.</div>
      </Layout>
    )
  }

  return (
    // Pass steps to Layout so sidebar shows them all as done
    <Layout currentStep={4} surveySteps={steps} currentStepId={null}>
      <div className="min-h-[calc(100vh-53px)]" style={{ background: '#1a1a1a' }}>

        {/* Header */}
        <div className="px-6 sm:px-10 pt-8 pb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Your Personalised Recommendation
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Your match:{' '}
            <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#fbbf24' }}>
              {recommendation.title}
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            This is the highest-impact agent for your situation. Built from your answers — ready to configure.
          </p>
        </div>

        <div className="px-6 sm:px-10 pb-10 space-y-4 max-w-4xl">

          {/* Recommendation card */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold bg-gray-900 text-white px-2.5 py-1 rounded-full">
                Priority 1 — start here
              </span>
              <span className="text-base">🌐</span>
              <span className="font-semibold text-gray-900">{recommendation.title}</span>
            </div>

            <div className="px-6 py-5">
              <p className="text-gray-700 text-sm mb-4">{recommendation.description}</p>

              {recommendation.bullets?.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {recommendation.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {recommendation.conversations?.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Sample Conversations
                  </p>
                  <div className="space-y-3">
                    {recommendation.conversations.map((conv, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-semibold text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded flex-shrink-0">User</span>
                          <p className="text-sm text-gray-700">{conv.user_message}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded flex-shrink-0">AI</span>
                          <p className="text-sm text-gray-600">{conv.ai_message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* System prompt toggle */}
            <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                View your agent's system prompt — generated from your answers
              </p>
              <button
                onClick={() => setShowSystemPrompt(!showSystemPrompt)}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
              >
                {showSystemPrompt ? '− Hide' : '+ Show'}
              </button>
            </div>
            {showSystemPrompt && (
              <div className="mx-6 mb-6 bg-gray-900 rounded-xl p-4">
                <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
{`You are a helpful website assistant for advAlsor. Your role is to help visitors understand our AI agent solutions and guide them towards starting a free trial.

Key responsibilities:
- Answer questions about our products: website chatbots, internal knowledge agents, and field force tools
- Explain pricing clearly (Growth plan from £79/month, 14-day free trial)
- Capture lead details when visitors show buying intent
- Book calls with our team when requested
- Always be professional, concise, and helpful`}
                </pre>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <p className="font-semibold text-gray-900 mb-4">
              Does this recommendation feel right for your business?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleStartTrial}
                className="flex-1 bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Yes — start my free trial
              </button>
              <button
                onClick={() => router.push(`/survey/${survey_id}?session=${sessionId}`)}
                className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Not quite — let me adjust
              </button>
            </div>
          </div>

          {/* Email — Step 5 */}
          {showEmailForm && (
            <div id="email-section" className="bg-white rounded-2xl p-6 border border-gray-200">
              {!submitted ? (
                <>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Save your agent and start the 14-day free trial
                  </h3>
                  <p className="text-sm text-gray-500 mb-5">
                    We'll save your configuration. Next step: upload your first knowledge source and your agent is live in 10 minutes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-400 transition-colors bg-gray-50"
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-60 flex items-center gap-2 justify-center"
                    >
                      {submitting && (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      )}
                      Start free trial →
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-xs text-red-500 mt-2">{emailError}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-3">
                    No credit card · No password yet · Cancel anytime
                  </p>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">You're in! Check your inbox</h3>
                  <p className="text-sm text-gray-500">
                    We've sent a setup link to{' '}
                    <span className="font-medium text-gray-700">{email}</span>.
                    Your 14-day free trial starts now.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
