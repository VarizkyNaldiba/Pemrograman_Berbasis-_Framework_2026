import { ProductType } from "../../types/product.type";
import styles from "./detailProduct.module.scss";

type DetailProdukProps = {
    products?: ProductType;
}; 

const DetailProduk = ({ products }: DetailProdukProps) => {
    if (!products) {
        return (
            <div className={styles.produkdetail}>
                <p>Produk tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <>
            <h1 className={styles.produkdetail_title}>Detail Produk</h1>
            <div className={styles.produkdetail}>
                <div className={styles.produkdetail_image}>
                    <img src={products.image && products.image.trim() !== "" ? products.image : "/placeholder-image.jpg"} alt={products.name} />
                </div>
                <div className={styles.produkdetail_info}>
                    <h1 className={styles.produkdetail_info_name}>{products.name}</h1>
                    <p className={styles.produkdetail_info_category}>{products.category}</p>
                    <p className={styles.produkdetail_info_price}>
                        Rp {products.price.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>
        </>
    );
};

export default DetailProduk;
