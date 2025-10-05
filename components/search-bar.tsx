import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

export function SearchBar() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query ?? "");

  function handleSearch(text: string) {
    setQuery(text);

    if (!text) router.setParams({ query: undefined });
  }

  const handleSubmit = () => {
    if (query.trim()) router.setParams({ query });
  };

  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholder="Search for pizzas, burgers, etc."
        placeholderTextColor="A0A0A0"
        returnKeyType="search"
      />
      <TouchableOpacity
        className="pr-5"
        onPress={() => {
          router.setParams({ query });
        }}>
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor="#5D5F6D"
        />
      </TouchableOpacity>
    </View>
  );
}
