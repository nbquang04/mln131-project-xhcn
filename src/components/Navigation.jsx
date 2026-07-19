import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'

export function Navigation() {
  const { score } = useProgress()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/90">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="text-sm font-bold tracking-tight text-stone-900 dark:text-stone-50">
          MLN131 <span className="text-accent">Timeline</span>
        </Link>
        <div className="flex items-center gap-4 text-sm md:gap-6">
          <Link
            to={{ pathname: '/', hash: 'timeline' }}
            className="hidden text-stone-600 transition hover:text-stone-900 md:inline dark:text-stone-400 dark:hover:text-stone-100"
          >
            Timeline
          </Link>
          <Link
            to={{ pathname: '/', hash: 'quiz' }}
            className="text-stone-600 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            Quiz
          </Link>
          <span className="font-medium text-stone-700 dark:text-stone-300">
            {score} điểm
          </span>
        </div>
      </nav>
    </header>
  )
}
