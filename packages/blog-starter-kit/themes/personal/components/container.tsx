type Props = {
	children?: React.ReactNode;
	className?: string;
};

export const Container = ({ children, className = '' }: Props) => {
	// 如果 className 中已经包含 px- 类，则不添加默认 padding
	const hasPadding = className.includes('px-');
	const defaultPadding = hasPadding ? '' : 'px-4 sm:px-6 lg:px-8';
	
	return <div className={`container mx-auto ${defaultPadding} ${className}`.trim()}>{children}</div>;
};
