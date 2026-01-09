import { Container } from '../../components/container';
import { MinimalPosts } from '../../components/minimal-posts';
import { Layout } from '../../components/layout';
import { PersonalHeader } from '../../components/personal-theme-header';
import { Footer } from '../../components/footer';
import { AppProvider } from '../../components/contexts/appContext';
import { PublicationFragment, SeriesFragment } from '../../generated/graphql';
import { GetStaticProps, GetStaticPaths } from 'next';
import request from 'graphql-request';
import { SingleSeriesByPublicationDocument, SeriesByPublicationDocument } from '../../generated/graphql';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

type Props = {
  publication: PublicationFragment;
  series: SeriesFragment;
};

export default function SeriesDetail({ publication, series }: Props) {
  return (
    <AppProvider publication={publication}>
      <Layout>
        <Head>
          <title>{series.name} - {publication.title}</title>
          <meta
            name="description"
            content={series.description?.text || `${series.name} series from ${publication.title}`}
          />
        </Head>
        <Container className="mx-auto flex max-w-7xl flex-col items-stretch gap-10 px-5 py-10">
          <PersonalHeader />
          <main>
            <header className="mb-10">
              {series.coverImage && (
                <div className="relative -mx-5 mb-6 h-64 overflow-hidden sm:-mx-5 md:h-96">
                  <Image
                    src={series.coverImage}
                    alt={series.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
                {series.name}
              </h1>
              {series.description?.text && (
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {series.description.text}
                </p>
              )}
              <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                {series.posts.totalDocuments} {series.posts.totalDocuments === 1 ? 'post' : 'posts'} in series
              </div>
            </header>
            <div className="space-y-6">
              <MinimalPosts context="series" posts={series.posts.edges.map((e) => e.node)} />
            </div>
          </main>
          <Footer />
        </Container>
      </Layout>
    </AppProvider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const data = await request(
      process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
      SeriesByPublicationDocument,
      {
        host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      }
    );

    const paths = data.publication?.seriesList?.edges.map(({ node }) => ({
      params: { slug: node.slug },
    })) || [];

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error in series [slug] getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const data = await request(
      process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
      SingleSeriesByPublicationDocument,
      {
        host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
        slug,
      }
    );

    if (!data.publication || !data.publication.series) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        publication: data.publication,
        series: data.publication.series,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(`Error in series [slug] getStaticProps for ${slug}:`, error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};
