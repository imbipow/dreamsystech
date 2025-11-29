// Fetch content from Google Drive or fallback to local content.json
const GOOGLE_DRIVE_URL = process.env.NEXT_PUBLIC_CONTENT_JSON_URL;
const CACHE_KEY = 'website_content';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

let contentCache: { data: any; timestamp: number } | null = null;

export async function getContent() {
  // Check if we have valid cached content
  if (contentCache && Date.now() - contentCache.timestamp < CACHE_DURATION) {
    return contentCache.data;
  }

  try {
    // Try to fetch from Google Drive if URL is configured
    if (GOOGLE_DRIVE_URL) {
      const response = await fetch(GOOGLE_DRIVE_URL, {
        cache: 'no-store', // Don't cache during build
      });

      if (response.ok) {
        const content = await response.json();

        // Update cache
        contentCache = {
          data: content,
          timestamp: Date.now(),
        };

        return content;
      } else {
        console.warn('Failed to fetch from Google Drive, falling back to local content');
      }
    }
  } catch (error) {
    console.error('Error fetching content from Google Drive:', error);
  }

  // Fallback to local content.json
  try {
    const localContent = await import('@/data/content.json');
    return localContent.default;
  } catch (error) {
    console.error('Error loading local content:', error);
    throw new Error('Failed to load content from both Google Drive and local file');
  }
}
