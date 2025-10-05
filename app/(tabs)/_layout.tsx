import { images } from "@/constants";
import { useAuthStore } from "@/store/auth.store";
import { TabBarIconProps } from "@/types";
import clsx from "clsx";
import { Redirect, router, Tabs } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

function TabBarIcon({ focused, icon, title }: TabBarIconProps) {
  useEffect(() => {
    router.navigate("/cart");
  }, []);

  return (
    <View className="tab-icon">
      <Image
        source={icon}
        className="size-7"
        resizeMode="contain"
        tintColor={focused ? "#FE8C00" : "#5D5F6D"}
      />
      <Text
        className={clsx(
          "text-sm font-bold",
          focused ? "text-primary" : "text-gray-400"
        )}>
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // borderTopLeftRadius: 50,
          // borderTopRightRadius: 50,
          // borderBottomLeftRadius: 50,
          // borderBottomRightRadius: 50,
          borderRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={images.person}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
