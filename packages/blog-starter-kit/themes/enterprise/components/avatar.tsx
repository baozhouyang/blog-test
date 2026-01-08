import { resizeImage } from '@starter-kit/utils/image';
import { DEFAULT_AVATAR } from '../utils/const';
import Image from 'next/image';

type Props = {
	username: string;
	name: string;
	picture: string | null | undefined;
	size: number;
};

export const Avatar = ({ username, name, picture, size }: Props) => {
	const avatarSize = size || 32;
	return (
		<div className="flex items-center gap-2">
			<a
				href={`https://hashnode.com/@${username}`}
				className="block overflow-hidden rounded-full"
				style={{ width: avatarSize, height: avatarSize }}
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					className="block h-full w-full"
					src={resizeImage(picture, { w: 160, h: 160, c: 'face' }, DEFAULT_AVATAR)}
					alt={name}
					width={avatarSize}
					height={avatarSize}
				/>
			</a>
			<div className="text-base font-bold text-slate-600 dark:text-neutral-300">
				<a href={`https://hashnode.com/@${username}`} target="_blank" rel="noopener noreferrer">
					{name}
				</a>
			</div>
		</div>
	);
};
