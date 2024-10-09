import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDX_COMPONENTS } from '@/helpers/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import styles from './postSlug.module.css';

const cachedLoadBlogPost = cache(loadBlogPost);

export async function generateMetadata({ params }) {
  const blogPost = await cachedLoadBlogPost(params.postSlug);
  if (!blogPost) {
    return null;
  }

  const { frontmatter } = blogPost;

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

export default async function BlogPost({params}) {
  const blogPost = await cachedLoadBlogPost(params.postSlug);
  if (!blogPost) {
    return notFound();
  }

  const { frontmatter, content } = blogPost;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={frontmatter.title} publishedOn={frontmatter.publishedOn} />
      <div className={styles.page}>
        <MDXRemote components={MDX_COMPONENTS} source={content} />
      </div>
    </article>
  );
}
