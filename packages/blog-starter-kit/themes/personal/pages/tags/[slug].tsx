import { Container } from '../../components/container';
import { MinimalPosts } from '../../components/minimal-posts';
import { Layout } from '../../components/layout';
import { PersonalHeader } from '../../components/personal-theme-header';
import { Footer } from '../../components/footer';
import { AppProvider } from '../../components/contexts/appContext';
import { PostFragment, PublicationFragment } from '../../generated/graphql';
import { GetStaticPaths, GetStaticProps } from 'next';
import request from 'graphql-request';
import { PostsByPublicationDocument } from '../../generated/graphql';
import Head from 'next/head';
import Link from 'next/link';
import { DateFormatter } from '../../components/date-formatter';

type Props = {
  posts: PostFragment[];
  publication: PublicationFragment;
  tag: string;
  slug: string;
};

export default function TagPosts({ posts, publication, tag, slug }: Props) {
  // 过滤出包含当前标签的文章
  const taggedPosts = posts.filter(
    post => post.tags?.some(t => t.slug === slug)
  ).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <AppProvider publication={publication}>
      <Layout>
        <Head>
          <title>{tag} - {publication.title}</title>
          <meta
            name="description"
            content={`Posts tagged with ${tag} on ${publication.title}`}
          />
        </Head>
        <Container className="mx-auto flex max-w-7xl flex-col items-stretch gap-10 px-5 py-10">
          <PersonalHeader />
          <main>
            <div className="mb-8 flex items-baseline gap-4">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {tag}
              </h1>
              <span className="text-base text-slate-500 dark:text-slate-400">
                {taggedPosts.length} {taggedPosts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>
            <MinimalPosts context="tag" posts={taggedPosts} />
          </main>
          <Footer />
        </Container>
      </Layout>
    </AppProvider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await request(
    process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
    PostsByPublicationDocument,
    {
      first: 0,
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
    }
  );

  if (!data.publication) {
    return {
      paths: [],
      fallback: 'blocking'
    };
  }

  // 提取所有唯一的标签 slug
  const slugs = new Set<string>();
  data.publication.posts.edges.forEach(edge => {
    edge.node.tags?.forEach(tag => {
      slugs.add(tag.slug);
    });
  });

  return {
    paths: Array.from(slugs).map(slug => ({
      params: { slug }
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const data = await request(
    process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
    PostsByPublicationDocument,
    {
      first: 0,
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
    }
  );

  if (!data.publication) {
    return {
      notFound: true
    };
  }

  // 找到标签名称
  let tagName = '';
  data.publication.posts.edges.some(edge => {
    const tag = edge.node.tags?.find(t => t.slug === slug);
    if (tag) {
      tagName = tag.name;
      return true;
    }
    return false;
  });

  if (!tagName) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      posts: data.publication.posts.edges.map((edge) => edge.node),
      publication: data.publication,
      tag: tagName,
      slug
    },
    revalidate: 60,
  };
};
