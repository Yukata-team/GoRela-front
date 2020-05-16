export interface User {
  id?: number;
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
  user: User;
  title: string;
  detail: string;
  limit: Date;
  tasks: Task[];
  comments: Comment[];
  favorites: Favorite[];
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: number;
  post_id: number;
  content: string;
  is_done: boolean;
}

export interface Favorite {
  id: number;
  post_id: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Comment {
  content: string;
  user: User;
  post_id: number;
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
