import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CatchCall AI — 24/7 AI Phone Receptionist for Contractors",
  description: "Autonomous AI Voice Receptionist for HVAC, Plumbing, and Home Service Contractors. Answers every call 24/7, screens emergencies, and books appointments straight into Google Calendar.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
