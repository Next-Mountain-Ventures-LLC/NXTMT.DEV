# Integrating WordPress with Astro

This guide explains how to integrate content from a WordPress site into your Astro project. By following these steps, you'll be able to use WordPress as a headless CMS for your Astro site.

## Overview

The integration uses the WordPress REST API to fetch content and display it in your Astro site. This allows you to:

1. Use WordPress as a content management system
2. Leverage the WordPress admin interface for content creation
3. Display WordPress posts, pages, and media on your Astro site
4. Keep your site's performance benefits from Astro's static site generation

## Prerequisites

- An existing WordPress site
- WordPress REST API enabled (enabled by default in WordPress 4.7+)
- Astro project set up

## Step 1: Configure WordPress

Ensure your WordPress site is properly configured:

1. **Enable REST API**: Make sure the WordPress REST API is enabled. It should be enabled by default in recent WordPress versions.

2. **Install CORS Plugin (Optional)**: If your Astro site is on a different domain than your WordPress site, install a CORS plugin to allow cross-origin requests.

3. **Add Featured Images**: Make sure your posts have featured images for better visual presentation.

4. **Categories and Tags**: Organize your content with categories and tags to make it easier to filter in your Astro site.

## Step 2: Set Up the WordPress API Utility

Create a utility file to handle API requests to WordPress:

1. Create a file at `src/utils/wordpress.ts`
2. Update the `WORDPRESS_API_URL` constant with your WordPress site's URL
3. The utility file includes functions for:
   - Fetching posts
   - Fetching a single post by slug
   - Getting categories
   - Extracting featured images
   - Formatting dates
   - Sanitizing content

```typescript
// Example from src/utils/wordpress.ts
const WORDPRESS_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';
```

## Step 3: Create Components for WordPress Content

Create components to display WordPress content:

1. `BlogPostCard.tsx` - For displaying post previews in lists
2. `BlogPostDetail.astro` - For displaying full post content

These components handle:
- Featured images
- Post titles and excerpts
- Publication dates
- Author information
- Categories and tags

## Step 4: Create Blog Pages

Create Astro pages to display your WordPress content:

1. **Blog Index Page** (`/src/pages/blog/index.astro`):
   - Displays a list of recent posts
   - Includes pagination
   - Shows featured images and excerpts

2. **Blog Post Page** (`/src/pages/blog/[slug].astro`):
   - Displays a single blog post
   - Handles dynamic routes based on post slugs
   - Includes the full post content
   - Shows metadata like author and publication date

3. **Pagination Pages** (`/src/pages/blog/[page].astro`):
   - Handles pagination for the blog index
   - Loads the appropriate posts for each page

## Step 5: Update Configuration

Make sure your Astro configuration allows for server-side rendering or static site generation with dynamic routes:

```javascript
// astro.config.mjs
export default defineConfig({
  // Other config options...
  output: 'static', // or 'server' if you prefer SSR
});
```

## Step 6: Customize Styling

The provided components include basic styling using Tailwind CSS classes that match your site's design. Customize these as needed to match your brand.

The `BlogPostDetail.astro` component includes global styles for WordPress content to ensure it displays correctly.

## Step 7: Deploy and Test

Build your Astro site and test the WordPress integration:

```bash
npm run build
npm run preview
```

Ensure that:
- Posts load correctly
- Images display properly
- Pagination works
- Individual post pages render with the correct content

## Troubleshooting

If you encounter issues:

1. **Check API URL**: Ensure your WordPress API URL is correct
2. **CORS Issues**: If you get CORS errors, install a CORS plugin on WordPress
3. **Missing Images**: Check that posts have featured images and the `_embed=true` parameter is used in API requests
4. **Content Formatting**: Adjust the `sanitizeContent` function if WordPress content doesn't display correctly

## Next Steps

To enhance your WordPress integration:

1. **Add Search Functionality**: Create a search page using the WordPress API search parameter
2. **Category and Tag Pages**: Create pages to display posts filtered by category or tag
3. **Author Pages**: Display posts from specific authors
4. **Custom Post Types**: Extend the utility functions to support custom post types
5. **Comments**: Add WordPress comments to blog posts
6. **Authentication**: Add support for protected content with JWT authentication

## Resources

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)