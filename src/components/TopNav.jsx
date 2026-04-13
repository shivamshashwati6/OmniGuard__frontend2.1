import React from 'react'
import { Bell, Search, User, Zap } from 'lucide-react'

export default function TopNav() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 glass">
      <div className="flex items-center flex-1 max-w-2xl gap-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search districts, assets, or incidents..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500/50 transition-all outline-none text-sm"
          />
        </div>
        
        <div className="hidden lg:flex flex-col items-start border-l border-slate-200 pl-8">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Status</span>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-sm font-bold text-slate-700">GUWAHATI_HQ / STANDBY</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 bg-rose-500 text-white px-5 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider sos-glow hover:bg-rose-600 transition-colors">
          <Zap size={18} fill="currentColor" />
          Quick SOS
        </button>

        <div className="flex items-center gap-4 border-l border-slate-200 pl-6 text-slate-600">
          <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none">Coordinator Mode</p>
              <p className="text-[10px] text-emerald-500 font-mono">coordinator@omniguard.io</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200 group-hover:border-emerald-500 transition-colors overflow-hidden">
              <User size={24} className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
