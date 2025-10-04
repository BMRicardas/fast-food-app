import { images } from "@/constants";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TOTAL_ITEMS_IN_CART = 10;

export const CartButton = () => {
  return (
    <TouchableOpacity className="cart-btn" onPress={() => {}}>
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {TOTAL_ITEMS_IN_CART > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{TOTAL_ITEMS_IN_CART}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
