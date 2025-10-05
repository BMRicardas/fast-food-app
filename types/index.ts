import { ImageSourcePropType } from "react-native";
import { Models } from "react-native-appwrite";

export type User = Models.Document & {
  name: string;
  email: string;
  avatar: string;
};

export type TabBarIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};

export type CartCustomization = {
  id: string;
  name: string;
  price: number;
  type: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  customizations?: CartCustomization[];
};

export type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, customizations: CartCustomization[]) => void;
  increaseQty: (id: string, customizations: CartCustomization[]) => void;
  decreaseQty: (id: string, customizations: CartCustomization[]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export type ProfileFieldProps = {
  label: string;
  value: string;
  icon: ImageSourcePropType;
};
