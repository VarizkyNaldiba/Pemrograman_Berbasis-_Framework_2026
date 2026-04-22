import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { push } = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const fullname = formData.get("fullname") as string;
        const password = formData.get("password") as string;

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, fullname, password }),
            });

            const payload = await response.json();

            if (response.status === 200) {
                form.reset();
                setSuccess("Registrasi berhasil. Mengarahkan ke halaman login...");
                setTimeout(() => {
                    push("/auth/login?registered=1");
                }, 1200);
                return;
            }

            setError(
                response.status === 400
                    ? payload?.name || "Data registrasi tidak valid."
                    : "Terjadi kesalahan saat registrasi."
            );
        } catch (err) {
            setError("Gagal terhubung ke server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={style.page}>
            <section className={style.card}>
                <div className={style.header}>
                    <h1 className={style.title}>Halaman Register</h1>
                </div>

                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.field}>
                        <label className={style.label} htmlFor="fullname">
                            Fullname
                        </label>
                        <input
                            className={style.input}
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="Masukkan nama lengkap"
                            required
                        />
                    </div>

                    <div className={style.field}>
                        <label className={style.label} htmlFor="email">
                            Email
                        </label>
                        <input
                            className={style.input}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="nama@email.com"
                            required
                        />
                    </div>

                    <div className={style.field}>
                        <label className={style.label} htmlFor="password">
                            Password
                        </label>
                        <input
                            className={style.input}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Buat password yang aman"
                            minLength={6}
                            required
                        />
                    </div>

                    {success && <p style={{ color: "green", fontSize: "14px" }}>{success}</p>}
                    {error && <p className={style.error}>{error}</p>}

                    <button className={style.button} type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>

                <p className={style.prompt}>
                    Sudah punya akun? <Link href="/auth/login">Login</Link>
                </p>
            </section>
        </main>
    );
};

export default TampilanRegister;
