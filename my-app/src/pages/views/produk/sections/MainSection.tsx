import Link from "next/link";

const productList = [
  { id: 1, name: "Mouse Wireless" },
  { id: 2, name: "Keyboard Mechanical" },
  { id: 3, name: "Monitor 24 Inch" },
];

const MainSection = () => {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xl font-semibold text-slate-900">Daftar Produk</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {productList.map((product) => (
          <article key={product.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <h3 className="mb-2 text-base font-medium text-slate-800">{product.name}</h3>
            <Link href={`/produk/${product.id}`} className="font-semibold text-blue-700 hover:underline">
              Lihat Detail
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MainSection;
