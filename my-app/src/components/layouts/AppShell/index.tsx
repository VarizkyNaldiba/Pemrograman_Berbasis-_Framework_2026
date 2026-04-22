import { useRouter } from "next/router";
import Navbar from "../Navbar";

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
        <main>
            {!shouldHideNavbar && <Navbar />}
            {children}
        </main>
    );
};

export default AppShell;
