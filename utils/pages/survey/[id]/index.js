import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import {
  getQuestionsBySurvey,
  getSession,
  getAnswersBySession,
  saveAnswer,
  updateSessionQuestion,
  completeSession,
} from '../../../utils/api'

export default function SurveyPage() {
  const router = useRouter()
  const { id: survey_id, session: session_id_param } = router.query

  // steps = [ { step_id, step_number, step_title, questions: [ { ...q, options: [] } ] } ]
  const [steps, setSteps]           = useState([])
  // flat ordered list of all questions across all steps
  const [allQuestions, setAllQuestions] = useState([])
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [currentStepId, setCurrentStepId] = useState(null)
  // { [question_id]: [option_id, ...] }
  const [answers, setAnswers]       = useState({})
  const [sessionId, setSessionId]   = useState(null)
  const [loading, setLoading]       = useState(true)
  const [saving, setSaving]         = useState(false)

  // ── Flatten steps → questions into a single ordered array ───────────────
  const flattenQuestions = (stepsData) => {
    const flat = []
    for (const step of stepsData) {
      for (const q of step.questions || []) {
        flat.push({ ...q, step_title: step.step_title, step_number: step.step_number })
      }
    }
    return flat
  }

  // ── Init: load questions + resume session ────────────────────────────────
  useEffect(() => {
    if (!survey_id) return

    const init = async () => {
      // 1. Load all steps → questions → options
      const qRes = await getQuestionsBySurvey(survey_id)
      if (qRes.code !== 200) return setLoading(false)

      const stepsData = qRes.steps
      setSteps(stepsData)

      const flat = flattenQuestions(stepsData)
      setAllQuestions(flat)

      if (flat.length > 0) {
        setCurrentStepId(flat[0].step_id)
      }

      // 2. Get session_id
      const sid = session_id_param || localStorage.getItem("advalsor_session_id")
      if (!sid) return setLoading(false)
      setSessionId(sid)

      // 3. Resume — find which question they left on
      const sessRes = await getSession(sid)
      if (sessRes.code === 200) {
        const sess = sessRes.session
        // Find the index of current_question_id in flat list
        const resumeIdx = flat.findIndex(q => q.question_id === sess.current_question_id)
        if (resumeIdx >= 0) {
          setCurrentQIndex(resumeIdx)
          setCurrentStepId(flat[resumeIdx].step_id)
        }
      }

      // 4. Load existing answers to pre-fill
      const ansRes = await getAnswersBySession(sid)
      if (ansRes.code === 200) {
        const prefilled = {}
        for (const a of ansRes.answers) {
          if (!prefilled[a.question_id]) prefilled[a.question_id] = []
          prefilled[a.question_id].push(a.option_id)
        }
        setAnswers(prefilled)
      }

      setLoading(false)
    }

    init()
  }, [survey_id, session_id_param])

  if (loading || allQuestions.length === 0) {
    return (
      <Layout currentStep={2}>
        <div className="p-6 sm:p-10 max-w-3xl space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse" />)}
          </div>
        </div>
      </Layout>
    )
  }

  const question   = allQuestions[currentQIndex]
  const totalQ     = allQuestions.length
  const isLastQ    = currentQIndex === totalQ - 1
  const selected   = answers[question.question_id] || []
  const canContinue = selected.length > 0

  // Which step are we in? (for the step label shown above question)
  const currentStepData = steps.find(s => s.step_id === question.step_id)
  const questionIndexInStep = (currentStepData?.questions || []).findIndex(
    q => q.question_id === question.question_id
  )
  const totalInStep = currentStepData?.questions?.length || 1

  // ── Toggle option ────────────────────────────────────────────────────────
  const toggleOption = async (option_id) => {
    if (!sessionId) return
    setSaving(true)

    // Optimistic UI
    if (question.question_type === 'single') {
      setAnswers(prev => ({ ...prev, [question.question_id]: [option_id] }))
    } else {
      setAnswers(prev => {
        const current = prev[question.question_id] || []
        const updated = current.includes(option_id)
          ? current.filter(o => o !== option_id)
          : [...current, option_id]
        return { ...prev, [question.question_id]: updated }
      })
    }

    // Persist to DB
    await saveAnswer(sessionId, survey_id, question.question_id, option_id, question.question_type)
    setSaving(false)
  }

  // ── Navigate to question by index ────────────────────────────────────────
  const goToQuestion = async (idx) => {
    const q = allQuestions[idx]
    setCurrentQIndex(idx)
    setCurrentStepId(q.step_id)
    await updateSessionQuestion(sessionId, q.question_id)
  }

  // ── Continue ─────────────────────────────────────────────────────────────
  const handleContinue = async () => {
    if (isLastQ) {
      await completeSession(sessionId)
      router.push(`/survey/${survey_id}/recommendation?session=${sessionId}`)
      return
    }
    await goToQuestion(currentQIndex + 1)
  }

  // ── Back ─────────────────────────────────────────────────────────────────
  const handleBack = async () => {
    if (currentQIndex === 0) {
      router.push('/')
      return
    }
    await goToQuestion(currentQIndex - 1)
  }

  // ── Skip ─────────────────────────────────────────────────────────────────
  const handleSkip = async () => {
    if (isLastQ) {
      await completeSession(sessionId)
      router.push(`/survey/${survey_id}/recommendation?session=${sessionId}`)
      return
    }
    await goToQuestion(currentQIndex + 1)
  }

  return (
    <Layout currentStep={2} surveySteps={steps} currentStepId={currentStepId}>
      <div className="flex flex-col min-h-[calc(100vh-53px)]">
        <div className="flex-1 p-6 sm:p-10 max-w-3xl">

          {/* Step label + question progress */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              {currentStepData && (
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  {currentStepData.step_title}
                </span>
              )}
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Question {currentQIndex + 1} of {totalQ}
              </span>
            </div>
            {/* Progress bar */}
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full transition-all duration-500"
                style={{ width: `${((currentQIndex + 1) / totalQ) * 100}%` }}
              />
            </div>
          </div>

          {/* Step dots — show which question within the step */}
          {totalInStep > 1 && (
            <div className="flex items-center gap-1.5 mb-4">
              {(currentStepData?.questions || []).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === questionIndexInStep ? 'w-6 bg-gray-900' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Question */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight mb-2">
            {question.question_text}{' '}
            <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#f59e0b' }}>
              {question.question_highlight}
            </span>
          </h1>
          <p className="text-gray-500 text-sm mb-8">{question.subtitle}</p>

          {/* Options */}
          <div className={`grid gap-3 ${(question.options || []).length === 5 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
            {(question.options || []).map((option) => {
              const isSelected = selected.includes(option.option_id)
              return (
                <button
                  key={option.option_id}
                  onClick={() => toggleOption(option.option_id)}
                  disabled={saving}
                  className={`group text-left rounded-2xl border-2 p-4 transition-all duration-150 flex items-start gap-3 disabled:opacity-70 ${
                    isSelected
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 bg-white hover:border-gray-400'
                  }`}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {option.option_image || '○'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                      {option.option_name}
                    </p>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                      {option.description}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all mt-0.5 ${
                    isSelected ? 'border-white bg-white' : 'border-gray-300 group-hover:border-gray-500'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Skip */}
          {question.is_skippable && (
            <div className="mt-6 text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
              >
                Skip — not sure
              </button>
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 sm:px-10 py-4 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!canContinue || saving}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              canContinue && !saving
                ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLastQ ? 'See my recommendation →' : 'Continue →'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
