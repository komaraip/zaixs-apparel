"use client"

import React, { JSX } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Slash } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator"

export default function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const generateBreadcrumbs = () => {
    const breadcrumbs: JSX.Element[] = [];
    let path = "";

    pathSegments.forEach((segment, index) => {
      path += `/${segment}`;
      breadcrumbs.push(
        <React.Fragment key={index}>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link href={path}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
		  <BreadcrumbSeparator className="hidden md:block"/>
        </React.Fragment>
      );
    });

    return breadcrumbs;
  };

  return (  
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {generateBreadcrumbs()}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
