import React from 'react';
import ReportEmergency from './ReportEmergency';
import { Activity, Clock, CheckCircle2 } from 'lucide-react';

export default function CivilianDashboard() {
  const requests = [
    { id: 'SOS-9921', type: 'Medical', status: 'Responder Dispatched', time: '12m ago' },
    { id: 'SOS-8810', type: 'Fire', status: 'Resolved', time: '2d ago' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ReportEmergency />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity size={18} className="text-emerald-500" />
              Request Status
            </h3>
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{req.id}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      req.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-700">{req.type} Assistance</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-2">
                    <Clock size={12} /> {req.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <CheckCircle2 className="text-emerald-400 mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2">Help is always ready</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your safety is our priority. Once a request is sent, our automated system routes it to the nearest available responder within seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
