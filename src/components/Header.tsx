import { Search, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-midnight/80 backdrop-blur-xl shadow-sm dark:shadow-2xl dark:shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center shrink-0 group cursor-pointer">
          <img 
            src="https://i.postimg.cc/s2WdYzcx/Chat-GPT-Image-22-fevr-2026-06-32-01.png" 
            alt="Chilly Coupons" 
            className="h-20 w-auto group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative group/search">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-sm group-focus-within/search:scale-110 transition-transform">👈</span>
          </div>
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-10 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-brand/50 transition-all outline-none dark:text-white dark:placeholder-white/70 hover:dark:bg-white/10"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 group-focus-within/search:text-brand transition-colors" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}
