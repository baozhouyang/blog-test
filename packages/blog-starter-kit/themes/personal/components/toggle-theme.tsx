import { ComponentProps } from 'react';
import { useTheme } from 'next-themes';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

type Props = ComponentProps<'button'>;

export function ToggleTheme(props: Props) {
	const { setTheme, theme } = useTheme();

	return (
		<button
			aria-label="toggle"
			className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
			onClick={() => {
				setTheme(theme === 'dark' ? 'light' : 'dark');
			}}
      {...props}
		>
			<HiOutlineSun className="h-6 w-6 scale-100 dark:hidden dark:scale-0 transition-transform" />
			<HiOutlineMoon className="hidden h-6 w-6 scale-0 dark:block dark:scale-100 transition-transform" />
		</button>
	);
}
