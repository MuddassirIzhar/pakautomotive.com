"use client"

import { SidebarIcon } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbItemBase,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import { Fragment } from "react"

type BreadcrumbItem = {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
};

interface SiteHeaderProps {
  breadcrumbItems: BreadcrumbItem[];
}
export function SiteHeader() {

  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // Generate breadcrumb items based on the current path
  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean) // Remove empty segments
    .map((segment, index, segments) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize the label
      href: `/${segments.slice(0, index + 1).join("/")}`, // Generate the href
      isCurrentPage: index === segments.length - 1, // Mark the last segment as the current page
    }));


  return (
    <header className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        {/* <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItemBase>
              <BreadcrumbLink href="#">
                Admin
              </BreadcrumbLink>
            </BreadcrumbItemBase>
            <BreadcrumbSeparator />
            <BreadcrumbItemBase>
              <BreadcrumbPage> Types </BreadcrumbPage>
            </BreadcrumbItemBase>
          </BreadcrumbList>
        </Breadcrumb> */}

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItemBase>
              <BreadcrumbLink href="/admin">
                Admin
              </BreadcrumbLink>
            </BreadcrumbItemBase>
            <BreadcrumbSeparator />
            {breadcrumbItems.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItemBase>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItemBase>
                {index < breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  )
}
