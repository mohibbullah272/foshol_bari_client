// src/components/ui/AppSidebar.tsx
import * as React from "react"
import Link from "next/link"
import Logo from "./Logo"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getDashboardRoutes } from "@/app/(DashboardLayout)/dashboard/routes"


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = await getDashboardRoutes()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/">
          <div className="flex items-center gap-3 hover:bg-gray-200 p-3 rounded">
            <Logo /> ফসল বাড়ি
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
