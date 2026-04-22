import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, type SyntheticEvent } from "react";
import styles from "./login.module.scss";

const TampilanLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (router.query.registered === "1") {
            setInfo("Registrasi berhasil. Silakan login dengan akun baru Anda.");
        }
    }, [router.query.registered]);

    const waitForSession = async (maxAttempt = 6, delay = 200) => {
        for (let attempt = 0; attempt < maxAttempt; attempt += 1) {
            const currentSession = await getSession();
            if (currentSession?.user?.email) {
                return currentSession;
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
        return null;
    };

    const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.ok) {
                const session = await waitForSession();
                if (!session?.user?.email) {
                    setError("Sesi login belum siap, silakan coba lagi.");
                    return;
                }

                const callbackUrl =
                    typeof router.query.callbackUrl === "string"
                        ? router.query.callbackUrl
                        : "/produk";

                const userRole = String(session.user.role || "").toLowerCase();
                const targetUrl = userRole === "admin" ? "/admin" : callbackUrl;
                window.location.assign(targetUrl);

                return;
            } else {
                setError("Login gagal. Cek email dan password.");
            }
        } catch {
            setError("Terjadi kesalahan saat login.");
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = isLoading || !email || !password;

    return (
        <main className={styles.page}>
            <section className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Halaman Login</h1>
                </div>

                <form className={styles.form} onSubmit={handleLogin}>
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

                    <button className={styles.button} type="submit" disabled={isDisabled}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>

                    <br />
                    <br />

                    <button
                        type="button"
                        className={styles.button}
                        onClick={() => signIn("google", { callbackUrl: "/", redirect: false })}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Sign in with Google"}
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
