import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GetTopMangaResponse } from "@/types/manga";
import { GetTopAnimeResponse } from "@/types/anime";
import { GetAnimeSearchResponse } from "@/types/anime-search";
import { GetAnimeFullByIdResponse } from "@/types/anime-id";
import { GetSeasonNowResponse } from "@/types/season-now-anime";
import { GetAnimeCharactersResponse } from "@/types/anime-characters";
import { GetAnimeStreamingResponse } from "@/types/anime-streaming";
import { GetAnimeRecommendationResponse } from "@/types/anime-recommendation";
import { GetAnimeReviewsResponse } from "@/types/anime-reviews";

const api = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  timeout: 5000,
});

const handleError = (error: unknown, endpoint: string) => {
  const message = error instanceof Error ? error.message : "An error occurred";
  throw new Error(`Failed to fetch ${endpoint}: ${message}`);
};

const replaceUrlParams = (endpoint: string, params: Record<string, any>) => {
  let url = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value?.toString() ?? "");
  });
  return url;
};

const createApiCall = <T>(endpoint: string) => {
  return async (params: Record<string, any> = {}): Promise<T> => {
    try {
      const urlParams = { ...params };
      const queryParams = { ...params };

      delete queryParams.id;

      const url = replaceUrlParams(endpoint, urlParams);
      const { data } = await api.get(url, { params: queryParams });
      return data;
    } catch (error) {
      handleError(error, endpoint);
      throw error;
    }
  };
};

const apiCalls = {
  topAnime: createApiCall<GetTopAnimeResponse>("/top/anime"),
  topManga: createApiCall<GetTopMangaResponse>("/top/manga"),
  seasonNow: createApiCall<GetSeasonNowResponse>("/seasons/now"),
  animeCharacters: createApiCall<GetAnimeCharactersResponse>(
    "/anime/:id/characters"
  ),
  animeRecommendations: createApiCall<GetAnimeRecommendationResponse>(
    "/anime/:id/recommendations"
  ),
  animeReviews: createApiCall<GetAnimeReviewsResponse>("/anime/:id/reviews"),
  animeStreaming: createApiCall<GetAnimeStreamingResponse>(
    "/anime/:id/streaming"
  ),
  animeSearch: createApiCall<GetAnimeSearchResponse>("/anime"),
  animeFullById: createApiCall<GetAnimeFullByIdResponse>("/anime/:id/full"),
};

const createQueryHook = <T>(
  key: string,
  apiFn: (params: Record<string, any>) => Promise<T>
) => {
  return (params: Record<string, any> = {}) =>
    useQuery({
      queryKey: [key, params],
      queryFn: () => apiFn(params),
    });
};

export const useTopAnime = createQueryHook("topAnime", apiCalls.topAnime);
export const useTopManga = createQueryHook("topManga", apiCalls.topManga);
export const useSeasonNow = createQueryHook("seasonNow", apiCalls.seasonNow);
export const useAnimeCharacters = createQueryHook("animeCharacters", (params) =>
  apiCalls.animeCharacters({ ...params, id: params.id })
);
export const useAnimeRecommendation = createQueryHook(
  "animeRecommendation",
  (params) => apiCalls.animeRecommendations({ ...params, id: params.id })
);
export const useAnimeReviews = createQueryHook("animeReviews", (params) =>
  apiCalls.animeReviews({ ...params, id: params.id })
);
export const useAnimeStreaming = createQueryHook("animeStreaming", (params) =>
  apiCalls.animeStreaming({ ...params, id: params.id })
);
export const useAnimeSearch = createQueryHook("animeSearch", (params) =>
  apiCalls.animeSearch({ q: params.searchQuery })
);
export const useAnimeFullById = createQueryHook("animeFullById", (params) =>
  apiCalls.animeFullById({ ...params, id: params.id })
);