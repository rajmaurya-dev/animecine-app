import AnimeCard from "@/components/ui/anime-card";
import CarouselCard from "@/components/ui/carousel-card";
import { useSeasonNow, useTopAnime, useTopManga } from "@/hooks/useJikan";
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
  const { data: seasonNow } = useSeasonNow();
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-1">
          <Carousel
            loop
            width={width}
            height={500}
            autoPlay={true}
            data={data?.data ?? []}
            autoPlayInterval={5000}
            scrollAnimationDuration={2000}
            renderItem={({ item }) => <CarouselCard item={item} />}
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
        {/* <View className="flex-col">
          <View>
            <Text className="text-2xl text-white font-semibold">Top Manga</Text>
          </View>
          <FlatList
            data={mangaData?.data}
            renderItem={({ item }) => <AnimeCard item={item} />}
            keyExtractor={(item) => item.mal_id.toString()}
            horizontal
          />
        </View> */}
        <View className="flex-col">
          <View>
            <Text className="text-2xl text-white font-semibold">Ongoing</Text>
          </View>
          <FlatList
            data={seasonNow?.data}
            renderItem={({ item }) => <AnimeCard item={item} />}
            keyExtractor={(item) => item.mal_id.toString()}
            horizontal
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
