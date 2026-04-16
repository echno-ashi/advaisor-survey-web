// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import Layout from '../../../components/Layout'
// import {
//   getQuestionsBySurvey,
//   getSession,
//   getAnswersBySession,
//   saveAnswer,
//   updateSessionQuestion,
//   completeSession,
// } from '../../../utils/api'


// export default function SurveyPage() {
//   const router = useRouter()
//   const { id: survey_id, session: session_id_param } = router.query

//   const [steps, setSteps] = useState([])
//   const [hasSteps, setHasSteps] = useState(false)
//   const [currentStepIndex, setCurrentStepIndex] = useState(0)
//   const [currentQIndex, setCurrentQIndex] = useState(0)
//   const [answers, setAnswers] = useState({})
//   const [booleanAnswers, setBooleanAnswers] = useState({})
//   const [sessionId, setSessionId] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)
//   const [otherInputState, setOtherInputState] = useState({})

//   const [isDynamicLoaded, setIsDynamicLoaded] = useState(false)
//   // Replace isDynamicLoaded state with:
//   const [dynamicLoadedAtIndex, setDynamicLoadedAtIndex] = useState(null)

//   const isOtherOption = (option) =>
//   option?.option_name?.toLowerCase().includes("other");

//   const getDynamicParentQuestionId = (question) => {
//     if (question?.question_text === 'What is your primary goal with this agent?') {
//       const allQuestions = steps?.[0]?.questions || []
//       const parentQuestion = allQuestions?.find(q =>
//         q?.question_text === 'Which AI Agent do you want?'
//       )
//       return parentQuestion?.question_id
//     }
//     return null
//   }

//   const getFilteredOptions = (question, allQuestions) => {
//     if (!question?.dynamic_question || !question?.options) {
//       return question?.options || []
//     }
//     const parentQuestionId = getDynamicParentQuestionId(question)
//     if (!parentQuestionId) return question?.options || []
//     const selectedParentOption = answers[parentQuestionId]
//     if (!selectedParentOption || selectedParentOption?.length === 0) return []
//     const parentOptionId = selectedParentOption[0]
//     return question?.options?.filter(option => option?.dynamic_id === parentOptionId) || []
//   }

//   const shouldShowBooleanOptions = (question) => {
//     if (!question?.boolean_question) return true
//     return booleanAnswers[question?.question_id] === true
//   }

//   const getDisplayOptions = (question) => {
//     if (!question?.boolean_question) {
//       return getFilteredOptions(question, steps?.[0]?.questions || [])
//     }
//     if (booleanAnswers[question?.question_id] === true) {
//       return question?.options || []
//     }
//     return []
//   }

//   useEffect(() => {
//     if (!survey_id) return
//     const init = async () => {
//       try {
//         const qRes = await getQuestionsBySurvey({survey_id})
//         if (qRes?.code !== 200) return setLoading(false)

//         setSteps(qRes?.steps || [])
//         setHasSteps(qRes?.has_steps || false)

//         const sid = session_id_param || localStorage.getItem("advalsor_session_id")
//         if (!sid) return setLoading(false)
//         setSessionId(sid)

//         const sessRes = await getSession(sid)
//         if (sessRes?.code === 200) {
//           const currentQId = sessRes?.session?.current_question_id
//           if (qRes?.has_steps) {
//             const stepIdx = qRes?.steps?.findIndex(step =>
//               step?.questions?.some(q => q?.question_id === currentQId)
//             )
//             if (stepIdx >= 0) setCurrentStepIndex(stepIdx)
//           } else {
//             const allQ = qRes?.steps?.[0]?.questions || []
//             const qIdx = allQ?.findIndex(q => q?.question_id === currentQId)
//             if (qIdx >= 0) setCurrentQIndex(qIdx)
//           }
//         }

//         const ansRes = await getAnswersBySession(sid)
//         if (ansRes?.code === 200) {
//           const prefilled = {}
//           const booleanState = {}
//           for (const a of ansRes?.answers || []) {
//             if (!prefilled[a?.question_id]) prefilled[a?.question_id] = []
//             if (a?.option_id) prefilled[a?.question_id]?.push(a?.option_id)
//           }
//           setAnswers(prefilled)
//           const allQuestions = qRes?.steps?.[0]?.questions || []
//           allQuestions.forEach(q => {
//             if (q?.boolean_question && prefilled[q?.question_id]?.length > 0) {
//               booleanState[q?.question_id] = true
//             }
//           })
//           setBooleanAnswers(booleanState)
//         }
//       } catch (error) {
//         console.error("Initialization error:", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     init()
//   }, [survey_id, session_id_param])

  
//   if (loading || steps.length === 0) {
//     return (
//       <Layout currentStep={2}>
//         <div className="p-6 sm:p-10 max-w-7xl space-y-4">
//           <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
//           <div className="h-10 bg-gray-200 rounded w-2/3 animate-pulse" />
//           <div className="grid grid-cols-2 gap-3 mt-6">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
//             ))}
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   // ── NO STEPS mode ──
//   if (!hasSteps) {
//     const allQuestions = steps?.[0]?.questions || []
//     const totalQ = allQuestions?.length
//     const question = allQuestions?.[currentQIndex]
//     const isLastQ = currentQIndex === totalQ - 1
//     const selected = answers[question?.question_id] || []
//     const displayOptions = getDisplayOptions(question)
//     const showBooleanOptions = shouldShowBooleanOptions(question)

//     const canContinue = (() => {
//       if (question?.boolean_question) {
//         if (booleanAnswers[question?.question_id] === false) return true
//         if (booleanAnswers[question?.question_id] === true) {
//           return selected?.length > 0 || question?.is_skippable
//         }
//         return false
//       }
//       return selected?.length > 0 || question?.is_skippable
//     })()

//     const toggleOption = async (option_id, option) => {
//       if (!sessionId) return

//       if (isOtherOption(option)) {
//         setAnswers(prev => ({
//     ...prev,
//     [question?.question_id]: []
//   })) 

//         setOtherInputState(prev => ({
//           ...prev,
//           [question?.question_id]: {
//             option_id,
//             text: prev[question?.question_id]?.text || ''
//           }
//         }))
//         return
//       }

//       setOtherInputState(prev => {
//         const next = { ...prev }
//         delete next[question?.question_id]
//         return next
//       })

//       setSaving(true)
//       try {
//         if (question?.question_type === 'single' || question?.question_type === 'dropdown') {
//           setAnswers(prev => ({ ...prev, [question?.question_id]: [option_id] }))
//         } else {
//           setAnswers(prev => {
//             const cur = prev[question?.question_id] || []
//             return {
//               ...prev,
//               [question?.question_id]: cur?.includes(option_id)
//                 ? cur?.filter(o => o !== option_id)
//                 : [...cur, option_id]
//             }
//           })
//         }
//         await updateSessionQuestion(sessionId, question?.question_id)
//         await saveAnswer(sessionId, survey_id, question?.question_id, option_id, question?.question_type)
//       } catch (error) {
//         console.error("Error saving answer:", error)
//       } finally {
//         setSaving(false)
//       }
//     }

//     const handleOtherSubmit = async (question_id, option_id, other_text) => {
//       if (!sessionId || !other_text?.trim()) return
//       setSaving(true)
//       try {
//         const q = allQuestions.find(q => q.question_id === question_id)
//         setAnswers(prev => ({ ...prev, [question_id]: [option_id] }))
//         await updateSessionQuestion(sessionId, question_id)
//         await saveAnswer(sessionId, survey_id, question_id, option_id, q?.question_type, other_text.trim())
//         setOtherInputState(prev => {
//           const next = { ...prev }
//           delete next[question_id]
//           return next
//         })
//       } catch (error) {
//         console.error("Error saving other answer:", error)
//       } finally {
//         setSaving(false)
//       }
//     }

//     const handleOtherCancel = (question_id) => {
//       setOtherInputState(prev => {
//         const next = { ...prev }
//         delete next[question_id]
//         return next
//       })
//     }

//     const handleBooleanAnswer = async (value) => {
//       if (!sessionId) return
//       setSaving(true)
//       try {
//         setBooleanAnswers(prev => ({ ...prev, [question?.question_id]: value }))
//         if (value === false) {
//           await saveAnswer(sessionId, survey_id, question?.question_id, null, question?.question_type)
//           setAnswers(prev => {
//             const newAnswers = { ...prev }
//             delete newAnswers[question?.question_id]
//             return newAnswers
//           })
//           setBooleanAnswers(prev => ({ ...prev, [question?.question_id]: false }))
//         } else {
//           await updateSessionQuestion(sessionId, question?.question_id)
//         }
//       } catch (error) {
//         console.error("Error saving boolean answer:", error)
//       } finally {
//         setSaving(false)
//       }
//     }

   

// //     const handleContinue = async () => {
// //   if (isLastQ) {
// //     await completeSession(sessionId)
// //     router.push(`/survey/${survey_id}/recommendation?session=${sessionId}`)
// //     return
// //   }

// //   let updatedSteps = steps

// //   // ✅ ONLY FIRST TIME API CALL
// //   if (!isDynamicLoaded) {
// //     const currentQuestion = question
// //     // const selectedOptions = answers[currentQuestion?.question_id] || []
// //     const selectedOptions = (answers[currentQuestion?.question_id] || [])
// //   .map(Number)
// //   .filter(id => !isNaN(id))

// //     if (selectedOptions.length > 0) {
// //       const res = await getQuestionsBySurvey({
// //         survey_id,
// //         question_id: currentQuestion?.question_id,
// //         option_id: selectedOptions
// //       })

// //       if (res?.code === 200) {
// //         updatedSteps = res.steps
// //         setSteps(updatedSteps)
// //         setIsDynamicLoaded(true)  // 🔥 mark as loaded
// //       }
// //     }
// //   }

// //   const allQuestions = updatedSteps?.[0]?.questions || []
// //   const nextQ = allQuestions?.[currentQIndex + 1]

// //   await updateSessionQuestion(sessionId, nextQ?.question_id)
// //   setCurrentQIndex(currentQIndex + 1)
// // }


// const handleContinue = async () => {
//   if (isLastQ) {
//     await completeSession(sessionId)
//     router.push(`/survey/${survey_id}/recommendation?session=${sessionId}`)
//     return
//   }

//   let updatedSteps = steps

//   if (dynamicLoadedAtIndex === null) {  // ✅ only if never loaded
//     const selectedOptions = (answers[question?.question_id] || [])
//       .map(Number)
//       .filter(id => !isNaN(id))

//     if (selectedOptions.length > 0) {
//       const res = await getQuestionsBySurvey({
//         survey_id,
//         question_id: question?.question_id,
//         option_id: selectedOptions
//       })

//       if (res?.code === 200) {
//         updatedSteps = res.steps
//         setSteps(updatedSteps)
//         setDynamicLoadedAtIndex(currentQIndex)  // ✅ remember which index triggered it
//       }
//     }
//   }

//   const allQuestions = updatedSteps?.[0]?.questions || []
//   const nextQ = allQuestions?.[currentQIndex + 1]
//   await updateSessionQuestion(sessionId, nextQ?.question_id)
//   setCurrentQIndex(currentQIndex + 1)
// }

//     // const handleBack = async () => {
//     //   if (currentQIndex === 0) { router.push('/'); return }
//     //   const prevQ = allQuestions?.[currentQIndex - 1]
//     //   await updateSessionQuestion(sessionId, prevQ?.question_id)
//     //   setCurrentQIndex(currentQIndex - 1)
//     // }

//     const handleBack = async () => {
//   if (currentQIndex === 0) { router.push('/'); return }

//   // ✅ Only reset if going back to or before the index that triggered the load
//   if (dynamicLoadedAtIndex !== null && currentQIndex - 1 <= dynamicLoadedAtIndex) {
//     setDynamicLoadedAtIndex(null)
//   }

//   const prevQ = allQuestions?.[currentQIndex - 1]
//   await updateSessionQuestion(sessionId, prevQ?.question_id)
//   setCurrentQIndex(currentQIndex - 1)
// }

//     return (
//       <Layout currentStep={2}>
//         <div className="flex flex-col min-h-[calc(100vh-53px)]">
//           <div className="flex-1 p-6 sm:p-10 max-w-7xl">
//             <div className="flex items-center gap-3 mb-8">
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
//                 Question {currentQIndex + 1} of {totalQ}
//               </p>
//               <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
//                 <div className="h-full bg-gray-900 rounded-full transition-all duration-500"
//                   style={{ width: `${((currentQIndex + 1) / totalQ) * 100}%` }} />
//               </div>
//             </div>

//             <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight mb-2">
//               {question?.question_text}{' '}
//               <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#f59e0b' }}>
//                 {question?.question_highlight}
//               </span>
//             </h1>
//             {question?.subtitle && <p className="text-gray-500 text-sm mb-8">{question?.subtitle}</p>}

//             {question?.boolean_question && (
//               <div className="mb-8">
//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => handleBooleanAnswer(true)}
//                     className={`px-6 py-3 rounded-xl border-2 transition-all ${
//                       booleanAnswers[question?.question_id] === true
//                         ? 'border-gray-900 bg-gray-900 text-white'
//                         : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
//                     }`}
//                     disabled={saving}
//                   >
//                     Yes
//                   </button>
//                   <button
//                     onClick={() => handleBooleanAnswer(false)}
//                     className={`px-6 py-3 rounded-xl border-2 transition-all ${
//                       booleanAnswers[question?.question_id] === false
//                         ? 'border-gray-900 bg-gray-900 text-white'
//                         : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
//                     }`}
//                     disabled={saving}
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             )}

//             {question?.dynamic_question && displayOptions?.length === 0 && (
//               <div className="bg-amber-50 rounded-xl p-6 text-center border border-amber-200">
//                 <p className="text-amber-700">Please select an AI Agent first to see relevant goals.</p>
//               </div>
//             )}

//             {(!question?.boolean_question || showBooleanOptions) && (
//               <>
//                 {question?.question_type === 'dropdown' ? (
//                   <select
//                     value={selected?.[0] || ''}
//                     onChange={(e) => {
//                       const opt = displayOptions.find(o => o.option_id === Number(e.target.value))
//                       toggleOption(Number(e.target.value), opt)
//                     }}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-gray-900 transition-colors"
//                     disabled={displayOptions?.length === 0}
//                   >
//                     <option value="" disabled>Select an option...</option>
//                     {displayOptions?.map(option => (
//                       <option key={option?.option_id} value={option?.option_id}>
//                         {option?.option_name}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {displayOptions?.map((option) => {
//                       // const isSelected = selected?.includes(option?.option_id)
//                       // const showingInput = otherInputState[question?.question_id]?.option_id === option?.option_id

//                       const isOtherActive =
//                       otherInputState[question?.question_id]?.option_id === option?.option_id

//                     const isSelected =
//                       !isOtherActive && selected?.includes(option?.option_id)

//                     const showingInput = isOtherActive

//                       return (
//                         <div key={option?.option_id} className="flex flex-col gap-2">
//                           <button
//                             onClick={() => toggleOption(option?.option_id, option)}
//                             disabled={saving || displayOptions?.length === 0}
//                             className={`group text-left rounded-2xl border-2 p-4 transition-all duration-150 flex items-start gap-3 disabled:opacity-70 ${
//                               isSelected || showingInput
//                                 ? 'border-gray-900 bg-gray-900'
//                                 : 'border-gray-200 bg-white hover:border-gray-400'
//                             }`}
//                           >
//                             {option?.option_image && (
//                               <span className="text-xl flex-shrink-0 mt-0.5">{option?.option_image}</span>
//                             )}
//                             <div className="flex-1 min-w-0">
//                               <p className={`font-medium text-sm ${isSelected || showingInput ? 'text-white' : 'text-gray-900'}`}>
//                                 {option?.option_name}
//                               </p>
//                               {option?.description && (
//                                 <p className={`text-xs mt-0.5 ${isSelected || showingInput ? 'text-gray-300' : 'text-gray-400'}`}>
//                                   {option?.description}
//                                 </p>
//                               )}
//                             </div>
//                             <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
//                               isSelected || showingInput
//                                 ? 'border-white bg-white'
//                                 : 'border-gray-300 group-hover:border-gray-500'
//                             }`}>
//                               {(isSelected || showingInput) && (
//                                 <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
//                               )}
//                             </div>
//                           </button>

//                           {showingInput && (
//                             <div className="flex flex-col gap-2 px-1">
//                               <input
//                                 type="text"
//                                 autoFocus
//                                 placeholder="Please specify..."
//                                 value={otherInputState[question?.question_id]?.text || ''}
//                                 onChange={(e) =>
//                                   setOtherInputState(prev => ({
//                                     ...prev,
//                                     [question?.question_id]: {
//                                       ...prev[question?.question_id],
//                                       text: e.target.value
//                                     }
//                                   }))
//                                 }
//                                 onKeyDown={(e) => {
//                                   if (e.key === 'Enter') handleOtherSubmit(
//                                     question?.question_id,
//                                     otherInputState[question?.question_id]?.option_id,
//                                     otherInputState[question?.question_id]?.text
//                                   )
//                                   if (e.key === 'Escape') handleOtherCancel(question?.question_id)
//                                 }}
//                                 className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 transition-colors"
//                                 disabled={saving}
//                               />
//                               <div className="flex gap-2">
//                                 <button
//                                   onClick={() => handleOtherSubmit(
//                                     question?.question_id,
//                                     otherInputState[question?.question_id]?.option_id,
//                                     otherInputState[question?.question_id]?.text
//                                   )}
//                                   disabled={saving || !otherInputState[question?.question_id]?.text?.trim()}
//                                   className="flex-1 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white disabled:bg-gray-200 disabled:text-gray-400 transition-all"
//                                 >
//                                   Submit
//                                 </button>
//                                 <button
//                                   onClick={() => handleOtherCancel(question?.question_id)}
//                                   disabled={saving}
//                                   className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       )
//                     })}
//                   </div>
//                 )}
//               </>
//             )}

//             {question?.is_skippable && !question?.boolean_question && (
//               <div className="mt-6 text-center">
//                 <button onClick={handleContinue} className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2">
//                   Skip — not sure
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 sm:px-10 py-4 flex items-center gap-3">
//             <button onClick={handleBack} className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
//               ← Back
//             </button>
//             <button
//               onClick={handleContinue}
//               disabled={!canContinue || saving}
//               className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
//                 canContinue && !saving ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               {isLastQ ? 'See my recommendation →' : 'Continue →'}
//             </button>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   // ── HAS STEPS mode ──
//   const totalSteps = steps?.length
//   const isLastStep = currentStepIndex === totalSteps - 1
//   const currentStep = steps?.[currentStepIndex]
//   const questions = currentStep?.questions || []

//   const stepComplete = questions?.every(q => {
//     if (q?.is_skippable) return true
//     if (q?.boolean_question) {
//       if (booleanAnswers[q?.question_id] === false) return true
//       if (booleanAnswers[q?.question_id] === true) return answers[q?.question_id]?.length > 0
//       return false
//     }
//     const filteredOptions = getFilteredOptions(q, questions)
//     if (q?.dynamic_question && filteredOptions?.length === 0) return false
//     return answers[q?.question_id]?.length > 0
//   })

//   const toggleOptionInStep = async (question, option_id, option) => {
//     if (!sessionId) return

//     if (isOtherOption(option)) {
//       setAnswers(prev => ({
//     ...prev,
//     [question?.question_id]: []
//   }))
//       setOtherInputState(prev => ({
//         ...prev,
//         [question?.question_id]: {
//           option_id,
//           text: prev[question?.question_id]?.text || ''
//         }
//       }))
//       return
//     }

//     setOtherInputState(prev => {
//       const next = { ...prev }
//       delete next[question?.question_id]
//       return next
//     })

//     setSaving(true)
//     try {
//       if (question?.question_type === 'single' || question?.question_type === 'dropdown') {
//         setAnswers(prev => ({ ...prev, [question?.question_id]: [option_id] }))
//       } else {
//         setAnswers(prev => {
//           const cur = prev[question?.question_id] || []
//           return {
//             ...prev,
//             [question?.question_id]: cur?.includes(option_id)
//               ? cur?.filter(o => o !== option_id)
//               : [...cur, option_id]
//           }
//         })
//       }
//       await updateSessionQuestion(sessionId, question?.question_id)
//       await saveAnswer(sessionId, survey_id, question?.question_id, option_id, question?.question_type)
//     } catch (error) {
//       console.error("Error saving answer:", error)
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleOtherSubmitInStep = async (question, option_id, other_text) => {
//     if (!sessionId || !other_text?.trim()) return
//     setSaving(true)
//     try {
//       setAnswers(prev => ({ ...prev, [question?.question_id]: [option_id] }))
//       await updateSessionQuestion(sessionId, question?.question_id)
//       await saveAnswer(sessionId, survey_id, question?.question_id, option_id, question?.question_type, other_text.trim())
//       setOtherInputState(prev => {
//         const next = { ...prev }
//         delete next[question?.question_id]
//         return next
//       })
//     } catch (error) {
//       console.error("Error saving other answer:", error)
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleOtherCancelInStep = (question_id) => {
//     setOtherInputState(prev => {
//       const next = { ...prev }
//       delete next[question_id]
//       return next
//     })
//   }

//   const handleBooleanAnswerInStep = async (question, value) => {
//     if (!sessionId) return
//     setSaving(true)
//     try {
//       setBooleanAnswers(prev => ({ ...prev, [question?.question_id]: value }))
//       if (value === false) {
//         setAnswers(prev => {
//           const newAnswers = { ...prev }
//           delete newAnswers[question?.question_id]
//           return newAnswers
//         })
//         await saveBooleanAnswer(sessionId, survey_id, question?.question_id, null)
//       } else {
//         await updateSessionQuestion(sessionId, question?.question_id)
//       }
//     } catch (error) {
//       console.error("Error saving boolean answer:", error)
//     } finally {
//       setSaving(false)
//     }
//   }

  

// //   const handleStepContinue = async () => {
// //   if (isLastStep) {
// //     await completeSession(sessionId)
// //     router.push(`/survey/${survey_id}/recommendation?session=${sessionId}`)
// //     return
// //   }

// //   let updatedSteps = steps

// //   // ✅ ONLY FIRST TIME API CALL
// //   if (!isDynamicLoaded) {
// //     // const allSelectedOptionIds = Object.values(answers).flat()
// //     const allSelectedOptionIds = Object.values(answers)
// //   .flat()
// //   .map(Number)
// //   .filter(id => !isNaN(id))

// //     if (allSelectedOptionIds.length > 0) {
// //       const res = await getQuestionsBySurvey({
// //         survey_id,
// //         option_id: allSelectedOptionIds
// //       })

// //       if (res?.code === 200) {
// //         updatedSteps = res.steps
// //         setSteps(updatedSteps)
// //         setIsDynamicLoaded(true)  // 🔥 important
// //       }
// //     }
// //   }

// //   const nextStep = updatedSteps?.[currentStepIndex + 1]

// //   if (nextStep?.questions?.[0]) {
// //     await updateSessionQuestion(sessionId, nextStep?.questions?.[0]?.question_id)
// //   }

// //   setCurrentStepIndex(currentStepIndex + 1)
// // }


// const handleStepContinue = async () => {
//   if (isLastStep) {
//     await completeSession(sessionId)
//     router.push(`/survey/${survey_id}/recommendation?session=${sessionId}`)
//     return
//   }

//   let updatedSteps = steps

//   if (dynamicLoadedAtIndex === null) {  // ✅ only if never loaded
//     const allSelectedOptionIds = Object.values(answers)
//       .flat()
//       .map(Number)
//       .filter(id => !isNaN(id))

//     if (allSelectedOptionIds.length > 0) {
//       const res = await getQuestionsBySurvey({
//         survey_id,
//         option_id: allSelectedOptionIds
//       })

//       if (res?.code === 200) {
//         updatedSteps = res.steps
//         setSteps(updatedSteps)
//         setDynamicLoadedAtIndex(currentStepIndex)  // ✅ remember which step triggered it
//       }
//     }
//   }

//   const nextStep = updatedSteps?.[currentStepIndex + 1]
//   if (nextStep?.questions?.[0]) {
//     await updateSessionQuestion(sessionId, nextStep?.questions?.[0]?.question_id)
//   }
//   setCurrentStepIndex(currentStepIndex + 1)
// }

//   // const handleStepBack = async () => {
//   //   if (currentStepIndex === 0) { router.push('/'); return }
//   //   const prevStep = steps?.[currentStepIndex - 1]
//   //   const lastQ = prevStep?.questions?.[prevStep?.questions?.length - 1]
//   //   if (lastQ) await updateSessionQuestion(sessionId, lastQ?.question_id)
//   //   setCurrentStepIndex(currentStepIndex - 1)
//   // }


//   const handleStepBack = async () => {
//   if (currentStepIndex === 0) { router.push('/'); return }

//   // ✅ Only reset if going back to or before the step that triggered the load
//   if (dynamicLoadedAtIndex !== null && currentStepIndex - 1 <= dynamicLoadedAtIndex) {
//     setDynamicLoadedAtIndex(null)
//   }

//   const prevStep = steps?.[currentStepIndex - 1]
//   const lastQ = prevStep?.questions?.[prevStep?.questions?.length - 1]
//   if (lastQ) await updateSessionQuestion(sessionId, lastQ?.question_id)
//   setCurrentStepIndex(currentStepIndex - 1)
// }

//   return (
//     <Layout currentStep={2}>
//       <div className="flex flex-col min-h-[calc(100vh-53px)]">
//         <div className="flex-1 p-6 sm:p-10 max-w-7xl">
//           <div className="flex items-center gap-3 mb-8">
//             <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
//               Step {currentStepIndex + 1} of {totalSteps}
//             </span>
//             <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
//               <div className="h-full bg-gray-900 rounded-full transition-all duration-500"
//                 style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }} />
//             </div>
//           </div>

//           {currentStep?.step_title && (
//             <div className="mb-6">
//               <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">{currentStep?.step_title}</p>
//               {currentStep?.step_description && <p className="text-gray-400 text-sm">{currentStep?.step_description}</p>}
//             </div>
//           )}

//           <div className="space-y-10">
//             {questions?.map((question, qIdx) => {
//               const selected = answers[question?.question_id] || []
//               const displayOptions = getDisplayOptions(question)
//               const showBooleanOptions = shouldShowBooleanOptions(question)

//               return (
//                 <div key={question?.question_id}>
//                   <h2 className={`font-semibold text-gray-900 leading-tight mb-2 ${
//                     questions?.length === 1 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
//                   }`}>
//                     {question?.question_text}{' '}
//                     <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#f59e0b' }}>
//                       {question?.question_highlight}
//                     </span>
//                   </h2>
//                   {question?.subtitle && <p className="text-gray-500 text-sm mb-4">{question?.subtitle}</p>}

//                   {question?.boolean_question && (
//                     <div className="mb-6">
//                       <div className="flex gap-4">
//                         <button
//                           onClick={() => handleBooleanAnswerInStep(question, true)}
//                           className={`px-6 py-3 rounded-xl border-2 transition-all ${
//                             booleanAnswers[question?.question_id] === true
//                               ? 'border-gray-900 bg-gray-900 text-white'
//                               : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
//                           }`}
//                           disabled={saving}
//                         >
//                           Yes
//                         </button>
//                         <button
//                           onClick={() => handleBooleanAnswerInStep(question, false)}
//                           className={`px-6 py-3 rounded-xl border-2 transition-all ${
//                             booleanAnswers[question?.question_id] === false
//                               ? 'border-gray-900 bg-gray-900 text-white'
//                               : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
//                           }`}
//                           disabled={saving}
//                         >
//                           No
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {question?.dynamic_question && displayOptions?.length === 0 && (
//                     <div className="bg-amber-50 rounded-xl p-4 mb-4 text-center border border-amber-200">
//                       <p className="text-amber-700 text-sm">Please select an AI Agent first to see relevant goals.</p>
//                     </div>
//                   )}

//                   {(!question?.boolean_question || showBooleanOptions) && (
//                     <>
//                       {question?.question_type === 'dropdown' ? (
//                         <select
//                           value={selected?.[0] || ''}
//                           onChange={(e) => {
//                             const opt = displayOptions.find(o => o.option_id === Number(e.target.value))
//                             toggleOptionInStep(question, Number(e.target.value), opt)
//                           }}
//                           className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-gray-900 transition-colors"
//                           disabled={displayOptions?.length === 0}
//                         >
//                           <option value="" disabled>Select an option...</option>
//                           {displayOptions?.map(option => (
//                             <option key={option?.option_id} value={option?.option_id}>
//                               {option?.option_name}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                           {displayOptions?.map((option) => {
//                             // const isSelected = selected?.includes(option?.option_id)
//                             // const showingInput = otherInputState[question?.question_id]?.option_id === option?.option_id

//                             const isOtherActive =
//                             otherInputState[question?.question_id]?.option_id === option?.option_id

//                           const isSelected =
//                             !isOtherActive && selected?.includes(option?.option_id)

//                           const showingInput = isOtherActive

//                             return (
//                               <div key={option?.option_id} className="flex flex-col gap-2">
//                                 <button
//                                   onClick={() => toggleOptionInStep(question, option?.option_id, option)}
//                                   disabled={saving || displayOptions?.length === 0}
//                                   className={`group text-left rounded-2xl border-2 p-4 transition-all duration-150 flex items-start gap-3 disabled:opacity-70 ${
//                                     isSelected || showingInput
//                                       ? 'border-gray-900 bg-gray-900'
//                                       : 'border-gray-200 bg-white hover:border-gray-400'
//                                   }`}
//                                 >
//                                   {option?.option_image && (
//                                     <span className="text-xl flex-shrink-0 mt-0.5">{option?.option_image}</span>
//                                   )}
//                                   <div className="flex-1 min-w-0">
//                                     <p className={`font-medium text-sm ${isSelected || showingInput ? 'text-white' : 'text-gray-900'}`}>
//                                       {option?.option_name}
//                                     </p>
//                                     {option?.description && (
//                                       <p className={`text-xs mt-0.5 ${isSelected || showingInput ? 'text-gray-300' : 'text-gray-400'}`}>
//                                         {option?.description}
//                                       </p>
//                                     )}
//                                   </div>
//                                   <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
//                                     isSelected || showingInput
//                                       ? 'border-white bg-white'
//                                       : 'border-gray-300 group-hover:border-gray-500'
//                                   }`}>
//                                     {(isSelected || showingInput) && (
//                                       <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
//                                     )}
//                                   </div>
//                                 </button>

//                                 {showingInput && (
//                                   <div className="flex flex-col gap-2 px-1">
//                                     <input
//                                       type="text"
//                                       autoFocus
//                                       placeholder="Please specify..."
//                                       value={otherInputState[question?.question_id]?.text || ''}
//                                       onChange={(e) =>
//                                         setOtherInputState(prev => ({
//                                           ...prev,
//                                           [question?.question_id]: {
//                                             ...prev[question?.question_id],
//                                             text: e.target.value
//                                           }
//                                         }))
//                                       }
//                                       onKeyDown={(e) => {
//                                         if (e.key === 'Enter') handleOtherSubmitInStep(
//                                           question,
//                                           otherInputState[question?.question_id]?.option_id,
//                                           otherInputState[question?.question_id]?.text
//                                         )
//                                         if (e.key === 'Escape') handleOtherCancelInStep(question?.question_id)
//                                       }}
//                                       className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 transition-colors"
//                                       disabled={saving}
//                                     />
//                                     <div className="flex gap-2">
//                                       <button
//                                         onClick={() => handleOtherSubmitInStep(
//                                           question,
//                                           otherInputState[question?.question_id]?.option_id,
//                                           otherInputState[question?.question_id]?.text
//                                         )}
//                                         disabled={saving || !otherInputState[question?.question_id]?.text?.trim()}
//                                         className="flex-1 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white disabled:bg-gray-200 disabled:text-gray-400 transition-all"
//                                       >
//                                         Submit
//                                       </button>
//                                       <button
//                                         onClick={() => handleOtherCancelInStep(question?.question_id)}
//                                         disabled={saving}
//                                         className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
//                                       >
//                                         Cancel
//                                       </button>
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                             )
//                           })}
//                         </div>
//                       )}
//                     </>
//                   )}

//                   {qIdx < questions?.length - 1 && <div className="mt-8 border-t border-gray-200" />}
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 sm:px-10 py-4 flex items-center gap-3">
//           <button onClick={handleStepBack} className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
//             ← Back
//           </button>
//           <button
//             onClick={handleStepContinue}
//             disabled={!stepComplete || saving}
//             className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
//               stepComplete && !saving ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {isLastStep ? 'See my recommendation →' : 'Continue →'}
//           </button>
//         </div>
//       </div>
//     </Layout>
//   )
// }




















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
  getAllSurveys,
  getSurveyRecommendedAgents,
} from '../../../utils/api'


export default function SurveyPage() {
  const router = useRouter()
  const { id: survey_id, session: session_id_param } = router.query
  

  const [steps, setSteps] = useState([])
  const [originalSteps, setOriginalSteps] = useState([])
  const [hasSteps, setHasSteps] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [booleanAnswers, setBooleanAnswers] = useState({})
  const [sessionId, setSessionId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [otherInputState, setOtherInputState] = useState({})

  const [dynamicLoadedAtIndex, setDynamicLoadedAtIndex] = useState(null)

  // ── Agent selection state ──
  const [isLastSurvey, setIsLastSurvey] = useState(false)
  const [showAgentSelection, setShowAgentSelection] = useState(false)
  const [recommendedAgents, setRecommendedAgents] = useState([])
  const [selectedAgentOptionId, setSelectedAgentOptionId] = useState(null)
  const [agentSelectionLoading, setAgentSelectionLoading] = useState(false)
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactSubmitting, setContactSubmitting] = useState(false)

  const isOtherOption = (option) =>
    option?.option_name?.toLowerCase().includes("other");


  const getSelectedAgentName = () => {
  // ── Case 1: Agent selection screen (Survey 3) ──
  if (recommendedAgents?.length > 0 && selectedAgentOptionId) {
    const agent = recommendedAgents.find(
      a => a.option_id === selectedAgentOptionId
    )
    if (agent?.agent_name) return agent.agent_name
  }

  // ── Case 2: Static question (Survey 2) ──
  const allQuestions = steps?.[0]?.questions || []

  const parentQuestion = allQuestions.find(
    q => q.question_text === 'Which AI Agent do you want?'
  )

  if (!parentQuestion) return null

  const selectedOptionId = answers[parentQuestion.question_id]?.[0]
  if (!selectedOptionId) return null

  const selectedOption = parentQuestion.options?.find(
    opt => opt.option_id === selectedOptionId
  )

  return selectedOption?.option_name || null
}


const getSelectedAgentOptionId = () => {
  // Case 1: Agent selection screen (Survey 3)
  if (recommendedAgents?.length > 0 && selectedAgentOptionId) {
    return selectedAgentOptionId
  }

  // Case 2: Static question (Survey 2)
  const allQuestions = steps?.[0]?.questions || []

  const parentQuestion = allQuestions.find(
    q => q.question_text === 'Which AI Agent do you want?'
  )

  if (!parentQuestion) return null

  return answers[parentQuestion.question_id]?.[0] || null
}

  const getDynamicParentQuestionId = (question) => {
    if (question?.question_text === 'What is your primary goal with this agent?') {
      const allQuestions = steps?.[0]?.questions || []
      const parentQuestion = allQuestions?.find(q =>
        q?.question_text === 'Which AI Agent do you want?'
      )
      return parentQuestion?.question_id
    }
    return null
  }

  const getFilteredOptions = (question, allQuestions) => {
    if (!question?.dynamic_question || !question?.options) {
      return question?.options || []
    }
    const parentQuestionId = getDynamicParentQuestionId(question)
    if (!parentQuestionId) return question?.options || []
    const selectedParentOption = answers[parentQuestionId]
    if (!selectedParentOption || selectedParentOption?.length === 0) return []
    const parentOptionId = selectedParentOption[0]
    return question?.options?.filter(option => option?.dynamic_id === parentOptionId) || []
  }

  const shouldShowBooleanOptions = (question) => {
    if (!question?.boolean_question) return true
    return booleanAnswers[question?.question_id] === true
  }

  const getDisplayOptions = (question) => {
    if (!question?.boolean_question) {
      return getFilteredOptions(question, steps?.[0]?.questions || [])
    }
    if (booleanAnswers[question?.question_id] === true) {
      return question?.options || []
    }
    return []
  }

  useEffect(() => {
    if (!survey_id) return
    const init = async () => {
      try {
        const qRes = await getQuestionsBySurvey({ survey_id })
        if (qRes?.code !== 200) return setLoading(false)

        setSteps(qRes?.steps || [])
        setOriginalSteps(qRes?.steps || [])
        setHasSteps(qRes?.has_steps || false)

        // Detect if this is the last survey
        try {
          const allRes = await getAllSurveys()
          if (allRes?.surveys?.length > 0) {
            const sorted = [...allRes.surveys].sort((a, b) => a.survey_id - b.survey_id)
            const lastSurveyId = sorted[sorted.length - 1]?.survey_id
            setIsLastSurvey(String(lastSurveyId) === String(survey_id))
          }
        } catch {}

        const sid = session_id_param || localStorage.getItem("advalsor_session_id")
        if (!sid) return setLoading(false)
        setSessionId(sid)

        const sessRes = await getSession(sid)
        if (sessRes?.code === 200) {
          const currentQId = sessRes?.session?.current_question_id
          if (qRes?.has_steps) {
            const stepIdx = qRes?.steps?.findIndex(step =>
              step?.questions?.some(q => q?.question_id === currentQId)
            )
            if (stepIdx >= 0) setCurrentStepIndex(stepIdx)
          } else {
            const allQ = qRes?.steps?.[0]?.questions || []
            const qIdx = allQ?.findIndex(q => q?.question_id === currentQId)
            if (qIdx >= 0) setCurrentQIndex(qIdx)
          }
        }

        const ansRes = await getAnswersBySession(sid)
        if (ansRes?.code === 200) {
          const prefilled = {}
          const booleanState = {}
          for (const a of ansRes?.answers || []) {
            if (!prefilled[a?.question_id]) prefilled[a?.question_id] = []
            if (a?.option_id) prefilled[a?.question_id]?.push(a?.option_id)
          }
          setAnswers(prefilled)
          const allQuestions = qRes?.steps?.[0]?.questions || []
          allQuestions.forEach(q => {
            if (q?.boolean_question && prefilled[q?.question_id]?.length > 0) {
              booleanState[q?.question_id] = true
            }
          })
          setBooleanAnswers(booleanState)
        }
      } catch (error) {
        console.error("Initialization error:", error)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [survey_id, session_id_param])


  if (loading || steps.length === 0) {
    return (
      <Layout currentStep={2}>
        <div className="p-6 sm:p-10 max-w-7xl space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </Layout>
    )
  }

  // ── NO STEPS mode ──
  if (!hasSteps) {
    const allQuestions = steps?.[0]?.questions || []
    const totalQ = allQuestions?.length
    const question = allQuestions?.[currentQIndex]
    const isLastQ = currentQIndex === totalQ - 1
    const selected = answers[question?.question_id] || []
    const displayOptions = getDisplayOptions(question)
    const showBooleanOptions = shouldShowBooleanOptions(question)

    const canContinue = (() => {
      if (question?.boolean_question) {
        if (booleanAnswers[question?.question_id] === false) return true
        if (booleanAnswers[question?.question_id] === true) {
          return selected?.length > 0 || question?.is_skippable
        }
        return false
      }
      return selected?.length > 0 || question?.is_skippable
    })()

    const toggleOption = async (option_id, option) => {
      if (!sessionId) return

      if (isOtherOption(option)) {
        setAnswers(prev => ({
          ...prev,
          [question?.question_id]: []
        }))

        setOtherInputState(prev => ({
          ...prev,
          [question?.question_id]: {
            option_id,
            text: prev[question?.question_id]?.text || ''
          }
        }))
        return
      }

      setOtherInputState(prev => {
        const next = { ...prev }
        delete next[question?.question_id]
        return next
      })

      setSaving(true)
      try {
        if (question?.question_type === 'single' || question?.question_type === 'dropdown') {
          setAnswers(prev => ({ ...prev, [question?.question_id]: [option_id] }))
        } else {
          setAnswers(prev => {
            const cur = prev[question?.question_id] || []
            return {
              ...prev,
              [question?.question_id]: cur?.includes(option_id)
                ? cur?.filter(o => o !== option_id)
                : [...cur, option_id]
            }
          })
        }
        await updateSessionQuestion(sessionId, question?.question_id)
        await saveAnswer(sessionId, survey_id, question?.question_id, option_id, question?.question_type)
      } catch (error) {
        console.error("Error saving answer:", error)
      } finally {
        setSaving(false)
      }
    }

    const handleOtherSubmit = async (question_id, option_id, other_text) => {
      if (!sessionId || !other_text?.trim()) return
      setSaving(true)
      try {
        const q = allQuestions.find(q => q.question_id === question_id)
        setAnswers(prev => ({ ...prev, [question_id]: [option_id] }))
        await updateSessionQuestion(sessionId, question_id)
        await saveAnswer(sessionId, survey_id, question_id, option_id, q?.question_type, other_text.trim())
        setOtherInputState(prev => {
          const next = { ...prev }
          delete next[question_id]
          return next
        })
      } catch (error) {
        console.error("Error saving other answer:", error)
      } finally {
        setSaving(false)
      }
    }

    const handleOtherCancel = (question_id) => {
      setOtherInputState(prev => {
        const next = { ...prev }
        delete next[question_id]
        return next
      })
    }

    const handleBooleanAnswer = async (value) => {
      if (!sessionId) return
      setSaving(true)
      try {
        setBooleanAnswers(prev => ({ ...prev, [question?.question_id]: value }))
        if (value === false) {
          await saveAnswer(sessionId, survey_id, question?.question_id, null, question?.question_type)
          setAnswers(prev => {
            const newAnswers = { ...prev }
            delete newAnswers[question?.question_id]
            return newAnswers
          })
          setBooleanAnswers(prev => ({ ...prev, [question?.question_id]: false }))
        } else {
          await updateSessionQuestion(sessionId, question?.question_id)
        }
      } catch (error) {
        console.error("Error saving boolean answer:", error)
      } finally {
        setSaving(false)
      }
    }

    const handleContinue = async () => {
      if (isLastQ) {
        await completeSession(sessionId)
        const agent_name = getSelectedAgentName()
        const option_id = getSelectedAgentOptionId()
//         router.push(
//   `/survey/${survey_id}/recommendation?session=${sessionId}&agent_name=${encodeURIComponent(agent_name || '')}`
// )

router.push(
  `/survey/${survey_id}/recommendation?session=${sessionId}&agent_name=${encodeURIComponent(agent_name || '')}&option_id=${option_id || ''}`
)
        return
      }

      let updatedSteps = steps

      if (dynamicLoadedAtIndex === null) {
        const selectedOptions = (answers[question?.question_id] || [])
          .map(Number)
          .filter(id => !isNaN(id))

        if (selectedOptions.length > 0) {
          const res = await getQuestionsBySurvey({
            survey_id,
            question_id: question?.question_id,
            option_id: selectedOptions
          })

          if (res?.code === 200) {
            updatedSteps = res.steps
            setSteps(updatedSteps)
            setDynamicLoadedAtIndex(currentQIndex)
          }
        }
      }

      const allQuestions = updatedSteps?.[0]?.questions || []
      const nextQ = allQuestions?.[currentQIndex + 1]
      await updateSessionQuestion(sessionId, nextQ?.question_id)
      setCurrentQIndex(currentQIndex + 1)
    }

    const handleBack = async () => {
      if (currentQIndex === 0) { router.push('/'); return }

      if (dynamicLoadedAtIndex !== null && currentQIndex - 1 <= dynamicLoadedAtIndex) {
        setDynamicLoadedAtIndex(null)
      }

      const prevQ = allQuestions?.[currentQIndex - 1]
      await updateSessionQuestion(sessionId, prevQ?.question_id)
      setCurrentQIndex(currentQIndex - 1)
    }

    return (
      <Layout currentStep={2}>
        <div className="flex flex-col min-h-[calc(100vh-53px)]">
          <div className="flex-1 p-6 sm:p-10 max-w-7xl">
            <div className="flex items-center gap-3 mb-8">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                Question {currentQIndex + 1} of {totalQ}
              </p>
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQIndex + 1) / totalQ) * 100}%` }} />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight mb-2">
              {question?.question_text}{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#f59e0b' }}>
                {question?.question_highlight}
              </span>
            </h1>
            {question?.subtitle && <p className="text-gray-500 text-sm mb-8">{question?.subtitle}</p>}

            {question?.boolean_question && (
              <div className="mb-8">
                <div className="flex gap-4">
                  <button
                    onClick={() => handleBooleanAnswer(true)}
                    className={`px-6 py-3 rounded-xl border-2 transition-all ${
                      booleanAnswers[question?.question_id] === true
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                    disabled={saving}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleBooleanAnswer(false)}
                    className={`px-6 py-3 rounded-xl border-2 transition-all ${
                      booleanAnswers[question?.question_id] === false
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                    disabled={saving}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {question?.dynamic_question && displayOptions?.length === 0 && (
              <div className="bg-amber-50 rounded-xl p-6 text-center border border-amber-200">
                <p className="text-amber-700">Please select an AI Agent first to see relevant goals.</p>
              </div>
            )}

            {(!question?.boolean_question || showBooleanOptions) && (
              <>
                {question?.question_type === 'dropdown' ? (
                  <select
                    value={selected?.[0] || ''}
                    onChange={(e) => {
                      const opt = displayOptions.find(o => o.option_id === Number(e.target.value))
                      toggleOption(Number(e.target.value), opt)
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-gray-900 transition-colors"
                    disabled={displayOptions?.length === 0}
                  >
                    <option value="" disabled>Select an option...</option>
                    {displayOptions?.map(option => (
                      <option key={option?.option_id} value={option?.option_id}>
                        {option?.option_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {displayOptions?.map((option) => {
                      const isOtherActive =
                        otherInputState[question?.question_id]?.option_id === option?.option_id

                      const isSelected =
                        !isOtherActive && selected?.includes(option?.option_id)

                      const showingInput = isOtherActive

                      return (
                        <div key={option?.option_id} className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleOption(option?.option_id, option)}
                            disabled={saving || displayOptions?.length === 0}
                            className={`group text-left rounded-2xl border-2 p-4 transition-all duration-150 flex items-start gap-3 disabled:opacity-70 ${
                              isSelected || showingInput
                                ? 'border-gray-900 bg-gray-900'
                                : 'border-gray-200 bg-white hover:border-gray-400'
                            }`}
                          >
                            {option?.option_image && (
                              <span className="text-xl flex-shrink-0 mt-0.5">{option?.option_image}</span>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium text-sm ${isSelected || showingInput ? 'text-white' : 'text-gray-900'}`}>
                                {option?.option_name}
                              </p>
                              {option?.description && (
                                <p className={`text-xs mt-0.5 ${isSelected || showingInput ? 'text-gray-300' : 'text-gray-400'}`}>
                                  {option?.description}
                                </p>
                              )}
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                              isSelected || showingInput
                                ? 'border-white bg-white'
                                : 'border-gray-300 group-hover:border-gray-500'
                            }`}>
                              {(isSelected || showingInput) && (
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                              )}
                            </div>
                          </button>

                          {showingInput && (
                            <div className="flex flex-col gap-2 px-1">
                              <input
                                type="text"
                                autoFocus
                                placeholder="Please specify..."
                                value={otherInputState[question?.question_id]?.text || ''}
                                onChange={(e) =>
                                  setOtherInputState(prev => ({
                                    ...prev,
                                    [question?.question_id]: {
                                      ...prev[question?.question_id],
                                      text: e.target.value
                                    }
                                  }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleOtherSubmit(
                                    question?.question_id,
                                    otherInputState[question?.question_id]?.option_id,
                                    otherInputState[question?.question_id]?.text
                                  )
                                  if (e.key === 'Escape') handleOtherCancel(question?.question_id)
                                }}
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 transition-colors"
                                disabled={saving}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleOtherSubmit(
                                    question?.question_id,
                                    otherInputState[question?.question_id]?.option_id,
                                    otherInputState[question?.question_id]?.text
                                  )}
                                  disabled={saving || !otherInputState[question?.question_id]?.text?.trim()}
                                  className="flex-1 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white disabled:bg-gray-200 disabled:text-gray-400 transition-all"
                                >
                                  Submit
                                </button>
                                <button
                                  onClick={() => handleOtherCancel(question?.question_id)}
                                  disabled={saving}
                                  className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {question?.is_skippable && !question?.boolean_question && (
              <div className="mt-6 text-center">
                <button onClick={handleContinue} className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2">
                  Skip — not sure
                </button>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 sm:px-10 py-4 flex items-center gap-3">
            <button onClick={handleBack} className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              ← Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!canContinue || saving}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                canContinue && !saving ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLastQ ? 'See my recommendation →' : 'Continue →'}
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  // ── HAS STEPS mode ──
  const totalSteps = steps?.length
  const isLastStep = currentStepIndex === totalSteps - 1
  const currentStep = steps?.[currentStepIndex]
  const questions = currentStep?.questions || []

  const stepComplete = questions?.every(q => {
    if (q?.is_skippable) return true
    if (q?.boolean_question) {
      if (booleanAnswers[q?.question_id] === false) return true
      if (booleanAnswers[q?.question_id] === true) return answers[q?.question_id]?.length > 0
      return false
    }
    const filteredOptions = getFilteredOptions(q, questions)
    if (q?.dynamic_question && filteredOptions?.length === 0) return false
    return answers[q?.question_id]?.length > 0
  })

  const toggleOptionInStep = async (question, option_id, option) => {
    if (!sessionId) return

    if (isOtherOption(option)) {
      setAnswers(prev => ({
        ...prev,
        [question?.question_id]: []
      }))
      setOtherInputState(prev => ({
        ...prev,
        [question?.question_id]: {
          option_id,
          text: prev[question?.question_id]?.text || ''
        }
      }))
      return
    }

    setOtherInputState(prev => {
      const next = { ...prev }
      delete next[question?.question_id]
      return next
    })

    setSaving(true)
    try {
      if (question?.question_type === 'single' || question?.question_type === 'dropdown') {
        setAnswers(prev => ({ ...prev, [question?.question_id]: [option_id] }))
      } else {
        setAnswers(prev => {
          const cur = prev[question?.question_id] || []
          return {
            ...prev,
            [question?.question_id]: cur?.includes(option_id)
              ? cur?.filter(o => o !== option_id)
              : [...cur, option_id]
          }
        })
      }
      await updateSessionQuestion(sessionId, question?.question_id)
      await saveAnswer(sessionId, survey_id, question?.question_id, option_id, question?.question_type)
    } catch (error) {
      console.error("Error saving answer:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleOtherSubmitInStep = async (question, option_id, other_text) => {
    if (!sessionId || !other_text?.trim()) return
    setSaving(true)
    try {
      setAnswers(prev => ({ ...prev, [question?.question_id]: [option_id] }))
      await updateSessionQuestion(sessionId, question?.question_id)
      await saveAnswer(sessionId, survey_id, question?.question_id, option_id, question?.question_type, other_text.trim())
      setOtherInputState(prev => {
        const next = { ...prev }
        delete next[question?.question_id]
        return next
      })
    } catch (error) {
      console.error("Error saving other answer:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleOtherCancelInStep = (question_id) => {
    setOtherInputState(prev => {
      const next = { ...prev }
      delete next[question_id]
      return next
    })
  }

  const handleBooleanAnswerInStep = async (question, value) => {
    if (!sessionId) return
    setSaving(true)
    try {
      setBooleanAnswers(prev => ({ ...prev, [question?.question_id]: value }))
      if (value === false) {
        setAnswers(prev => {
          const newAnswers = { ...prev }
          delete newAnswers[question?.question_id]
          return newAnswers
        })
        await saveAnswer(sessionId, survey_id, question?.question_id, null, question?.question_type)
      } else {
        await updateSessionQuestion(sessionId, question?.question_id)
      }
    } catch (error) {
      console.error("Error saving boolean answer:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleStepContinue = async () => {
    // ── LAST SURVEY + END OF STEP 1: show agent selection ──
    if (isLastSurvey && !isLastStep && currentStepIndex === 0 && !showAgentSelection) {
      setAgentSelectionLoading(true)
      try {
        const res = await getSurveyRecommendedAgents(sessionId)
        if (res?.code === 200 && res?.recommended_agent?.recommended_agents?.length > 0) {
          setRecommendedAgents(res.recommended_agent.recommended_agents)
          setShowAgentSelection(true)
          setAgentSelectionLoading(false)
          return
        }
      } catch (error) {
        console.error("Error fetching recommended agents:", error)
      }
      setAgentSelectionLoading(false)
      // fallthrough to normal flow if API fails
    }

    // ── AGENT SELECTED: load dynamic questions then go to step 2 ──
    if (isLastSurvey && showAgentSelection && selectedAgentOptionId !== null) {
      setAgentSelectionLoading(true)
      try {
        const res = await getQuestionsBySurvey({
          survey_id,
          option_id: [selectedAgentOptionId]
        })
        if (res?.code === 200) {
          setSteps(res.steps)
          setDynamicLoadedAtIndex(currentStepIndex)
        }
      } catch (error) {
        console.error("Error loading questions for agent:", error)
      }
      setShowAgentSelection(false)
      setAgentSelectionLoading(false)
      setCurrentStepIndex(1)
      return
    }

    // ── NORMAL FLOW ──
    if (isLastStep) {
      await completeSession(sessionId)
      const agent_name = getSelectedAgentName()
      const option_id = getSelectedAgentOptionId()
//       router.push(
//   `/survey/${survey_id}/recommendation?session=${sessionId}&agent_name=${encodeURIComponent(agent_name || '')}`
// )

router.push(
  `/survey/${survey_id}/recommendation?session=${sessionId}&agent_name=${encodeURIComponent(agent_name || '')}&option_id=${option_id || ''}`
)
      return
    }

    let updatedSteps = steps

    if (dynamicLoadedAtIndex === null) {
      const allSelectedOptionIds = Object.values(answers)
        .flat()
        .map(Number)
        .filter(id => !isNaN(id))

      if (allSelectedOptionIds.length > 0) {
        const res = await getQuestionsBySurvey({
          survey_id,
          option_id: allSelectedOptionIds
        })
        if (res?.code === 200) {
          updatedSteps = res.steps
          setSteps(updatedSteps)
          setDynamicLoadedAtIndex(currentStepIndex)
        }
      }
    }

    const nextStep = updatedSteps?.[currentStepIndex + 1]
    if (nextStep?.questions?.[0]) {
      await updateSessionQuestion(sessionId, nextStep?.questions?.[0]?.question_id)
    }
    setCurrentStepIndex(currentStepIndex + 1)
  }

  const handleStepBack = async () => {
    // If on agent selection screen, go back to step 1
    if (showAgentSelection) {
      setShowAgentSelection(false)
      setSelectedAgentOptionId(null)
      setSteps(originalSteps)
      setContactEmail('')
      setContactSubmitted(false)
      return
    }

    if (currentStepIndex === 0) { router.push('/'); return }

    if (dynamicLoadedAtIndex !== null && currentStepIndex - 1 <= dynamicLoadedAtIndex) {
      setSteps(originalSteps) 
      setDynamicLoadedAtIndex(null)
    }

    const prevStep = steps?.[currentStepIndex - 1]
    const lastQ = prevStep?.questions?.[prevStep?.questions?.length - 1]
    if (lastQ) await updateSessionQuestion(sessionId, lastQ?.question_id)
    setCurrentStepIndex(currentStepIndex - 1)
  }

  // ── AGENT SELECTION SCREEN ──
  if (showAgentSelection) {
    const handleContactSubmit = async () => {
      if (!contactEmail?.trim() || contactSubmitting) return
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(contactEmail.trim())) return
      setContactSubmitting(true)
      try {
        // You can wire this to your own contact/lead API if needed
        // await apiCall("/contact", "POST", { email: contactEmail, session_id: sessionId })
        setContactSubmitted(true)
      } catch (error) {
        console.error("Error submitting contact email:", error)
      } finally {
        setContactSubmitting(false)
      }
    }

    return (
      <Layout currentStep={2}>
        <div className="flex flex-col min-h-[calc(100vh-53px)]">
          <div className="flex-1 p-6 sm:p-10 max-w-7xl">

            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                Choose Your Agent
              </span>
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight mb-2">
              Which agent is the{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#f59e0b' }}>
                right fit?
              </span>
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Based on your answers, we recommend these agents. Pick the one that fits you best.
            </p>

            {/* Agent cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[...recommendedAgents]
                .sort((a, b) => a.priority - b.priority)
                .map((agent) => {
                  const isSelected = selectedAgentOptionId === agent.option_id
                  const pointsArray = Array.isArray(agent.points)
                    ? agent.points
                    : typeof agent.points === 'string' && agent.points
                      ? [agent.points]
                      : []

                  return (
                    <button
                      key={agent.option_id}
                      onClick={() => setSelectedAgentOptionId(agent.option_id)}
                      className={`group text-left rounded-2xl border-2 p-5 transition-all duration-150 flex flex-col gap-3 w-full ${
                        isSelected
                          ? 'border-gray-900 bg-gray-900'
                          : 'border-gray-200 bg-white hover:border-gray-400'
                      }`}
                    >
                      {/* Agent name + badge */}
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-semibold text-base leading-snug ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {agent.agent_name}
                        </p>
                        {agent.priority === 1 && (
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                            isSelected ? 'bg-amber-400 text-gray-900' : 'bg-amber-100 text-amber-700'
                          }`}>
                            ✦ Top Pick
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {agent.description ? (
                        <p className={`text-sm leading-relaxed ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                          {agent.description}
                        </p>
                      ) : null}

                      {/* Points */}
                      {pointsArray.length > 0 && (
                        <ul className="space-y-1.5 mt-0.5">
                          {pointsArray.filter(Boolean).map((point, i) => (
                            <li key={i} className={`text-xs flex items-start gap-2 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                              <span className={`mt-0.5 flex-shrink-0 text-xs ${isSelected ? 'text-amber-400' : 'text-amber-500'}`}>✦</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Selection indicator */}
                      <div className={`w-5 h-5 rounded-full border-2 self-end flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-white bg-white'
                          : 'border-gray-300 group-hover:border-gray-500'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                      </div>
                    </button>
                  )
                })}
            </div>

            {/* ── Contact Us section (shown when no agent selected) ── */}
            {/* {selectedAgentOptionId === null && ( */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                {contactSubmitted ? (
                  <div className="text-center py-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">We'll be in touch!</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Our team will reach out to help you find the right agent.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Not sure which to choose?</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          Leave your email and our team will help you find the perfect agent for your needs.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleContactSubmit() }}
                        className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 transition-colors bg-white"
                        disabled={contactSubmitting}
                      />
                      <button
                        onClick={handleContactSubmit}
                        disabled={
                          contactSubmitting ||
                          !contactEmail?.trim() ||
                          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())
                        }
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                          !contactSubmitting &&
                          contactEmail?.trim() &&
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())
                            ? 'bg-gray-900 text-white hover:bg-gray-800'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {contactSubmitting ? 'Sending...' : 'Contact Us'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            {/* )} */}

          </div>

          {/* Sticky footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 sm:px-10 py-4 flex items-center gap-3">
            <button
              onClick={handleStepBack}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ← Back
            </button>
            <button
              onClick={handleStepContinue}
              disabled={selectedAgentOptionId === null || agentSelectionLoading}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selectedAgentOptionId !== null && !agentSelectionLoading
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {agentSelectionLoading ? 'Loading...' : 'Continue →'}
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  // ── NORMAL HAS STEPS RENDER ──
  return (
    <Layout currentStep={2}>
      <div className="flex flex-col min-h-[calc(100vh-53px)]">
        <div className="flex-1 p-6 sm:p-10 max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gray-900 rounded-full transition-all duration-500"
                style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }} />
            </div>
          </div>

          {currentStep?.step_title && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">{currentStep?.step_title}</p>
              {currentStep?.step_description && <p className="text-gray-400 text-sm">{currentStep?.step_description}</p>}
            </div>
          )}

          <div className="space-y-10">
            {questions?.map((question, qIdx) => {
              const selected = answers[question?.question_id] || []
              const displayOptions = getDisplayOptions(question)
              const showBooleanOptions = shouldShowBooleanOptions(question)

              return (
                <div key={question?.question_id}>
                  <h2 className={`font-semibold text-gray-900 leading-tight mb-2 ${
                    questions?.length === 1 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  }`}>
                    {question?.question_text}{' '}
                    <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#f59e0b' }}>
                      {question?.question_highlight}
                    </span>
                  </h2>
                  {question?.subtitle && <p className="text-gray-500 text-sm mb-4">{question?.subtitle}</p>}

                  {question?.boolean_question && (
                    <div className="mb-6">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleBooleanAnswerInStep(question, true)}
                          className={`px-6 py-3 rounded-xl border-2 transition-all ${
                            booleanAnswers[question?.question_id] === true
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                          disabled={saving}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => handleBooleanAnswerInStep(question, false)}
                          className={`px-6 py-3 rounded-xl border-2 transition-all ${
                            booleanAnswers[question?.question_id] === false
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                          disabled={saving}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}

                  {question?.dynamic_question && displayOptions?.length === 0 && (
                    <div className="bg-amber-50 rounded-xl p-4 mb-4 text-center border border-amber-200">
                      <p className="text-amber-700 text-sm">Please select an AI Agent first to see relevant goals.</p>
                    </div>
                  )}

                  {(!question?.boolean_question || showBooleanOptions) && (
                    <>
                      {question?.question_type === 'dropdown' ? (
                        <select
                          value={selected?.[0] || ''}
                          onChange={(e) => {
                            const opt = displayOptions.find(o => o.option_id === Number(e.target.value))
                            toggleOptionInStep(question, Number(e.target.value), opt)
                          }}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-gray-900 transition-colors"
                          disabled={displayOptions?.length === 0}
                        >
                          <option value="" disabled>Select an option...</option>
                          {displayOptions?.map(option => (
                            <option key={option?.option_id} value={option?.option_id}>
                              {option?.option_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {displayOptions?.map((option) => {
                            const isOtherActive =
                              otherInputState[question?.question_id]?.option_id === option?.option_id

                            const isSelected =
                              !isOtherActive && selected?.includes(option?.option_id)

                            const showingInput = isOtherActive

                            return (
                              <div key={option?.option_id} className="flex flex-col gap-2">
                                <button
                                  onClick={() => toggleOptionInStep(question, option?.option_id, option)}
                                  disabled={saving || displayOptions?.length === 0}
                                  className={`group text-left rounded-2xl border-2 p-4 transition-all duration-150 flex items-start gap-3 disabled:opacity-70 ${
                                    isSelected || showingInput
                                      ? 'border-gray-900 bg-gray-900'
                                      : 'border-gray-200 bg-white hover:border-gray-400'
                                  }`}
                                >
                                  {option?.option_image && (
                                    <span className="text-xl flex-shrink-0 mt-0.5">{option?.option_image}</span>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-medium text-sm ${isSelected || showingInput ? 'text-white' : 'text-gray-900'}`}>
                                      {option?.option_name}
                                    </p>
                                    {option?.description && (
                                      <p className={`text-xs mt-0.5 ${isSelected || showingInput ? 'text-gray-300' : 'text-gray-400'}`}>
                                        {option?.description}
                                      </p>
                                    )}
                                  </div>
                                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                                    isSelected || showingInput
                                      ? 'border-white bg-white'
                                      : 'border-gray-300 group-hover:border-gray-500'
                                  }`}>
                                    {(isSelected || showingInput) && (
                                      <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                    )}
                                  </div>
                                </button>

                                {showingInput && (
                                  <div className="flex flex-col gap-2 px-1">
                                    <input
                                      type="text"
                                      autoFocus
                                      placeholder="Please specify..."
                                      value={otherInputState[question?.question_id]?.text || ''}
                                      onChange={(e) =>
                                        setOtherInputState(prev => ({
                                          ...prev,
                                          [question?.question_id]: {
                                            ...prev[question?.question_id],
                                            text: e.target.value
                                          }
                                        }))
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleOtherSubmitInStep(
                                          question,
                                          otherInputState[question?.question_id]?.option_id,
                                          otherInputState[question?.question_id]?.text
                                        )
                                        if (e.key === 'Escape') handleOtherCancelInStep(question?.question_id)
                                      }}
                                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 transition-colors"
                                      disabled={saving}
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleOtherSubmitInStep(
                                          question,
                                          otherInputState[question?.question_id]?.option_id,
                                          otherInputState[question?.question_id]?.text
                                        )}
                                        disabled={saving || !otherInputState[question?.question_id]?.text?.trim()}
                                        className="flex-1 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white disabled:bg-gray-200 disabled:text-gray-400 transition-all"
                                      >
                                        Submit
                                      </button>
                                      <button
                                        onClick={() => handleOtherCancelInStep(question?.question_id)}
                                        disabled={saving}
                                        className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}

                  {qIdx < questions?.length - 1 && <div className="mt-8 border-t border-gray-200" />}
                </div>
              )
            })}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 sm:px-10 py-4 flex items-center gap-3">
          <button onClick={handleStepBack} className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
            ← Back
          </button>
          <button
            onClick={handleStepContinue}
            disabled={!stepComplete || saving || agentSelectionLoading}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              stepComplete && !saving && !agentSelectionLoading
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {agentSelectionLoading ? 'Loading...' : isLastStep ? 'See my recommendation →' : 'Continue →'}
          </button>
        </div>
      </div>
    </Layout>
  )
}