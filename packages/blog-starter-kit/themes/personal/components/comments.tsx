import Giscus from '@giscus/react';

export const Comments = () => {
    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

    const isDev = process.env.NODE_ENV === 'development';
    const isMissingConfig = !repo || !repoId || !category || !categoryId;

    if (isMissingConfig && isDev) {
        return (
            <section className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
                <div className="p-4 border border-red-500 bg-red-50 dark:bg-red-900/10 rounded-lg text-red-600 dark:text-red-400">
                    <h3 className="font-bold mb-2">Giscus Configuration Missing</h3>
                    <p className="text-sm">
                        Please add the following environment variables to your <code>.env.local</code> file:
                    </p>
                    <ul className="list-disc list-inside text-xs mt-2 font-mono">
                        {!repo && <li>NEXT_PUBLIC_GISCUS_REPO</li>}
                        {!repoId && <li>NEXT_PUBLIC_GISCUS_REPO_ID</li>}
                        {!category && <li>NEXT_PUBLIC_GISCUS_CATEGORY</li>}
                        {!categoryId && <li>NEXT_PUBLIC_GISCUS_CATEGORY_ID</li>}
                    </ul>
                    <p className="text-xs mt-4">
                        Don't forget to restart your server after adding them!
                    </p>
                </div>
            </section>
        );
    }

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
