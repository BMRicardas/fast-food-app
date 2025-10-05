import { Models } from "react-native-appwrite";

export type CreateUserParams = {
  email: string;
  password: string;
  name: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type GetMenuParams = {
  category: string;
  query: string;
};

export type Category = Models.Document & {
  name: string;
  description: string;
};

export type Customization = {
  name: string;
  price: number;
  type: "topping" | "side";
};

export type MenuItem = Models.Document & {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[];
};

export type DummyData = {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
};

export type UseAppwriteOptions<T, P extends Record<string, string | number>> = {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
};
