# WaitPlay - Google Play Console Setup Guide

## 📱 App Details (Copy-Paste)

### Step 1: Create New App Form
**App name:** `WaitPlay`  
**Default language:** `English (United States)`  
**App or game:** `Game`  
**Free or paid:** `Free`  

### Step 2: Store Listing
**Short description (80 chars max):**
```
Instant micro-games for waiting moments. Kill time, not your battery.
```

**Full description (4000 chars max):**
```
WaitPlay offers quick, addictive mini-games perfect for waiting rooms, queues, or short breaks. 

🎮 Four instant games:
• Tap Sprint - Speed tapping challenge (30s/60s timed goals)
• Whack-a-Dot - Reaction speed test
• Memory Match - Pattern recall game  
• Reaction Test - Visual response challenge

✨ Features:
• No ads, no signup required
• Works offline (Progressive Web App)
• Instant launch - tap and play
• Minimal battery usage
• Perfect for short breaks

🏆 Designed for: Waiting rooms, bus stops, queues, coffee breaks, or whenever you have a few minutes to spare.

"Kill time, not your battery" - Simple, addictive fun that doesn't drain your phone.
```

**App category:** `Games` → `Casual`

### Step 3: Contact Details
**Email:** (Your developer email - stevi10623@gmail.com or stevigbot2.0@gmail.com)  
**Phone:** (Optional)  
**Website:** `https://waitplay-app.vercel.app`

### Step 4: Privacy Policy
**Privacy policy URL:** `https://waitplay-app.vercel.app/privacy`  
**Data safety section:** (We'll fill this after app creation - mark as "No data collected")

## 📦 APK Upload
**File location:** `/home/node/.openclaw/workspace/waitplay-mvp/twa/app/build/outputs/apk/release/app-release.apk`  
**Package name:** `com.waitplay.app`  
**Version:** `1.0.0` (code: 1)

## 🧪 Internal Testing Setup

### Test Track Setup
1. Go to **Release** → **Internal testing**
2. Click **Create new release**
3. Upload APK file
4. **Release name:** `v1.0.0 - Initial release`
5. **Release notes:** `Initial release with 4 mini-games: Tap Sprint, Whack-a-Dot, Memory Match, Reaction Test.`

### Tester Management
**Option A: Reuse Silence Timer testers**
- Go to **Testers** tab
- Copy testers from Silence Timer app
- Or create new Google Group

**Option B: Add individual emails**
- Your email(s): stevi10623@gmail.com, stevigbot2.0@gmail.com
- Any friends/devs

**Option C: Open testing link**
- Generate join link after review
- Share on Reddit/Discord: `r/AndroidAppTest`, `r/TestMyApp`

## ⏱️ Review Timeline
1. **Submit for review** → ~1-3 hours for initial processing
2. **14-day testing period** starts when approved for Internal testing
3. **Production release** after 14 days (or earlier if you have 20+ testers)

## 🖼️ Store Assets Needed
**Create after app creation:**
1. **Feature graphic:** 1024×500 PNG (banner for store page)
2. **Phone screenshots:** 1080×1920 PNG (4+ screenshots of games)
3. **Hi-res icon:** 512×512 PNG

## 🔧 Technical Notes
- **TWA (Trusted Web Activity)** - APK wraps PWA at waitplay-app.vercel.app
- **Assetlinks.json** already configured for domain verification
- **Keystore:** waitplay-release.keystore (keep safe for updates)

## 📝 Next Steps After Creation
1. ✅ Create app with above details
2. ✅ Upload APK to Internal testing
3. ✅ Add testers (start with your emails)
4. ✅ Submit for review
5. 🎨 Create store graphics while waiting
6. 📊 Monitor testing feedback
7. 🚀 Release to production after 14 days

---
**Time estimate:** 15 minutes for form + upload  
**14-day clock starts:** When Internal testing is approved