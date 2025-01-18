export interface AnimeStreaming {
  name: string;
  url: string;
}

export interface GetAnimeStreamingResponse {
  data: AnimeStreaming[];
}
