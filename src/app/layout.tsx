import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Change font import
import Header from "@/components/layout/Header"; // Import Header
import Footer from "@/components/layout/Footer"; // Import Footer
import "./globals.css";

const inter = Inter({ subsets: ["latin"] }); // Change font variable

export const metadata: Metadata = {
  title: "Tarot World - Khám phá thế giới Tarot", // Updated title
  description: "Trang web cung cấp thông tin, trải bài và dịch vụ đọc bài Tarot.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi"> {/* Set language to Vietnamese */}
      {/* Remove potential extra whitespace/newlines causing hydration mismatch */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
