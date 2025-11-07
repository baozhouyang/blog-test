import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../components/container';

type ErrorProps = {
	statusCode: number;
	hasGetInitialPropsRun?: boolean;
	err?: Error;
};

function Error({ statusCode }: ErrorProps) {
	return (
		<>
			<Head>
				<title>{statusCode ? `${statusCode} - Error` : 'Error'}</title>
			</Head>
			<div className="min-h-screen bg-[#ffffff] dark:bg-slate-950 flex flex-col">
				<main className="flex-1">
					<Container className="flex min-h-[60vh] flex-col items-center justify-center px-5">
						<div className="text-center">
							<h1 className="mb-4 text-6xl font-bold text-neutral-900 dark:text-neutral-100">
								{statusCode || 'Error'}
							</h1>
							<h2 className="mb-4 text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
								{statusCode === 404
									? 'Page Not Found'
									: statusCode === 500
									? 'Server Error'
									: 'An Error Occurred'}
							</h2>
							<p className="mb-8 text-neutral-600 dark:text-neutral-400">
								{statusCode === 404
									? 'The page you are looking for does not exist.'
									: statusCode === 500
									? 'Something went wrong on our end. Please try again later.'
									: 'An unexpected error occurred. Please try again.'}
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

Error.getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? (err.statusCode as number) : 404;
	return { statusCode };
};

export default Error;

