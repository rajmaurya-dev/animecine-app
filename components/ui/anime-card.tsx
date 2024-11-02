import { View, Text, Image } from "react-native";
import React from "react";

interface CardProps {
  item: {
    images: {
      jpg: {
        large_image_url: string;
      };
    };
    type: string;
    score: number;
    title_english: string;
  };
}

const AnimeCard: React.FC<CardProps> = ({ item }) => {
  return (
    <View className="bg-gray-100 p-2 mx-1 rounded-lg overflow-hidden w-36">
      <Image
        className="w-32 h-48"
        source={{ uri: item.images.jpg.large_image_url }}
      />
      <View className="flex-row justify-between">
        <Text>{item.type}</Text>
        <Text>{item.score}</Text>
      </View>
      <Text className="line-clamp-1">{item.title_english}</Text>
    </View>
  );
};

export default AnimeCard;
