import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { YearStrip } from './components/YearStrip'
import { Timeline } from './components/Timeline'
import { QuizSection } from './components/QuizSection'
import { ProgressTracker } from './components/ProgressTracker'
import { QuizTopicPage } from './pages/QuizTopicPage'
import { ScrollToHash } from './components/ScrollToHash'

function HomePage() {
  return (
    <>
      <Hero />
      <YearStrip />
      <Timeline />
      <QuizSection />
    </>
  )
}

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <ScrollToHash />
        <div className="min-h-[100dvh] bg-stone-50 pb-24 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz/:topicId" element={<QuizTopicPage />} />
            </Routes>
          </main>
          <footer className="border-t border-stone-200 px-4 py-8 text-center text-sm text-stone-500 dark:border-stone-800 dark:text-stone-500">
            <p>Dự án MLN131 - Hành trình xây dựng chủ nghĩa xã hội ở Việt Nam</p>
          </footer>
          <ProgressTracker />
        </div>
      </BrowserRouter>
    </ProgressProvider>
  )
}

export default App
