import { useRouter } from "next/router";

const HalamanProduk = () => {
    // const router = useRouter();
    // console.log(router);
    const {query} = useRouter();
    
    return (
        <div>
            <h1>Halaman Produk</h1>
            <p>Produk: {query.id}</p>
        </div>
    );
};

export default HalamanProduk;