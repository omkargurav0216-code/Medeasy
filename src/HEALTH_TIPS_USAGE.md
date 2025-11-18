# How to Use Health Tips & Wellness

## 📱 Quick Guide

### Step 1: Opening Health Tips
```
Dashboard View:
┌─────────────────────────────┐
│  🔔 MedEasy Dashboard       │
│                             │
│  [Service Buttons Area]     │
│                             │
│  [Quote Card]               │
│                             │
│  ┏━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ [💊] [🏠] [👤]      ┃  │ ← Tap the left button (💊)
│  ┃ Tips  Home Account  ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────┘
```

### Step 2: Sheet Opens
```
Sheet View (70% of screen):
┌─────────────────────────────┐
│ ❤️ Health Tips & Wellness [X]│ ← Close button visible
│ Tap outside or X to close   │
├─────────────────────────────┤
│                             │
│ ┌──────────┐  ┌──────────┐ │
│ │ ❤️ Cardio │  │ 🧠 Brain  │ │
│ │  Health  │  │  Health  │ │
│ └──────────┘  └──────────┘ │
│                             │
│ ┌──────────┐  ┌──────────┐ │
│ │ 🏃 Pain   │  │ 💨 Resp.  │ │
│ │  Relief  │  │  Health  │ │
│ └──────────┘  └──────────┘ │
│                             │
│ ┌──────────┐  ┌──────────┐ │
│ │ 🤕 Head.  │  │ 💊 Gen.   │ │
│ │  Migr.   │  │  Well.   │ │
│ └──────────┘  └──────────┘ │
│                             │
│ ⚠️ Disclaimer: For general  │
│ wellness only...            │
└─────────────────────────────┘
█████████████████████████████████ ← Dark overlay
                                    (clickable to close)
```

### Step 3: Close Sheet
**Method 1: Tap X Button**
```
┌─────────────────────────────┐
│ ❤️ Health Tips & Wellness [X]│ ← Click here
│ Tap outside or X to close   │    ✓ Sheet closes
└─────────────────────────────┘
```

**Method 2: Tap Outside**
```
┌─────────────────────────────┐
│ ❤️ Health Tips & Wellness [X]│
│ Tap outside or X to close   │
│                             │
│      [Categories]           │
│                             │
└─────────────────────────────┘
█████████████████████████████████ ← Click anywhere here
                                    ✓ Sheet closes
```

**Method 3: Swipe Down (Mobile)**
```
         👇 Swipe down
┌─────────────────────────────┐
│ ❤️ Health Tips & Wellness [X]│
│ Tap outside or X to close   │
│                             │
│      [Categories]           │
│                             │
└─────────────────────────────┘
         ✓ Sheet closes
```

### Step 4: Access Bottom Buttons
```
After closing, dashboard is visible:
┌─────────────────────────────┐
│  🔔 MedEasy Dashboard       │
│                             │
│  [Service Buttons Area]     │
│                             │
│  [Quote Card]               │
│                             │
│  ┏━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ [💊] [🏠] [👤]      ┃  │ ← All buttons clickable!
│  ┃ Tips  Home Account  ┃  │    ✓ You can click any
│  ┗━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────┘
```

## ❓ FAQ

### Q: Why can't I click the bottom buttons when Health Tips is open?
**A:** This is normal! When Health Tips is open, it creates a focus mode. You need to close it first to access other features.

**Think of it like this:**
- 📖 Opening a book → You focus on the book
- 🚫 Can't interact with things behind the book
- ✅ Close the book → Everything else is accessible again

### Q: How do I close the Health Tips sheet?
**A:** You have 3 easy ways:
1. ✅ **Tap the X button** (top-right, gray circle)
2. ✅ **Tap outside** the white sheet (on the dark area)
3. ✅ **Swipe down** on the sheet (mobile devices)

### Q: I don't see the X button!
**A:** The X button should always be visible now:
- 🎯 Located at **top-right corner**
- ⚫ Has a **gray circular background**
- 📏 **Larger on mobile** (20px) for easier tapping
- 🔝 **Always on top** (z-index: 100)

If you still don't see it:
1. Scroll to the top of the sheet
2. Look for gray circle in top-right
3. Or just tap outside the sheet

### Q: The sheet takes up my whole screen!
**A:** The sheet is designed to use 70% of your screen:
- ✅ **Intentional** - Focuses your attention on health tips
- ✅ **Not full screen** - You can still see dark area around it
- ✅ **Tap the dark area** to close

### Q: Can I use the app while Health Tips is open?
**A:** No, and here's why:
- 🎯 **Focus Mode** - Health Tips requires your full attention
- 🚫 **Prevents accidents** - Won't accidentally click wrong buttons
- ✅ **Standard behavior** - All modals/sheets work this way

**To use other features:**
1. Close the Health Tips sheet
2. Then access any feature you want

## 🎨 Visual States

### State 1: Normal Dashboard
```
Status: ✅ Bottom buttons clickable
Action: Tap any bottom button

┌─────────────────────────────┐
│      Normal Dashboard       │
│                             │
│  Everything is clickable!   │
│                             │
│  ┏━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ [💊] [🏠] [👤]      ┃  │ ✅ CLICKABLE
│  ┗━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────┘
```

### State 2: Health Tips Open
```
Status: ⚠️ Bottom buttons NOT clickable
Action: Close sheet first

┌─────────────────────────────┐
│ ❤️ Health Tips Sheet    [X] │ ✅ X button clickable
│ Tap outside or X to close   │
│                             │
│    [Health Categories]      │
│                             │
└─────────────────────────────┘
█████████████████████████████████ ✅ Overlay clickable
│  ┏━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ [💊] [🏠] [👤]      ┃  │ ❌ NOT CLICKABLE
│  ┗━━━━━━━━━━━━━━━━━━━━━┛  │    (sheet is open)
└─────────────────────────────┘
```

### State 3: Closing Animation
```
Status: ⏳ Waiting for close
Action: Sheet sliding down

┌─────────────────────────────┐
│ ❤️ Health Tips Sheet        │
│                         ↓↓↓ │ Sliding down...
└─────────────────────────────┘
                           ↓↓↓
│  ┏━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ [💊] [🏠] [👤]      ┃  │ ⏳ Wait...
│  ┗━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────┘
```

### State 4: Sheet Closed
```
Status: ✅ Bottom buttons clickable
Action: Tap any bottom button

┌─────────────────────────────┐
│      Dashboard Restored     │
│                             │
│  ✅ All features accessible │
│                             │
│  ┏━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ [💊] [🏠] [👤]      ┃  │ ✅ CLICKABLE AGAIN!
│  ┗━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────┘
```

## 🔄 Complete User Journey

```
1. Start
   ↓
   Dashboard (All buttons work)
   ↓
2. Tap "Health Tips" button
   ↓
   Sheet opens (Focus mode)
   ↓
3. Read health tips
   ↓
   Browse categories
   ↓
4. Done reading
   ↓
5. Close sheet (X, outside, or swipe)
   ↓
   Sheet closes (Animation)
   ↓
6. End
   ↓
   Dashboard (All buttons work again!)
```

## 💡 Pro Tips

### Tip 1: Quick Close
The **fastest way** to close:
- 👆 Single tap on dark area outside sheet
- ⚡ Immediately accessible

### Tip 2: Visual Cue
When sheet is open, you'll see:
- 🔲 White sheet (foreground)
- ⬛ Dark overlay (background)
- ✅ Tap the dark part to close

### Tip 3: X Button Always Visible
The X button:
- 🎯 Always in top-right corner
- ⚪ Has gray background
- 📱 Larger on mobile (easy to tap)

### Tip 4: Multiple Ways to Close
Remember, you have **3 options**:
1. X button (precise)
2. Tap outside (quick)
3. Swipe down (intuitive on mobile)

### Tip 5: Know the State
Visual indicators:
- **Dark overlay** = Sheet is open
- **Normal dashboard** = Everything clickable
- **Gray X button** = Close option always available

## ✅ Summary

**Expected Behavior:**
1. ✅ Health Tips button opens the sheet
2. ✅ Sheet covers 70% of screen
3. ✅ Bottom buttons are NOT clickable (while sheet is open)
4. ✅ Close sheet using X, outside tap, or swipe
5. ✅ After closing, all buttons work again

**This is correct behavior! Not a bug!**

**Bottom Line:**
- Sheet open → Focus on health tips
- Sheet closed → Use any feature

It's that simple! 🎉

---

*Need help? See USER_GUIDE.md for detailed instructions*
