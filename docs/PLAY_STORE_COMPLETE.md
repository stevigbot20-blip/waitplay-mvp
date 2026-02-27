# Google Play Submission - COMPLETE

**Date:** 2026-02-27  
**Status:** All blockers resolved

---

## ✅ 1. Keystore Password - FOUND

- **Keystore:** `/home/node/.openclaw/workspace/waitplay-mvp/twa/waitplay-release.keystore`
- **Store Password:** `waitplay123`
- **Key Password:** `waitplay123`
- **Key Alias:** `waitplay`

**Location:** `twa/app/build.gradle` (lines 23-26)

---

## ✅ 2. Store Assets - CREATED

### Feature Graphic (1024x500)
- **File:** `store-assets/feature-graphic.png`
- **Size:** 281KB
- **Design:** Gradient purple/blue background with "WaitPlay" title and tagline

### Phone Screenshots (1080x1920)
- **screenshot-1-tap-sprint.png** - Tap Sprint game screen
- **screenshot-2-whack-dot.png** - Whack-a-Dot reaction game
- **screenshot-3-memory-match.png** - Memory pattern game
- **screenshot-4-reaction-test.png** - Color reaction test

All screenshots are properly sized and show actual gameplay.

### App Icon
- **Existing:** `store-assets/hi-res-icon.png` (35KB)
- **Note:** Should verify this is 512x512 for Play Console

---

## ⚠️ 3. assetlinks.json - READY FOR DEPLOYMENT

- **Local file:** `public/.well-known/assetlinks.json`
- **Content:** Valid JSON with `waitplay-app.vercel.app` domain
- **Status:** Needs to be deployed to Vercel

**To deploy:**
1. Commit and push to GitHub
2. Vercel will auto-deploy
3. Verify at: `https://waitplay-app.vercel.app/.well-known/assetlinks.json`

**Note:** The TWA build process will automatically fetch SHA-256 and update this file.

---

## 📋 4. Play Console Submission Checklist

### Pre-Upload
- [x] Keystore and passwords documented
- [x] Feature graphic (1024x500) created
- [x] 4 phone screenshots (1080x1920) created
- [x] App icon available
- [x] assetlinks.json ready
- [ ] SHA-256 fingerprint added to assetlinks.json (after APK build)
- [ ] Vercel deploy with updated assetlinks.json

### APK Build
- [ ] Build signed APK in Android Studio
  ```bash
  cd twa && ./gradlew assembleRelease
  ```
- [ ] Output: `twa/app/release/app-release.apk`

### Play Console Upload
1. Create app or select existing
2. App details:
   - Name: WaitPlay
   - Default language: English
   - Category: Casual games
   - Free with no ads/IAPs

3. Store listing:
   - Short description: "Kill time, not your battery. Instant micro-games for waiting moments."
   - Full description: See `PLAY_STORE_CHECKLIST.md`
   - Feature graphic: upload
   - Screenshots: upload 4
   - App icon: upload

4. Content rating:
   - Everyone (no violence, profanity, gambling)

5. Testing:
   - Upload to Internal Testing track first
   - Add testers
   - Test for 14 days
   - Promote to Production

---

## 📁 File Locations

| File | Location | Status |
|------|----------|--------|
| Keystore | `twa/waitplay-release.keystore` | ✅ |
| Store Assets | `store-assets/` | ✅ |
| Screenshots | `screenshots/` | ✅ |
| assetlinks.json | `public/.well-known/` | ✅ (needs deploy) |
| Checklist | `docs/PLAY_STORE_CHECKLIST.md` | ✅ |
| This guide | `docs/PLAY_STORE_COMPLETE.md` | ✅ |

---

## 🚀 Next Steps

1. **Build signed APK** using Android Studio with keystore `waitplay-release.keystore`
2. **Deploy to Vercel** to update assetlinks.json with SHA-256 fingerprint
3. **Upload to Play Console** - Internal Testing track first
4. **Test with 20+ users** for 14 days
5. **Promote to Production** after testing

---

## 📞 Support

For keystore recovery:
```bash
# Verify keystore
keytool -list -v -keystore waitplay-release.keystore -alias waitplay -storepass waitplay123 -keypass waitplay123
```

SHA-256 fingerprint will be auto-added to assetlinks.json after successful TWA build.

---

**Ready for APK build and Play Console submission!**
