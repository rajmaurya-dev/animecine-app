import AnimeCard from "@/components/ui/anime-card";
import CarouselCard from "@/components/ui/carousel-card";
import { useTopAnime, useTopManga } from "@/hooks/useJikan";
import { FlashList } from "@shopify/flash-list";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data } = useTopAnime();
  const { data: mangaData } = useTopManga();
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView className="bg-black min-h-screen">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-1">
          <Carousel
            loop
            width={width}
            height={200}
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ index }) => (
              <CarouselCard item={data?.data[index]} />
            )}
          />
        </View>
        <View className="flex-col mb-2">
          <View>
            <Text className="text-2xl text-white font-semibold">Top Anime</Text>
          </View>
          <FlatList
            data={data?.data}
            renderItem={({ item }) => <AnimeCard item={item} />}
            keyExtractor={(item) => item.mal_id.toString()}
            horizontal
          />
        </View>
        <View className="flex-col">
          <View>
            <Text className="text-2xl text-white font-semibold">Top Manga</Text>
          </View>
          <FlatList
            data={mangaData?.data}
            renderItem={({ item }) => <AnimeCard item={item} />}
            keyExtractor={(item) => item.mal_id.toString()}
            horizontal
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
