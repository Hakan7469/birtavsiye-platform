import Head from 'next/head';
import RecommendationCard from '../components/RecommendationCard';

export default function Home() {
  return (
    <>
      <Head>
        <title>Birtavsiye</title>
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Tavsiyeler</h1>
        <RecommendationCard />
      </main>
    </>
  );
}
