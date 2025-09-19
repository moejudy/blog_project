export interface Blog {
  id: number;
  title: string;
  content: string;
  date: string | number;
}

export type NewBlog = Omit<Blog, "id">;