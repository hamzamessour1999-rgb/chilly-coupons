import { Facebook, Twitter, Instagram, ShieldCheck, Zap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-midnight pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center shrink-0 group cursor-pointer">
              <img 
                src="https://i.postimg.cc/s2WdYzcx/Chat-GPT-Image-22-fevr-2026-06-32-01.png" 
                alt="Chilly Coupons" 
                className="h-28 w-auto group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-slate-500 dark:text-white text-base leading-relaxed font-medium">
              The world's most trusted platform for verified gaming codes and premium savings. Join thousands of gamers saving daily.
            </p>
            <div className="flex items-center gap-5">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-brand hover:border-brand hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-display font-black mb-8 dark:text-white tracking-tight uppercase text-xs tracking-[0.2em] text-slate-400">Popular Categories</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'Steal a Brainrot Roblox', count: 5, img: 'https://picsum.photos/seed/cat1/100/100' },
                { name: 'Bee Swarm Simulator', count: 3, img: 'https://picsum.photos/seed/cat2/100/100' },
                { name: 'The Forge Roblox Codes', count: 6, img: 'https://picsum.photos/seed/cat3/100/100' },
                { name: 'Pet Simulator 99', count: 8, img: 'https://picsum.photos/seed/cat4/100/100' },
              ].map((cat, i) => (
                <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-white/2 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer group border border-transparent dark:border-white/5">
                  <div className="relative shrink-0">
                    <img src={cat.img} alt={cat.name} className="w-14 h-14 rounded-xl object-cover shadow-lg" />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
                  </div>
                  <div>
                    <div className="text-sm font-black group-hover:text-brand transition-colors dark:text-white">{cat.name}</div>
                    <div className="text-xs text-slate-500 dark:text-white font-bold mt-1">{cat.count} coupons available</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h4 className="text-xl font-display font-black mb-8 dark:text-white tracking-tight uppercase text-xs tracking-[0.2em] text-slate-400">Why Chilly?</h4>
            <div className="space-y-8">
              {[
                { icon: Zap, title: 'Daily Updates', desc: 'Verified and updated daily' },
                { icon: ShieldCheck, title: 'Verified Codes', desc: '100% hand-tested' },
                { icon: Heart, title: 'Free to Use', desc: 'No registration required' },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-black dark:text-white">{item.title}</div>
                    <p className="text-xs text-slate-500 dark:text-white mt-1 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-400 dark:text-white font-medium">
            © {new Date().getFullYear()} CHILLY COUPONS. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm font-bold text-slate-400 dark:text-white">
            <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
