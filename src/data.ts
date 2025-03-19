import * as Bun from "bun"
import { faker } from "@faker-js/faker"
import type { Comment, User } from "./types"

function createUser(): User {
    return {
        id: faker.string.uuid(),
        name: faker.internet.username(),
    }
}

function createComment(parent_id: string | null, user: User): Comment {
    return {
        id: faker.string.uuid(),
        content: faker.lorem.sentence(),
        parent_id,
        author_id: user.id,
        created_at: faker.date.recent(),
    }
}

function createRandomCommentTree(args: {
    root_count: number
    max_depth: number
    max_children_per_comment: number
}): {
    comments: Comment[]
    users: User[]
} {
    const comments: Comment[] = []
    const users: User[] = []

    for (let i = 0; i < args.root_count; ++i) {
        const user = createUser()
        const root_comment = createComment(null, user)

        users.push(user)
        comments.push(root_comment)
        createChildComments(root_comment.id, 1)
    }

    function createChildComments(parent_id: string, current_depth: number) {
        if (current_depth >= args.max_depth) return
        const children_count = Math.floor(Math.random() * (args.max_children_per_comment + 1))

        for (let i = 0; i < children_count; ++i) {
            const user = createUser()
            const child_comment = createComment(parent_id, user)

            comments.push(child_comment)
            users.push(user)
            createChildComments(child_comment.id, current_depth + 1)
        }
    }

    return {
        comments,
        users,
    }
}

const tree = createRandomCommentTree({
    root_count: 5,
    max_depth: 5,
    max_children_per_comment: 5,
})

await Bun.write(Bun.file("./data.json"), JSON.stringify(tree, null, 4))
