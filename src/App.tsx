import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Events from './pages/Events'
import Navigation from './components/Navigation'
import { UserProvider } from './contexts/UserContext'
import { EventProvider } from './contexts/EventContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useUser } from './contexts/UserContext'
import { useEffect } from 'react'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/welcome');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <EventProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              <Route path="/" element={<Navigate to="/welcome" replace />} />
              <Route path="/welcome" element={<Landing />} />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <>
                      <Navigation />
                      <main className="container mx-auto px-4 py-8 mt-16">
                        <Dashboard />
                      </main>
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <>
                      <Navigation />
                      <main className="container mx-auto px-4 py-8 mt-16">
                        <Profile />
                      </main>
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <>
                      <Navigation />
                      <main className="container mx-auto px-4 py-8 mt-16">
                        <Messages />
                      </main>
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <>
                      <Navigation />
                      <main className="container mx-auto px-4 py-8 mt-16">
                        <Events />
                      </main>
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </EventProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;