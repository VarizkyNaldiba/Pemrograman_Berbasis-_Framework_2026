import { signUp } from "@/utils/db/servicefirebase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email = "", password = "" } = body;
        
        const normalizedEmail = String(email).trim();
        const normalizedPassword = String(password);

        if (!normalizedEmail) {
            return NextResponse.json({ name: "Email wajib diisi", alamat: "" }, { status: 400 });
        }

        if (normalizedPassword.length < 6) {
            return NextResponse.json({ name: "Password minimal 6 karakter", alamat: "" }, { status: 400 });
        }

        const result = await signUp({
            ...body,
            email: normalizedEmail,
            password: normalizedPassword,
        });

        if (result.status === "success") {
            return NextResponse.json({ name: result.message, alamat: "" }, { status: 200 });
        }

        return NextResponse.json({ name: result.message, alamat: "" }, { status: 400 });
    } catch (error: any) {
        console.error("Register API error:", error);
        return NextResponse.json({ name: `Error: ${error?.message || "Unknown error"}`, alamat: "" }, { status: 500 });
    }
}
