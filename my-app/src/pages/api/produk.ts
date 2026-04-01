import type { NextApiRequest, NextApiResponse } from "next";
import { productsCollectionName } from "../../utils/db/firebase";
import type { ProductRecord } from "../../utils/db/servicefirebase";
import { retrieveProducts } from "../../utils/db/servicefirebase";

type Data = {
    status: boolean;
    status_code: number;
    data: ProductRecord[];
    message?: string;
};

function normalizeImageValue(product: ProductRecord): string {
    const candidates = [
        product.image,
        product.gambar,
        product.imageUrl,
        product.image_url,
        product.foto,
        product.thumbnail,
    ];

    const firstImage = candidates.find(
        (value): value is string => typeof value === "string" && value.trim() !== ""
    );

    return firstImage || "";
}

/**
 * API handler for fetching products.
 * Responds with a JSON object containing product data.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({
            status: false,
            status_code: 405,
            data: [],
            message: `Method ${req.method} not allowed`,
        });
    }

    try {
        const collectionFromQuery = Array.isArray(req.query.collection)
            ? req.query.collection[0]
            : req.query.collection;

        const collectionCandidates = Array.from(
            new Set(
                [
                    collectionFromQuery,
                    productsCollectionName,
                    "products",
                    "produk",
                ]
                    .map((value) => (typeof value === "string" ? value.trim() : ""))
                    .filter((value): value is string => Boolean(value))
            )
        );

        let products: ProductRecord[] = [];
        let selectedCollection = collectionCandidates[0] || "products";
        for (const collectionName of collectionCandidates) {
            const result = await retrieveProducts(collectionName);
            if (result.length > 0) {
                products = result;
                selectedCollection = collectionName;
                break;
            }
        }

        // Ensure response is JSON-serializable and key fields are normalized for UI consumption.
        const rawData = JSON.parse(JSON.stringify(products)) as ProductRecord[];
        const data = rawData.map((product) => ({
            ...product,
            name:
                (typeof product.name === "string" && product.name.trim() !== ""
                    ? product.name
                    : typeof product.nama === "string"
                      ? product.nama
                      : "Produk tanpa nama"),
            price: typeof product.price === "number" ? product.price : 0,
            size: typeof product.size === "string" && product.size.trim() !== "" ? product.size : "-",
            category:
                typeof product.category === "string" && product.category.trim() !== ""
                    ? product.category
                    : "-",
            image: normalizeImageValue(product),
        })) as ProductRecord[];

        if (data.length === 0) {
            return res.status(200).json({
                status: true,
                status_code: 200,
                data,
                message:
                    `No products found in collections: ${collectionCandidates.join(", ")}. Active collection: ${selectedCollection}`,
            });
        }

        res.status(200).json({
            status: true,
            status_code: 200,
            data,
            message: `Products loaded from collection: ${selectedCollection}`,
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to fetch products";

        res.status(500).json({
            status: false,
            status_code: 500,
            data: [],
            message,
        });
    }
}