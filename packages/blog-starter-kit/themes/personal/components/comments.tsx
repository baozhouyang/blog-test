import { PostFullFragment } from '../generated/graphql';
import { MarkdownToHtml } from './markdown-to-html';
import { resizeImage } from '@starter-kit/utils/image';
import { DateFormatter } from './date-formatter';
import Image from 'next/image';

type Props = {
    comments: PostFullFragment['comments'];
};

export const Comments = ({ comments }: Props) => {
    const totalComments = comments.totalDocuments;
    const commentEdges = comments.edges ?? [];

    if (totalComments === 0) {
        return null;
    }

    return (
        <section className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                Comments ({totalComments})
            </h2>
            <div className="space-y-10">
                {commentEdges.map(({ node: comment }) => (
                    <div key={comment.id} className="flex gap-4 group">
                        <div className="flex-shrink-0">
                            {comment.author.profilePicture ? (
                                <a href={`https://hashnode.com/@${comment.author.username}`} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={resizeImage(comment.author.profilePicture, { w: 96, h: 96, c: 'thumb' })}
                                        alt={comment.author.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full bg-slate-100 dark:bg-slate-800 transition-opacity group-hover:opacity-90"
                                    />
                                </a>
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                            )}
                        </div>
                        <div className="flex-1 space-y-3 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <a
                                    href={`https://hashnode.com/@${comment.author.username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors truncate"
                                >
                                    {comment.author.name}
                                </a>
                                <span className="hidden sm:block text-slate-300 dark:text-slate-600">•</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                    @{comment.author.username}
                                </span>
                            </div>
                            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                                <MarkdownToHtml contentMarkdown={comment.content.markdown} />
                            </div>
                            {comment.totalReactions > 0 && (
                                <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-medium ml-1">
                                    <span>❤️</span>
                                    <span>{comment.totalReactions} reactions</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
