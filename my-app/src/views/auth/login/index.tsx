import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "./login.module.css";

const TampilanLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const result = await signIn("credentials", {
                email,
                password,
                fullname,
                redirect: false
            });
            
            if (result?.ok) {
                // Successful login - redirect to produk
                router.push("/produk");
            } else if (result?.error) {
                setError("Login gagal. Cek email dan password.");
            }
        } catch (err) {
            setError("Terjadi kesalahan saat login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.page}>
            <section className={styles.card}>
                <h1 className={styles.title}>Halaman Login</h1>

                <form className={styles.form} onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className={styles.input}
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p style={{color: "red", fontSize: "14px"}}>{error}</p>}
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <p className={styles.loginPrompt}>
                    Belum punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
                </p>
            </section>
        </main>
    );
};

export default TampilanLogin;