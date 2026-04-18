import {
    
    getFirestore,
    collection,
    getDocs,
    Firestore,
    getDoc,
    doc,
    query,
    addDoc,
    where,
} from "firebase/firestore";
import app, { usersCollectionName } from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
} catch (error) {
    console.error("Error retrieving products:", error);
    throw error;
}
}

export async function retrieveDataByID(collectionName: string, id: string) {
try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
} catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
}
}

export async function signUp(userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
}): Promise<{ status: string; message: string }> {
    try {
        console.log("📝 signUp function started");
        console.log("Input data:", { email: userData.email, fullname: userData.fullname });
        
        // Check if user already exists
        console.log("🔍 Checking if user exists...");
        const q = query(collection(db, usersCollectionName), where("email", "==", userData.email));
        const querySnapshot = await getDocs(q);
        const existingUsers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Existing users found:", existingUsers.length);

        if (existingUsers.length > 0) {
            console.log("⚠️ User already exists:", userData.email);
            return {
                status: "error",
                message: "User already exists",
            };
        }

        // Hash password with bcrypt
        console.log("🔐 Hashing password...");
        let hashedPassword = userData.password;
        try {
            hashedPassword = await bcrypt.hash(userData.password, 10);
            console.log("✅ Password hashed successfully");
        } catch (bcryptError: any) {
            console.warn("⚠️ Bcrypt error:", bcryptError?.message);
            // Continue with plain password if bcrypt fails
        }

        const userToSave = {
            email: userData.email,
            fullname: userData.fullname,
            password: hashedPassword,
            role: userData.role || "member",
            createdAt: new Date().toISOString(),
        };

        console.log("💾 Attempting to save to Firestore...", userToSave);
        const docRef = await addDoc(collection(db, usersCollectionName), userToSave);
        console.log("🎉 User saved successfully with ID:", docRef.id);
        
        return {
            status: "success",
            message: "User registered successfully",
        };
    } catch (error: any) {
        console.error("❌ SignUp error:", error?.message || error);
        console.error("Error code:", error?.code);
        console.error("Full error:", error);
        return {
            status: "error",
            message: error.message || "Registration failed",
        };
    }
}