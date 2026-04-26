import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";

// Tugas 4: Dynamic import — Navbar di-load secara lazy (tidak masuk bundle awal)
const Navbar = dynamic(() => import("../Navbar"), { ssr: false });

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const disableNavbar = ["/404"];

type AppShellProps = {
    children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();
    const isAuthPage = pathname.startsWith("/auth/");
    const shouldHideNavbar = disableNavbar.includes(pathname) || isAuthPage;

    return (
        <main className={roboto.className}>
            {!shouldHideNavbar && <Navbar />}
            {children}
        </main>
    );
};

export default AppShell;
