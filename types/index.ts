import { ImageSourcePropType } from "react-native";
import { Models } from "react-native-appwrite";

export type User = Models.Document & {
  name: string;
  email: string;
  avatar: string;
};

export type TabBarIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};
