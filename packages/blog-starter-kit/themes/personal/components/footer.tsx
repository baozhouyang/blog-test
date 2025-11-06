import { useAppContext } from './contexts/appContext';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

export const Footer = () => {
	const { publication } = useAppContext();
	const hasSocialLinks = publication.links && (
		publication.links.twitter || 
		publication.links.github || 
		publication.links.linkedin ||
		publication.links.instagram
	);

	return (
		<footer className="border-t border-slate-200 dark:border-slate-800 mt-auto">
			<div className="container mx-auto flex flex-col items-center gap-6 sm:gap-8 py-8 sm:py-12 md:py-16 px-4 sm:px-5">
				{/* Blog Name */}
				<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
					{publication.displayTitle || publication.title}
				</h2>

				{/* Copyright */}
				<div className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center">
					Copyright &copy; {new Date().getFullYear()} - All rights reserved
				</div>

				{/* Social Media Icons */}
				{hasSocialLinks && publication.links && (
					<div className="flex items-center justify-center gap-4 sm:gap-6">
						{publication.links.twitter && (
							<a
								href={publication.links.twitter}
								target="_blank"
								rel="noopener noreferrer"
								className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
								title="X (Twitter)"
								aria-label="X (Twitter)"
							>
								<SiX className="w-5 h-5 sm:w-6 sm:h-6" />
							</a>
						)}
						{publication.links.github && (
							<a
								href={publication.links.github}
								target="_blank"
								rel="noopener noreferrer"
								className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
								title="GitHub"
								aria-label="GitHub"
							>
								<FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
							</a>
						)}
						{publication.links.linkedin && (
							<a
								href={publication.links.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
								title="LinkedIn"
								aria-label="LinkedIn"
							>
								<FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
							</a>
						)}
						{publication.links.instagram && (
							<a
								href={publication.links.instagram}
								target="_blank"
								rel="noopener noreferrer"
								className="text-slate-600 hover:text-pink-500 dark:text-slate-400 dark:hover:text-pink-400 transition-colors"
								title="Instagram"
								aria-label="Instagram"
							>
								<FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
							</a>
						)}
					</div>
				)}

				{/* Powered by info - smaller at bottom */}
				<div className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 text-center pt-2 border-t border-slate-200 dark:border-slate-800 w-full max-w-md">
					<div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
					<span>Powered by</span>
					<a href="https://hashnode.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
						Hashnode
					</a>
					<span>•</span>
						<span>Built by bzycool</span>
					</div>
				</div>
			</div>
		</footer>
	);
};
