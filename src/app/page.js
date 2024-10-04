
import BlogSummaryCard from '@/components/BlogSummaryCard';

import { getBlogPostList } from '@/helpers/file-helpers';
import styles from './homepage.module.css';

export const metadata = {
  title: 'Bits & Bytes',
  description: 'A wonderful blog about JavaScript',
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
