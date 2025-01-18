import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        className="absolute h-full w-full"
      />
      <Animated.View
        entering={FadeIn}
        className="flex-1 items-center justify-center px-8"
      >
        <View className="items-center mb-8">
          <Ionicons name="person-circle-outline" size={100} color="white" />
          <Text className="text-white/90 text-2xl font-semibold mt-4">
            Welcome to AnimeCine
          </Text>
          <Text className="text-white/60 text-center mt-2">
            Sign in to track your favorite anime, create watchlists, and more.
          </Text>
        </View>
        <Pressable
          onPress={() => setShowModal(true)}
          className="w-full bg-white/10 py-4 rounded-xl mb-4"
        >
          <Text className="text-white text-center font-medium">Sign In</Text>
        </Pressable>

        <Pressable
          onPress={() => setShowModal(true)}
          className="w-full border border-white/20 py-4 rounded-xl"
        >
          <Text className="text-white text-center font-medium">
            Create Account
          </Text>
        </Pressable>
        <Text className="text-white/40 text-sm mt-8 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Animated.View>

      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          onPress={() => setShowModal(false)}
          className="flex-1 justify-center items-center bg-black/80"
        >
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="bg-gray-900/90 m-8 p-6 rounded-2xl border border-white/10"
          >
            <View className="items-center">
              <Ionicons name="construct-outline" size={50} color="#FFD700" />
              <Text className="text-white text-xl font-semibold mt-4 text-center">
                Under Construction
              </Text>
              <Text className="text-white/60 text-center mt-2">
                We're working hard to bring you this feature soon!
              </Text>
              <Pressable
                onPress={() => setShowModal(false)}
                className="mt-6 bg-white/10 px-8 py-3 rounded-xl"
              >
                <Text className="text-white font-medium">Close</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Profile;
