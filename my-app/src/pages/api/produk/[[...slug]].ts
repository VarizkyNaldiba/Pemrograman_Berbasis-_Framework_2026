import type { NextApiRequest, NextApiResponse } from "next";
import { productsCollectionName } from "../../../utils/db/firebase";
import { retrieveDataByID, retrieveProducts } from "../../../utils/db/servicefirebase";

type ApiResponse = {
    status: boolean;
    status_code: number;
    data: unknown;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    try {
        const params = Array.isArray(req.query.slug) ? req.query.slug : [];
        const id = params.length > 0 ? params[0] : null;

        if (id) {
            const data = await retrieveDataByID(productsCollectionName, id);
            res.status(200).json({ status: true, status_code: 200, data });
            return;
        }

        const data = await retrieveProducts(productsCollectionName);
        res.status(200).json({ status: true, status_code: 200, data });
    } catch (error) {
        res.status(500).json({
            status: false,
            status_code: 500,
            data: { error: "Internal server error" },
        });
    }
}