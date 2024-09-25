import BlogHero from '@/components/BlogHero';

import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './postSlug.module.css';

export default async function BlogPost({params}) {
  const blogPost = await loadBlogPost(params.postSlug);
  const { frontmatter, content } = blogPost;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote  source={content} />
      </div>
    </article>
  );
}
