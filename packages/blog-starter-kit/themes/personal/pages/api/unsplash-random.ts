import { NextApiRequest, NextApiResponse } from 'next';

// 使用环境变量或默认值（建议将 Client-ID 添加到 .env.local）
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY || 'qkhOlyTjd_HIx-fnNF-v3I76891vyVmkhv8OXcx9JMA';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		// 获取查询参数
		const { query, orientation, width = '800', height = '400', slug } = req.query;

		// 构建 Unsplash API URL
		let url = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`;
		
		// 添加可选参数
		if (query) {
			url += `&query=${encodeURIComponent(query as string)}`;
		}
		if (orientation) {
			url += `&orientation=${orientation}`;
		}
		// 添加尺寸参数（用于动态调整）
		url += `&w=${width}&h=${height}`;
		
		// 注意：slug 参数用于日志记录，Unsplash API 本身不支持基于 slug 的确定性随机
		// 确定性通过客户端的 localStorage 缓存实现

		// 请求随机图片
		const response = await fetch(url);
		
		if (!response.ok) {
			throw new Error(`Unsplash API error: ${response.status}`);
		}

		const data = await response.json();

		// 返回图片 URL（使用 regular 尺寸，或根据需求调整）
		res.status(200).json({
			url: data.urls.regular || data.urls.small,
			thumb: data.urls.thumb,
			small: data.urls.small,
			regular: data.urls.regular,
			full: data.urls.full,
			description: data.description || data.alt_description,
			author: {
				name: data.user?.name,
				username: data.user?.username,
				profile_url: data.user?.links?.html,
			},
		});
	} catch (error) {
		console.error('Error fetching Unsplash image:', error);
		res.status(500).json({ 
			error: 'Failed to fetch random image',
			message: error instanceof Error ? error.message : 'Unknown error'
		});
	}
}

