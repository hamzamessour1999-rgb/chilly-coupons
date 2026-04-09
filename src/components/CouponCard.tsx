import { Star, Ticket, Clock, Users, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import type { Coupon } from '../constants';

interface CouponCardProps {
  coupon: Coupon;
  onGetCode: (coupon: Coupon) => void;
}

export default function CouponCard({ coupon, onGetCode }: CouponCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-white dark:bg-midnight rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group border border-transparent dark:border-white/10"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={coupon.image}
          alt={coupon.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 bg-white/90 dark:bg-midnight/80 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1 text-[10px] font-bold shadow-lg border border-white/10">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="dark:text-white">{coupon.rating.toFixed(1)}</span>
        </div>
        {coupon.isStudentOnly && (
          <div className="absolute top-2 right-2 bg-brand px-2 py-0.5 rounded-lg flex items-center gap-1 text-[10px] font-black text-white shadow-lg animate-pulse-slow">
            <GraduationCap className="w-3 h-3" />
            STUDENT
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base font-display font-bold leading-tight mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] dark:text-white group-hover:text-brand transition-colors">
          {coupon.title}
        </h3>

        <div className="mt-auto space-y-2 sm:space-y-3">
          <div className="relative py-3 px-2 sm:py-4 sm:px-3 bg-slate-50 dark:bg-midnight rounded-xl sm:rounded-2xl border border-dashed border-slate-200 dark:border-white/20 text-center group-hover:border-brand/30 transition-colors">
            {/* Ticket Cutouts */}
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-midnight rounded-full border-r border-slate-200 dark:border-white/20" />
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-midnight rounded-full border-l border-slate-200 dark:border-white/20" />
            
            <span className="text-brand font-black text-base sm:text-lg block mb-0.5 tracking-tight">{coupon.type}</span>
            <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-white font-medium leading-relaxed line-clamp-1">
              {coupon.description}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="bg-brand/10 dark:bg-white/10 text-brand dark:text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-black flex items-center gap-1.5 uppercase tracking-wider">
              <div className="w-1 h-1 rounded-full bg-brand dark:bg-white animate-pulse" />
              {coupon.couponsLeft} left
            </div>
          </div>

          <motion.button 
            animate={{ x: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.02, boxShadow: "0 15px 20px -5px rgb(0 194 255 / 0.2)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onGetCode(coupon)}
            className="w-full bg-brand hover:bg-brand-dark text-white font-black py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-brand/20 text-xs sm:text-sm"
          >
            <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Get Code
          </motion.button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-3 py-2 sm:px-4 sm:py-3 bg-slate-50/50 dark:bg-midnight flex items-center justify-between text-[8px] sm:text-[9px] font-black text-slate-400 dark:text-white uppercase tracking-[0.1em]">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          No expiration
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {coupon.usesToday} uses today
        </div>
      </div>
    </motion.div>
  );
}
