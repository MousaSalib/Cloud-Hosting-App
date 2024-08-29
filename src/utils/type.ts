import { Article, Comment, User } from "@prisma/client";

export type JWTPayload = {
  id: number;
  isAdmin: boolean;
  username: string;
};

export type UserProfile = User

export type UpdateUserProfile = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
}

export type CommentWithUser = Comment & { user: User };
export type SingleArticle = Article & { comments: CommentWithUser[] };
