import Head from 'next/head';
import BlogSection from './blog';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import BackToTopButton from '../components/BackToTopButton';

export default function Home({ initialBlogs }) {
  return (
    <div>
      <Head>
        <title>AsadTech</title>
        <meta name="description" content="Agency Website - Generated by AsadTech" />
      </Head>
      <BlogSection initialBlogs={initialBlogs} />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.HOST || 'localhost:3000';
    const apiUrl = `${protocol}://${host}/api/blogs`;
    const { data } = await axios.get(apiUrl);
    return {
      props: {
        initialBlogs: data,
        ...(await serverSideTranslations(locale, ['blog', 'navbar', 'footer'])),
      },
      revalidate: 60, // Re-generate the page every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    return {
      props: {
        initialBlogs: [],
        ...(await serverSideTranslations(locale, ['blog', 'navbar', 'footer'])),
      },
    };
  }
}
