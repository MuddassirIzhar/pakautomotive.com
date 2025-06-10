import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppBar from "@/app/AppBar";

export const metadata: Metadata = {
  title: "PakAutomotive",
  description: "This is the description of the app.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return ( <AppBar children={children} />);
}