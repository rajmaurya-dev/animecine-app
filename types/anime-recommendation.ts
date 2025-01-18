export interface RecommendationImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface RecommendationImages {
  jpg: RecommendationImage;
  webp: RecommendationImage;
}

export interface RecommendationEntry {
  mal_id: number;
  url: string;
  images: RecommendationImages;
  title: string;
}

export interface AnimeRecommendation {
  entry: RecommendationEntry;
}

export interface GetAnimeRecommendationResponse {
  data: AnimeRecommendation[];
}
