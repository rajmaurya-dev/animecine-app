import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// In the AnimeDetailScreen component:
const Synopsis = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const firstParagraph = text?.split("\n")[0] || "";

  return (
    <View className="mb-6">
      <Text className="text-white text-xl font-semibold mb-2">Synopsis</Text>
      <Animated.View entering={FadeIn}>
        <Text className="text-white/80 leading-6">
          {expanded ? text : firstParagraph}
        </Text>
        {text?.length > firstParagraph.length && (
          <Pressable onPress={() => setExpanded(!expanded)} className="mt-2">
            <Text className="text-blue-400">
              {expanded ? "Show Less" : "Show More"}
            </Text>
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
};

export default Synopsis;
