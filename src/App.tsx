import { useState } from 'react';
import Header from './components/Header';
import CouponCard from './components/CouponCard';
import Footer from './components/Footer';
import CouponModal from './components/CouponModal';
import { COUPONS, type Coupon } from './constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGetCode = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const filteredCoupons = COUPONS.filter(coupon => 
    coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coupon.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedCoupons = filteredCoupons.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight dark:text-white">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Codes'}
          </h1>
          {searchQuery && (
            <span className="text-slate-500 dark:text-white font-medium">
              {filteredCoupons.length} results found
            </span>
          )}
        </div>

        {/* Coupon Grid */}
        {displayedCoupons.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {displayedCoupons.map((coupon) => (
              <CouponCard 
                key={coupon.id} 
                coupon={coupon} 
                onGetCode={handleGetCode}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold dark:text-white mb-2">No codes found</h3>
            <p className="text-slate-500 dark:text-white">Try searching for something else or check back later.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-brand font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredCoupons.length && (
          <div className="flex items-center justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-white dark:bg-midnight border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-bold px-10 py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              Load More Codes
              <ChevronRight className="w-5 h-5 text-brand rotate-90" />
            </button>
          </div>
        )}
      </main>

      <Footer />

      <CouponModal 
        coupon={selectedCoupon}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
