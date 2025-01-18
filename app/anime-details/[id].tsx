import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import {
  useAnimeCharacters,
  useAnimeFullById,
  useAnimeRecommendation,
  useAnimeReviews,
} from "@/hooks/useJikan";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Synopsis from "@/components/Synopsis";
import Animated, { FadeInRight } from "react-native-reanimated";
import AnimeCard from "@/components/ui/anime-card";
import AnimeReview from "@/components/AnimeReview";

const AnimeDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useAnimeFullById({ id: Number(id) });
  const {
    data: animeCharactersData,
    isLoading: isAnimeCharactersDataLoading,
    error: animeCharactersDataError,
  } = useAnimeCharacters({ id: Number(id) });

  const {
    data: animeRecommendationData,
    isLoading: isAnimeRecommendationLoading,
  } = useAnimeRecommendation({ id: Number(id) });

  const {
    data: animeReviewsData,
    isLoading: isAnimeReviewsLoading,
    error: animeReviewsError,
  } = useAnimeReviews({ id: Number(id) });

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
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <View className="h-[500px] relative">
          <Image
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
            <Synopsis text={data?.data.synopsis || ""} />
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
          <View className="px-4 mt-6">
            <Text className="text-white text-2xl mb-4">Reviews</Text>
            {isAnimeReviewsLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={animeReviewsData?.data}
                renderItem={({ item }) => <AnimeReview review={item} />}
                keyExtractor={(item) => item.mal_id.toString()}
                showsVerticalScrollIndicator={false}
                horizontal
              />
            )}
          </View>
          <View className="mt-6">
            <Text className="text-white text-2xl mb-4">Characters</Text>
            <FlatList
              data={animeCharactersData?.data}
              keyExtractor={(item) => item.character.mal_id.toString()}
              renderItem={({ item, index }) => (
                <Animated.View
                  entering={FadeInRight.delay(index * 100)}
                  className="mr-4 w-[160px]"
                >
                  <Pressable>
                    <View className="bg-gray-900/50 rounded-2xl overflow-hidden">
                      <Image
                        source={{ uri: item.character.images.jpg.image_url }}
                        className="w-full h-[180px]"
                        resizeMode="cover"
                      />
                      <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.9)"]}
                        className="absolute bottom-0 left-0 right-0 h-20"
                      />
                      <View className="absolute bottom-2 left-2 right-2">
                        <Text
                          className="text-white font-medium"
                          numberOfLines={1}
                        >
                          {item.character.name}
                        </Text>
                        <View className="flex-row items-center mt-1">
                          <View className="bg-blue-500/30 rounded-full px-2 py-0.5">
                            <Text className="text-blue-400 text-xs">
                              {item.role}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    {item.voice_actors?.[0] && (
                      <View className="mt-2 flex-row items-center">
                        <Image
                          source={{
                            uri: item.voice_actors[0].person.images.jpg
                              .image_url,
                          }}
                          className="w-6 h-6 rounded-full"
                        />
                        <Text
                          className="text-white/70 text-xs ml-2"
                          numberOfLines={1}
                        >
                          {item.voice_actors[0].person.name}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                </Animated.View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: 8 }}
            />
          </View>

          <View className="mt-6">
            <FlatList
              data={animeRecommendationData?.data}
              keyExtractor={(item) => item.entry.mal_id.toString()}
              renderItem={({ item }) => {
                return (
                  <AnimeCard
                    item={{
                      images: item.entry.images,
                      title_english: item.entry.title,
                      mal_id: item.entry.mal_id,
                    }}
                  />
                );
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
