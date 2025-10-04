import { CustomButton } from "@/components/custom-button";
import { CustomInput } from "@/components/custom-input";
import { createUser } from "@/lib/appwrite";
import { sleep } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
  // confirmPassword: z
  //   .string()
  //   .min(1, "Confirm Password is required")
  //   .min(6, "Confirm Password must be at least 6 characters long"),
});
// .superRefine(({ password, confirmPassword }, ctx) => {
//   if (password !== confirmPassword) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Passwords do not match",
//       path: ["confirmPassword"],
//     });
//   }
// });

type FormValues = z.infer<typeof formSchema>;

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({
    name,
    email,
    password,
    // confirmPassword,
  }) => {
    try {
      await sleep();

      // Call Appwrite sign-up function here
      console.log("Signing up with data:", {
        name,
        email,
        password,
        // confirmPassword,
      });

      await createUser({ name, email, password });

      router.replace("/");
    } catch (error) {
      console.error("Sign-up error:", error);
      Alert.alert("Sign-Up Error", "An error occurred during sign-up.");
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => {
          const { onChange } = field;
          return (
            <CustomInput
              {...field}
              label="Name"
              onChangeText={onChange}
              placeholder="Enter your name"
              error={error}
            />
          );
        }}
      />
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
      {/* <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState: { error } }) => {
          const { onChange } = field;
          return (
            <CustomInput
              {...field}
              label="Confirm Password"
              onChangeText={onChange}
              placeholder="Confirm your password"
              secureTextEntry={true}
              autoCapitalize="none"
              error={error}
            />
          );
        }}
      /> */}
      <CustomButton
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-400">
          Already have an account?
        </Text>
        <Link href="/sign-in">
          <Text className="base-bold text-primary">Sign In</Text>
        </Link>
      </View>
    </View>
  );
}
