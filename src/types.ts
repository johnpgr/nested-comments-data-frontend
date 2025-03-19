export interface User {
    id: string
    name: string
}

export interface Comment {
    id: string
    content: string
    parent_id: string | null
    author_id: string
    created_at: Date
}
