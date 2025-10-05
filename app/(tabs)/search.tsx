import { CartButton } from "@/components/cart-button";
import { Filter } from "@/components/filter";
import { MenuCard } from "@/components/menu-card";
import { SearchBar } from "@/components/search-bar";
import { getCategories, getMenu } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/appwrite/use-appwrite";
import clsx from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();
  const {
    data: menuItems,
    refetch,
    loading,
  } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
    skip: false,
  });
  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={menuItems}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 !== 0;

          return (
            <View
              className={clsx(
                "flex-1 max-w-[48%}",
                isFirstRightColItem ? "mt-10" : "mt-0"
              )}>
              {/* @ts-expect-error */}
              <MenuCard item={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => {
          return (
            <View className="my-5 gap-5">
              <View className="flex-between flex-row w-full">
                <View className="flex-start">
                  <Text className="small-bold uppercase text-primary">
                    Search
                  </Text>
                  <View className="flex-start flex-row gap-x-1 mt-0.5">
                    <Text className="paragraph-semibold text-dark-100">
                      Find your favorite food
                    </Text>
                  </View>
                </View>
                <CartButton />
              </View>
              <SearchBar />
              {/* @ts-expect-error */}
              <Filter categories={categories} />
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            !loading && (
              <Text className="text-center text-dark-100">No items found</Text>
            )
          );
        }}
      />
    </SafeAreaView>
  );
}
