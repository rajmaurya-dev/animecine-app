// Types for API response
interface AnimeDetail {
  data: {
    mal_id: number;
    title_english: string;
    title_japanese: string;
    images: {
      jpg: {
        large_image_url: string;
      };
    };
    synopsis: string;
    score: number;
    rank: number;
    popularity: number;
    status: string;
    episodes: number;
    duration: string;
    rating: string;
    genres: Array<{ name: string }>;
    studios: Array<{ name: string }>;
    year: number;
  };
}
import Animated from "react-native-reanimated";

import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useAnimeFullById } from "@/hooks/useJikan";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";

const AnimeDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useAnimeFullById(Number(id));

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Error loading anime details</Text>
      </View>
    );
  }

  return (
    <Animated.View className="flex-1 bg-black">
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <View className="h-[500px] relative">
          <Animated.Image
            sharedTransitionTag={data?.data.mal_id.toString() + "-image"}
            source={{ uri: data?.data.images.jpg.large_image_url }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            className="absolute bottom-0 left-0 right-0 h-64"
          />
          <View className="absolute bottom-6 left-4 right-4">
            <Text className="text-white text-3xl font-bold mb-2">
              {data?.data.title_english}
            </Text>
            <Text className="text-white/70 text-lg">
              {data?.data.title_japanese}
            </Text>
          </View>
        </View>

        <View className="px-4 py-6">
          <Text className="text-white text-xl font-semibold mb-2">
            {data?.data.mal_id.toString()}
          </Text>
          <View className="flex-row justify-between mb-6">
            <View className="items-center">
              <Text className="text-yellow-500 text-2xl font-bold">
                {data?.data.score}
              </Text>
              <Text className="text-white/60">Score</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">
                {data?.data.rank}
              </Text>
              <Text className="text-white/60">Rank</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">
                {data?.data.popularity}
              </Text>
              <Text className="text-white/60">Popularity</Text>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-white text-xl font-semibold mb-2">
              Synopsis
            </Text>
            <Text className="text-white/80 leading-6">
              {data?.data.synopsis}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-6">
            {data?.data.genres.map((genre) => (
              <View
                key={genre.name}
                className="bg-white/10 px-3 py-1 rounded-full"
              >
                <Text className="text-white">{genre.name}</Text>
              </View>
            ))}
          </View>

          <View className="space-y-2">
            <InfoRow label="Episodes" value={data?.data?.episodes ?? "N/A"} />
            <InfoRow label="Duration" value={data?.data.duration ?? "N/A"} />
            <InfoRow label="Status" value={data?.data.status ?? "N/A"} />
            <InfoRow
              label="Studios"
              value={data?.data.studios.map((s) => s.name).join(", ") ?? "N/A"}
            />
            <InfoRow label="Year" value={data?.data.year ?? "N/A"} />
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View className="flex-row justify-between">
    <Text className="text-white/60">{label}</Text>
    <Text className="text-white">{value}</Text>
  </View>
);

export default AnimeDetailScreen;
