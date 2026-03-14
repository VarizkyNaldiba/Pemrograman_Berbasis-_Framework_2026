import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
};

type ProductApiRecord = {
  id: string;
  name?: string;
  nama?: string;
  price?: number;
  size?: string;
  category?: string;
};

type ProductApiResponse = {
  data: ProductApiRecord[];
};

const Kategori = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/produk");
      const responseData = (await response.json()) as ProductApiResponse;

      const normalizedProducts = responseData.data.map((product) => ({
        id: product.id,
        name: product.name || product.nama || "Produk tanpa nama",
        price: product.price || 0,
        size: product.size || "-",
        category: product.category || "-",
      }));

      setProducts(normalizedProducts);
    } catch (error) {
      console.error("Error fetching produk:", error);
      setErrorMessage("Gagal mengambil data produk.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      <button type="button" onClick={fetchProducts} disabled={isLoading}>
        {isLoading ? "Memuat..." : "Refresh Data"}
      </button>
      {errorMessage ? <p>{errorMessage}</p> : null}
      {!isLoading && !errorMessage && products.length === 0 ? (
        <p>Belum ada data produk.</p>
      ) : null}
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Kategori: {product.category}</p>
          <p>Harga: {product.price}</p>
          <p>Ukuran: {product.size}</p>
        </div>
      ))}
    </div>
  );
};

export default Kategori;