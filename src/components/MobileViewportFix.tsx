import { useEffect } from 'react';

/**
 * MobileViewportFix Component
 * 
 * Handles critical mobile viewport issues:
 * - Sets proper CSS custom properties for dynamic viewport height
 * - Prevents address bar from breaking layouts
 * - Handles orientation changes
 * - Fixes iOS Safari viewport issues
 */
export function MobileViewportFix() {
  useEffect(() => {
    // Set CSS custom property for real viewport height
    const setVH = () => {
      // Get the actual viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Also set dynamic viewport height
      document.documentElement.style.setProperty('--dvh', `${window.innerHeight}px`);
    };

    // Set on mount
    setVH();

    // Update on resize and orientation change
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  useEffect(() => {
    // Prevent pull-to-refresh on mobile browsers
    const preventPullToRefresh = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollableParent = target.closest('[data-radix-scroll-area-viewport]') 
        || target.closest('.overflow-auto')
        || target.closest('.overflow-y-auto');
      
      // Only prevent if not in a scrollable area and at top of page
      if (!scrollableParent && window.scrollY === 0) {
        if (e.touches.length === 1 && e.touches[0].clientY > 0) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);

  useEffect(() => {
    // Fix for iOS Safari bottom bar
    const fixIOSViewport = () => {
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        const appHeight = () => {
          document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
        };
        
        appHeight();
        window.addEventListener('resize', appHeight);
        
        return () => window.removeEventListener('resize', appHeight);
      }
    };

    const cleanup = fixIOSViewport();
    return cleanup;
  }, []);

  useEffect(() => {
    // Prevent zoom on double tap for app-like feel
    let lastTouchEnd = 0;
    
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });

    return () => {
      document.removeEventListener('touchend', preventDoubleTapZoom);
    };
  }, []);

  useEffect(() => {
    // Handle safe area insets for notched devices
    const updateSafeAreaInsets = () => {
      const root = document.documentElement;
      
      // Get safe area insets
      const safeAreaInsetTop = getComputedStyle(root).getPropertyValue('env(safe-area-inset-top)') || '0px';
      const safeAreaInsetBottom = getComputedStyle(root).getPropertyValue('env(safe-area-inset-bottom)') || '0px';
      
      root.style.setProperty('--safe-area-inset-top', safeAreaInsetTop);
      root.style.setProperty('--safe-area-inset-bottom', safeAreaInsetBottom);
    };

    updateSafeAreaInsets();
    window.addEventListener('resize', updateSafeAreaInsets);

    return () => {
      window.removeEventListener('resize', updateSafeAreaInsets);
    };
  }, []);

  return null;
}
