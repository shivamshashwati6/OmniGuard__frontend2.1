import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Activity, ShieldAlert, Tent, MapPin, Camera, ChevronRight, ChevronLeft, CheckCircle2, Navigation } from 'lucide-react'

const incidentTypes = [
  { id: 'fire', label: 'Fire', icon: Flame, color: 'bg-rose-100 text-rose-600 border-rose-200' },
  { id: 'medical', label: 'Medical', icon: Activity, color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
  { id: 'crime', label: 'Crime', icon: ShieldAlert, color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { id: 'natural', label: 'Natural Disaster', icon: Tent, color: 'bg-amber-100 text-amber-600 border-amber-200' },
]

export default function ReportEmergency() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    photo: null
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps))
  const handleBack = () => setStep(s => Math.max(s - 1, 1))

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-full bg-slate-50 md:p-4">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center space-y-8 py-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">EMERGENCY SOS</h2>
              <p className="text-slate-500 font-medium">Tap the button below for immediate assistance</p>
            </div>

            {/* Large SOS Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(2)}
              className="w-64 h-64 bg-rose-500 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_50px_rgba(244,63,94,0.4)] border-[12px] border-rose-400/30 group active:bg-rose-600 transition-colors"
            >
              <ShieldAlert size={80} className="group-hover:animate-pulse" />
              <span className="mt-4 text-3xl font-black tracking-widest">SOS</span>
            </motion.button>

            {/* Description Field */}
            <div className="w-full bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Situation Description</label>
              <textarea 
                rows={4}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/50 outline-none text-lg font-medium resize-none placeholder:text-slate-300"
                placeholder="Describe what is happening (e.g. 'Accident near Beltola', 'Fire in building')..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <p className="text-[10px] text-slate-400 italic text-center max-w-xs">
              By pressing SOS, your location and identity will be shared with the nearest response unit.
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center space-y-8 my-auto"
          >
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-slate-900 uppercase">Alert Transmitted</h3>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
                Your emergency report has been prioritized. <br/> Responders are tracking your GPS coordinates.
              </p>
            </div>
            
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                <p className="text-sm font-black text-emerald-600">DISPATCHING</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Wait Time</p>
                <p className="text-sm font-black text-slate-900 font-mono">~5 MIN</p>
              </div>
            </div>

            <button 
              onClick={() => setStep(1)}
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors"
            >
              Update Report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
