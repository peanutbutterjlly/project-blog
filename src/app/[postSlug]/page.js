import BlogHero from '@/components/BlogHero';

import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { cache } from 'react';
import styles from './postSlug.module.css';

const cachedLoadBlogPost = cache(loadBlogPost);

export async function generateMetadata({ params }) {
  const { frontmatter } = await cachedLoadBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

export default async function BlogPost({params}) {
  const { frontmatter, content } = await cachedLoadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
