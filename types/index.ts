export interface Album {
  id: number;
  title: string;
  slug: string;
  description: string;
  title_image: Image;
  start_date: string;
  end_date: string;
  images_count: number;
}

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
  posts?: Post;
}

export interface Post {
  title: string;
  content: string;
  type: string;
  date: string;
  images?: Image[];
}

