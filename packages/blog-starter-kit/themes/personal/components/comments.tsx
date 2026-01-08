import Giscus from '@giscus/react';

export const Comments = () => {
    return (
        <section className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
            <Giscus
                id="comments"
                repo={(process.env.NEXT_PUBLIC_GISCUS_REPO || "") as `${string}/${string}`}
                repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
                category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || ""}
                categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="preferred_color_scheme"
                lang="en"
                loading="lazy"
            />
        </section>
    );
};
