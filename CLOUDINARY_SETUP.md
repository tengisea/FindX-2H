# Cloudinary Setup Instructions

## ⚠️ Current Issue: 400 Bad Request Error

The image upload is failing because the upload preset doesn't exist yet. Here's how to fix it:

## Required Setup

### 1. Go to Cloudinary Dashboard
- Visit: https://cloudinary.com/console
- Login with your account

### 2. Create Upload Preset (CRITICAL STEP)
- Go to **Settings** → **Upload**
- Click **Add upload preset**
- **Name**: `students_test_paper` (exactly this name)
- **Signing Mode**: **Unsigned** (for client-side uploads)
- **Folder**: `students-test-paper` (already set in code)
- **Allowed file types**: `jpg, jpeg, png, gif, webp`
- **Max file size**: `10MB` (adjust as needed)
- **Click Save**

### 3. Your Configuration
- **Cloud Name**: `dhvup7uyy` ✅
- **Folder**: `students-test-paper` ✅
- **Upload Preset**: `students_test_paper` ❌ (CREATE THIS)

### 4. Test Upload
Once the preset is created, the image upload functionality will work automatically.

## Current Fallback
- If Cloudinary upload fails, the system uses local blob URLs temporarily
- You'll see an alert: "Image upload to Cloudinary failed. Using temporary URLs."
- This allows the system to work while you set up Cloudinary

## Features Added

✅ **Score 0 Support**: Students can now receive 0 points for questions
✅ **Cloudinary Integration**: Images are uploaded to your Cloudinary account
✅ **Automatic URL Generation**: Cloudinary URLs are sent to the database
✅ **Error Handling**: Proper error messages for upload failures

## File Structure
```
students-test-paper/
├── [auto-generated-filename-1].jpg
├── [auto-generated-filename-2].png
└── ...
```
