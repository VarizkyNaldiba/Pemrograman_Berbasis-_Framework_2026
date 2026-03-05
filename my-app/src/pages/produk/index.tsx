import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Produk = () => {
    const [isLogin, setIsLogin] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        if (!isLogin) {
            push("/auth/login");
        }
    }, [isLogin, push]);

    return (
        <div>Produk User Page</div>
    );
};

export default Produk;