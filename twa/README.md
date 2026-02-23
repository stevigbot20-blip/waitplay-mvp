# WaitPlay TWA (Trusted Web Activity)

Android wrapper for WaitPlay PWA to publish on Google Play.

## Prerequisites (on your machine)

1. **Java JDK 11+**
2. **Android Studio** (for building APK)
3. **Node.js 16+**
4. **Bubblewrap CLI**: `npm install -g @anthropic/bubblewrap`

## Quick Setup

```bash
# Install Bubblewrap
npm install -g @anthropic/bubblewrap

# Initialize TWA project (from this directory)
bubblewrap init --manifest https://waitplay-mvp.vercel.app/manifest.json

# Build debug APK
bubblewrap build

# APK will be in: app/build/outputs/apk/debug/app-debug.apk
```

## Manual Setup (if Bubblewrap unavailable)

1. Open Android Studio
2. Create new project: "Empty Activity"
3. Add TWA dependency to `app/build.gradle`:
   ```gradle
   implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.3.0'
   ```
4. Copy `AndroidManifest.xml` from this repo
5. Update `strings.xml` with your details
6. Build signed APK

## Files Structure

```
android/
├── app/
│   ├── src/main/
│   │   ├── AndroidManifest.xml
│   │   ├── res/
│   │   │   ├── values/strings.xml
│   │   │   ├── mipmap-*/ (icons)
│   │   │   └── drawable/ (adaptive icon)
│   │   └── java/... (TWA launcher activity)
│   └── build.gradle
└── build.gradle
```

## Digital Asset Links (REQUIRED)

Before publishing, add this to your server:

**File:** `https://waitplay-mvp.vercel.app/.well-known/assetlinks.json`

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.waitplay.app",
    "sha256_cert_fingerprints": ["YOUR_SIGNING_KEY_SHA256"]
  }
}]
```

## Signing Key

Generate a signing key for Play Store:

```bash
keytool -genkey -v -keystore waitplay-release.keystore \
  -alias waitplay \
  -keyalg RSA -keysize 2048 -validity 10000
```

Keep this file secure! You'll need it for all updates.

## Upload to Play Store

1. Go to [Play Console](https://play.google.com/console)
2. Create new app
3. Upload signed APK to **Internal Testing** track
4. Add testers (your email)
5. Submit for review
6. Once approved, roll out to production

## Package Info

- **Package Name:** `com.waitplay.app`
- **App Name:** WaitPlay
- **Min SDK:** 21 (Android 5.0+)
- **Target SDK:** 34