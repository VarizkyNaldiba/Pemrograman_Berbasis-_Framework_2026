import { useSession } from "next-auth/react";

const EditorPage = () => {
    const { data: session } = useSession();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Halaman Khusus Editor</h1>
            <p>Selamat datang, <strong>{session?.user?.fullname}</strong>.</p>
            <p>Anda memiliki akses sebagai <strong>Editor</strong>.</p>
            <div style={{ marginTop: "1rem", padding: "1rem", border: "1px dashed #2563eb", borderRadius: "8px" }}>
                <p>Fitur Editor: Anda dapat mengelola konten di sini.</p>
            </div>
        </div>
    );
};

export default EditorPage;
