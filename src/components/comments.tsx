import { Comment } from "@/types";
import { CommentList, NestedComment } from "./comment-list";
import data from "@/data.json" assert { type: "json" };

function commentToNested(c: Comment): NestedComment {
  return {
    id: c.id,
    parent_id: c.parent_id,
    author_id: c.author_id,
    content: c.content,
    created_at: c.created_at,
    children: [],
  };
}

const user_map = (() => {
  const map = new Map<string, { name: string }>();

  for (const user of data.users) {
    map.set(user.id, user);
  }

  return map;
})();

const comments_nested = (() => {
  console.time("comments_nested")
  const comments_parsed = data.comments.map((comment) => ({
    ...comment,
    created_at: new Date(comment.created_at),
  }));

  const grouped = Object.groupBy(
    comments_parsed,
    ({ parent_id }) => parent_id ?? "root",
  );

  if (!grouped.root) return [];
  const nested_comments: NestedComment[] = [];
  for (const comment of grouped.root) {
    nestComments(comment, grouped, nested_comments);
  }

  console.timeEnd("comments_nested")
  return nested_comments;
})();

function nestComments(
  comment: Comment,
  comments_grouped: Partial<Record<string, Comment | Comment[]>>,
  nest: NestedComment[],
) {
  const current = commentToNested(comment);
  nest.push(current);

  const children = comments_grouped[comment.id];
  if (children) {
    if (Array.isArray(children)) {
      for (const child of children) {
        nestComments(child, comments_grouped, current.children);
      }
    } else {
      nestComments(children, comments_grouped, current.children);
    }
  }
}

export function Comments() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 px-2">
        <CommentList comments={comments_nested} user_map={user_map} />
        <pre className="text-sm">{JSON.stringify(comments_nested, null, 2)}</pre>
      </div>
    </div>
  );
}
