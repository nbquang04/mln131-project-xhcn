import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import { useProgress } from '../context/ProgressContext'
import { DetailModal } from './DetailModal'
import {
  FlagReveal,
  FlowSteps,
  EconomyChart,
  CuongLinhMindmap,
  GoalImagesRow,
} from './special/SpecialBlocks'

function SpecialContent({ event }) {
  switch (event.special) {
    case 'flag-1917':
      return <FlagReveal variant="1917" />
    case 'flag-1945':
      return (
        <FlagReveal
          variant="1945"
          flagImage={event.flagImage}
          flagImageAlt={event.flagImageAlt}
        />
      )
    case 'flow-1930':
      return <FlowSteps steps={event.flowSteps} />
    case 'doi-moi-1986':
      return (
        <>
          <FlowSteps steps={event.flowSteps} highlighted />
          <EconomyChart data={event.chartData} />
        </>
      )
    case 'mindmap-2011':
      return (
        <>
          <CuongLinhMindmap items={event.mindmapItems} />
          <GoalImagesRow goals={event.goalImages} labels={event.mindmapItems} />
        </>
      )
    default:
      return null
  }
}

export function MilestoneCard({ event, index }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { markViewed, viewedMilestones } = useProgress()
  const reduce = useReducedMotion()
  const isEven = index % 2 === 0

  return (
    <motion.article
      id={`milestone-${event.id}`}
      className={`relative scroll-mt-24 grid gap-8 lg:grid-cols-2 lg:gap-12 ${
        event.highlighted
          ? 'rounded-3xl border-2 border-accent/30 bg-accent/[0.03] p-6 lg:p-8 dark:bg-accent/[0.06]'
          : ''
      }`}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => markViewed(event.id)}
    >
      <div className={`${isEven ? '' : 'lg:order-2'}`}>
        <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700">
          <img
            src={event.image}
            alt={event.imageAlt}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </div>
        <SpecialContent event={event} />
      </div>

      <div className={`flex flex-col justify-center ${isEven ? '' : 'lg:order-1'}`}>
        <time
          dateTime={String(event.year)}
          className="text-5xl font-bold tracking-tighter text-accent md:text-6xl"
        >
          {event.year}
        </time>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 md:text-3xl">
          {event.title}
        </h2>
        <p className="mt-2 text-base text-stone-500 dark:text-stone-400">{event.subtitle}</p>

        {event.context && (
          <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {event.context}
          </p>
        )}

        <div className="mt-5">
          <p className="text-sm font-medium text-stone-700 dark:text-stone-300">Ý nghĩa</p>
          <ul className="mt-2 space-y-2">
            {event.meanings.map((m) => (
              <li key={m} className="flex gap-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                <span className="text-accent" aria-hidden="true">
                  -
                </span>
                {m}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark active:scale-[0.98]"
        >
          Xem thêm
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>

      <DetailModal event={event} open={modalOpen} onClose={() => setModalOpen(false)} />

      {viewedMilestones.has(event.id) && (
        <span className="sr-only">Đã xem mốc {event.year}</span>
      )}
    </motion.article>
  )
}
