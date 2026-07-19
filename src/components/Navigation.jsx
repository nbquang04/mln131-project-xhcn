import { Link } from 'react-router-dom'
import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'

export function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/90">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="text-sm font-bold tracking-tight text-stone-900 dark:text-stone-50">
          UpTo<span className="text-accent">XHCN</span>
        </Link>
        <div className="flex items-center gap-3 text-sm md:gap-6">
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
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:border-stone-300 hover:bg-stone-100 hover:text-stone-900 active:scale-95 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-50"
          >
            {isDark ? <Sun size={18} weight="fill" /> : <Moon size={18} weight="fill" />}
          </button>
        </div>
      </nav>
    </header>
  )
}
