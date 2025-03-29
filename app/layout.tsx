import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "MultiDecoder",
    description: "An app for decoding and encoding text.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <HeroUIProvider>{children}</HeroUIProvider>
            </body>
        </html>
    );
}
