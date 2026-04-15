import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import Dashboard from './pages/Dashboard'
import ActiveThreats from './pages/ActiveThreats'
import ReportEmergency from './pages/ReportEmergency'
import CommanderCenter from './pages/CommanderCenter'
import IncidentResponseView from './pages/IncidentResponseView'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

const INITIAL_INCIDENTS = [
  { id: 'INC-701', type: 'Structural Fire', lat: 26.1445, lng: 91.7362, status: 'detected', severity: 'high' },
  { id: 'INC-702', type: 'Medical Emergency', lat: 26.1158, lng: 91.7086, status: 'dispatched', severity: 'medium' },
  { id: 'INC-703', type: 'Power Failure', lat: 26.1850, lng: 91.7250, status: 'detected', severity: 'low' },
]

function App() {
  const [user, setUser] = useState(null)
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
  }

  const updateIncidentStatus = (id, newStatus) => {
    if (newStatus === 'resolved') {
      setIncidents(prev => prev.filter(inc => inc.id !== id))
    } else {
      setIncidents(prev => prev.map(inc => 
        inc.id === id ? { ...inc, status: newStatus } : inc
      ))
    }
  }

  // If not logged in, only show Login page
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
        <Sidebar user={user} onLogout={handleLogout} />
        
        <div className="flex-1 flex flex-col min-w-0 relative h-full">
          {/* Scanline Effect Overlay (Subtle) from the remote version */}
          <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.01] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
          
          <TopNav user={user} />
          
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <Routes>
              {/* Coordinator Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute user={user} allowedRoles={['coordinator']}>
                  <Dashboard incidents={incidents} onUpdateStatus={updateIncidentStatus} />
                </ProtectedRoute>
              } />
              <Route path="/coordinator" element={
                <ProtectedRoute user={user} allowedRoles={['coordinator']}>
                  <CommanderCenter user={user} />
                </ProtectedRoute>
              } />
              <Route path="/alerts" element={
                <ProtectedRoute user={user} allowedRoles={['coordinator', 'responder']}>
                  <ActiveThreats />
                </ProtectedRoute>
              } />

              {/* Responder Routes */}
              <Route path="/incidents" element={
                <ProtectedRoute user={user} allowedRoles={['responder']}>
                  <IncidentResponseView />
                </ProtectedRoute>
              } />

              {/* Civilian Routes */}
              <Route path="/sos" element={
                <ProtectedRoute user={user} allowedRoles={['civilian', 'coordinator']}>
                  <ReportEmergency />
                </ProtectedRoute>
              } />
              <Route path="/status" element={
                <ProtectedRoute user={user} allowedRoles={['civilian']}>
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <Activity size={48} className="mb-4 opacity-20" />
                    <h3 className="text-xl font-bold text-slate-900">Current Incident Status</h3>
                    <p className="italic">No active reports found for your ID.</p>
                  </div>
                </ProtectedRoute>
              } />

              {/* Common Routes */}
              <Route path="/profile" element={
                <ProtectedRoute user={user}>
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">👤</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
                    <p className="italic text-emerald-600 font-mono uppercase text-xs mt-1">{user.role} ACCESS</p>
                  </div>
                </ProtectedRoute>
              } />

              {/* Redirects based on role */}
              <Route path="/" element={
                user.role === 'coordinator' ? <Navigate to="/dashboard" replace /> :
                user.role === 'responder' ? <Navigate to="/incidents" replace /> :
                <Navigate to="/sos" replace />
              } />
              
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🚧</span>
                  </div>
                  <p className="italic">This module is currently being deployed...</p>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="mt-4 text-emerald-600 font-bold hover:underline"
                  >
                    Return Home
                  </button>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
