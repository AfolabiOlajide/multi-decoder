import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { Silkscreen } from "next/font/google";

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
const silkscreen = Silkscreen({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
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
        <html lang="en" className="">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-200`}
            >
                <HeroUIProvider>
                    <main className="min-h-screen mx-auto w-[90%] md:w-[70%] lg:w-[60%] pt-[2rem]">
                        <header className="mb-[5rem]">
                            <h1
                                className={`text-[2rem] md:text-[4rem] font-bold text-center ${silkscreen.className}`}
                            >
                                Multi-Decoder
                            </h1>
                        </header>
                        {children}
                    </main>
                </HeroUIProvider>
            </body>
        </html>
    );
}
