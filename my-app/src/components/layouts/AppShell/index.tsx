import Navbar from "../Navbar";
import Footer from "../Footer";

type AppShellProps = {
    children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    return (
        <div className="app-shell">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default AppShell;