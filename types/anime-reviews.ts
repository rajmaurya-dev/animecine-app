export interface UserImage {
  image_url: string;
}

export interface UserImages {
  jpg: UserImage;
  webp: UserImage;
}

export interface ReviewUser {
  username: string;
  url: string;
  images: UserImages;
}

export interface Reactions {
  overall: number;
  nice: number;
  love_it: number;
  funny: number;
  confusing: number;
  informative: number;
  well_written: number;
  creative: number;
}

export interface AnimeReview {
  user: ReviewUser;
  mal_id: number;
  url: string;
  type: string;
  reactions: Reactions;
  date: string;
  review: string;
  score: number;
  tags: string[];
  is_spoiler: boolean;
  is_preliminary: boolean;
  episodes_watched: number;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
}

export interface GetAnimeReviewsResponse {
  data: AnimeReview[];
  pagination: Pagination;
}
