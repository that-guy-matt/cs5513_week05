import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts-json';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

// getStaticProps runs at build time to fetch data for a single post
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

// getStaticPaths tells Next.js which dynamic routes to pre-render
// In this case, it creates a page for each markdown file in /posts
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

// Page component for rendering an individual blog post
export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div>
                    <p>{postData.description}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        {postData.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h2>Instructions</h2>
                    <ol>
                        {postData.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
            </article>
        </Layout>
    );
}