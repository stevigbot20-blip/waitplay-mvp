# WaitPlay Store Assets

## 📱 Google Play Console Requirements

### Required Images
1. **Feature graphic:** 1024×500 PNG (store page banner)
2. **Phone screenshots:** 1080×1920 PNG (4+ images)
3. **Hi-res icon:** 512×512 PNG (from `twa/app/build/`)

### Screenshot Plan (4 games)
1. **Tap Sprint:** Game screen with timer and tap counter
2. **Whack-a-Dot:** Dots appearing with reaction time display  
3. **Memory Match:** Pattern grid with success message
4. **Reaction Test:** Color change with "Tap Now!" prompt
5. **Landing page:** Clean hero with 4-game menu

### Feature Graphic Concept
**Left:** App icon + "WaitPlay" logo
**Right:** "Kill time, not your battery" tagline with phone mockup showing games
**Background:** Clean gradient or abstract pattern

## 📝 Store Listing Text

### Short Description (80 chars)
```
Instant micro-games for waiting moments. Kill time, not your battery.
```

### Full Description (4000 chars)
See `PLAY_CONSOLE_GUIDE.md` for complete text.

### Keywords
mini-games, casual games, time killer, waiting games, quick games, offline games, PWA, instant games, mobile games, tap games

## 🧪 Tester Recruitment Strategy

### Reddit Posts (Template)
```
**Title:** [Testers Needed] WaitPlay - Instant mini-games for waiting moments

**Body:** 
Looking for 20 testers for a new Android app launching soon!

**WaitPlay** offers quick, addictive mini-games perfect for waiting rooms, queues, or short breaks:
• Tap Sprint - Speed tapping challenge
• Whack-a-Dot - Reaction speed test  
• Memory Match - Pattern recall game
• Reaction Test - Visual response challenge

**No ads, no signup** - just instant fun that works offline.

**Testing details:**
- Internal testing track on Google Play
- 14-day testing period (starting soon)
- Simple feedback form (optional)

**Requirements:**
- Android device (6.0+)
- Google Play account
- Willing to try 4 mini-games

**If interested:** Comment or DM your Gmail address to be added to testers list.

App will be free with no IAPs. Perfect for killing time without killing your battery!
```

### Discord/Community Template
Shorter version focusing on quick testing.

## ⏱️ Timeline
1. **Day 1-2:** Recruit testers (Reddit/Discord)
2. **Day 3:** Create app in Play Console + upload APK  
3. **Day 4:** Add testers + submit for review
4. **Day 4-18:** 14-day testing period
5. **Day 19:** Launch to production

## 🔧 Asset Generation Tools
- **Local server:** http://localhost:8081 (screenshot capture)
- **Icon source:** `twa/app/build/intermediates/merged-not-compiled-resources/release/mipmap-*/ic_launcher.png`
- **Feature graphic:** Use canvas tool or simple image editor