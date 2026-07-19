import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CheckCircle, XCircle } from '@phosphor-icons/react'
import { useProgress } from '../context/ProgressContext'

export function QuizCard({ question, index }) {
  const { completedQuizzes, completeQuiz, getQuizAnswer } = useProgress()
  const saved = getQuizAnswer(question.id)
  const isDone = completedQuizzes.has(question.id)

  const [selected, setSelected] = useState(saved?.optionId ?? null)
  const [answered, setAnswered] = useState(Boolean(saved) || isDone)
  const reduce = useReducedMotion()

  const correctId = question.options.find((o) => o.correct)?.id
  const displaySelected = selected ?? saved?.optionId ?? null

  const handleSelect = (option) => {
    if (answered || isDone) return
    setSelected(option.id)
    setAnswered(true)
    completeQuiz(question.id, option.id, option.correct)
  }

  return (
    <motion.div
      className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
    >
      <p className="mb-1 text-xs font-medium text-stone-400">Câu {index + 1}</p>
      <p className="mb-4 text-base font-medium text-stone-800 dark:text-stone-100">
        {question.question}
      </p>
      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = displaySelected === option.id
          const showResult = answered || isDone
          let ring = 'border-stone-200 dark:border-stone-600'
          if (showResult) {
            if (option.correct) {
              ring = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
            } else if (isSelected) {
              ring = 'border-red-400 bg-red-50 dark:bg-red-950/30'
            }
          } else if (isSelected) {
            ring = 'border-accent bg-accent/5'
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={answered || isDone}
              onClick={() => handleSelect(option)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition active:scale-[0.99] ${ring} ${
                answered || isDone ? 'cursor-default' : 'cursor-pointer hover:border-stone-300'
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-300 text-xs font-medium dark:border-stone-500">
                {option.id.toUpperCase()}
              </span>
              <span className="flex-1 text-stone-700 dark:text-stone-200">{option.label}</span>
              {showResult && option.correct && (
                <CheckCircle size={18} className="shrink-0 text-emerald-500" weight="fill" />
              )}
              {showResult && isSelected && !option.correct && (
                <XCircle size={18} className="shrink-0 text-red-400" weight="fill" />
              )}
            </button>
          )
        })}
      </div>
      {(answered || isDone) && displaySelected === correctId && (
        <motion.p
          className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Trả lời đúng! +10 điểm
        </motion.p>
      )}
      {(answered || isDone) && displaySelected && displaySelected !== correctId && (
        <p className="mt-3 text-sm text-stone-500">
          Đáp án đúng: {question.options.find((o) => o.correct)?.label}
        </p>
      )}
    </motion.div>
  )
}
