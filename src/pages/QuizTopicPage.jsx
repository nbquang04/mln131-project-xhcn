import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowClockwise, ArrowLeft, CheckCircle } from '@phosphor-icons/react'
import { getQuestionSet, getTopicById } from '../data/quizData'
import { QuizCard } from '../components/QuizCard'
import { useProgress } from '../context/ProgressContext'

export function QuizTopicPage() {
  const { topicId } = useParams()
  const topic = getTopicById(topicId)
  const { completedQuizzes, getActiveQuizSet, resetTopicQuiz } = useProgress()
  const reduce = useReducedMotion()

  if (!topic) {
    return <Navigate to={{ pathname: '/', hash: 'quiz' }} replace />
  }

  const activeSet = getQuestionSet(topic, getActiveQuizSet(topic.id))
  const doneCount = activeSet.questions.filter((q) => completedQuizzes.has(q.id)).length
  const isTopicComplete = doneCount === activeSet.questions.length

  const handleNextSet = () => {
    const currentIndex = topic.questionSets.findIndex((set) => set.id === activeSet.id)
    const nextSet = topic.questionSets[(currentIndex + 1) % topic.questionSets.length]
    resetTopicQuiz(
      topic.id,
      activeSet.questions.map((question) => question.id),
      nextSet.id,
    )
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] border-t border-stone-200 bg-white px-4 py-12 dark:border-stone-800 dark:bg-stone-950 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to={{ pathname: '/', hash: 'quiz' }}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
        >
          <ArrowLeft size={16} weight="bold" />
          Quay lại chủ đề
        </Link>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-sm font-medium text-accent">Chủ đề</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            {topic.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-400">
            {topic.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              Mã đề {activeSet.id}
            </span>
            <span className="rounded-full bg-stone-100 px-4 py-1.5 text-sm font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              Tiến độ: {doneCount}/{activeSet.questions.length} câu
            </span>
          </div>
        </motion.div>

        <div className="mt-10 space-y-5">
          {activeSet.questions.map((q, i) => (
            <QuizCard key={q.id} question={q} index={i} />
          ))}
        </div>

        {isTopicComplete ? (
          <motion.div
            className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CheckCircle
              size={40}
              weight="fill"
              className="mx-auto text-emerald-500"
            />
            <p className="mt-3 text-lg font-semibold text-stone-900 dark:text-stone-50">
              Hoàn thành chủ đề!
            </p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Bạn đã hoàn thành mã đề {activeSet.id}. Hãy reset để chuyển sang mã đề khác.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleNextSet}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark active:scale-[0.98]"
              >
                <ArrowClockwise size={16} weight="bold" />
                Reset và làm mã đề khác
              </button>
              <Link
                to={{ pathname: '/', hash: 'quiz' }}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-white active:scale-[0.98] dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-900"
              >
                <ArrowLeft size={16} weight="bold" />
                Quay lại chủ đề
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="mt-10 flex justify-center">
            <Link
              to={{ pathname: '/', hash: 'quiz' }}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-100 active:scale-[0.98] dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              <ArrowLeft size={16} weight="bold" />
              Quay lại chủ đề
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
