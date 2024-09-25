import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

  /**
   * @returns {Promise<import('../types').BlogPost[]>}
   *
   * Returns a list of all blog posts, sorted in descending order by
   * published date.
   */
export async function getBlogPostList() {
  const fileNames = await readDirectory('/content');

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(
      `/content/${fileName}`
    );

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) =>
    p1.publishedOn < p2.publishedOn ? 1 : -1
  );
}

  /**
   * Loads a single blog post from the filesystem.
   *
   * @param {string} slug - The slug of the blog post to load.
   * @returns {Promise<{ frontmatter: import('../types').BlogPost, content: string }>}
   *
   * The returned object contains the parsed frontmatter, as well as the
   * raw content of the blog post.
   */
export async function loadBlogPost(slug) {
  const rawContent = await readFile(
    `/content/${slug}.mdx`
  );

  const { data: frontmatter, content } =
    matter(rawContent);

  return { frontmatter, content };
}

  /**
   * Reads a file from the local filesystem.
   *
   * @param {string} localPath - The path to the file on the local filesystem.
   * @returns {Promise<string>}
   *
   * The returned promise resolves with the contents of the file.
   */
function readFile(localPath) {
  return fs.readFile(
    path.join(process.cwd(), localPath),
    'utf8'
  );
}

  /**
   * Reads the contents of a directory from the local filesystem.
   *
   * @param {string} localPath - The path to the directory on the local filesystem.
   * @returns {Promise<string[]>}
   *
   * The returned promise resolves with an array of strings, each representing a
   * file or directory inside the specified directory.
   */
function readDirectory(localPath) {
  return fs.readdir(
    path.join(process.cwd(), localPath)
  );
}
