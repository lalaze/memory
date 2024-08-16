import type { Metadata } from "next";
import Provider from "@/components/Provider";
import { auth } from "../auth";
import { Inter } from "next/font/google";
import { Session } from "next-auth";
import Nav from "@/components/nav";
import { ToastContainer } from 'react-toastify';
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memory Card",
  description: "Remembering things through the Ebbinghaus curve",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await auth()) as Session;

  return (
    <html lang="en">
      <Provider initialState={session}>
        <body className={`${inter.className} dark overflow-hidden`}>
          <NextUIProvider>
            {session?.user?.email ? <Nav></Nav> : ""}
            <div className={`${session ? 'content-height' : 'h-lvh'}  bg-[#000000] w-lvh`}>
              {children}
            </div>
          </NextUIProvider>
          <ToastContainer />
        </body>
      </Provider>
    </html>
  );
}
