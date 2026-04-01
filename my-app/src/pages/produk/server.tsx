import TampilanProduk from "../../views/produk";
import { ProductType } from "../../type/product.type";

type PageProps = {
    products: ProductType[];
};

const halamanProdukServer = ({ products }: PageProps) => {
    return (
        <div>
            <h1>Halaman Produk Server</h1>
            <TampilanProduk products={products} />
        </div>
    );
};

export default halamanProdukServer;

export async function getServerSideProps(context: any) {
    const baseUrl = `http://${context.req.headers.host}`;
    const res = await fetch(`${baseUrl}/api/produk`);
    const response = await res.json();
    return {
        props: {
            products: Array.isArray(response?.data) ? response.data : [],
        },
    };
}