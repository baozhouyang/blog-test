import Link from 'next/link';
import { FaInfinity } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from './contexts/appContext';
import { ToggleTheme } from './toggle-theme';
import { useRouter } from 'next/router';
import { SearchModal } from './search-modal';

export const PersonalHeader = () => {
  const { publication, post, page } = useAppContext();
  const router = useRouter();
  const isHome = router.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine visibility based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderNavItems = (mobile = false) => (
    <ul className={`flex items-center ${mobile ? 'flex-col gap-4' : 'gap-6 lg:gap-8'}`}>
      {!isHome && (
        <li>
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors text-sm sm:text-base"
            onClick={() => mobile && setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
      )}
      <li>
        <Link
          href="/tags"
          className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors text-sm sm:text-base"
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          Tags
        </Link>
      </li>
      <li>
        <Link
          href="/series"
          className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors text-sm sm:text-base"
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          Series
        </Link>
      </li>
      <li>
        <Link
          href="/archive"
          className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors text-sm sm:text-base"
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          Archive
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className="text-slate-500 hover:text-slate-900 dark:text-[hsla(0,0%,100%,.6)] dark:hover:text-[hsla(0,0%,100%,.87)] transition-colors text-sm sm:text-base"
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          About
        </Link>
      </li>
    </ul>
  );

  // 搜索和主题切换按钮（用于桌面端和移动端）
  const renderActionButtons = () => (
    <div className="flex items-center gap-4 sm:gap-5">
      <button
        onClick={() => setIsSearchOpen(true)}
        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        title="Search"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
        </svg>
      </button>
      <ToggleTheme />
    </div>
  );

  return (
    <header className={`sticky top-0 z-40 bg-white/20 dark:bg-[#121212]/20 backdrop-blur-[3px] border-b border-slate-200/50 dark:border-neutral-800/50 rounded-t-2xl rounded-b-2xl transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className={`mx-auto transition-all duration-300 ${isScrolled
        ? 'max-w-7xl px-3 sm:px-4 lg:px-6'
        : 'max-w-7xl px-6 sm:px-8 lg:px-12'
        }`}>
        <div className={`relative flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-12 sm:h-14' : 'h-14 sm:h-16'
          }`}>
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              aria-label={publication.title}
              className={`font-semibold text-slate-900 hover:text-slate-700 dark:text-[hsla(0,0%,100%,.87)] dark:hover:text-white transition-all duration-300 ${isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                }`}
            >
              <FaInfinity className="h-6 w-6 sm:h-7 sm:w-7" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            {renderNavItems()}
            {renderActionButtons()}
          </nav>

          {/* Mobile: 搜索和主题切换按钮 + 菜单按钮 */}
          <div className="flex items-center gap-3 md:hidden">
            {renderActionButtons()}
            <button
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#121212] md:hidden">
            <nav className="px-4 sm:px-6 py-4">
              {renderNavItems(true)}
            </nav>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
