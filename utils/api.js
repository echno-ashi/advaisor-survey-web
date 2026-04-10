const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://myadvaisor.com:4001/user"

async function apiCall(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  }
  if (body) options.body = JSON.stringify(body)
  const res  = await fetch(`${BASE_URL}${endpoint}`, options)
  const data = await res.json()
  return data
}

// Surveys
export const getAllSurveys        = ()           => apiCall("/survey/all", "GET")
export const getSurveyById        = (survey_id)  => apiCall("/survey/get", "POST", { survey_id })
export const getStepsBySurvey     = (survey_id)  => apiCall("/survey/steps", "POST", { survey_id })
export const getQuestionsBySurvey = (survey_id)  => apiCall("/survey/questions", "POST", { survey_id })
export const getRecommendation    = (session_id)  => apiCall("/survey-recommendation", "POST", { session_id })

// Session
export const createSession         = (survey_id)                       => apiCall("/survey/session/create", "POST", { survey_id })
export const getSession            = (session_id)                      => apiCall("/survey/session/get", "POST", { session_id })
export const updateSessionQuestion = (session_id, current_question_id) => apiCall("/survey/session/update-question", "POST", { session_id, current_question_id })
export const completeSession       = (session_id)                      => apiCall("/survey/session/complete", "POST", { session_id })

// Answers
export const saveAnswer          = (session_id, survey_id, question_id, option_id, question_type, other_text = null) =>
  apiCall("/survey/answer/save", "POST", { session_id, survey_id, question_id, option_id, question_type, other_text })
export const getAnswersBySession = (session_id) => apiCall("/survey/answer/all", "POST", { session_id })

// Trial
export const saveTrialSignup = (session_id, survey_id, email) =>
  apiCall("/survey/trial/signup", "POST", { session_id, survey_id, email })
