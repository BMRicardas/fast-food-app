import { IS_AUTHENTICATED } from "@/constants";
import { Redirect, Slot } from "expo-router";

export default function TabsLayout() {
  if (!IS_AUTHENTICATED) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Slot />;
}
