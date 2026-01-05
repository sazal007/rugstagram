"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ArrowLeft,
  Mail,
  ListTodo,
  Phone,
  FileText,
  Briefcase,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAdminAuth } from "@/context/AdminAuthContext";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Collections",
    href: "/admin/collections",
    icon: ListTodo,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    title: "Portfolio",
    href: "/admin/portfolio",
    icon: Briefcase,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    title: "Contact",
    href: "/admin/contacts",
    icon: Phone,
  },
  {
    title: "Newsletter",
    href: "/admin/newsletter",
    icon: Mail,
  },
  {
    title: "Logout",
    href: "#",
    icon: LogOut,
    action: "logout",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { adminLogout } = useAdminAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin Panel</span>
                  <span className="truncate text-xs">Management</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href !== "#" && (pathname === item.href || pathname.startsWith(item.href + "/"));

                if (item.action === "logout") {
                  return (
                    <SidebarMenuItem key="logout">
                      <SidebarMenuButton
                        onClick={adminLogout}
                        tooltip={item.title}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Icon className="text-red-500" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to Site">
              <Link href="/">
                <ArrowLeft />
                <span>Back to Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
