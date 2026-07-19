import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { TIMELINE_EVENTS } from '../data/timelineData'
import { MilestoneCard } from './MilestoneCard'

export function Timeline() {
  const containerRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 90%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="relative px-4 py-16 md:px-8" aria-label="Timeline lịch sử">
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          <div
            className="absolute left-4 top-0 hidden h-full w-px bg-stone-200 md:left-1/2 md:block md:-translate-x-px dark:bg-stone-700"
            aria-hidden="true"
          >
            {!reduce && (
              <motion.div
                className="w-full bg-accent"
                style={{ height: lineHeight }}
              />
            )}
          </div>

          <div className="space-y-20 md:space-y-28">
            {TIMELINE_EVENTS.map((event, index) => (
              <div key={event.id} className="relative">
                <div
                  className="absolute left-4 top-8 z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-accent md:left-1/2 dark:border-stone-950"
                  aria-hidden="true"
                />
                <MilestoneCard event={event} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
