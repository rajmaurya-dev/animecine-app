export interface MangaImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface MangaImages {
  jpg: MangaImage;
  webp: MangaImage;
}

export interface Title {
  type: string;
  title: string;
}

export interface PublishedDate {
  day: number;
  month: number;
  year: number;
}

export interface Prop {
  from: PublishedDate;
  to: PublishedDate;
  string: string;
}

export interface Published {
  from: string;
  to: string;
  prop: Prop;
}

export interface Author {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Serialization {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Manga {
  mal_id: number;
  url: string;
  images: MangaImages;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  chapters: number;
  volumes: number;
  status: string;
  publishing: boolean;
  published: Published;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Author[];
  serializations: Serialization[];
  genres: Genre[];
  explicit_genres: Genre[];
  themes: Genre[];
  demographics: Genre[];
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface GetTopMangaResponse {
  data: Manga[];
  pagination: Pagination;
}
