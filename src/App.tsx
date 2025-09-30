import AppRouter from './router/AppRouter'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'sonner'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      {/* 👇 Toaster global */}
      <Toaster richColors position="top-right" />
    </AuthProvider>
  )
}

export default App
