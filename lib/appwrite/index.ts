import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import { CreateUserParams, GetMenuParams, SignInParams } from "./types";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  platform: "io.ricardas.food-app",
  databaseId: "68e115450012a8c8f721",
  assetsBucketId: "68e19cb2000f474908c2",
  userCollectionId: "68e1394c002d6c61ff38",
  categoriesCollectionId: "68e19709000f33ca963b",
  menuCollectionId: "68e197990035b7b0037e",
  customizationsCollectionId: "68e199f70013431bf060",
  menuCustomizationsCollectionId: "68e19aee000b9d9ebab1",
};

export const client = new Client()
  .setProject(appwriteConfig.projectId)
  .setEndpoint(appwriteConfig.endpoint)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export async function createUser({ email, password, name }: CreateUserParams) {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });

    if (!newAccount) {
      throw new Error("Failed to create user");
    }

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.userCollectionId,
      documentId: ID.unique(),
      data: {
        accountId: newAccount.$id,
        name,
        email,
        avatar: avatarUrl,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function signIn({ email, password }: SignInParams) {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    return session;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error("No user is currently logged in");
    }

    const currentUser = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.userCollectionId,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });

    if (!currentUser || currentUser.total === 0) {
      throw new Error("User document not found");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
}

export async function getMenu({ category, query }: GetMenuParams) {
  try {
    const queries = [];

    if (category) {
      queries.push(Query.equal("categories", category));
    }

    if (query) {
      queries.push(Query.search("name", query));
    }

    const menus = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.menuCollectionId,
      queries,
    });

    return menus.documents;
  } catch (error) {
    console.error("Error getting menu:", error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const categories = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.categoriesCollectionId,
    });

    return categories.documents;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
}
