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
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [userRating, setUserRating] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isRevealed && isOpen) {
      setTimeLeft(14 * 60 + 47); // Start at 14:47 just like the screenshot
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isRevealed, isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setProgress(0);
      setStatusMessage("Initializing...");
      setIsRevealed(false);
      setIsCopied(false);
      setUserRating(null);
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
              {/* Header with Background Image and Side Logo (Always Shown) */}
              <div className="relative h-52 shrink-0 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-[3px] scale-110"
                  style={{ backgroundImage: `url("${coupon.image}")` }}
                >
                  <div className="absolute inset-0 bg-black/65" />
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white shadow-lg transition-all border border-white/10 z-20 pointer-events-auto cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-full p-6 sm:p-8 flex flex-col justify-end z-10">
                  <h2 className="text-2xl sm:text-3.5xl font-display font-bold text-white mb-4 leading-tight flex items-center gap-2 text-left">
                    <span>{coupon.title}</span>
                    {coupon.studentBadgeIcon && (
                      <img src={coupon.studentBadgeIcon} alt="Badge" className="w-6 h-6 object-contain inline-block shrink-0" referrerPolicy="no-referrer" />
                    )}
                  </h2>
                  
                  <div className="flex gap-2 flex-wrap">
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

              {/* Scrollable Content (Adapts dynamically depending on state: isLoading vs isRevealed vs Normal Details) */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar bg-slate-50 dark:bg-midnight">
                {isLoading ? (
                  /* LOADING PROGRESS COMPONENT */
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
                          className="text-slate-200 dark:text-white/5"
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
                      <p className="text-[#0284C7] dark:text-slate-200 font-medium text-lg animate-pulse">
                        {statusMessage}
                      </p>
                    </div>
                  </div>
                ) : isRevealed ? (
                  /* REVEALED STEP: DESIGN MATCHING SCREENSHOT INSIDE MODAL */
                  <div className="space-y-6 sm:space-y-8 flex flex-col items-center justify-center text-center py-4">
                    {/* Header */}
                    <div className="space-y-2 sm:space-y-3 max-w-md mx-auto">
                      <h2 className="text-2xl sm:text-3.5xl font-display font-bold text-slate-800 dark:text-white tracking-tight leading-tight">
                        Your Coupon Code is Ready!
                      </h2>
                      <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed font-medium">
                        We are holding this coupon code for you. Unlock before time runs out.
                      </p>
                    </div>

                    {/* Timer Box */}
                    <div className="w-full max-w-sm rounded-2xl border border-[#00C2FF]/30 bg-[#00C2FF]/5 px-6 py-4 flex flex-col items-center justify-center shadow-lg shadow-[#00C2FF]/5">
                      <span className="text-[10px] sm:text-[11px] tracking-[0.15em] font-black text-[#00C2FF] uppercase">
                        TIME LEFT TO UNLOCK
                      </span>
                      <span className="text-4xl sm:text-5xl font-display font-black text-[#00C2FF] mt-1.5 tabular-nums">
                        {formatTime(timeLeft)}
                      </span>
                    </div>

                    {/* Code Card with Corner Brackets and Dashed Border */}
                    <div className="w-full max-w-sm rounded-[1.25rem] border border-dashed border-slate-300 dark:border-white/25 bg-slate-100/60 dark:bg-black/40 p-6 relative flex flex-col items-center justify-center overflow-hidden min-h-[140px] shadow-inner">
                      {/* Corner Decorative Brackets */}
                      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00C2FF]/60 rounded-tl" />
                      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00C2FF]/60 rounded-tr" />
                      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00C2FF]/60 rounded-bl" />
                      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00C2FF]/60 rounded-br" />

                      {/* Top Label & Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] tracking-[0.12em] font-black text-[#00C2FF]/80 uppercase">
                          COUPON CODE
                        </span>
                        <div className="flex items-center gap-1 bg-slate-200 dark:bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider border border-slate-300 dark:border-white/10">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                          </svg>
                          LOCKED
                        </div>
                      </div>

                      {/* Blurred Code */}
                      <div className="relative py-2 px-4 flex items-center justify-center w-full select-none">
                        <span className="text-2xl sm:text-3.5xl font-mono font-bold tracking-widest text-[#00C2FF]/35 blur-[7px]">
                          TF68Q-WRN53-PK
                        </span>
                        
                        {/* Decorative stars behind blur */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none gap-8 opacity-25">
                          <Star className="w-5 h-5 text-[#00C2FF] fill-[#00C2FF] animate-pulse" />
                          <Star className="w-5 h-5 text-[#00C2FF] fill-[#00C2FF] animate-pulse delay-75" />
                        </div>
                      </div>
                    </div>

                    {/* Get Full Code Button */}
                    <div className="w-full max-w-sm">
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 194, 255, 0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleCopy}
                        className="w-full bg-[#00C2FF] hover:bg-[#00B4EB] text-white font-black py-4 px-6 rounded-2xl shadow-xl transition-all text-lg flex items-center justify-center gap-2 pointer-events-auto cursor-pointer"
                      >
                        Get Full Code
                      </motion.button>
                    </div>

                    {/* Rate Section */}
                    <div className="flex flex-col items-center gap-3 pt-2">
                      <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                        Rate this coupon
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setUserRating('up')}
                          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer ${
                            userRating === 'up' 
                              ? 'bg-[#00C2FF]/10 dark:bg-[#00C2FF]/20 border-[#00C2FF] text-[#00C2FF] scale-110' 
                              : 'border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-white'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => setUserRating('down')}
                          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer ${
                            userRating === 'down' 
                              ? 'bg-[#00C2FF]/10 dark:bg-[#00C2FF]/20 border-[#00C2FF] text-[#00C2FF] scale-110' 
                              : 'border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-white'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10V19a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* NORMAL STEP CONTENT */
                  <>
                    {/* Ticket Section */}
                    <div 
                      className="relative py-14 px-8 bg-[#E0F7FF] dark:bg-black/30 rounded-[2.5rem] border-2 border-dashed border-[#B3E5FC] dark:border-white/10 text-center overflow-hidden"
                      style={{
                        backgroundImage: 'radial-gradient(#B3E5FC 1.5px, transparent 1.5px)',
                        backgroundSize: '14px 14px'
                      }}
                    >
                      {/* Cutouts */}
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-50 dark:bg-midnight rounded-full border-r-2 border-[#B3E5FC] dark:border-white/10" />
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-50 dark:bg-midnight rounded-full border-l-2 border-[#B3E5FC] dark:border-white/10" />
                      
                      <span className="text-[#00C2FF] font-display font-bold text-3xl sm:text-5xl block mb-2 sm:mb-4">{coupon.type}</span>
                      <p className="text-[#00C2FF] font-bold text-base sm:text-xl leading-relaxed">
                        {coupon.description}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 text-[#00C2FF] mb-1">
                          <Star className="w-8 h-8 animate-pulse-slow" />
                          <span className="text-3xl font-bold text-slate-800 dark:text-white">5.0</span>
                        </div>
                        <span className="text-sm text-slate-400 dark:text-slate-300 font-medium">1778 Ratings</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 text-[#00C2FF] mb-1">
                          <Users className="w-8 h-8 animate-pulse-slow" />
                          <span className="text-3xl font-bold text-slate-800 dark:text-white">51</span>
                        </div>
                        <span className="text-sm text-slate-400 dark:text-slate-300 font-medium">Used today</span>
                      </div>
                    </div>

                    <div className="h-0" />

                    {/* Details Section */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white">Details</h3>
                      <p className="text-slate-500 dark:text-slate-300 leading-relaxed text-lg font-medium">
                        {coupon.details}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Action (Only shown when not revealed and not loading) */}
              {!isRevealed && !isLoading && (
                <div className="p-6 sm:p-8 pt-0 shrink-0 bg-slate-50 dark:bg-midnight">
                  <div className="w-full">
                    <div className="relative h-16 bg-white dark:bg-black/30 rounded-2xl border-2 border-dashed border-[#00C2FF]/30 flex items-center overflow-hidden group">
                      <motion.button 
                        animate={{ x: [-1, 1, -1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        whileHover={{ width: '72%' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleShowCode}
                        className="absolute inset-y-0 left-0 w-[68%] bg-[#00C2FF] hover:bg-[#00B4EB] text-white font-bold text-lg rounded-r-2xl shadow-xl z-10 transition-all duration-500 flex items-center justify-center cursor-pointer pointer-events-auto"
                      >
                        Show Full Code
                      </motion.button>
                      <div className="flex-1 flex items-center justify-end pr-10 h-full">
                        <span className="text-2xl font-mono font-bold text-slate-400 dark:text-white/40 tracking-wider">
                          ••2026
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
