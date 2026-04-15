import React from 'react';
import TacticalMap from '../components/TacticalMap';
import { Map as MapIcon, Maximize2, ShieldCheck } from 'lucide-react';

export default function TacticalMapView({ incidents }) {
  return (
    <div className="flex flex-col h-full space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase tracking-[0.1em]">Tactical Map</h2>
          <p className="text-slate-500 text-sm mt-1 font-mono uppercase tracking-widest text-[10px]">Strategic asset deployment & incident locations</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Live Feed: Synchronized</span>
           </div>
        </div>
      </div>

      <div className="flex-1 min-h-[500px] lg:min-h-0 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl relative group">
        <div className="absolute inset-0 z-0">
          <TacticalMap incidents={incidents} />
        </div>
        
        {/* Fullscreen Map Controls Overlay */}
        <div className="absolute bottom-8 left-8 z-10 flex gap-3">
           <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 flex items-center gap-4 text-white shadow-2xl">
              <div className="p-2 bg-emerald-500 rounded-lg">
                 <ShieldCheck size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sector Status</p>
                 <p className="text-xs font-bold font-mono">NORTH_GUWAHATI_ACTIVE</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
