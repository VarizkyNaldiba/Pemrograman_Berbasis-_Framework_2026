import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.css";

const TampilanLogin = () => {
    const { push } = useRouter();

    const handleLogin = () => {
        // logic login disini
        push('/produk');
    };

    return (
        <main className={styles.page}>
            <section className={styles.card}>
                <h1 className={styles.title}>Halaman Login</h1>

                <form className={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                    />

                    <button type="button" onClick={handleLogin} className={styles.button}>
                        Login
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