import AppRouter from './router/AppRouter'
import ThemeToggle from './components/ThemeToggle'
import { AuthProvider } from './context/AuthContext'
// import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
        <header className='p-4 flex justify-end border-b border-gray-300 dark:border-gray-700'>
          <ThemeToggle />
        </header>
        <AppRouter />
      </div>
    </AuthProvider>
  )
}

export default App
