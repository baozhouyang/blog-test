import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
	
	// 优先级：封面图片 > 文章中的图片 > Unsplash 随机图片
	const imageUrl = coverImageUrl || contentImageUrl || null;
	const coverImageSrc = imageUrl 
		? resizeImage(imageUrl, {
				w: 800,
				h: 420,
				c: 'thumb',
			})
		: null;

	const hasImage = !!coverImageSrc;
	const [unsplashImage, setUnsplashImage] = useState<string | null>(null);
	const [isLoadingUnsplash, setIsLoadingUnsplash] = useState(false);

	// 如果没有图片，获取 Unsplash 随机图片（基于 slug 缓存，确保同一篇文章总是使用相同的图片）
	useEffect(() => {
		// 如果已有图片，不需要获取 Unsplash 图片
		if (hasImage) {
			return;
		}

		// 检查本地存储中是否已有该文章的图片
		const cacheKey = `unsplash_${slug}`;
		let cachedImage: string | null = null;
		
		if (typeof window !== 'undefined') {
			try {
				cachedImage = localStorage.getItem(cacheKey);
			} catch (e) {
				// localStorage 可能已满或不可用
				console.warn('Failed to read from localStorage:', e);
			}
		}
		
		if (cachedImage) {
			// 使用缓存的图片
			setUnsplashImage(cachedImage);
			return;
		}

		// 如果没有缓存，获取新的随机图片
		setIsLoadingUnsplash(true);
		// 使用更多关键词，增加图片多样性
		const query = 'blog,writing,technology,nature,design,code,computer,workspace,creative,ideas,innovation,startup,business,minimal,modern,abstract,art,photography,inspiration,motivation';
		
		// 使用 AbortController 来清理未完成的请求
		const abortController = new AbortController();
		
		fetch(`/api/unsplash-random?query=${encodeURIComponent(query)}&width=800&height=400&slug=${encodeURIComponent(slug)}`, {
			signal: abortController.signal
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then(data => {
				// 检查组件是否已卸载
				if (abortController.signal.aborted) {
					return;
				}
				
				if (data.url && !data.error) {
					// 保存到本地存储，确保同一篇文章总是使用相同的图片
					if (typeof window !== 'undefined') {
						try {
							localStorage.setItem(cacheKey, data.url);
						} catch (e) {
							// localStorage 可能已满，尝试清理旧数据
							console.warn('Failed to write to localStorage, may be full:', e);
							// 可选：清理旧的缓存项
							try {
								const keys = Object.keys(localStorage);
								const unsplashKeys = keys.filter(k => k.startsWith('unsplash_'));
								if (unsplashKeys.length > 50) {
									// 如果超过50个缓存项，删除最旧的10个
									unsplashKeys.slice(0, 10).forEach(k => localStorage.removeItem(k));
									// 重试保存
									localStorage.setItem(cacheKey, data.url);
								}
							} catch (cleanupError) {
								console.warn('Failed to cleanup localStorage:', cleanupError);
							}
						}
					}
					setUnsplashImage(data.url);
				}
				setIsLoadingUnsplash(false);
			})
			.catch(err => {
				// 忽略 AbortError（组件卸载导致的取消）
				if (err.name !== 'AbortError') {
					console.error('Failed to fetch Unsplash image:', err);
				}
				if (!abortController.signal.aborted) {
					setIsLoadingUnsplash(false);
				}
			});

		// 清理函数：组件卸载时取消请求
		return () => {
			abortController.abort();
		};
	}, [hasImage, slug]); // 只依赖 hasImage 和 slug，避免不必要的重新执行

	// 最终使用的图片：优先使用原有图片，其次使用 Unsplash 图片
	const finalImageSrc = coverImageSrc || unsplashImage;
	const hasFinalImage = !!finalImageSrc;

	return (
		<article className="group relative rounded-2xl border border-white/40 dark:border-slate-700/40 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl overflow-hidden transition-all duration-200 hover:border-white/60 dark:hover:border-slate-600/60 hover:bg-white/50 dark:hover:bg-slate-900/50 shadow-glass-light dark:shadow-glass-dark hover:shadow-glass-hover flex flex-col h-full">
			{/* 封面图片 - 紧凑尺寸 */}
			{finalImageSrc ? (
				<div className="relative w-full h-32 sm:h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
					<Link href={postURL} className="block">
						<Image
							src={finalImageSrc}
							alt={title}
							className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							fill
							unoptimized
						/>
					</Link>
				</div>
			) : isLoadingUnsplash ? (
				// 加载中的占位符
				<div className="relative w-full h-32 sm:h-40 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 animate-pulse">
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-600 border-t-transparent rounded-full animate-spin"></div>
					</div>
				</div>
			) : (
				// 没有图片时的装饰性占位区域
				<div className="relative w-full h-32 sm:h-40 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
					{/* 顶部渐变装饰条 */}
					<div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 dark:from-blue-400/50 dark:via-purple-400/50 dark:to-pink-400/50"></div>
					{/* 底部渐变装饰条 */}
					<div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 dark:from-pink-400/30 dark:via-purple-400/30 dark:to-blue-400/30"></div>
				</div>
			)}
			
			{/* 内容区域 - 紧凑布局 */}
			<div className="flex flex-col gap-2 sm:gap-3 backdrop-blur-sm flex-1 p-4 sm:p-5">
				{/* 标题 */}
				<h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-white leading-tight line-clamp-2">
					<Link href={postURL} className="after:absolute after:inset-0">
						{title}
					</Link>
				</h2>

				{/* 摘要 - 显示更多行以提高信息密度 */}
				{brief ? (
					<p className="line-clamp-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 flex-1">
						{brief}
					</p>
				) : (
					<div className="flex-1"></div>
				)}

				{/* 元信息 - 紧凑显示 */}
				<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-auto pt-2">
					<span><DateFormatter dateString={date} /></span>
					<span>·</span>
					<span>{readTimeInMinutes} min</span>
					<span>·</span>
					<span>{author.name}</span>
					{commentCount > 0 && (
						<>
							<span>·</span>
							<span>{commentCount} comments</span>
						</>
					)}
				</div>
			</div>
		</article>
	);
};
