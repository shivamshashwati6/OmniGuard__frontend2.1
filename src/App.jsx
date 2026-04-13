import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import Dashboard from './pages/Dashboard'
import ActiveThreats from './pages/ActiveThreats'
import ReportEmergency from './pages/ReportEmergency'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Sidebar - Fixed Left, Hidden on mobile, but for now we follow the "Fixed" requirement */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'alerts' && <ActiveThreats />}
          {activeTab === 'sos' && <ReportEmergency />}
          {!['dashboard', 'alerts', 'sos'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🚧</span>
              </div>
              <p className="italic">Module '{activeTab.toUpperCase()}' is currently being deployed...</p>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="mt-4 text-emerald-600 font-bold hover:underline"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
