export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}