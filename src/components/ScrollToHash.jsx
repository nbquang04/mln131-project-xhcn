import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')

      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return true
        }
        return false
      }

      if (!scrollToTarget()) {
        const timer = window.setTimeout(scrollToTarget, 50)
        return () => window.clearTimeout(timer)
      }
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
