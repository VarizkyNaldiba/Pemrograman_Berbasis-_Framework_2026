import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import app from '@/utils/db/firebase'

type Response = {
    status: string
    message: string
    timestamp?: string
    docId?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    try {
        console.log("TEST FIREBASE - Starting");
        
        const db = getFirestore(app);
        console.log("Firestore initialized");
        
        const testData = {
            email: `test-${Date.now()}@test.com`,
            fullname: "Test User",
            password: "testpass123",
            role: "user",
            createdAt: new Date().toISOString(),
        };
        
        console.log("Saving test data:", testData);
        const docRef = await addDoc(collection(db, "users"), testData);
        console.log("Successfully saved with ID:", docRef.id);
        
        res.status(200).json({
            status: 'success',
            message: 'Test data saved successfully',
            timestamp: new Date().toISOString(),
            docId: docRef.id,
        });
    } catch (error: any) {
        console.error("Test Firebase Error:", error);
        res.status(500).json({
            status: 'error',
            message: error.message || 'Firebase test failed',
        });
    }
}
