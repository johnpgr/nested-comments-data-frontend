import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Comment } from "@/types";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentItemProps {
  comment: Comment;
  user: { name: string };
  level: number;
}

export function CommentItem({ comment, user }: CommentItemProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="p-0 pb-2 flex flex-row items-center space-y-0 gap-2">
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.created_at), {
              addSuffix: true,
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 py-2">
        <p className="text-sm">{comment.content}</p>
      </CardContent>
      <CardFooter className="p-0 pt-1 flex gap-4">
        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
          <ThumbsUp className="h-3.5 w-3.5 mr-1" />
          Like
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          Reply
        </Button>
      </CardFooter>
    </Card>
  );
}
