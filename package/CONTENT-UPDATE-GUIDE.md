# Content Update Guide

This guide explains how to update your website content without touching code or redeploying.

## 🎯 Quick Setup

### Option 1: Google Drive (Recommended)

**Step 1: Make your content.json file public on Google Drive**

1. Upload `src/data/content.json` to Google Drive
2. Right-click the file → Click "Share"
3. Under "General access", change from "Restricted" to **"Anyone with the link"**
4. Set permission to **"Viewer"**
5. Click "Copy link"

**Step 2: Get the File ID**

From your share link:
```
https://drive.google.com/file/d/1rBGPr7qSDz5SWKwthips60t2WaxwMEEY/view?usp=sharing
```

The File ID is: `1rBGPr7qSDz5SWKwthips60t2WaxwMEEY`

**Step 3: Update .env file**

Add to your `.env` file:
```
NEXT_PUBLIC_CONTENT_JSON_URL=https://drive.google.com/uc?export=download&id=1rBGPr7qSDz5SWKwthips60t2WaxwMEEY
```

**Step 4: Rebuild and Deploy**

```bash
npm run build
# Then deploy to S3
```

### Option 2: GitHub Gist

1. Go to https://gist.github.com
2. Create a new gist with your `content.json`
3. Click "Create public gist"
4. Click "Raw" button
5. Copy the raw URL (e.g., `https://gist.githubusercontent.com/username/...`)
6. Add to `.env`:
   ```
   NEXT_PUBLIC_CONTENT_JSON_URL=https://gist.githubusercontent.com/username/...
   ```

### Option 3: Any Public URL

You can use any publicly accessible JSON file:
```
NEXT_PUBLIC_CONTENT_JSON_URL=https://yoursite.com/content.json
```

## 🔄 How It Works

1. **During Build**: The `scripts/fetch-content.js` script runs automatically
2. **Fetches Content**: Downloads JSON from your Google Drive/URL
3. **Saves Locally**: Updates `src/data/content.json`
4. **Builds Site**: Next.js builds with the latest content
5. **Fallback**: If fetch fails, uses existing local `content.json`

## 📝 Updating Content

### Method 1: Update Google Drive file

1. Edit your content.json file in Google Drive
2. Save the changes
3. Rebuild your website:
   ```bash
   npm run fetch-content  # Test fetching
   npm run build          # Build with new content
   ```
4. Deploy to S3

### Method 2: Direct update

1. Edit `src/data/content.json` locally
2. Upload to Google Drive (replace the file, keep same File ID)
3. Rebuild and deploy

## 🧪 Testing

Test if fetching works:
```bash
npm run fetch-content
```

You should see:
```
✅ Content successfully fetched and saved to: src/data/content.json
```

## ⚠️ Important Notes

1. **File must be public** - Anyone with the link should be able to view
2. **Valid JSON** - Make sure your JSON is properly formatted
3. **Keep same File ID** - When updating, replace the file in Google Drive (don't create new one)
4. **Fallback safety** - If fetch fails, build continues with existing content
5. **GitHub Actions** - Add `NEXT_PUBLIC_CONTENT_JSON_URL` to GitHub Secrets for auto-deploy

## 🚀 GitHub Actions Setup

Add to your GitHub repository secrets:

```
NEXT_PUBLIC_CONTENT_JSON_URL=https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
```

Now every push will automatically fetch latest content from Google Drive!

## 📋 Content Structure

Your `content.json` should follow this structure:

```json
{
  "site": {
    "name": "DreamSys Technologies",
    "description": "Your trusted digital partner"
  },
  "home": {
    "hero": {
      "title": "...",
      "subtitle": "..."
    },
    ...
  },
  "about": { ... },
  "services": { ... },
  "contact": { ... }
}
```

See `src/data/content.json` for the complete structure.
