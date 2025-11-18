import { useState, useEffect } from 'react';
import IPhone16Pro1 from "./imports/IPhone16Pro1";
import IPhone16Pro2 from "./imports/IPhone16Pro2";
import IPhone16Pro4 from "./imports/IPhone16Pro4";
import IPhone16Pro6 from "./imports/IPhone16Pro6";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { CartPage } from "./components/CartPage";
import { HistoryPage } from "./components/HistoryPage";
import { MedicineDetailPage } from "./components/MedicineDetailPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { OrderSuccessPage } from "./components/OrderSuccessPage";
import { AccountPage } from "./components/AccountPage";
import { MedicineCountBanner } from "./components/MedicineCountBanner";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { MobileViewportFix } from "./components/MobileViewportFix";
import { registerServiceWorker } from "./components/register-service-worker";
import { ArrowLeft } from "lucide-react";
import { appDataService } from "./components/app-data-service";
import { MedicineWithImage } from "./components/large-medicine-database";

type Page = 'start' | 'login' | 'dashboard' | 'medicines' | 'medicine-detail' | 'cart' | 'checkout' | 'order-success' | 'history' | 'account';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('start');
  const { isAuthenticated } = useAuth();
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineWithImage | null>(null);

  useEffect(() => {
    // Register Service Worker for PWA
    registerServiceWorker();
    
    // Version check - force refresh if version changed
    const APP_VERSION = '2.2.0'; // Mobile stability enhancements
    const storedVersion = localStorage.getItem('app_version');
    
    if (storedVersion !== APP_VERSION) {
      // Clear medicine cache on version upgrade
      appDataService.clearMedicineCache();
      localStorage.setItem('app_version', APP_VERSION);
      console.log('App upgraded - medicine cache cleared');
    }
    
    // Initialize app data
    appDataService.initializeData();
    
    // Log medicine count for debugging
    console.log('Total medicines available:', appDataService.getMedicineCount());
  }, []);

  const handleCartUpdate = () => {
    setCartUpdateTrigger(prev => prev + 1);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleMedicineSelect = (medicine: MedicineWithImage) => {
    setSelectedMedicine(medicine);
    setCurrentPage('medicine-detail');
  };

  const handleBuyNow = (medicine: MedicineWithImage) => {
    setCurrentPage('checkout');
  };

  const handleCheckout = () => {
    const cart = appDataService.getCart();
    if (cart.length === 0) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('checkout');
    }
  };

  const handlePlaceOrder = () => {
    setCurrentPage('order-success');
  };

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated && !['dashboard', 'medicines', 'medicine-detail', 'cart', 'checkout', 'order-success', 'history', 'account'].includes(currentPage)) {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated, currentPage]);

  // If authenticated, show the main app pages
  if (isAuthenticated) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Medicine Count Banner - hidden on mobile */}
        <div className="hidden md:block">
          <MedicineCountBanner />
        </div>
        
        <div className="relative w-full h-full md:w-[390px] md:h-[844px] md:shadow-2xl md:rounded-[20px] overflow-hidden">
          {currentPage === 'dashboard' && (
            <IPhone16Pro4 onNavigate={handleNavigate} key={cartUpdateTrigger} />
          )}
          
          {currentPage === 'medicines' && (
            <IPhone16Pro6 
              onBack={() => setCurrentPage('dashboard')}
              onNavigate={handleNavigate}
              onCartUpdate={handleCartUpdate}
              onMedicineSelect={handleMedicineSelect}
            />
          )}
          
          {currentPage === 'medicine-detail' && selectedMedicine && (
            <MedicineDetailPage
              medicine={selectedMedicine}
              onBack={() => setCurrentPage('medicines')}
              onBuyNow={handleBuyNow}
            />
          )}
          
          {currentPage === 'cart' && (
            <div className="bg-white rounded-[20px] size-full overflow-hidden">
              <CartPage 
                onBack={() => setCurrentPage('dashboard')} 
                onCheckout={handleCheckout}
                onOrderSuccess={() => setCurrentPage('order-success')}
              />
            </div>
          )}
          
          {currentPage === 'checkout' && (
            <CheckoutPage
              items={appDataService.getCart()}
              onBack={() => setCurrentPage('cart')}
              onPlaceOrder={handlePlaceOrder}
              onNavigate={handleNavigate}
            />
          )}
          
          {currentPage === 'order-success' && (
            <OrderSuccessPage onNavigate={handleNavigate} />
          )}
          
          {currentPage === 'history' && (
            <div className="bg-white rounded-[20px] size-full overflow-hidden">
              <HistoryPage onBack={() => setCurrentPage('dashboard')} />
            </div>
          )}
          
          {currentPage === 'account' && (
            <AccountPage 
              onBack={() => setCurrentPage('dashboard')}
              onNavigate={handleNavigate}
            />
          )}
        </div>
        <Toaster />
      </div>
    );
  }

  // Authentication flow
  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="relative w-full h-full md:w-[390px] md:h-[844px] md:shadow-2xl md:rounded-[20px] overflow-hidden">
        {currentPage === 'login' && (
          <button
            onClick={() => setCurrentPage('start')}
            className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            title="Back to start"
          >
            <ArrowLeft size={24} className="text-[#05045c]" />
          </button>
        )}
        
        {currentPage === 'start' ? (
          <IPhone16Pro1 onStart={() => setCurrentPage('login')} />
        ) : (
          <IPhone16Pro2 />
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MobileViewportFix />
      <AppContent />
      <PWAInstallPrompt />
    </AuthProvider>
  );
}
