export interface IAlbum {
  id: number;
  title: string;
  slug: string;
  description: string;
  title_image: IImage;
  start_date: string;
  end_date: string;
  images_count: number;
  images: IImage[];
}

export type IAlbums = Array<IAlbum>;

export interface IImage {
  title: string;
  description: string;
  path: string;
  extension: string;
  height: string;
  width: string;
}
export interface IStory {
  id: number;
  title: string;
  description: string;
  path: string;
  slug: string;
  title_image: IImage;
  created_at: Date;
  posts_count: number;
  posts?: IPagedPosts;
}
export type Stories = Array<IStory>;

export interface IPost {
  id: number;
  title: string;
  content: string;
  type: string;
  date: string;
  images?: IImage[];
  comments?: IComment[];
}

export interface IPagedPosts {
  current_page: number;
  data: IPost[];
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
