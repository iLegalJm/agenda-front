import { AuthProvider } from './features/auth/context/AuthContext'
import { Toaster } from 'sonner'
import AppRouter from './router/AppRouter'

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
