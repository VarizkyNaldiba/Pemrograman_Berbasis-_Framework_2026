import Link from "next/link";
import styles from "./register.module.css";

const HalamanRegister = () => {
    return (
        <main className={styles.page}>
            <section className={styles.card}>
                <h1 className={styles.title}>Halaman Register</h1>

                <form className={styles.form}>
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className={styles.input}
                    />
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

                    <button type="submit" className={styles.button}>
                        Register
                    </button>
                </form>

                <p className={styles.loginPrompt}>
                    Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
                </p>
            </section>
        </main>
    );
};

export default HalamanRegister;