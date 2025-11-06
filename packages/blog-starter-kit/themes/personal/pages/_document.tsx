import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* 中文字体 - 霞鹜文楷 */}
				<link
					rel="stylesheet"
					href="https://chinese-fonts-cdn.deno.dev/packages/lxgwwenkai/dist/lxgwwenkai-regular/result.css"
					crossOrigin="anonymous"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
