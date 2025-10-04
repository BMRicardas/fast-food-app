import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import { CreateUserParams, SignInParams } from "./types";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  platform: "io.ricardas.food-app",
  databaseId: "68e115450012a8c8f721",
  userCollectionId: "68e1394c002d6c61ff38",
};

export const client = new Client()
  .setProject(appwriteConfig.projectId)
  .setEndpoint(appwriteConfig.endpoint)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

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

// export async function signUp({ email, password, name }: CreateUserParams) {
//   try {
//     return await account.create({
//       userId: ID.unique(),
//       email,
//       password,
//       name,
//     });
//   } catch (error) {
//     console.error("Error signing up:", error);
//     throw new Error("Failed to sign up");
//   }
// }
