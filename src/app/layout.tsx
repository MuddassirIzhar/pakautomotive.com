import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/app/components/themes/PlaygroundEditorTheme.css";
import AppBar from "./AppBar";
import { RouteProgressProvider } from "./RouteProgressProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PakAutomotive",
  description: "This is the description of the app.",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {/* {children} */}
//         <AppBar children={children} />
//       </body>
//     </html>
//   );
// }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>

          <RouteProgressProvider />
          {children}
          </main>
      </body>
    </html>
  );
}