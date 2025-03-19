import type { Comment } from "@/types"
import { CommentItem } from "@/components/comment-item"

export interface NestedComment extends Comment {
    children: NestedComment[]
}

export interface CommentListProps {
    comments: NestedComment[]
    user_map: Map<string, { name: string }>
    level?: number
}

export function CommentList({ comments, user_map, level = 0 }: CommentListProps) {
    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                    <CommentItem
                        comment={comment}
                        user={user_map.get(comment.author_id)!}
                        level={level}
                    />

                    {comment.children.length > 0 && (
                        <div
                            className={`pl-6 border-l-2 border-gray-200 ml-5 dark:border-gray-700`}
                        >
                            <CommentList
                                comments={comment.children}
                                user_map={user_map}
                                level={level + 1}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
