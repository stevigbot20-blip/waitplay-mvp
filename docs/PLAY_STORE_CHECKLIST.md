# Google Play Submission Checklist

## Pre-Submission (DONE ✅)
- [x] PWA manifest created
- [x] Service worker for offline
- [x] App icons generated (72-512px)
- [x] TWA Android project created
- [x] GitHub pushed
- [x] Vercel deployed

## Before Building APK

### 1. Generate Signing Key
```bash
keytool -genkey -v -keystore waitplay-release.keystore \
  -alias waitplay \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass YOUR_PASSWORD -keypass YOUR_PASSWORD
```
**⚠️ SAVE THIS FILE AND PASSWORDS SECURELY!**
- You cannot update the app without this keystore
- Store in multiple secure locations

### 2. Update assetlinks.json
After building APK, get SHA-256 fingerprint:
```bash
keytool -list -v -keystore waitplay-release.keystore -alias waitplay
```
Then update `public/.well-known/assetlinks.json` with your SHA-256 fingerprint.

### 3. Build Signed APK in Android Studio
1. Open `waitplay-mvp/twa` in Android Studio
2. Build → Generate Signed Bundle/APK
3. Select APK
4. Choose your keystore
5. Select "release" build variant
6. APK output: `twa/app/release/app-release.apk`

## Play Console Setup

### 1. Create App
- Go to https://play.google.com/console
- Create app → Enter details:
  - App name: **WaitPlay**
  - Default language: English
  - Free or paid: **Free**
  - Tags: Casual, Arcade

### 2. Dashboard Tasks
- [ ] Store listing
- [ ] Main store listing graphic (1024x500)
- [ ] Phone screenshots (min 2, 16:9 ratio)
- [ ] App icon (512x512) ✅ (use icons/icon-512.png)
- [ ] Privacy policy URL (already have privacy.html)
- [ ] Content rating questionnaire
- [ ] Target audience selection

### 3. Release Tracks
1. **Internal Testing** → Upload APK first
2. **Closed Testing** → Add testers after internal approved
3. **Open Testing** → Public link
4. **Production** → Full release

### 4. Store Listing Requirements

| Asset | Size | Notes |
|-------|------|-------|
| App icon | 512x512 | ✅ Done |
| Feature graphic | 1024x500 | Need to create |
| Phone screenshot 1 | 16:9 (1080x1920) | Need to create |
| Phone screenshot 2 | 16:9 | Need to create |
| 7" tablet screenshot | 16:9 | Optional |
| 10" tablet screenshot | 16:9 | Optional |

## Content Rating
- Category: **Casual games**
- No violence, no profanity, no gambling
- Should get **Everyone** rating

## Target Audience
- Age: **All ages**
- Primary: 18-35 (waiting room, commute demographic)

## Privacy Policy
- Already have: `privacy.html`
- Update URL in manifest if needed
- Play Console entry: `https://waitplay-mvp.vercel.app/privacy.html`

## Review Timeline
- Internal testing: Instant (no review)
- Closed/Open testing: 1-3 days
- Production: 1-7 days

## Quick Commands

```bash
# Build debug APK (unsigned)
cd twa && ./gradlew assembleDebug

# Build release APK (needs keystore)
cd twa && ./gradlew assembleRelease

# Check manifest validation
npx pwa-asset-generator verify manifest.json

# Test TWA locally
npx @anthropic/bubblewrap validate
```

## Asset Creation (Need)
- [ ] Feature graphic (1024x500 banner)
- [ ] 2x phone screenshots showing gameplay
- [ ] Short description (80 chars)
- [ ] Full description (4000 chars max)

## Short Description (80 chars)
```
Kill time, not your battery. Instant micro-games for waiting rooms.
```

## Full Description
```
WaitPlay is your pocket arcade for boring moments. 

Waiting at the DMV? Stuck in line? Train delayed? Kill time with fast, fun micro-games that won't drain your battery.

🎮 4 INSTANT GAMES:
• Tap Sprint - How fast can you tap in 30 seconds?
• Whack-a-Dot - Quick reflexes challenge
• Memory Match - Test your brain
• Reaction Test - Measure your reflexes

⚡ ZERO BLOAT:
• No login required
• Works offline
• Under 10MB
• Instant load
• No ads (yet!)

📱 PERFECT FOR:
• Waiting rooms
• Checkout lines  
• Bus stops
• Elevator rides
• Boring meetings (we won't tell)

Play while you wait. No signup, no lag, no battery drain.

Download WaitPlay - your new favorite time killer.
```

---
**Status:** Ready for APK build on local machine with Android Studio.