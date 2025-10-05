import { CartItem } from "@/components/cart-item";
import { CustomButton } from "@/components/custom-button";
import { CustomHeader } from "@/components/custom-header";
import { useCartStore } from "@/store/cart.store";
import clsx from "clsx";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
};

function PaymentInfoStripe({ label, value, labelStyle, valueStyle }: Props) {
  return (
    <View className="flex-between flex-row my-1">
      <Text className={clsx("paragraph-medium text-gray-500", labelStyle)}>
        {label}
      </Text>
      <Text className={clsx("paragraph-bold text-dark-100", valueStyle)}>
        {value}
      </Text>
    </View>
  );
}

export default function Cart() {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={items}
        renderItem={({ item }) => {
          return <CartItem item={item} />;
        }}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => {
          return <CustomHeader title="Your Cart" />;
        }}
        ListEmptyComponent={() => {
          return <Text>Cart is empty</Text>;
        }}
        ListFooterComponent={() => {
          return (
            totalItems > 0 && (
              <View className="gap-5">
                <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                  <Text className="h3-bold text-dark-100 mb-5">
                    Payment Summary
                  </Text>
                  <PaymentInfoStripe
                    label={`Total Items (${totalItems})`}
                    value={`$${totalPrice.toFixed(2)}`}
                  />
                  <PaymentInfoStripe label={`Delivery Fee`} value={`$5.00`} />
                  <PaymentInfoStripe
                    label={`Discount`}
                    value={`-$1.50`}
                    valueStyle="!text-success"
                  />
                  <View className="border-t border-gray-300 my-2" />
                  <PaymentInfoStripe
                    label={`Total`}
                    value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                    labelStyle="base-bold !text-dark-100"
                    valueStyle="base-bold !text-dark-100 !text-right"
                  />
                </View>
                <CustomButton title="Order Now" />
              </View>
            )
          );
        }}
      />
    </SafeAreaView>
  );
}
