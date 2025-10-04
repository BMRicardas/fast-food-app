import clsx from "clsx";
import { ReactNode } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  style?: string;
  textStyle?: string;
  leftIcon?: ReactNode;
  isLoading?: boolean;
};

export function CustomButton({
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <TouchableOpacity className={clsx("custom-btn", style)} {...rest}>
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            className={clsx("text-white-100 paragraph-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
