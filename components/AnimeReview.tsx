// components/AnimeReview.tsx

import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
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

interface AnimeReview {
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
const AnimeReview = ({ review }: { review: AnimeReview }) => {
  const [showSpoiler, setShowSpoiler] = useState(!review.is_spoiler);
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedReview = review.review.slice(0, 150);
  const shouldTruncate = review.review.length > 150;
  // console.log(review.review);
  return (
    <Animated.View
      entering={SlideInRight.springify()}
      className="bg-gray-900/40 rounded-xl p-4 mb-4 w-[80vw] mx-4"
    >
      <View className="flex-row items-center mb-4">
        <Image
          source={{ uri: review.user.images.jpg.image_url }}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-3">
          <Text className="text-white font-medium">{review.user.username}</Text>
          <Text className="text-white/60 text-xs">{review.date}</Text>
        </View>
      </View>

      <View className="flex-row gap-2 mb-4">
        {review.tags.map((tag) => (
          <View key={tag} className="bg-blue-500/20 rounded-full px-3 py-1">
            <Text className="text-blue-400 text-xs">{tag}</Text>
          </View>
        ))}
      </View>

      <Pressable onPress={() => setShowSpoiler(true)}>
        <View className="relative">
          {!showSpoiler && (
            <BlurView
              intensity={95}
              tint="dark"
              className="absolute inset-0 z-10 rounded-lg items-center justify-center"
            >
              <Ionicons name="warning-outline" size={24} color="white" />
              <Text className="text-white mt-2">Spoiler Warning</Text>
              <Text className="text-white/60 text-sm">Tap to reveal</Text>
            </BlurView>
          )}

          <Animated.View entering={FadeIn}>
            <Text className="text-white/90 leading-6">
              {isExpanded ? review.review : truncatedReview}
              {!isExpanded && shouldTruncate && "..."}
            </Text>
            {shouldTruncate && (
              <Pressable onPress={() => setIsExpanded(!isExpanded)}>
                <Text className="text-blue-400 mt-2">
                  {isExpanded ? "Show Less" : "Show More"}
                </Text>
              </Pressable>
            )}
          </Animated.View>
        </View>
      </Pressable>

      <View className="mt-4 border-t border-white/10 pt-4">
        <View className="flex-row justify-between">
          <View className="flex-row gap-4">
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="text-white ml-1">{review.score}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="heart" size={16} color="#FF6B6B" />
              <Text className="text-white ml-1">
                {review.reactions.love_it}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="thumbs-up-outline" size={16} color="white" />
            <Text className="text-white ml-1">{review.reactions.nice}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default AnimeReview;
