import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./";
import { dummyData } from "./data";

const data = dummyData;

async function clearAll(collectionId: string) {
  const list = await databases.listDocuments(
    appwriteConfig.databaseId,
    collectionId
  );

  await Promise.all(
    list.documents.map(async (doc) => {
      try {
        await databases.deleteDocument(
          appwriteConfig.databaseId,
          collectionId,
          doc.$id
        );
      } catch (error) {
        console.error(`Failed to delete document with ID: ${doc.$id}`, error);
      }
    })
  );
}

async function clearStorage() {
  const list = await storage.listFiles(appwriteConfig.assetsBucketId);

  await Promise.all(
    list.files.map(async (file) => {
      try {
        await storage.deleteFile(appwriteConfig.assetsBucketId, file.$id);
      } catch (error) {
        console.error(`Failed to delete file with ID: ${file.$id}`, error);
      }
    })
  );
}

async function uploadImageToStorage(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();

    const fileObj = {
      name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
      type: blob.type || "image/png",
      size: blob.size,
      uri: imageUrl,
    };

    const file = await storage.createFile(
      appwriteConfig.assetsBucketId,
      ID.unique(),
      fileObj
    );

    const viewUrl = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.assetsBucketId}/files/${file.$id}/view?project=${appwriteConfig.projectId}`;

    return viewUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function seed() {
  try {
    // 1. Clear all
    await clearAll(appwriteConfig.categoriesCollectionId);
    await clearAll(appwriteConfig.customizationsCollectionId);
    await clearAll(appwriteConfig.menuCollectionId);
    await clearAll(appwriteConfig.menuCustomizationsCollectionId);
    await clearStorage();

    // 2. Create Categories

    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.categoriesCollectionId,
        ID.unique(),
        cat
      );
      categoryMap[cat.name] = doc.$id;
    }

    // 3. Create Customizations

    const customizationMap: Record<string, string> = {};
    for (const cus of data.customizations) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.customizationsCollectionId,
        ID.unique(),
        {
          name: cus.name,
          price: cus.price,
          type: cus.type,
        }
      );
      customizationMap[cus.name] = doc.$id;
    }

    // 4. Create Menu Items

    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
      const uploadedImage = await uploadImageToStorage(item.image_url);

      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCollectionId,
        ID.unique(),
        {
          name: item.name,
          description: item.description,
          image_url: uploadedImage,
          price: item.price,
          rating: item.rating,
          calories: item.calories,
          protein: item.protein,
          categories: categoryMap[item.category_name],
        }
      );

      menuMap[item.name] = doc.$id;

      // 5. Create menu_customizations
      for (const cusName of item.customizations) {
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.menuCustomizationsCollectionId,
          ID.unique(),
          {
            menu: doc.$id,
            customizations: customizationMap[cusName],
          }
        );
      }
    }

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}
