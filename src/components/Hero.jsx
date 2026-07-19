import { motion, useReducedMotion } from 'motion/react'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-12 pt-24 md:px-8 md:pb-16">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl font-bold tracking-tighter text-stone-900 dark:text-stone-50 md:text-5xl lg:text-6xl">
            Hành trình xây dựng CNXH ở Việt Nam
          </h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-stone-600 dark:text-stone-400">
            Khám phá từng mốc lịch sử qua timeline tương tác, sau đó làm bài kiểm tra 12 câu
            để củng cố kiến thức.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#timeline"
              className="inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark active:scale-[0.98]"
            >
              Bắt đầu
            </a>
            <a
              href="#quiz"
              className="inline-flex rounded-full border border-stone-300 px-6 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-100 active:scale-[0.98] dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              Làm Quiz
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden lg:block"
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700">
            <img
              src="/images/xaydungxhcn.jpg"
              alt="Toàn cảnh Hà Nội – hành trình xây dựng CNXH ở Việt Nam"
              className="aspect-[3/2] w-full object-cover"
              width={720}
              height={480}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
