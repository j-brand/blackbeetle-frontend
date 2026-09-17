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

/** Editorial tile size for one gallery image. */
export type TileVariant = "normal" | "wide" | "tall" | "large";

/**
 * Per-image layout resolved by the backend. `tile` is typed as string because
 * the wire format is not type-safe — `useGalleryLayout` narrows it.
 */
export interface IMediaLayout {
  tile?: string | null;
  focal_point?: string | null;
  aspect_ratio?: number | null;
}

/** Normalised, render-ready tile description. */
export interface IGalleryTile {
  variant: TileVariant;
  /** Tailwind span classes — literal strings, never composed at runtime. */
  class: string;
  /** Inline custom properties, currently only `--tile-focal`; undefined when
   *  the focal point is the default. Vue still renders an empty `style=""`
   *  either way — harmless, the CSS falls back via `var(…, center)`. */
  style?: Record<string, string>;
  /** `sizes` matching the rendered tile width. */
  sizes: string;
}

export interface IMedia {
  id: number;
  name: string;
  file_name: string;
  mime_type: string;
  size: number;
  order: number;
  custom_properties: Record<string, unknown>;
  /** Absent for non-image media (video, PDF). */
  layout?: IMediaLayout | null;
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


