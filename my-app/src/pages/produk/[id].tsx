import type { GetStaticPaths, GetStaticProps } from "next";
import type { ProductType } from "../../type/product.type";
import { productsCollectionName } from "../../utils/db/firebase";
import { retrieveDataByID, retrieveProducts } from "../../utils/db/servicefirebase";
import DetailProduk from "../../views/detailProduct";

type HalamanProdukProps = {
    produk?: ProductType;
};

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

function mapProduct(record: ProductRecord, id: string): ProductType {
    const name =
        typeof record.name === "string" && record.name.trim() !== ""
            ? record.name
            : typeof record.nama === "string" && record.nama.trim() !== ""
              ? record.nama
              : "Produk tanpa nama";

    const imageCandidates = [
        record.image,
        record.gambar,
        record.imageUrl,
        record.image_url,
        record.foto,
        record.thumbnail,
    ];

    const image =
        imageCandidates.find(
            (value): value is string => typeof value === "string" && value.trim() !== ""
        ) || "";

    const category =
        typeof record.category === "string" && record.category.trim() !== ""
            ? record.category
            : "-";

    return {
        id,
        name,
        price: typeof record.price === "number" ? record.price : 0,
        image,
        category,
    };
}

const HalamanProduk = ({ produk }: HalamanProdukProps) => {
    if (!produk) {
        return <p>Produk tidak ditemukan.</p>;
    }

    return (
        <div>
            <DetailProduk products={produk} />
        </div>
    );
};

export default HalamanProduk;

// Digunakan static-site generation (aktif).
export const getStaticPaths: GetStaticPaths = async () => {
    const collectionCandidates = Array.from(new Set([productsCollectionName, "products", "produk"]));

    let records: Array<{ id: string }> = [];
    for (const collectionName of collectionCandidates) {
        const data = (await retrieveProducts(collectionName)) as Array<{ id?: string }>;
        if (Array.isArray(data) && data.length > 0) {
            records = data
                .filter((item): item is { id: string } => typeof item.id === "string" && item.id !== "");
            if (records.length > 0) {
                break;
            }
        }
    }

    const paths = records.map((product) => ({
        params: { id: product.id },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<HalamanProdukProps> = async (context) => {
    const idParam = context.params?.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
        return {
            props: {
                produk: undefined,
            },
        };
    }

    const collectionCandidates = Array.from(new Set([productsCollectionName, "products", "produk"]));

    for (const collectionName of collectionCandidates) {
        const data = (await retrieveDataByID(collectionName, id)) as ProductRecord | undefined;
        if (data) {
            return {
                props: {
                    produk: mapProduct(data, id),
                },
            };
        }
    }

    return {
        props: {
            produk: undefined,
        },
    };
};


