import { seed } from "@/lib/appwrite/seed";
import { Alert } from "react-native";
import { CustomNativeButton } from "./custom-native-button";

export function SeedDbButton() {
  return (
    <CustomNativeButton
      title="Seed"
      onPress={() =>
        seed().catch((error: unknown) => {
          console.error({ seedError: error });
          Alert.alert("Error", "Seeding failed. Check console for details.");
        })
      }
    />
  );
}
