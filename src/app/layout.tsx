import type { Metadata } from "next";
import { DatadogInit } from "@/components/DatadogInit";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dobeu Tech Solutions - Sales Funnel",
  description:
    "Fully automated customer sourcing and prospecting platform through invoicing and deliverables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DatadogInit />
        {children}
      </body>
    </html>
  );
}
