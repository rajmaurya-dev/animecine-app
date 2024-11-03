import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

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

const CarouselCard: React.FC<CardProps> = ({ item }) => {
  return (
    <View className="relative h-[500px] mx-1 rounded-xl overflow-hidden w-[99vw]">
      <Image
        className="w-full h-full"
        source={{ uri: item?.images.jpg.large_image_url }}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        className="absolute bottom-0 left-0 right-0 h-56"
      />
      {/* <View className="absolute top-2 right-2">
        <View className="bg-yellow-500/90 px-2 py-1 rounded-full">
          <Text className="text-white font-bold">★ {item?.score}</Text>
        </View>
      </View> */}
      <View className="absolute bottom-4 left-4 right-4">
        <Text className="text-white text-xs uppercase tracking-wider mb-1 opacity-80">
          {item?.type}
        </Text>
        <Text className="text-white text-xl font-bold" numberOfLines={1}>
          {item?.title_english}
        </Text>
      </View>
    </View>
  );
};

export default CarouselCard;
