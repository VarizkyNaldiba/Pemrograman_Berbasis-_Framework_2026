import type { GetServerSideProps } from "next";
import type { ProductType } from "../../types/product.type";
import TampilanProduk from "../../views/produk";

type PageProps = {
    products: ProductType[];
};

type ApiResponse = {
    data?: ProductType[];
};

const HalamanProdukServer = ({ products }: PageProps) => {
    return (
        <div>
            <h1>Halaman Produk Server</h1>
            <TampilanProduk products={products} />
        </div>
    );
};

export default HalamanProdukServer;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const host = context.req?.headers?.host ?? "localhost:3000";
    const baseUrl = `http://${host}`;
    const res = await fetch(`${baseUrl}/api/produk`);
    const response = (await res.json()) as ApiResponse;

    return {
        props: {
            products: Array.isArray(response?.data) ? response.data : [],
        },
    };
};
