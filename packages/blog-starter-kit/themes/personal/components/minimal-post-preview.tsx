import Link from 'next/link';
import Image from 'next/image';
import { User } from '../generated/graphql';
import { DateFormatter } from './date-formatter';
import { resizeImage } from '@starter-kit/utils/image';

type Author = Pick<User, 'name'>;

type Props = {
	title: string;
	date: string;
	author: Author;
	slug: string;
	commentCount: number;
	brief?: string | null;
	readTimeInMinutes: number;
	coverImageUrl?: string | null;
	contentImageUrl?: string | null;
};

export const MinimalPostPreview = ({ 
	title, 
	date, 
	slug, 
	commentCount, 
	brief, 
	author, 
	readTimeInMinutes,
	coverImageUrl,
	contentImageUrl
}: Props) => {
	const postURL = `/${slug}`;
	
	// 优先级：封面图片 > 文章中的图片 > 无图片
	const imageUrl = coverImageUrl || contentImageUrl || null;
	const coverImageSrc = imageUrl 
		? resizeImage(imageUrl, {
				w: 800,
				h: 420,
				c: 'thumb',
			})
		: null;

	return (
		<article className="group relative rounded-2xl border border-white/40 dark:border-slate-700/40 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl overflow-hidden transition-all duration-200 hover:border-white/60 dark:hover:border-slate-600/60 hover:bg-white/50 dark:hover:bg-slate-900/50 shadow-glass-light dark:shadow-glass-dark hover:shadow-glass-hover">
			{/* 封面图片 */}
			{coverImageSrc && (
				<div className="relative w-full h-48 sm:h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
					<Link href={postURL} className="block">
						<Image
							src={coverImageSrc}
							alt={title}
							className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							fill
							unoptimized
						/>
					</Link>
				</div>
			)}
			
			<div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 backdrop-blur-sm">
				{/* 标题 */}
				<h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
					<Link href={postURL} className="after:absolute after:inset-0">
						{title}
					</Link>
				</h2>

				{/* 摘要 */}
				{brief && (
					<p className="line-clamp-2 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
						{brief}
					</p>
				)}

				{/* 元信息 */}
				<div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
					<span>Date: <DateFormatter dateString={date} /></span>
					<span className="hidden sm:inline">|</span>
					<span className="block sm:inline">Reading: {readTimeInMinutes} min</span>
					<span className="hidden sm:inline">|</span>
					<span className="block sm:inline">Author: {author.name}</span>
					{commentCount > 0 && (
						<>
							<span className="hidden sm:inline">|</span>
							<span className="block sm:inline">Comments: {commentCount}</span>
						</>
					)}
				</div>
			</div>
		</article>
	);
};
