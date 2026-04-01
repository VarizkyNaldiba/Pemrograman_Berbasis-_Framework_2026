import useSWR from "swr";
import TampilanProduk from "../../views/produk";
import fetcher from "../../utils/swr/fetcher";

const kategori = () => {
  const { data, error, isLoading } = useSWR<{
    data: {
      id: string;
      name?: string;
      nama?: string;
      price?: number;
      image?: string;
      gambar?: string;
      category?: string;
    }[];
  }>(
    "/api/produk",
    fetcher
  );

  const normalizedProducts = (data?.data || []).map((product, index) => ({
    id: product.id || `produk-${index}`,
    name: product.name || product.nama || "Produk tanpa nama",
    price: typeof product.price === "number" ? product.price : 0,
    image: product.image || product.gambar || "",
    category: product.category || "-",
  }));

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ color: "#d32f2f", fontSize: "16px" }}>
          Gagal memuat data produk. Silakan coba lagi.
        </p>
      </div>
    );
  }

  return (
    <div>
      <TampilanProduk
        products={isLoading ? [] : normalizedProducts}
        isLoading={isLoading}
      />
    </div>
  );
};

export default kategori;