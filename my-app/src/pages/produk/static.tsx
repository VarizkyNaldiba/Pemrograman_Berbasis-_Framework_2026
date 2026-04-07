import type { GetStaticProps } from "next";
import type { ProductType } from "../../type/product.type";
import { productsCollectionName } from "../../utils/db/firebase";
import { retrieveProducts } from "../../utils/db/servicefirebase";
import TampilanProduk from "../../views/produk";

type ProductRecord = {
    id?: string;
    name?: string;
    nama?: string;
    price?: number;
    image?: string;
    gambar?: string;
    imageUrl?: string;
    image_url?: string;
    foto?: string;
    thumbnail?: string;
    category?: string;
};

type HalamanProdukStaticProps = {
    products: ProductType[];
};

function toProductType(product: ProductRecord): ProductType {
    const name =
        typeof product.name === "string" && product.name.trim() !== ""
            ? product.name
            : typeof product.nama === "string" && product.nama.trim() !== ""
              ? product.nama
              : "Produk tanpa nama";

    const imageCandidates = [
        product.image,
        product.gambar,
        product.imageUrl,
        product.image_url,
        product.foto,
        product.thumbnail,
    ];

    const image =
        imageCandidates.find(
            (value): value is string => typeof value === "string" && value.trim() !== ""
        ) || "";

    const price = typeof product.price === "number" ? product.price : 0;
    const category =
        typeof product.category === "string" && product.category.trim() !== ""
            ? product.category
            : "-";

    return {
        id: String(product.id),
        name,
        price,
        image,
        category,
    };
}

const HalamanProdukStatic = ({ products }: HalamanProdukStaticProps) => {
    return (
        <div>
            <h1>Halaman Produk Static</h1>
            <TampilanProduk products={products} />
        </div>
    );
};

export default HalamanProdukStatic;

export const getStaticProps: GetStaticProps<HalamanProdukStaticProps> = async () => {
    try {
        const records = await retrieveProducts(productsCollectionName);

        return {
            props: {
                products: records.map(toProductType),
            },
        };
    } catch {
        return {
            props: {
                products: [],
            },
        };
    }
};