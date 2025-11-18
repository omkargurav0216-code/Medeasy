import { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');
    
    setIsStandalone(isInStandaloneMode);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if user has already dismissed the prompt
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed) {
      return;
    }

    // Listen for the beforeinstallprompt event (Android/Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after 3 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS, show instruction prompt after 3 seconds
    if (iOS && !isInStandaloneMode) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#05045c] overflow-hidden">
            <div className="bg-gradient-to-r from-[#7c86e4] to-[#05045c] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Smartphone className="w-6 h-6 text-[#05045c]" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Install MedEasy</h3>
                    <p className="text-sm opacity-90">Get the app experience</p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {isIOS ? (
                // iOS Instructions
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    To install MedEasy on your iPhone:
                  </p>
                  <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                    <li>Tap the <span className="font-bold">Share</span> button <span className="inline-block">⬆️</span></li>
                    <li>Scroll down and tap <span className="font-bold">"Add to Home Screen"</span></li>
                    <li>Tap <span className="font-bold">"Add"</span> in the top right</li>
                  </ol>
                  <Button
                    onClick={handleDismiss}
                    className="w-full bg-[#05045c] hover:bg-[#07076e] text-white"
                  >
                    Got it!
                  </Button>
                </div>
              ) : (
                // Android/Chrome Install
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Install MedEasy for quick access and offline use!
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> Works offline
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> Faster loading
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> App-like experience
                    </li>
                  </ul>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleInstallClick}
                      className="flex-1 bg-[#05045c] hover:bg-[#07076e] text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Install Now
                    </Button>
                    <Button
                      onClick={handleDismiss}
                      variant="outline"
                      className="px-4"
                    >
                      Later
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
