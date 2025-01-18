import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CardProps {
  item: {
    images: {
      jpg: {
        large_image_url: string;
      };
    };

    title_english: string;
    mal_id: number;
  };
}

const AnimeCard: React.FC<CardProps> = ({ item }) => {
  const router = useRouter();
  const handlePress = () => {
    router.push({
      pathname: "/anime-details/[id]",
      params: { id: item.mal_id },
    });
  };

  // console.log(item);
  return (
    <Pressable
      className=" p-2 mx-1 rounded-lg overflow-hidden w-[48vw]"
      onPress={handlePress}
    >
      <Animated.Image
        sharedTransitionTag={item.mal_id.toString()}
        className="w-[48vw] h-72 rounded-lg"
        source={{ uri: item.images.jpg.large_image_url }}
      />
      <View className="flex-row justify-between">
        {/* <Text className="text-white">{item.mal_id.toString() + "-image"}</Text> */}
        {/* <Text className="text-white">{item.score}</Text> */}
      </View>
      {/* <Text className="line-clamp-1 text-white">{item?.mal_id}</Text> */}
    </Pressable>
  );
};

export default AnimeCard;
