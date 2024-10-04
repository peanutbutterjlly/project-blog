import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
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
        <MDXRemote
         components={{
           pre: CodeSnippet,
         }}
         source={content} 
        />
      </div>
    </article>
  );
}
