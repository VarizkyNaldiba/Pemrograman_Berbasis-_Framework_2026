import styles from "../../pages/produk/product.module.scss";
import Link from "next/link";
import type { ProductType } from "../../types/product.type";

type TampilanProdukProps = {
  products: ProductType[];
  isLoading?: boolean;
};

const SKELETON_COUNT = 6;

const TampilanProduk = ({ products, isLoading = false }: TampilanProdukProps) => {
  return (
    <section className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <article key={`skeleton-${index}`} className={styles.produk__content__skeleton}>
                <div className={styles.produk__content__skeleton__image} />
                <div className={styles.produk__content__skeleton__name} />
                <div className={styles.produk__content__skeleton__category} />
                <div className={styles.produk__content__skeleton__price} />
              </article>
            ))
          : null}
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/produk/${product.id}`}
            className={styles.produk__content__item}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className={styles.produk__content__item__image}
                width={200}
                height={200}
                loading="lazy"
              />
            ) : null}
            <h4 className={styles.produk__content__item__name}>{product.name}</h4>
            <p className={styles.produk__content__item__category}>{product.category}</p>
            <p className={styles.produk__content__item__price}>
              Rp {product.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TampilanProduk;
