import { ImageSourcePropType } from "react-native";

export type User = {
  name: string;
  email: string;
  avatar: string;
};

export type TabBarIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};
