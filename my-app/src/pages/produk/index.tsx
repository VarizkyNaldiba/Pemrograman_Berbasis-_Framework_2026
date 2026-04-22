import useSWR from "swr";
import type { ProductType } from "../../types/product.type";
import TampilanProduk from "../../views/produk";
import fetcher from "../../utils/swr/fetcher";

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

type ApiResponse = {
    data?: ProductRecord[];
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

    const category =
        typeof product.category === "string" && product.category.trim() !== ""
            ? product.category
            : "-";

    return {
        id: String(product.id ?? ""),
        name,
        price: typeof product.price === "number" ? product.price : 0,
        image,
        category,
    };
}

const HalamanProdukCSR = () => {
    const { data, isLoading } = useSWR<ApiResponse>("/api/produk", fetcher);

    const products = Array.isArray(data?.data) ? data.data.map(toProductType) : [];

    return <TampilanProduk products={products} isLoading={isLoading} />;
};

export default HalamanProdukCSR;
