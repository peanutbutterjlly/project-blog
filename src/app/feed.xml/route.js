import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';
import RSS from 'rss';

  /**
   * Handles GET requests to `/feed.xml`.
   *
   * Returns an RSS feed including all of the blog posts on the site.
   *
   * @returns {Response} - The RSS feed as an XML string.
   */
export async function GET() {
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  });

  const posts = await getBlogPostList();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `www.something.com/${post.slug}`,
      date: post.publishedOn,
      author: 'Josh W. Comeau most likely',
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
