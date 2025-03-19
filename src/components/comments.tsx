import { CommentList } from "./comment-list"
import data from "@/data.json" assert { type: "json" }

const user_map = (() => {
    const map = new Map<string, { name: string }>()

    for (const user of data.users) {
        map.set(user.id, user)
    }

    return map
})()

const comments_nested = (() => {
    const comments_parsed = data.comments.map((comment) => ({
        ...comment,
        created_at: new Date(comment.created_at),
    }))

})()


export function Comments() {
    return (
        <div className="space-y-6">
            <CommentList comments={comments_nested} user_map={user_map} />
        </div>
    )
}
