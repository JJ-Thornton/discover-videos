import Head from 'next/head';
import styles from '@/styles/Home.module.css';

import Banner from '../../components/banner/banner.js';
import NavBar from '../../components/nav/navbar.js';

import SectionCards from '../../components/card/section-cards.js';

import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from '../../lib/videos.js';
import { redirectUser } from '../../utils/redirectUser.js';

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const WatchItAgainVideos = await getWatchItAgainVideos(userId, token);

  const disneyVideos = await getVideos('disney trailer');
  const productivityVideos = await getVideos('productivity');
  const travelVideos = await getVideos('travel');
  const popularVideos = await getPopularVideos();
  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
      WatchItAgainVideos,
    },
  };
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
  WatchItAgainVideos,
}) {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <NavBar username="" />

          <Banner
            videoId="4zH5iYM4wJo"
            title="Clifford the Big Red Dog"
            subTitle="super cute dog"
            imgUrl="/static/027ba750-c552-42c3-85f1-bb86fb468563-AP19336685923048.webp"
          />

          <div className={styles.sectionWrapper}>
            <SectionCards title="Disney" videos={disneyVideos} size="large" />
            <SectionCards
              title="Watch It Again"
              videos={WatchItAgainVideos}
              size="small"
            />
            <SectionCards
              title="Productivity"
              videos={productivityVideos}
              size="small"
            />
            <SectionCards title="Travel" videos={travelVideos} size="medium" />
            <SectionCards title="Popular" videos={popularVideos} size="small" />
          </div>
        </div>
      </main>
    </>
  );
}
