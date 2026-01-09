import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

// Use boolean to determine theme based on 'dark' class presence
// This is more reliable than localStorage when using next-themes with attribute="class"
const getThemeFromDOM = () => {
    if (typeof window === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

export const Comments = () => {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        setMounted(true);
        // Set initial theme
        setTheme(getThemeFromDOM());

        // Observe DOM for class changes (next-themes toggles 'dark' class)
        const observer = new MutationObserver(() => {
            setTheme(getThemeFromDOM());
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'], // Changed from 'data-theme' to 'class'
        });

        return () => observer.disconnect();
    }, []);

    if (!mounted) return null;

    return (
        <section className="mt-12 pt-12 border-t border-slate-200 dark:border-neutral-800 w-full">
            <Giscus
                id="comments"
                repo="baozhouyang/blog-test"
                repoId="R_kgDOQPmW4Q"
                category="Announcements"
                categoryId="DIC_kwDOQPmW4c4C0tqJ"
                mapping="title"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme}
                lang="zh-CN"
                loading="lazy"
            />
        </section>
    );
};
