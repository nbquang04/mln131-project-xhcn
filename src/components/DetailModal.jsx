import { useEffect, useRef } from 'react'
import { X } from '@phosphor-icons/react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

export function DetailModal({ event, open, onClose }) {
  const reduce = useReducedMotion()
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!event) return null

  const { modalContent } = event

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Đóng"
          />
          <motion.div
            ref={dialogRef}
            className="relative z-10 max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-900 sm:p-8"
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 active:scale-95 dark:hover:bg-stone-800"
              aria-label="Đóng"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <p className="text-sm font-medium text-accent">{event.year}</p>
            <h2
              id="modal-title"
              className="mt-1 pr-8 text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-2xl"
            >
              {event.title}
            </h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{event.subtitle}</p>

            {modalContent.intro && (
              <p className="mt-5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {modalContent.intro}
              </p>
            )}

            <div className="mt-6 space-y-6">
              {modalContent.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                    {section.title}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
