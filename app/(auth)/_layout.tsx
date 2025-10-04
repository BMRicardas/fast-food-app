import { IS_AUTHENTICATED } from "@/constants";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  if (IS_AUTHENTICATED) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  );
}
