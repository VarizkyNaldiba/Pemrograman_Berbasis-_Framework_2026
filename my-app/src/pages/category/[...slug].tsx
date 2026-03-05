import { useRouter } from "next/router";

const CategoryPage = () => {
    const { query } = useRouter();
    
    return (
        <div>
            <h1>Halaman Category</h1>
            <h2>Parameter URL:</h2>
            {query.slug && Array.isArray(query.slug) ? (
                <ul>
                    {query.slug.map((param, index) => (
                        <li key={index}>
                            Parameter {index + 1}: <strong>{param}</strong>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CategoryPage;
