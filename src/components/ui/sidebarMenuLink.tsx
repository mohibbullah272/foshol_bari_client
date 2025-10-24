"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"

interface SidebarMenuLinkProps {
  href: string
  children: React.ReactNode
}

export function SidebarMenuLink({ href, children }: SidebarMenuLinkProps) {
  const pathname = usePathname()
  const { open, toggleSidebar, isMobile } = useSidebar()
  const previousPathname = React.useRef(pathname)

  // Close sidebar only when route actually changes
  React.useEffect(() => {
    if (previousPathname.current !== pathname && open) {
      toggleSidebar()
    }
    previousPathname.current = pathname
  }, [pathname, open, toggleSidebar])

  return (
    <SidebarMenuButton asChild>
      <Link href={href}>
        {children}
      </Link>
    </SidebarMenuButton>
  )
}