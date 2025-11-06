/**
 * 从 markdown 内容中提取第一张图片的 URL
 * @param markdown - Markdown 内容
 * @returns 第一张图片的 URL，如果没有则返回 null
 */
export function extractFirstImageFromMarkdown(markdown: string | null | undefined): string | null {
	if (!markdown) {
		return null;
	}

	// 调试：输出前500个字符以便查看格式
	if (process.env.NODE_ENV === 'development') {
		console.log('Markdown preview:', markdown.substring(0, 500));
	}

	// 1. 优先匹配 HTML img 标签（Hashnode 可能使用 HTML 格式）
	// 匹配各种格式: <img src="url">, <img src='url'>, <img src=url>
	const htmlImageRegex = /<img[^>]+src\s*=\s*["']?([^"'\s>]+)["']?[^>]*>/i;
	const htmlMatches = markdown.match(htmlImageRegex);
	if (htmlMatches && htmlMatches[1]) {
		let url = htmlMatches[1].trim();
		// 处理相对 URL
		if (url.startsWith('//')) {
			url = 'https:' + url;
		}
		// 验证是有效的 URL
		if (url && (url.startsWith('http') || url.startsWith('https') || url.includes('cdn.hashnode') || url.includes('hashnode.imgix') || url.includes('cloudinary'))) {
			console.log('Found HTML image:', url);
			return url;
		}
	}

	// 2. 匹配 markdown 图片语法: ![alt](url) 或 ![alt](url "title") 或 ![alt](url align="center")
	const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
	let markdownMatch;
	while ((markdownMatch = markdownImageRegex.exec(markdown)) !== null) {
		if (markdownMatch[2]) {
			let url = markdownMatch[2].trim();
			// 移除 Hashnode 的特殊属性（如 align="center"）
			// 只保留 URL 部分，移除空格后的所有内容
			url = url.split(/\s+/)[0].trim();
			// 移除可能的引号
			url = url.replace(/^["']|["']$/g, '').trim();
			// 处理协议相对 URL
			if (url.startsWith('//')) {
				url = 'https:' + url;
			}
			// 验证是有效的 URL（必须是 http/https 开头，或者是 Hashnode CDN）
			if (url && (url.startsWith('http') || url.includes('cdn.hashnode') || url.includes('hashnode.imgix') || url.includes('cloudinary'))) {
				console.log('Found Markdown image:', url);
				return url;
			}
		}
	}

	// 3. 匹配任何包含图片域名的 URL（Hashnode 特定的）
	const cdnImageRegex = /(https?:\/\/[^\s<>"']*(?:cdn\.hashnode|hashnode\.imgix|cloudinary|res\.cloudinary)[^\s<>"']*\.(?:jpg|jpeg|png|gif|webp|svg|bmp)(?:\?[^\s<>"']*)?)/i;
	const cdnMatch = markdown.match(cdnImageRegex);
	if (cdnMatch && cdnMatch[1]) {
		console.log('Found CDN image:', cdnMatch[1]);
		return cdnMatch[1].trim();
	}

	// 4. 最后尝试匹配任何图片 URL
	const anyImageRegex = /(https?:\/\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?[^\s<>"']*)?)/i;
	const anyMatch = markdown.match(anyImageRegex);
	if (anyMatch && anyMatch[1]) {
		console.log('Found any image:', anyMatch[1]);
		return anyMatch[1].trim();
	}

	console.log('No image found in markdown');
	return null;
}

