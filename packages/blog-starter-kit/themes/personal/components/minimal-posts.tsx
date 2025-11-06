import { PostFragment } from '../generated/graphql';
import { MinimalPostPreview } from './minimal-post-preview';
import { extractFirstImageFromMarkdown } from '../utils/extract-image';

type Props = {
	posts: PostFragment[];
	context: 'home' | 'series' | 'tag';
};

export const MinimalPosts = ({ posts }: Props) => {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
			{posts.map((post) => {
				// 提取文章中的第一张图片
				const contentImageUrl = extractFirstImageFromMarkdown(post.content?.markdown);
				const coverImageUrl = post.coverImage?.url || null;
				
				// 调试：检查数据（仅在开发环境）
				if (process.env.NODE_ENV === 'development') {
					const contentLength = post.content?.markdown?.length || 0;
					const contentPreview = post.content?.markdown?.substring(0, 200) || '';
					console.log('Post:', post.title, {
						hasContent: !!post.content?.markdown,
						contentLength,
						hasCoverImage: !!coverImageUrl,
						coverImageUrl,
						contentImageUrl,
						finalImageUrl: contentImageUrl || coverImageUrl || 'NO IMAGE',
						contentPreview: contentPreview.substring(0, 100) + '...',
					});
				}
				
				return (
				<MinimalPostPreview
					key={post.id}
					title={post.title}
					date={post.publishedAt}
					author={{
						name: post.author.name,
					}}
					slug={post.slug}
					commentCount={post.comments?.totalDocuments}
					brief={post.brief}
					readTimeInMinutes={post.readTimeInMinutes}
						coverImageUrl={coverImageUrl}
						contentImageUrl={contentImageUrl}
				/>
				);
			})}
		</section>
	);
};
