# Error Checking & Debugging Guide

## ✅ Pre-Deployment Checklist

### 1. Build & Compile Errors
```bash
# Check for TypeScript errors
npm run build

# Expected: Build should complete without errors
# If errors appear, fix them before deploying
```

### 2. Console Errors
Open browser DevTools (F12) and check for:

#### Expected Console Messages (These are OK)
✅ `App upgraded - medicine cache cleared`
✅ `Total medicines available: 200`
✅ `Service Worker registered`
✅ `PWA ready for offline use`

#### Errors to Watch For (Fix These)
❌ `Failed to fetch`
❌ `Cannot read property of undefined`
❌ `Module not found`
❌ `Unexpected token`
❌ `Maximum update depth exceeded`

### 3. Component-Specific Checks

#### Health Tips Sheet
```javascript
// Open DevTools Console
// Navigate to Dashboard
// Click "Health Tips" button
// Expected: No errors
// Sheet should open smoothly
```

**Common Issues:**
- ❌ `Sheet is not defined` → Check imports
- ❌ `Cannot read property 'id'` → Check category data
- ✅ Should open without errors

#### Medicine Search
```javascript
// Navigate to Medicines page
// Type in search box
// Expected: Results appear, no errors
```

**Common Issues:**
- ❌ `TypeError: Cannot read property 'filter'` → Check medicine database
- ❌ `Image failed to load` → Check image URLs
- ✅ Search should work smoothly

#### Cart & Checkout
```javascript
// Add items to cart
// Navigate to cart
// Proceed to checkout
// Expected: All steps work without errors
```

**Common Issues:**
- ❌ `localStorage is not defined` → Browser storage issue
- ❌ `Cannot calculate total` → Check price calculations
- ✅ Checkout flow should complete

### 4. Mobile-Specific Checks

#### Open on Real Mobile Device
```
1. Open app on mobile browser
2. Open DevTools remotely (if possible)
3. Check for mobile-specific errors:
   - Touch event errors
   - Viewport warnings
   - Orientation change errors
```

#### Common Mobile Errors
- ❌ `ResizeObserver loop limit exceeded` (Can usually ignore)
- ❌ `Prevented zoom on input focus` (Expected behavior)
- ❌ `Service worker registration failed` (Need HTTPS)

### 5. Network Errors

#### Check Network Tab
```
1. Open DevTools → Network tab
2. Reload the page
3. Check for:
   ✅ All resources load (green status)
   ❌ 404 errors (missing files)
   ❌ 500 errors (server issues)
   ❌ Failed requests (CORS issues)
```

**Expected Requests:**
- ✅ `index.html` (200)
- ✅ `main.js` or `bundle.js` (200)
- ✅ `styles.css` (200)
- ✅ Figma assets (200)
- ✅ `manifest.json` (200)
- ✅ `service-worker.js` (200)

### 6. Storage Errors

#### LocalStorage Check
```javascript
// In Console, run:
localStorage.getItem('auth_user')
localStorage.getItem('app_version')
localStorage.getItem('medicine_cache')

// Expected: Should return data or null
// Should NOT throw errors
```

**Common Issues:**
- ❌ `QuotaExceededError` → Storage full (clear old data)
- ❌ `SecurityError` → Private browsing mode
- ✅ Data should persist between sessions

### 7. PWA-Specific Checks

#### Service Worker
```javascript
// In Console, run:
navigator.serviceWorker.getRegistration()

// Expected: Returns registration object
// Should NOT return undefined
```

#### Manifest
```javascript
// In Console, run:
fetch('/manifest.json').then(r => r.json()).then(console.log)

// Expected: Shows manifest data
// Check for valid JSON
```

#### Installation
```
1. Open app in mobile browser
2. Look for install prompt
3. Try installing
4. Expected: Installs without errors
```

## 🐛 Common Errors & Solutions

### Error: "Sheet is not a function"
**Cause:** Import error in HealthTipsSheet.tsx
**Solution:** 
```typescript
// Check this line:
import { Sheet, SheetContent, ... } from './ui/sheet';
```

### Error: "Cannot read property 'map' of undefined"
**Cause:** Data not loaded before rendering
**Solution:**
```typescript
// Add conditional rendering:
{categories?.map(...) || []}
```

### Error: "Maximum update depth exceeded"
**Cause:** Infinite re-render loop
**Solution:**
```typescript
// Check useEffect dependencies
useEffect(() => {
  // ...
}, [dependency]); // Make sure dependencies are correct
```

### Error: "Failed to fetch medicine data"
**Cause:** Database initialization issue
**Solution:**
```typescript
// Check app-data-service.ts
appDataService.initializeData();
```

### Error: "LocalStorage quota exceeded"
**Cause:** Too much data stored
**Solution:**
```javascript
// Clear old data:
appDataService.clearMedicineCache();
localStorage.clear();
```

### Error: "Service Worker registration failed"
**Cause:** Not using HTTPS or localhost
**Solution:**
- Use `localhost` for development
- Use HTTPS for production
- Or disable PWA features temporarily

### Warning: "ResizeObserver loop limit exceeded"
**Cause:** Rapid resize events (common, harmless)
**Solution:** 
- Can be ignored safely
- Or add debouncing to resize handlers

## 🔍 Debugging Tools

### Chrome DevTools
```
F12 → Console: See errors and logs
F12 → Network: Check resource loading
F12 → Application: Check storage, PWA, service workers
F12 → Elements: Inspect DOM and styles
F12 → Sources: Debug JavaScript
```

### Mobile Remote Debugging

#### Android Chrome
```
1. Connect phone via USB
2. Enable USB debugging on phone
3. Open chrome://inspect on desktop
4. Select your device
5. Click "Inspect" on your app
```

#### iOS Safari
```
1. Connect iPhone via USB
2. Enable Web Inspector on iPhone (Settings → Safari → Advanced)
3. Open Safari on Mac
4. Develop → [Your iPhone] → [Your Page]
```

## 📊 Performance Monitoring

### Lighthouse Audit
```
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Mobile" and all categories
4. Click "Analyze page load"
5. Review report
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+
- PWA: 100

### Bundle Size Check
```bash
npm run build

# Check output:
# dist/index.html - Should be < 5KB
# dist/assets/*.js - Main bundle should be < 500KB
# dist/assets/*.css - Should be < 100KB
```

## ✅ Final Verification

Before deploying, verify:

- [ ] `npm run build` succeeds
- [ ] No console errors on load
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Health Tips opens and closes
- [ ] Bottom navigation works
- [ ] Mobile responsive works
- [ ] PWA installs correctly
- [ ] Offline mode works
- [ ] LocalStorage works
- [ ] Service Worker registers
- [ ] No 404 errors in Network tab
- [ ] Lighthouse score > 90

## 📝 Testing Checklist

### Functionality Tests
```
✅ User can sign up
✅ User can login
✅ User can search medicines
✅ User can add to cart
✅ User can checkout
✅ User can view order history
✅ User can search hospitals
✅ User can call hospitals
✅ User can view health tips
✅ User can close health tips
✅ Bottom navigation works
✅ Notifications work
✅ Logout works
```

### UI/UX Tests
```
✅ All buttons clickable
✅ All forms validate
✅ All modals close
✅ All images load
✅ All text readable
✅ No overflow issues
✅ Responsive on mobile
✅ Touch targets large enough
✅ Loading states show
✅ Error messages clear
```

### Browser Tests
```
✅ Chrome Desktop
✅ Firefox Desktop  
✅ Safari Desktop
✅ Chrome Mobile
✅ Safari iOS
✅ Firefox Mobile
✅ Samsung Internet
✅ Edge Mobile
```

## 🎉 Success Criteria

Your app is ready when:

1. ✅ Build completes without errors
2. ✅ No console errors in production
3. ✅ All features work as expected
4. ✅ Mobile responsive perfect
5. ✅ PWA installs successfully
6. ✅ Works offline
7. ✅ Lighthouse score > 90
8. ✅ All tests pass

---

*Last Updated: 2024-11-17*
*Version: 2.1.0*
