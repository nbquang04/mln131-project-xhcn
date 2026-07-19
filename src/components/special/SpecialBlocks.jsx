import { motion, useReducedMotion } from 'motion/react'

function SovietFlagSvg({ className }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <rect width="120" height="80" fill="#CC0000" rx="1.5" />
      <polygon
        points="60,16 63.5,26.5 74.5,26.5 65.5,33 69,43.5 60,37 51,43.5 54.5,33 45.5,26.5 56.5,26.5"
        fill="#FFCD00"
      />
    </svg>
  )
}

function FlagReveal1945({ reduce, label, image, imageAlt }) {
  const src = image ?? '/images/1945-independence.jpg'
  const alt = imageAlt ?? 'Lá cờ đỏ sao vàng được kéo lên tại Quảng trường Ba Đình, 2/9/1945'

  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl border border-red-900/30 dark:border-red-900/40">
      <div className="relative aspect-[5/3] overflow-hidden bg-stone-950">
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-x-0 top-0 h-[135%] w-full object-cover object-[center_12%]"
          initial={reduce ? false : { y: '28%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/25 to-stone-950/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,205,0,0.12),transparent_55%)]"
          aria-hidden="true"
        />
      </div>

      <div className="relative bg-gradient-to-b from-stone-950 to-stone-900 px-4 pb-4 pt-3 text-center">
        <p className="text-sm font-medium tracking-wide text-stone-100">{label}</p>
      </div>
    </div>
  )
}

function FlagReveal1917({ reduce, label }) {
  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-b from-stone-100 to-stone-200/60 p-6 dark:border-stone-700 dark:from-stone-900 dark:to-stone-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(204,0,0,0.08),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative flex h-32 items-end justify-center">
        <motion.div
          className="relative origin-left"
          initial={reduce ? false : { y: 40, opacity: 0, rotateZ: -6 }}
          whileInView={{ y: 0, opacity: 1, rotateZ: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="origin-left"
            animate={reduce ? {} : { rotateZ: [-1, 1, -1] }}
            transition={
              reduce
                ? undefined
                : { repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.9 }
            }
          >
            <SovietFlagSvg className="h-20 w-auto drop-shadow-lg" />
          </motion.div>
        </motion.div>
      </div>

      <p className="relative mt-3 text-center text-sm text-stone-600 dark:text-stone-400">{label}</p>
    </div>
  )
}

export function FlagReveal({ variant = '1917', flagImage, flagImageAlt }) {
  const reduce = useReducedMotion()
  const label = variant === '1945' ? 'Lá cờ Tổ quốc được kéo lên' : 'Lá cờ đỏ sao vàng xuất hiện'

  if (variant === '1945') {
    return (
      <FlagReveal1945
        reduce={reduce}
        label={label}
        image={flagImage}
        imageAlt={flagImageAlt}
      />
    )
  }

  return <FlagReveal1917 reduce={reduce} label={label} />
}

export function FlowSteps({ steps, highlighted = false }) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`mt-4 rounded-2xl border p-5 ${
        highlighted
          ? 'border-accent/40 bg-accent/5 dark:bg-accent/10'
          : 'border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-900'
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex w-full flex-col items-center">
            <motion.div
              className={`w-full rounded-xl px-4 py-3 text-center text-sm font-medium ${
                highlighted && i === steps.length - 1
                  ? 'bg-accent text-white'
                  : 'bg-white text-stone-800 dark:bg-stone-800 dark:text-stone-100'
              }`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
            >
              {step}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                className="my-1 text-stone-400"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.06 }}
                aria-hidden="true"
              >
                ↓
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function EconomyChart({ data }) {
  const reduce = useReducedMotion()
  const metrics = [
    { key: 'gdp', label: 'Tăng trưởng GDP', color: 'bg-accent' },
    { key: 'export', label: 'Xuất khẩu/GDP', color: 'bg-rose-400' },
    { key: 'invest', label: 'FDI/GDP', color: 'bg-amber-500' },
  ]

  return (
    <div className="mt-4 rounded-2xl border border-accent/30 bg-white p-5 dark:bg-stone-900">
      <p className="mb-4 text-sm font-medium text-stone-700 dark:text-stone-300">
        Chỉ số tăng trưởng theo giai đoạn (chuẩn hóa theo đỉnh từng chỉ số)
      </p>
      <div className="space-y-5">
        {data.map((period, pi) => (
          <div key={period.label}>
            <p className="mb-2 text-xs font-medium text-stone-500">{period.label}</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {metrics.map((m) => {
                const metric = period[m.key]
                return (
                  <div key={m.key}>
                    <div className="mb-1 flex justify-between text-xs text-stone-500">
                      <span>{m.label}</span>
                      <span className="font-medium text-stone-700 dark:text-stone-300">
                        {metric.display}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
                      <motion.div
                        className={`h-full rounded-full ${m.color}`}
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${metric.index}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: pi * 0.1 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-stone-400">
        Nguồn: Tổng cục Thống kê, World Bank (WDI). Độ dài cột = tỷ lệ so với mức cao nhất
        của từng chỉ số trong 4 giai đoạn.
      </p>
    </div>
  )
}

export function GoalImagesRow({ goals, labels }) {
  if (!goals?.length) return null

  return (
    <div className="mt-4 grid grid-cols-5 gap-1 sm:gap-2">
      {goals.map((goal, i) => (
        <div key={goal.src} className="overflow-hidden rounded-lg border border-stone-200 dark:border-stone-700">
          <img
            src={goal.src}
            alt={goal.alt}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
          {labels?.[i] && (
            <p className="bg-white px-1 py-1.5 text-center text-[10px] font-medium leading-tight text-stone-700 sm:text-[11px] dark:bg-stone-800 dark:text-stone-200">
              {labels[i][0]}
              <br />
              {labels[i][1]}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function mindmapLines(item) {
  if (Array.isArray(item)) return item
  if (typeof item === 'object' && item?.lines) return item.lines
  const [line1, line2] = String(item).split(' ')
  return [line1, line2 ?? '']
}

export function CuongLinhMindmap({ items }) {
  const reduce = useReducedMotion()

  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-700 dark:bg-stone-900">
      <motion.div
        className="mx-auto min-w-[280px] max-w-lg"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-center font-mono text-sm font-semibold tracking-[0.2em] text-stone-800 dark:text-stone-100">
          MỤC TIÊU
        </p>

        <div className="mx-auto h-6 w-px bg-stone-400 dark:bg-stone-500" aria-hidden="true" />

        <div className="relative px-2">
          <div
            className="absolute left-[10%] right-[10%] top-0 h-px bg-stone-400 dark:bg-stone-500"
            aria-hidden="true"
          />
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {items.map((item, i) => {
              const lines = mindmapLines(item)
              const key = lines.join('-')

              return (
                <motion.div
                  key={key}
                  className="flex flex-col items-center pt-0"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <div className="h-4 w-px bg-stone-400 dark:bg-stone-500" aria-hidden="true" />
                  <div className="flex min-h-[2.75rem] w-full flex-col items-center justify-center rounded-lg border border-stone-300 bg-white px-1 py-2 text-center text-[11px] font-semibold leading-tight text-stone-800 sm:px-2 sm:text-xs dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100">
                    <span>{lines[0]}</span>
                    <span>{lines[1]}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}