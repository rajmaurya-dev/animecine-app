import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface AnimeResponse {
  data: Array<{
    mal_id: number;
    title: string;
    images: {
      jpg: { image_url: string };
    };
    synopsis: string;
    score: number;
  }>;
  pagination: {
    has_next_page: boolean;
    current_page: number;
  };
}

interface MangaResponse {
  data: Array<{
    mal_id: number;
    title: string;
    images: {
      jpg: { image_url: string };
    };
    synopsis: string;
    score: number;
  }>;
  pagination: {
    has_next_page: boolean;
    current_page: number;
  };
}

// API Functions
const fetchTopAnime = async (page = 1) => {
  try {
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/top/anime?page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch top anime");
  }
};

const fetchTopManga = async (page = 1) => {
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
): Promise<AnimeResponse> => {
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
): Promise<{ data: AnimeResponse["data"][0] }> => {
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
