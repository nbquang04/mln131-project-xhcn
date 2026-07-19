import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { TIMELINE_EVENTS } from '../data/timelineData'

export function YearStrip() {
  const stripRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollXProgress } = useScroll({ container: stripRef })

  return (
    <div
      id="timeline"
      className="scroll-mt-24 border-y border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900/50"
    >
      <div
        ref={stripRef}
        className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-4 scrollbar-none md:justify-between md:overflow-visible md:px-8"
        style={{ scrollbarWidth: 'none' }}
      >
        {TIMELINE_EVENTS.map((event, i) => (
          <a
            key={event.id}
            href={`#milestone-${event.id}`}
            className="group flex shrink-0 flex-col items-center gap-2 px-3 py-1 transition"
          >
            <motion.span
              className="text-lg font-bold tracking-tight text-stone-400 transition group-hover:text-accent group-focus-visible:text-accent md:text-xl"
              initial={reduce ? false : { opacity: 0.6 }}
              whileHover={{ scale: 1.08, color: '#c41e2a' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {event.year}
            </motion.span>
            {i < TIMELINE_EVENTS.length - 1 && (
              <span className="hidden text-stone-300 md:inline" aria-hidden="true">
                │
              </span>
            )}
          </a>
        ))}
      </div>
      {!reduce && (
        <motion.div
          className="mx-auto h-0.5 max-w-5xl origin-left bg-accent"
          style={{ scaleX: scrollXProgress }}
        />
      )}
    </div>
  )
}
