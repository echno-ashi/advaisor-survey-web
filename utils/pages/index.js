import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getAllSurveys, createSession } from '../utils/api'

const iconMap = {
  chatbot: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="3" strokeWidth={1.5} />
      <path d="M8 21l4-4 4 4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  agent: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  ),
  diagnostic: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
      <path d="M12 8v4M12 16h.01" strokeWidth={2} strokeLinecap="round" />
    </svg>
  ),
}

const badgeColorMap = {
  "Fastest path": "bg-teal-100 text-teal-700",
  "Configurator": "bg-blue-100 text-blue-700",
  "Diagnostic":   "bg-amber-100 text-amber-700",
}

export default function Home() {
  const router = useRouter()
  const [surveys, setSurveys]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [starting, setStarting] = useState(null)

  useEffect(() => {
    getAllSurveys().then((res) => {
      if (res.code === 200) setSurveys(res.surveys)
      setLoading(false)
    })
  }, [])

  const handleSelect = async (survey) => {
    setStarting(survey.survey_id)
    try {
      const res = await createSession(survey.survey_id)
      if (res.code === 200) {
        const { session_id } = res.session
        localStorage.setItem("advalsor_session_id", session_id)
        localStorage.setItem("advalsor_survey_id",  survey.survey_id)
        router.push(`/survey/${survey.survey_id}?session=${session_id}`)
      }
    } catch (err) {
      console.error("Failed to create session:", err)
    } finally {
      setStarting(null)
    }
  }

  return (
    <Layout currentStep={1}>
      <div className="p-6 sm:p-10 max-w-3xl">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Welcome to AdvAlsor
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight mb-2">
          What brings you here{' '}
          <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#f59e0b' }}>today?</span>
        </h1>
        <p className="text-gray-500 mb-8 text-base">
          No wrong choice. Pick the path that matches where you are right now.
        </p>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {surveys.map((survey) => {
              const isStarting = starting === survey.survey_id
              const badgeClass = badgeColorMap[survey.badge] || "bg-gray-100 text-gray-600"
              return (
                <button
                  key={survey.survey_id}
                  onClick={() => handleSelect(survey)}
                  disabled={!!starting}
                  className="group w-full text-left bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-400 hover:shadow-md transition-all duration-200 flex items-start gap-4 disabled:opacity-60"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                    {iconMap[survey.icon] || iconMap.chatbot}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base mb-1">{survey.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2">{survey.description}</p>
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className={`font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
                        {survey.badge}
                      </span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-400">{survey.meta_label}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {isStarting ? (
                      <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-gray-600 transition-colors" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}
