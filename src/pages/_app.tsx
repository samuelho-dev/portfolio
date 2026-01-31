import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/layout/Layout';
import { Analytics } from '@vercel/analytics/react';
import usePageRefs from 'util/pageRef';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const { pageRef, frontpageRef, aboutRef, workRef, contactRef, beatRef } =
    usePageRefs();

  return (
    <>
      <Head>
        <title>SAMUEL HO</title>
        <meta name="description" content="Samuel Ho - Software Engineer, Creative, Analyst" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />
      <div className={`${spaceGrotesk.variable} min-h-screen w-full bg-base`}>
        <Layout
          aboutRef={aboutRef}
          workRef={workRef}
          contactRef={contactRef}
          beatRef={beatRef}
        >
          <Component
            {...pageProps}
            pageRef={pageRef}
            frontpageRef={frontpageRef}
            aboutRef={aboutRef}
            workRef={workRef}
            contactRef={contactRef}
            beatRef={beatRef}
          />
        </Layout>
      </div>
    </>
  );
}
