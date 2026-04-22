import { useSession } from "next-auth/react";

const HomePage = () => {
    const { data } = useSession();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Selamat Datang</h1><br />
            <h3>Saya Mahasiswa D-IV Teknik Informatika</h3>
            {data?.user?.fullname && (
                <p>Halo, <strong>{data.user.fullname}</strong>! Anda berhasil login.</p>
            )}
        </div>
    );
};

export default HomePage;

