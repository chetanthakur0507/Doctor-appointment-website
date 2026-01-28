# PWA Setup Guide for Medi.care

## What's Been Added

Progressive Web App (PWA) support has been added to the Medi.care Doctor Appointment System. This allows your app to:
- ✅ Work offline with service workers
- ✅ Be installed on home screens (mobile & desktop)
- ✅ Load faster with caching strategies
- ✅ Send push notifications
- ✅ Work like a native app

## Files Created/Modified

### 1. **public/manifest.json**
   - PWA manifest file with app metadata
   - Defines app name, icons, colors, and shortcuts
   - Enables install prompts on browsers

### 2. **next.config.mjs**
   - Integrated `next-pwa` package
   - Configured runtime caching for:
     - Google Fonts
     - Unsplash images
     - API responses
   - Auto-generates service worker during build

### 3. **app/layout.js**
   - Added PWA meta tags
   - Added manifest.json link
   - Apple touch icon configuration
   - Theme color configuration

### 4. **public/icon-*.png** (To be created)
   - App icons in various sizes (192x192, 512x512, 96x96)
   - Both regular and maskable versions

## Next Steps - IMPORTANT

### 1. **Replace Placeholder Icons** ⭐
You MUST replace the placeholder icons with your actual app icons:

Create icons with these specifications:
- **icon-192x192.png** - 192x192px PNG (for home screen)
- **icon-512x512.png** - 512x512px PNG (for splash screens)
- **icon-96x96.png** - 96x96px PNG (for shortcuts)
- **Maskable versions** - Same sizes with transparent padding for modern devices

**Tools to create icons:**
- Figma (free)
- Photoshop
- Online: https://www.favicon-generator.org/ or https://imageresizer.com/

### 2. **Add Screenshot Images** (Optional but recommended)
For better app store appearances:
- **public/screenshot1.png** - 540x720px (mobile view)
- **public/screenshot2.png** - 1280x720px (desktop view)

### 3. **Update Theme Colors** (Optional)
In `app/layout.js` and `public/manifest.json`:
- Change `#1e40af` (theme-color) to your brand color
- Update app colors to match your design

### 4. **Customize App Shortcuts** (Optional)
Edit `public/manifest.json` to add more quick actions users can access from home screen icons.

## Testing PWA Features

### Local Testing
```bash
npm run build
npm start
```

Then open DevTools (F12):
1. Go to **Application** tab
2. Check **Manifest** section
3. Check **Service Workers** section
4. Install the app using browser's "Install app" option

### Mobile Testing
1. Open your website on Android/iOS device
2. Browser should show "Add to Home Screen" prompt
3. Tap to install as native app
4. App works offline once cached

## PWA Features Enabled

### ✅ **Service Worker Caching**
- Automatic caching of pages, assets, and API responses
- Offline support for cached content
- Network-first strategy for API routes
- Cache-first strategy for static assets

### ✅ **Install on Home Screen**
- Chrome/Edge: Shows "Install" button
- Safari (iOS): Shows "Add to Home Screen"
- Android browsers: Full support

### ✅ **Offline Support**
- Works offline for previously visited pages
- Google Fonts cached for 1 year
- Images cached for 30 days
- JS/CSS cached indefinitely (until update)

### ✅ **Fast Loading**
- Service worker precaches critical assets
- Network requests cached intelligently
- Instant app loading on home screen

## Troubleshooting

### PWA Not Installing?
- Must be on HTTPS (PWA requires HTTPS for production)
- Manifest.json must be valid JSON
- Icons must exist at specified paths
- Service worker must register successfully

### Service Worker Errors?
```
# Check DevTools Console and Application tab
# Clear cache: DevTools → Application → Clear site data
# Restart server: npm start
```

### Icon Not Showing?
- Check icon paths in manifest.json
- Icons should be in public/ folder
- PNG format recommended
- Update cache: Force refresh (Ctrl+Shift+R)

## Production Deployment

### Before Deploying:
1. ✅ Replace all placeholder icons
2. ✅ Add HTTPS certificate to server
3. ✅ Test on mobile devices
4. ✅ Verify manifest.json is accessible
5. ✅ Check service worker registration

### Recommended Deployment Platforms:
- **Vercel** (Next.js creator) - Best option
- **Netlify** - Easy PWA support
- **AWS Amplify** - Great for production
- **Docker** on your own server

## Additional Resources

- [Next.js PWA Docs](https://nextjs.org/docs)
- [next-pwa Package](https://www.npmjs.com/package/next-pwa)
- [Web.dev PWA Checklist](https://web.dev/pwa-checklist/)
- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## Files Structure

```
public/
├── manifest.json          ← PWA metadata
├── icon-192x192.png       ← App icon (create this)
├── icon-512x512.png       ← App icon (create this)
├── icon-96x96.png         ← Shortcut icon (create this)
├── icon-192x192-maskable.png
├── icon-512x512-maskable.png
└── screenshot*.png        ← Optional screenshots

app/
└── layout.js              ← Updated with PWA meta tags

next.config.mjs            ← PWA configuration
```

## Support

For issues or questions, refer to:
- next-pwa documentation
- Next.js documentation
- PWA community resources
