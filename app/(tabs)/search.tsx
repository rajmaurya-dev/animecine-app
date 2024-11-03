import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { useAnimeSearch } from "@/hooks/useJikan";
import { debounce } from "lodash";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { Anime } from "@/types/anime";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data, isLoading } = useAnimeSearch(searchQuery);
  console.log(data?.data.map((item) => item.title));
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearchQuery(text);
    }, 500),
    []
  );

  const renderItem = ({ item, index }: { item: Anime; index: number }) => (
    <Animated.View
      className={"w-[48vw] h-64"}
      entering={FadeInUp.delay(index * 100)}
      layout={Layout.springify()}
    >
      <Pressable
        onPress={() => router.push(`/anime-details/${item.mal_id}`)}
        className="flex-1 m-1 rounded-xl overflow-hidden bg-gray-900/30"
      >
        <Image
          source={{ uri: item.images.jpg.large_image_url }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <BlurView
          intensity={80}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <Text className="text-white font-semibold" numberOfLines={1}>
            {item.title_english || item.title}
          </Text>
          <Text className="text-white/70 text-sm">
            {item.type} • {item.year}
          </Text>
        </BlurView>
      </Pressable>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-black pt-12">
      <View className="px-4 mb-4">
        <Text className="text-3xl font-bold text-white mb-4">Search</Text>
        <View className="relative">
          <Ionicons
            name="search"
            size={20}
            color="white"
            style={{ position: "absolute", left: 12, top: 12 }}
          />
          <TextInput
            className="bg-gray-800/50 h-12 pl-12 pr-4 rounded-xl text-white"
            placeholder="Search anime..."
            placeholderTextColor="gray"
            onChangeText={debouncedSearch}
          />
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : !data?.data.length && searchQuery ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white/70">No results found</Text>
        </View>
      ) : searchQuery ? (
        <FlashList
          data={data?.data}
          renderItem={renderItem}
          estimatedItemSize={200}
          numColumns={2}
          contentContainerStyle={{ padding: 8 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Ionicons
            name="search-outline"
            size={48}
            color="rgba(255,255,255,0.3)"
          />
          <Text className="text-white/30 mt-4">Start typing to search</Text>
        </View>
      )}
    </View>
  );
}
