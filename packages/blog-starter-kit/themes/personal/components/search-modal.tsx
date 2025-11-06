import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { request } from 'graphql-request';
import { useAppContext } from './contexts/appContext';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!;

interface SearchResult {
	id: string;
	title: string;
	brief: string;
	slug: string;
	publishedAt: string;
	url: string;
	coverImage?: {
		url: string;
	};
}

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
	const { publication } = useAppContext();
	const [searchQuery, setSearchQuery] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	// 当模态框打开时，聚焦输入框
	useEffect(() => {
		if (isOpen && inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [isOpen]);

	// 点击背景关闭和防止背景滚动
	useEffect(() => {
		if (isOpen) {
			// 防止背景滚动
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	// ESC 键关闭
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
		}

		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [isOpen, onClose]);

	const handleSearch = async (e?: React.FormEvent) => {
		e?.preventDefault();
		
		if (!searchQuery.trim() || !publication?.id) {
			return;
		}

		setIsLoading(true);
		setHasSearched(true);

		try {
			const searchData = await request<{
				searchPostsOfPublication: {
					edges: Array<{
						node: SearchResult;
					}>;
				};
			}>(
				GQL_ENDPOINT,
				`
				query SearchPosts($filter: SearchPostsOfPublicationFilter!, $first: Int!) {
					searchPostsOfPublication(filter: $filter, first: $first) {
						edges {
							node {
								id
								title
								brief
								slug
								publishedAt
								url
								coverImage {
									url
								}
							}
						}
					}
				}
				`,
				{
					filter: {
						publicationId: publication.id,
						query: searchQuery.trim(),
					},
					first: 10,
				}
			);

			const searchResults = searchData.searchPostsOfPublication.edges.map((edge) => edge.node);
			setResults(searchResults);
		} catch (error) {
			console.error('Search error:', error);
			setResults([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleResultClick = () => {
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-start justify-center pt-8 sm:pt-16">
			{/* 背景遮罩 - 毛玻璃效果 */}
			<div 
				className="absolute inset-0 bg-black/30 backdrop-blur-md"
				onClick={onClose}
			/>
			
			{/* 搜索模态框 */}
			<div
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}
				className="relative w-full max-w-2xl mx-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 overflow-hidden"
			>
				{/* 搜索框 */}
				<div className="p-6 border-b border-white/20 dark:border-slate-700/20 backdrop-blur-sm">
					<div className="relative">
						<input
							ref={inputRef}
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSearch();
								}
							}}
							placeholder="搜索文章..."
							className="w-full rounded-xl border border-white/40 dark:border-slate-700/40 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-4 py-3 pr-12 text-base focus:border-blue-400/60 dark:focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 shadow-sm"
						/>
						<button
							onClick={() => handleSearch()}
							disabled={isLoading || !searchQuery.trim()}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							title="搜索"
						>
							{isLoading ? (
								<svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
									<path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
								</svg>
							)}
						</button>
					</div>
				</div>

				{/* 搜索结果 */}
				<div className="max-h-[60vh] overflow-y-auto">
					{hasSearched && (
						<>
							{isLoading ? (
								<div className="p-8 text-center text-slate-600 dark:text-slate-300 backdrop-blur-sm">
									<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
									<p className="mt-4">正在搜索...</p>
								</div>
							) : results.length > 0 ? (
								<div className="p-4 backdrop-blur-sm">
									<div className="mb-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
										找到 {results.length} {results.length === 1 ? '个结果' : '个结果'}
									</div>
									<div className="space-y-2">
										{results.map((result) => {
											// 将完整 URL 转换为相对路径
											const href = result.url.startsWith('http') 
												? new URL(result.url).pathname 
												: `/${result.slug}`;
											
											return (
												<Link
													key={result.id}
													href={href}
													onClick={handleResultClick}
													className="block w-full text-left p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:border-white/50 dark:hover:border-slate-600/50 transition-all duration-200 group shadow-sm"
												>
												<div className="flex flex-col sm:flex-row sm:items-start gap-3">
													{result.coverImage?.url && (
														<div className="w-full sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 shrink-0 shadow-sm">
															<img
																src={result.coverImage.url}
																alt={result.title}
																className="w-full h-full object-cover"
															/>
														</div>
													)}
													<div className="flex-1 min-w-0">
														<h3 className="text-base font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
															{result.title}
														</h3>
														{result.brief && (
															<p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
																{result.brief}
															</p>
														)}
														<time
															dateTime={result.publishedAt}
															className="mt-2 block text-xs text-slate-500 dark:text-slate-500"
														>
															{new Date(result.publishedAt).toLocaleDateString('zh-CN', {
																year: 'numeric',
																month: 'long',
																day: 'numeric',
															})}
														</time>
													</div>
												</div>
											</Link>
											);
										})}
									</div>
								</div>
							) : searchQuery.trim() ? (
								<div className="p-8 text-center text-slate-600 dark:text-slate-300 backdrop-blur-sm">
									<p className="font-medium">未找到匹配的文章</p>
									<p className="text-sm mt-2 text-slate-500 dark:text-slate-400">尝试使用不同的关键词</p>
								</div>
							) : null}
						</>
					)}
					{!hasSearched && (
						<div className="p-8 text-center text-slate-600 dark:text-slate-300 backdrop-blur-sm">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 mx-auto mb-4 opacity-40">
								<path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
							</svg>
							<p className="font-medium">输入关键词搜索文章</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

