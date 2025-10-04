import { CustomButton } from "@/components/custom-button";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  return (
    <View>
      <Text>SignIn</Text>
      <CustomButton
        title="Go to Sign Up"
        onPress={() => {
          router.push("/(auth)/sign-up");
        }}
      />
    </View>
  );
}
