"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import { JSX } from "react";
import { AstronautsProvider } from "./utils/astronautsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
  AppProps,
}: {
  children: React.ReactNode;
  AppProps: JSX.Element;
}) {
  return (
    <html lang="en">
      <head>{/* <link rel="icon" href="/favicon.ico" /> */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AstronautsProvider>
            <Navbar />
            <main>{children}</main>
          </AstronautsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

