import { CustomButton } from "@/components/custom-button";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignUp() {
  return (
    <View>
      <Text>SignIn</Text>
      <CustomButton
        title="Go to Sign In"
        onPress={() => {
          router.push("/(auth)/sign-in");
        }}
      />
    </View>
  );
}
