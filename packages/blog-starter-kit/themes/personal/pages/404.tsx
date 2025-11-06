import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../components/container';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404 - Page Not Found</title>
			</Head>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-neutral-950 dark:to-slate-900 flex flex-col">
				<main className="flex-1">
					<Container className="flex min-h-[60vh] flex-col items-center justify-center px-5">
						<div className="text-center">
							<h1 className="mb-4 text-6xl font-bold text-neutral-900 dark:text-neutral-100">404</h1>
							<h2 className="mb-4 text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
								Page Not Found
							</h2>
							<p className="mb-8 text-neutral-600 dark:text-neutral-400">
								The page you are looking for does not exist.
							</p>
							<Link
								href="/"
								className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
							>
								Go Home
							</Link>
						</div>
					</Container>
				</main>
			</div>
		</>
	);
}

