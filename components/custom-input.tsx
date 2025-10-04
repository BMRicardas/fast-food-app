import clsx from "clsx";
import { useState } from "react";
import { FieldError } from "react-hook-form";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type AllowedKeyboardType = Extract<
  KeyboardTypeOptions,
  "default" | "email-address" | "numeric" | "phone-pad"
>;

type Props = TextInputProps & {
  label?: string;
  keyboardType?: AllowedKeyboardType;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: FieldError;
};

export function CustomInput({
  label,
  keyboardType = "default",
  onFocus,
  onBlur,
  error,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      {label && <Text className="label">{label}</Text>}
      <TextInput
        keyboardType={keyboardType}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        placeholderTextColor="#888"
        className={clsx(
          "input",
          isFocused ? "border-primary" : "border-gray-300"
        )}
        {...rest}
      />
      {!!error && <Text className="text-red-500 mt-1">{error.message}</Text>}
    </View>
  );
}
