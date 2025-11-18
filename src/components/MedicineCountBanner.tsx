import { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { appDataService } from './app-data-service';
import { toast } from 'sonner@2.0.3';

export function MedicineCountBanner() {
  const [show, setShow] = useState(false);
  const [medicineCount, setMedicineCount] = useState(0);

  useEffect(() => {
    const count = appDataService.getMedicineCount();
    setMedicineCount(count);
    
    // Show banner if medicine count seems wrong (should be ~200)
    if (count < 180) {
      setShow(true);
    }
  }, []);

  const handleRefresh = () => {
    appDataService.clearMedicineCache();
    appDataService.initializeData();
    const newCount = appDataService.getMedicineCount();
    setMedicineCount(newCount);
    toast.success('Medicine database refreshed!', {
      description: `${newCount} medicines loaded successfully`,
    });
    setShow(false);
    
    // Force page reload to ensure fresh data
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[360px]"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg shadow-2xl border-2 border-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-bold text-sm mb-1">
                  ⚠️ Limited Medicine Database
                </p>
                <p className="text-xs opacity-90 mb-2">
                  Only {medicineCount} medicines loaded. Click refresh to load 200 medicines with images.
                </p>
                <button
                  onClick={handleRefresh}
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-gray-100 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Now
                </button>
              </div>
              <button
                onClick={() => setShow(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
