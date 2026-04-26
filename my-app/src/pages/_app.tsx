import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/AppShell";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

const GA_ID = "G-ZF4BEXN1VK";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}');
                `}
            </Script>
            <AppShell>
                <Component {...pageProps} />
            </AppShell>
        </SessionProvider>
    );
}
