import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { BookOpen, Flag, TrendUp, ArrowRight } from '@phosphor-icons/react'
import { getQuestionSet, QUIZ_TOPICS } from '../data/quizData'
import { useProgress } from '../context/ProgressContext'

const TOPIC_ICONS = {
  'co-so-ly-luan': BookOpen,
  'doc-lap-dan-toc': Flag,
  'doi-moi-phat-trien': TrendUp,
}

function TopicCard({ topic, index }) {
  const { completedQuizzes, getActiveQuizSet } = useProgress()
  const reduce = useReducedMotion()
  const Icon = TOPIC_ICONS[topic.id] ?? BookOpen
  const activeSet = getQuestionSet(topic, getActiveQuizSet(topic.id))
  const doneCount = activeSet.questions.filter((q) => completedQuizzes.has(q.id)).length
  const total = activeSet.questions.length
  const isComplete = doneCount === total

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link
        to={`/quiz/${topic.id}`}
        className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-accent/40 hover:shadow-md active:scale-[0.99] dark:border-stone-700 dark:bg-stone-900 dark:hover:border-accent/50"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Icon size={22} weight="duotone" />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Mã đề {activeSet.id}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isComplete
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
              }`}
            >
              {doneCount}/{total} câu
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
          {topic.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {topic.description}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition group-hover:gap-2.5">
          Bắt đầu làm bài
          <ArrowRight size={16} weight="bold" />
        </span>
      </Link>
    </motion.div>
  )
}

export function QuizSection() {
  const { quizCount, totalQuizQuestions, score } = useProgress()
  const reduce = useReducedMotion()

  return (
    <section
      id="quiz"
      className="scroll-mt-24 border-t border-stone-200 bg-white px-4 py-20 dark:border-stone-800 dark:bg-stone-950 md:px-8"
      aria-label="Kiểm tra kiến thức"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
            Kiểm tra kiến thức
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-400">
            Chọn một chủ đề để bắt đầu. Mỗi chủ đề có 3 mã đề, mỗi mã gồm 4 câu hỏi và mỗi
            câu trả lời đúng được 10 điểm.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-stone-100 px-4 py-1.5 font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              Đã làm: {quizCount}/{totalQuizQuestions}
            </span>
            <span className="rounded-full bg-accent/10 px-4 py-1.5 font-medium text-accent">
              Tổng điểm: {score}
            </span>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {QUIZ_TOPICS.map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
