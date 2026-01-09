import { Analytics } from './analytics';
import { Integrations } from './integrations';
import { Meta } from './meta';
import { Scripts } from './scripts';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<Scripts />
			<div className="min-h-screen bg-[#ffffff] dark:bg-[#121212] flex flex-col">
				<main className="flex-1">{children}</main>
			</div>
			<Analytics />
			<Integrations />
		</>
	);
};
