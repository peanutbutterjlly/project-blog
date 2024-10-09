
import BlogSummaryCard from '@/components/BlogSummaryCard';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';
import styles from './homepage.module.css';

export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
};

async function Home() {
  const blogPosts = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPosts.map(({ slug, title, abstract, publishedOn }) => (
        <BlogSummaryCard
          key={slug}
          slug={slug}
          title={title}
          abstract={abstract}
          publishedOn={new Date(publishedOn)}
          />
      ))}
    </div>
  );
}

export default Home;
