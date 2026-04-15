import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Debug() {
    const { data: session, status } = useSession();
    const { push } = useRouter();

    return (
        <div style={{ padding: "20px", fontFamily: "monospace", fontSize: "14px" }}>
            <h1>Debug Page</h1>
            <p><b>Status:</b> {status}</p>
            <p><b>Session Email:</b> {session?.user?.email || "None"}</p>
            <p><b>Session Fullname:</b> {(session?.user as any)?.fullname || "None"}</p>
            <hr />
            <button onClick={() => push("/")} style={{ padding: "10px 20px", marginRight: "10px" }}>
                Home
            </button>
            <button onClick={() => push("/auth/login")} style={{ padding: "10px 20px", marginRight: "10px" }}>
                Login Page
            </button>
            <button onClick={() => push("/profile")} style={{ padding: "10px 20px" }}>
                Profile (Protected)
            </button>
        </div>
    );
}

