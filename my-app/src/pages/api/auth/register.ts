import { signUp } from '@/utils/db/servicefirebase'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
    alamat: string
    debug?: any
}

type SignUpResult = {
    status: string
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ name: 'Method not allowed', alamat: '' })
    }

    const { email = '', password = '' } = req.body || {}
    const normalizedEmail = String(email).trim()
    const normalizedPassword = String(password)

    if (!normalizedEmail) {
        return res.status(400).json({ name: 'Email wajib diisi', alamat: '' })
    }

    if (normalizedPassword.length < 6) {
        return res.status(400).json({ name: 'Password minimal 6 karakter', alamat: '' })
    }

    try {
        console.log("🔵 Register API called");
        console.log("Request body:", JSON.stringify(req.body));
        
        const result = await signUp({
            ...req.body,
            email: normalizedEmail,
            password: normalizedPassword,
        })
        
        console.log("🟢 SignUp result:", result);
        
        if (result.status === 'success') {
            console.log("✅ Registration successful, returning 200");
            return res.status(200).json({ name: result.message, alamat: '', debug: { result } })
        }
        console.log("❌ Registration failed:", result.message);
        return res.status(400).json({ name: result.message, alamat: '', debug: { result } })
    } catch (error: any) {
        console.error("🔴 Register API error:", error);
        res.status(500).json({ 
            name: `Error: ${error?.message || 'Unknown error'}`, 
            alamat: '',
            debug: { error: error?.message, stack: error?.stack }
        })
    }
}