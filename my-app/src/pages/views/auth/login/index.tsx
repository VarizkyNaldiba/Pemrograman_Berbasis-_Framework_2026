import Link from "next/link";
import { useRouter } from "next/router";
import styles from './login.module.scss';

const TampilanLogin = () => {
    const { push } = useRouter();

    const handleLogin = () => {
        // logic login disini
        push('/produk');
    };

    return (
        <div className={styles.login}>
            <h1 className="text-3xl font-bold text-blue-600">Halaman Login</h1>
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
            <button 
                onClick={handleLogin}
                className={styles.button}
            >
                Login
            </button>
            <br />
            <div className={styles.register_prompt}>
                Belum punya akun?{' '}
                <Link href="/auth/register">
                    Ke Halaman Register
                </Link>
            </div>
        </div>
    );
};

export default TampilanLogin;