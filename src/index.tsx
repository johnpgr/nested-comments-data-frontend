import { Comments } from "./components/comments"

export default function HomePage() {
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">Comments</h1>
            <Comments />
        </div>
    )
}
