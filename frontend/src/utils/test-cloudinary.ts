// Test Cloudinary configuration
export const testCloudinaryConfig = () => {
  console.log("🔍 Testing Cloudinary Configuration:");
  console.log("Cloud Name: dhvup7uyy");
  console.log("Folder: students-test-paper");
  console.log("Upload Preset: students_test_paper");
  console.log("Upload URL: https://api.cloudinary.com/v1_1/dhvup7uyy/image/upload");
  
  console.log("\n📋 To fix the 400 error:");
  console.log("1. Go to https://cloudinary.com/console");
  console.log("2. Settings → Upload → Add upload preset");
  console.log("3. Name: students_test_paper");
  console.log("4. Signing Mode: Unsigned");
  console.log("5. Folder: students-test-paper");
  console.log("6. Save");
  
  console.log("\n✅ After setup, image uploads will work automatically!");
};

// Call this function in browser console to see the setup instructions
if (typeof window !== 'undefined') {
  (window as any).testCloudinaryConfig = testCloudinaryConfig;
}
