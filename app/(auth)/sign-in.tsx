import { CustomButton } from "@/components/custom-button";
import { CustomInput } from "@/components/custom-input";
import { signIn } from "@/lib/appwrite";
import { sleep } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, "Please enter your email").email("Invalid email"),
  password: z
    .string()
    .min(1, "Please enter your password")
    .min(6, "Password must be at least 6 characters long"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    try {
      await sleep();

      await signIn({ email, password });

      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Error", "An error occurred during login.");
      Sentry.captureEvent({
        message: "Login error",
        extra: {
          // @ts-expect-error
          errorMessage: error.message,
          // @ts-expect-error
          errorStack: error.stack,
        },
      });
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => {
          const { onChange } = field;

          return (
            <CustomInput
              {...field}
              label="Email"
              onChangeText={onChange}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              error={error}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => {
          const { onChange } = field;

          return (
            <CustomInput
              {...field}
              label="Password"
              onChangeText={onChange}
              placeholder="Enter your password"
              secureTextEntry={true}
              autoCapitalize="none"
              error={error}
            />
          );
        }}
      />
      <CustomButton
        title="Sign In"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-400">
          Don't have an account?
        </Text>
        <Link href="/sign-up">
          <Text className="base-bold text-primary">Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}
