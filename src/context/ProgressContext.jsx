import { createContext, useContext, useEffect, useState } from 'react'
import { TOTAL_MILESTONES } from '../data/timelineData'
import { QUIZ_TOPICS, TOTAL_QUIZ_QUESTIONS } from '../data/quizData'

const STORAGE_KEY = 'mln131-progress'

const ProgressContext = createContext(null)
const DEFAULT_QUIZ_SETS = Object.fromEntries(QUIZ_TOPICS.map((topic) => [topic.id, '01']))

function loadStoredProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function createInitialState() {
  const stored = loadStoredProgress()
  if (!stored) {
    return {
      viewedMilestones: new Set(),
      completedQuizzes: new Set(),
      quizAnswers: {},
      activeQuizSets: DEFAULT_QUIZ_SETS,
    }
  }

  return {
    viewedMilestones: new Set(stored.viewedMilestones ?? []),
    completedQuizzes: new Set(stored.completedQuizzes ?? []),
    quizAnswers: stored.quizAnswers ?? {},
    activeQuizSets: { ...DEFAULT_QUIZ_SETS, ...stored.activeQuizSets },
  }
}

export function ProgressProvider({ children }) {
  const [initial] = useState(createInitialState)
  const [viewedMilestones, setViewedMilestones] = useState(initial.viewedMilestones)
  const [completedQuizzes, setCompletedQuizzes] = useState(initial.completedQuizzes)
  const [quizAnswers, setQuizAnswers] = useState(initial.quizAnswers)
  const [activeQuizSets, setActiveQuizSets] = useState(initial.activeQuizSets)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        viewedMilestones: [...viewedMilestones],
        completedQuizzes: [...completedQuizzes],
        quizAnswers,
        activeQuizSets,
      }),
    )
  }, [viewedMilestones, completedQuizzes, quizAnswers, activeQuizSets])

  const markViewed = (id) => {
    setViewedMilestones((prev) => new Set(prev).add(id))
  }

  const completeQuiz = (id, optionId, correct) => {
    setQuizAnswers((prev) => ({ ...prev, [id]: { optionId, correct } }))
    setCompletedQuizzes((prev) => {
      if (prev.has(id)) return prev
      return new Set(prev).add(id)
    })
  }

  const getQuizAnswer = (id) => quizAnswers[id] ?? null

  const getActiveQuizSet = (topicId) => activeQuizSets[topicId] ?? '01'

  const resetTopicQuiz = (topicId, questionIds, nextSetId) => {
    const questionIdSet = new Set(questionIds)

    setCompletedQuizzes(
      (prev) => new Set([...prev].filter((questionId) => !questionIdSet.has(questionId))),
    )
    setQuizAnswers((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([questionId]) => !questionIdSet.has(questionId)),
      ),
    )
    setActiveQuizSets((prev) => ({ ...prev, [topicId]: nextSetId }))
  }

  const milestoneProgress = (viewedMilestones.size / TOTAL_MILESTONES) * 70
  const quizProgress = (completedQuizzes.size / TOTAL_QUIZ_QUESTIONS) * 30
  const progressPercent = Math.round(milestoneProgress + quizProgress)
  const score = Object.values(quizAnswers).filter((answer) => answer.correct).length * 10

  const value = {
    viewedMilestones,
    completedQuizzes,
    quizAnswers,
    activeQuizSets,
    score,
    markViewed,
    completeQuiz,
    getQuizAnswer,
    getActiveQuizSet,
    resetTopicQuiz,
    progressPercent,
    viewedCount: viewedMilestones.size,
    quizCount: completedQuizzes.size,
    totalMilestones: TOTAL_MILESTONES,
    totalQuizQuestions: TOTAL_QUIZ_QUESTIONS,
  }

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
