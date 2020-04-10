export interface User {
  id: number;
  name?: string;
  email: string;
  password: string;
  introduction?: string;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Relation {
  follow_user: User;
  followed_user: User;
}

export interface Post {
  id: number;
  title: string;
  limit: Date;
  user: User;
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: number;
  content: string;
  is_done: boolean;
  post: Post;
  created_at: Date;
  updated_at: Date;
}

export interface Favorite {
  post: Post;
  user: User;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  content: string;
  user: User;
  post: Post;
  created_at: Date;
  updated_at: Date;
}

export interface Reply {
  content: string;
  user: User;
  comment: Comment;
  created_at: Date;
  updated_at: Date;
}
