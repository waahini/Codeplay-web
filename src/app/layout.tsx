import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "CodePlay | 알고리즘 트레이닝 플랫폼",
  description: "CodePlay 스타일의 완벽한 온라인 저지 클론",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-white">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
