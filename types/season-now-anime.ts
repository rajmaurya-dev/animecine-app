export interface SeasonNowImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface SeasonNowImages {
  jpg: SeasonNowImage;
  webp: SeasonNowImage;
}

export interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

export interface Title {
  type: string;
  title: string;
}

export interface AiredDate {
  day: number;
  month: number;
  year: number;
}

export interface AiredProp {
  from: AiredDate;
  to: AiredDate;
  string: string;
}

export interface Aired {
  from: string;
  to: string;
  prop: AiredProp;
}

export interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface Producer {
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

export interface SeasonNowAnime {
  mal_id: number;
  url: string;
  images: SeasonNowImages;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Producer[];
  licensors: Producer[];
  studios: Producer[];
  genres: Genre[];
  explicit_genres: Genre[];
  themes: Genre[];
  demographics: Genre[];
}

export interface PaginationItems {
  count: number;
  total: number;
  per_page: number;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  items: PaginationItems;
}

export interface GetSeasonNowResponse {
  data: SeasonNowAnime[];
  pagination: Pagination;
}
