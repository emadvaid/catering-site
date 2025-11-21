# App Icon and Splash Screen Setup

## 📱 Required Assets:

### App Icon (Required for both iOS & Android):
- **Size:** 1024x1024 pixels
- **Format:** PNG with no transparency
- **Design:** Your Kabab Hut logo with background

### Splash Screen (Launch Screen):
- **Size:** 2732x2732 pixels
- **Format:** PNG
- **Design:** Kabab Hut branding

## 🎨 Quick Icon Generator Tools:

1. **Icon Kitchen** - https://icon.kitchen/
   - Upload your logo
   - Auto-generates all sizes

2. **App Icon Generator** - https://www.appicon.co/
   - Drag & drop
   - Downloads iOS & Android sizes

## 📦 After Creating Icons:

### For Android:
1. Replace icons in: `android/app/src/main/res/`
   - mipmap-hdpi
   - mipmap-mdpi
   - mipmap-xhdpi
   - mipmap-xxhdpi
   - mipmap-xxxhdpi

### For iOS:
1. Open: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
2. Replace all icon files
3. Update `Contents.json`

## 🚀 Quick Command (after icons ready):

```bash
# Install Capacitor Assets plugin
npm install @capacitor/assets --save-dev

# Generate all icons automatically
npx capacitor-assets generate --iconBackgroundColor '#dc2626' --iconBackgroundColorDark '#dc2626' --splashBackgroundColor '#dc2626'
```

## 🎨 Recommended Design:

**Colors:**
- Background: Red (#dc2626)
- Logo: White with kabab/food icon

**Text:**
- "Kabab Hut" in bold
- Tagline: "Desi Catering"

## 📝 Temporary Solution:

For now, your app will use default Capacitor icons. Update before publishing to stores.

Create your logo PNG and run:
```bash
npx capacitor-assets generate --icon path/to/your-logo.png
```
