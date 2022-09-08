export interface Album {
  id: number;
  title: string;
  slug: string;
  description: string;
  title_image: Image;
  start_date: string;
  end_date: string;
  images_count: number;
  images: Image[];
}

export type Albums = Array<Album>;

export interface Image {
  title: string;
  description: string;
  path: string;
  extension: string;
  height: string;
  width: string;
}
export interface Story {
  id: number;
  title: string;
  description: string;
  path: string;
  slug: string;
  title_image: Image;
  created_at: Date;
  posts_count: number;
  posts?: PagedPosts;
}
export type Stories = Array<Story>;

export interface Post {
  id: number;
  title: string;
  content: string;
  type: string;
  date: string;
  images?: Image[];
  comments?: IComment[];
}

export interface PagedPosts {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface IComment {
  id: number;
  post_id: number;
  name: string;
  content: string;
  created_at: Date;
}
