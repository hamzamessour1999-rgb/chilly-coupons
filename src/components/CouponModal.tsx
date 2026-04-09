import { X, Star, Users, ShieldCheck, Ticket, Check, Copy, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import type { Coupon } from '../constants';

interface CouponModalProps {
  coupon: Coupon | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CouponModal({ coupon, isOpen, onClose }: CouponModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Initializing...");
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setProgress(0);
      setStatusMessage("Initializing...");
      setIsRevealed(false);
      setIsCopied(false);
    }
  }, [isOpen]);

  const handleShowCode = () => {
    setIsLoading(true);
    let currentProgress = 0;
    
    const messages = [
      { threshold: 0, text: "Connecting to secure server..." },
      { threshold: 25, text: "Verifying coupon database..." },
      { threshold: 50, text: "Checking code availability..." },
      { threshold: 75, text: "Finalizing verification..." },
      { threshold: 95, text: "Success! Code verified." }
    ];

    const interval = setInterval(() => {
      // Slower increments: 2-6 instead of 5-20
      currentProgress += Math.floor(Math.random() * 4) + 2;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setStatusMessage("Success! Code verified.");
        setTimeout(() => {
          setIsLoading(false);
          setIsRevealed(true);
        }, 800);
      } else {
        const msg = [...messages].reverse().find(m => currentProgress >= m.threshold);
        if (msg) setStatusMessage(msg.text);
      }
      setProgress(currentProgress);
    }, 150); // Slightly faster interval but smaller increments for smoother, slower feel
  };

  const handleCopy = () => {
    window.location.href = 'https://appchecker.space/cl/i/9vvdmv';
  };

  if (!coupon) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-midnight w-full max-w-2xl sm:rounded-[2.5rem] rounded-none overflow-hidden shadow-2xl pointer-events-auto relative sm:max-h-[90vh] h-full sm:h-auto flex flex-col border border-transparent dark:border-white/10"
            >
              {/* Header with Background Image */}
              <div className="relative h-52 shrink-0 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-[3px] scale-110"
                  style={{ backgroundImage: `url(${coupon.image})` }}
                >
                  <div className="absolute inset-0 bg-black/60" />
                </div>
                
                <div className="relative h-full p-8 flex flex-col justify-end">
                  <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-600 shadow-lg transition-all border border-slate-200 pointer-events-auto"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h2 className="text-2xl font-display font-bold text-white mb-4 leading-tight">
                    {coupon.title}
                  </h2>
                  
                  <div className="flex gap-2">
                    {coupon.isStudentOnly && (
                      <div className="bg-brand px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-black text-white border border-white/20 shadow-lg animate-pulse-slow">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Student Only
                      </div>
                    )}
                    <div className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-white border border-white/10">
                      <Ticket className="w-3.5 h-3.5" />
                      {coupon.couponsLeft} coupons left
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-white border border-white/10">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar bg-white dark:bg-midnight">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-12">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="transparent"
                          className="text-slate-50 dark:text-white/5"
                        />
                        <motion.circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="#00C2FF"
                          strokeWidth="6"
                          strokeLinecap="round"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 70}
                          animate={{ strokeDashoffset: (2 * Math.PI * 70) - (progress / 100) * (2 * Math.PI * 70) }}
                          transition={{ duration: 0.2, ease: "linear" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-display font-bold text-slate-700 dark:text-white">
                          {progress}%
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#F0F9FF] dark:bg-white/5 px-8 py-4 rounded-2xl shadow-sm min-w-[300px] text-center">
                      <p className="text-[#0284C7] dark:text-slate-200 font-medium text-lg">
                        {statusMessage}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Ticket Section */}
                    <div 
                      className="relative py-14 px-8 bg-[#E0F7FF] dark:bg-midnight rounded-[2.5rem] border-2 border-dashed border-[#B3E5FC] dark:border-white/10 text-center overflow-hidden"
                      style={{
                        backgroundImage: 'radial-gradient(#B3E5FC 1.5px, transparent 1.5px)',
                        backgroundSize: '14px 14px'
                      }}
                    >
                      {/* Cutouts */}
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-midnight rounded-full border-r-2 border-[#B3E5FC] dark:border-white/10" />
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-midnight rounded-full border-l-2 border-[#B3E5FC] dark:border-white/10" />
                      
                      <span className="text-[#00C2FF] font-display font-bold text-3xl sm:text-5xl block mb-2 sm:mb-4">{coupon.type}</span>
                      <p className="text-[#00C2FF] font-bold text-base sm:text-xl leading-relaxed">
                        {coupon.description}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 text-[#00C2FF] mb-1">
                          <Star className="w-8 h-8" />
                          <span className="text-3xl font-bold text-slate-800 dark:text-white">5.0</span>
                        </div>
                        <span className="text-sm text-slate-400 dark:text-white font-medium">1778 Ratings</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 text-[#00C2FF] mb-1">
                          <Users className="w-8 h-8" />
                          <span className="text-3xl font-bold text-slate-800 dark:text-white">51</span>
                        </div>
                        <span className="text-sm text-slate-400 dark:text-white font-medium">Used today</span>
                      </div>
                    </div>

                    <div className="h-0" />

                    {/* Details Section */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white">Details</h3>
                      <p className="text-slate-400 dark:text-white leading-relaxed text-lg font-medium">
                        {coupon.details}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Action */}
              <div className="p-8 pt-0 shrink-0 bg-white dark:bg-midnight">
                {!isLoading && (
                  <div className="w-full">
                    {isRevealed ? (
                      <div className="relative h-auto py-4 bg-slate-50 dark:bg-midnight rounded-2xl flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-[#00C2FF]/30 px-4 gap-3">
                        <span className="text-2xl font-mono font-bold tracking-wider blur-[5px] text-slate-300 select-none">
                          KCD2-FREE-2026
                        </span>
                        <motion.button 
                          animate={{ x: [-1, 1, -1] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCopy}
                          className="w-full bg-[#00C2FF] hover:bg-[#00B4EB] text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 text-lg"
                        >
                          <Ticket className="w-5 h-5" />
                          Get Full Code
                        </motion.button>
                      </div>
                    ) : (
                      <div className="relative h-16 bg-slate-50 dark:bg-midnight rounded-2xl border-2 border-dashed border-[#00C2FF]/30 flex items-center overflow-hidden group">
                        <motion.button 
                          animate={{ x: [-1, 1, -1] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          whileHover={{ width: '72%' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleShowCode}
                          className="absolute inset-y-0 left-0 w-[68%] bg-[#00C2FF] hover:bg-[#00B4EB] text-white font-bold text-lg rounded-r-2xl shadow-xl z-10 transition-all duration-500 flex items-center justify-center"
                        >
                          Show Full Code
                        </motion.button>
                        <div className="flex-1 flex items-center justify-end pr-10 h-full">
                          <span className="text-2xl font-mono font-bold text-slate-700 dark:text-white tracking-wider">
                            ••2026
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
