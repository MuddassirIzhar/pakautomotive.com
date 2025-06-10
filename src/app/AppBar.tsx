"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Navigation } from "./components/Navigation";
import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/assets/logo.png";

const AppBar = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
 
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ]
  
  return (
    <>
      <div className="flex min-h-screen bg-gray-100 text-gray-900 ">
        <div className="block w-full">
          <div className="sticky top-0 z-20">
            <div className="px-3 py-3 lg:px-5 lg:pl-3 shadow-[#0000001a_5px_5px_5px_3px] bg-white dark:bg-gray-800 dark:border-gray-700">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  {/* <div className="flex items-center justify-start">

                      <div className="flex items-center justify-center h-16 w-64">
                          <Link href="/">
                              <div className="flex items-center justify-start">
                                  <Image src={LogoImg} className="h-28 w-auto mx-auto" priority alt="Logo" />
                              </div>
                          </Link>
                      </div>
                  </div> */}
                    <Navigation />
              </div>
            </div>
          </div>

          <main>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AppBar;
