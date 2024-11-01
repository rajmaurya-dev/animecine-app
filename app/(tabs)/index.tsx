import { useTopAnime, useTopManga } from "@/hooks/useJikan";
import { FlashList } from "@shopify/flash-list";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data } = useTopAnime();
  const { data: mangaData } = useTopManga();
  // console.log(data.data);
  return (
    <SafeAreaView className="bg-black h-screen">
      <View className="flex-col mb-2">
        <View>
          <Text className="text-2xl text-white font-semibold">Top Anime</Text>
        </View>
        <FlatList
          data={data?.data}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={(item) => item.mal_id.toString()}
          horizontal
        />
      </View>
      <View className="flex-col">
        <View>
          <Text className="text-2xl text-white font-semibold">Top Anime</Text>
        </View>
        <FlatList
          data={mangaData?.data}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={(item) => item.mal_id.toString()}
          horizontal
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
