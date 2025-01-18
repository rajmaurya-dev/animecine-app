import { Stack, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        // options={{
        //   headerShown: true,
        //   headerTransparent: true,
        //   headerTintColor: "#fff",
        //   headerTitle: "",
        //   headerBackVisible: true,
        //   headerStyle: {
        //     backgroundColor: "transparent",
        //   },
        //   headerShadowVisible: false,
        // }}
      />
    </Stack>
  );
}
