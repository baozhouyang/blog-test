import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { PersonalHeader } from '../components/personal-theme-header';
import { Footer } from '../components/footer';
import { AppProvider } from '../components/contexts/appContext';
import { MarkdownToHtml } from '../components/markdown-to-html';
import { PublicationFragment } from '../generated/graphql';
import { GetStaticProps } from 'next';
import request from 'graphql-request';
import { PageByPublicationDocument } from '../generated/graphql';
import Head from 'next/head';

type Props = {
  publication: PublicationFragment;
  page: {
    title: string;
    content: {
      markdown: string;
    };
  } | null;
};

export default function About({ publication, page }: Props) {
  return (
    <AppProvider publication={publication}>
      <Layout>
        <Head>
          <title>About - {publication.title}</title>
          <meta
            name="description"
            content={`About ${publication.title}`}
          />
        </Head>
        <Container className="mx-auto flex max-w-3xl flex-col items-stretch gap-10 px-5 py-10">
          <PersonalHeader />
          <main>
            <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
              {page?.title || 'About'}
            </h1>
            {page ? (
              <div className="prose prose-sm sm:prose-sm prose-slate mx-auto max-w-none dark:prose-invert overflow-x-hidden">
                <MarkdownToHtml contentMarkdown={page.content.markdown} />
              </div>
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400">
                No about page content found. Please create an about page in your Hashnode dashboard.
              </p>
            )}
          </main>
          <Footer />
        </Container>
      </Layout>
    </AppProvider>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await request(
    process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
    PageByPublicationDocument,
    {
      slug: 'about',
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
    }
  );

  if (!data.publication) {
    return {
      notFound: true,
    };
  }

  const staticPage = data.publication.staticPage;
  
  return {
    props: {
      publication: data.publication,
      page: staticPage ? {
        title: staticPage.title,
        content: {
          markdown: staticPage.content.markdown
        }
      } : null
    },
    revalidate: 60,
  };
};
