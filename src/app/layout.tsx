import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Change font import
import Header from "@/components/layout/Header"; 
import Footer from "@/components/layout/Footer"; 
import { AuthProvider } from '@/context/AuthContext'; // Import AuthProvider
import "./globals.css";

const inter = Inter({ subsets: ["latin"] }); 

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
    <html lang="vi">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
