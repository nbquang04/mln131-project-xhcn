import { useProgress } from '../context/ProgressContext'

export function ProgressTracker() {
  const {
    progressPercent,
    viewedCount,
    quizCount,
    totalMilestones,
    totalQuizQuestions,
    score,
  } = useProgress()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/90 px-4 py-3 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="mb-1 flex justify-between text-xs font-medium text-stone-600 dark:text-stone-400">
            <span>
              Timeline {viewedCount}/{totalMilestones} · Quiz {quizCount}/{totalQuizQuestions}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Tiến trình khám phá"
          >
            <div
              className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 sm:ml-6 sm:shrink-0">
          Điểm: <span className="text-accent">{score}</span>
        </p>
      </div>
    </div>
  )
}
