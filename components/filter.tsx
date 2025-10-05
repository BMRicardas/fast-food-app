import { Category } from "@/lib/appwrite/types";
import clsx from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";

type Props = {
  categories: Category[];
};

export function Filter({ categories }: Props) {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || "");

  function handlePress(id: string) {
    setActive(id);

    if (id === "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  }

  const filterData = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            key={item.$id}
            className={clsx(
              "filter",
              active === item.$id ? "bg-amber-500" : "bg-white"
            )}
            style={
              Platform.OS === "android"
                ? { elevation: 5, shadowColor: "#878787" }
                : {}
            }
            onPress={() => handlePress(item.$id)}>
            <Text
              className={clsx(
                "body-medium",
                active === item.$id ? "text-white" : "text-gray-500"
              )}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}
