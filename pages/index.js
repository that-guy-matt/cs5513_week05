import { getSortedPostsData } from '../lib/posts-json';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  } 
}
// Export the default Home page component (this is what Next.js will render at the `/` route)
export default function Home({ allPostsData 

}) {
  return (
    // Wrap the page content inside the Layout component
    // Passing `home` as a prop might toggle special styling/behavior in Layout
    <Layout home>
      
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        
        <p className="intro">
          Hi, I’m Matthew — a student learning web development and exploring 
          how to build modern applications with tools like JavaScript, React, and Next.js. 
          I’m interested in solving problems, picking up new skills, and experimenting with technology.
        </p> 

      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}