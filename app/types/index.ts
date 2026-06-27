// =============================================================================
// Media Resource (from Spatie Media Library)
// =============================================================================

export interface IMediaUrls {
  original: string;
  thumb?: string;
  preview?: string;
  small?: string;
  medium?: string;
  large?: string;
  webp?: string;
  lazy?: string;
  [key: string]: string | undefined;
}

export interface IMedia {
  id: number;
  name: string;
  file_name: string;
  mime_type: string;
  size: number;
  order: number;
  custom_properties: Record<string, unknown>;
  urls: IMediaUrls;
}

// =============================================================================
// Album
// =============================================================================

export interface IAlbum {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  title_image_text: string | null;
  start_date: string | null;
  end_date: string | null;
  title_image: IMedia;
  images: IMedia[];
  images_count?: number;
}

export type IAlbums = Array<IAlbum>;

// =============================================================================
// Story
// =============================================================================

export interface IStory {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  title_image: IMedia;
  posts?: IPost[];
  posts_count: number;
}

export type IStories = Array<IStory>;

// =============================================================================
// Post
// =============================================================================

export interface IPost {
  id: number;
  story_id: number;
  title: string | null;
  content: string | Record<string, unknown>;
  type: "html" | "image" | "video" | "map";
  position: number;
  date: string | null;
  images?: IMedia[];
  videos?: IMedia[];
  comments?: IComment[];
  comments_count?: number;
}

// =============================================================================
// Comment
// =============================================================================

export interface IComment {
  id: number;
  post_id: number;
  name: string;
  content: string;
  created_at: string;
}

// =============================================================================
// Option
// =============================================================================

export interface IOption<T = unknown> {
  name: string;
  value: T;
}

// =============================================================================
// API Response Wrappers
// =============================================================================

export interface IApiResponse<T> {
  data: T;
}

export interface IPaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface IPaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  links: IPaginationLinks;
  meta: IPaginationMeta;
}


