import Giscus from '@giscus/react';

export const Comments = () => {
    return (
        <section className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
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
                theme="preferred_color_scheme"
                lang="zh-CN"
                loading="lazy"
            />
        </section>
    );
};
