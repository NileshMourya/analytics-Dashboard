"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import * as React from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store/index";
import SideBar from "./components/SideBar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <SideBar setOpen={setOpen} open={open} />
          <div className="sm:ml-72" onClick={() => setOpen(false)}>
            <Toaster />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
