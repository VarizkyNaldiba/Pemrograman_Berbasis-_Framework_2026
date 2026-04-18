import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import styles from "./login.module.css";

const TampilanLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (router.query.registered === "1") {
            setInfo("Registrasi berhasil. Silakan login dengan akun baru Anda.");
        }
    }, [router.query.registered]);

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
                <div className={styles.header}>
                    <h1 className={styles.title}>Halaman Login</h1>
                  
                </div>

                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="fullname">
                            Fullname
                        </label>
                        <input
                            className={styles.input}
                            id="fullname"
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">
                            Email
                        </label>
                        <input
                            className={styles.input}
                            id="email"
                            type="email"
                            placeholder="nama@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">
                            Password
                        </label>
                        <input
                            className={styles.input}
                            id="password"
                            type="password"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {info && <p style={{ color: "green", fontSize: "14px" }}>{info}</p>}
                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <p className={styles.prompt}>
                    Belum punya akun? <Link href="/auth/register">Register</Link>
                </p>
            </section>
        </main>
    );
};

export default TampilanLogin;