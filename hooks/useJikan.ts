import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GetTopMangaResponse } from "@/types/manga";
import { GetTopAnimeResponse } from "@/types/anime";
import { GetAnimeSearchResponse } from "@/types/anime-search";
import { GetAnimeFullByIdResponse } from "@/types/anime-id";
import { GetSeasonNowResponse } from "@/types/season-now-anime";

// API Functions
const fetchTopAnime = async (page = 1): Promise<GetTopAnimeResponse> => {
  try {
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/top/anime?page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch top anime");
  }
};
const fetchSeasonNow = async (): Promise<GetSeasonNowResponse> => {
  try {
    const { data } = await axios.get(`https://api.jikan.moe/v4/seasons/now`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch top anime");
  }
};

const fetchTopManga = async (page = 1): Promise<GetTopMangaResponse> => {
  try {
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/top/manga?page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch top manga");
  }
};

const fetchAnimeSearch = async (
  query: string,
  page = 1
): Promise<GetAnimeSearchResponse> => {
  try {
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error("Failed to search anime");
  }
};

const fetchAnimeFullById = async (
  id: number
): Promise<GetAnimeFullByIdResponse> => {
  try {
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/full`
    );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch anime details");
  }
};

// Hooks
export const useTopAnime = (page = 1) => {
  return useQuery({
    queryKey: ["topAnime", page],
    queryFn: () => fetchTopAnime(page),
  });
};
export const useSeasonNow = () => {
  return useQuery({
    queryKey: ["seasonNow"],
    queryFn: () => fetchSeasonNow(),
  });
};

export const useTopManga = (page = 1) => {
  return useQuery({
    queryKey: ["topManga", page],
    queryFn: () => fetchTopManga(page),
  });
};

export const useAnimeSearch = (query: string, page = 1) => {
  return useQuery({
    queryKey: ["animeSearch", query, page],
    queryFn: () => fetchAnimeSearch(query, page),
  });
};

export const useAnimeFullById = (id: number) => {
  return useQuery({
    queryKey: ["animeFullById", id],
    queryFn: () => fetchAnimeFullById(id),
  });
};
