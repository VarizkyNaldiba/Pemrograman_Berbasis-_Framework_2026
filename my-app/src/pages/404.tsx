import Link from "next/link";
import styles from "@/styles/404.module.scss";
import Image from "next/image";

const Custom404 = () => {
    return (
        <div className={styles.error}>
            <Image
                src="/page-not-found.jpg"
                alt="404"
                width={500}
                height={500}
                className={styles.error_image}
            />
            <h1 className={styles.error_title}>404 - Halaman Tidak Ditemukan</h1>
            <p className={styles.error_message}>
                Maaf, halaman yang Anda cari tidak ada.
            </p>
            <Link href="/" className={styles.link}>
                Kembali ke Home
            </Link>
        </div>
    );
};

export default Custom404;
