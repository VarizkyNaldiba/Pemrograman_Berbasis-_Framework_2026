import { collection, getDocs, getFirestore } from "firebase/firestore";
import app, { firestoreDatabaseId } from "./firebase";

const db = getFirestore(app, firestoreDatabaseId);

export interface ProductRecord {
    id: string;
    [key: string]: unknown;
}

export async function retrieveProducts(
    collectionName: string
): Promise<ProductRecord[]> {
    const normalizedCollectionName = collectionName.trim();

    if (!normalizedCollectionName) {
        throw new Error("Collection name is required");
    }

    const snapshot = await getDocs(collection(db, normalizedCollectionName));
    const data: ProductRecord[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}