import type { NextApiRequest, NextApiResponse } from "next";
import registerHandler from "./auth/register";

type RegisterAliasResponse = {
    name: string;
    alamat: string;
    debug?: unknown;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegisterAliasResponse>
) {
    if (req.method === "GET") {
        return res.status(200).json({
            name: "Register endpoint is active. Use POST with email, fullname, and password.",
            alamat: "",
        });
    }

    return registerHandler(req, res);
}
