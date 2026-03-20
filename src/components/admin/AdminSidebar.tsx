import { LayoutDashboard, Building2, Users, Plus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Imóveis", url: "/admin/imoveis", icon: Building2 },
  { title: "Novo Imóvel", url: "/admin/imoveis/novo", icon: Plus },
  { title: "Leads", url: "/admin/leads", icon: Users },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="bg-[hsl(var(--nova-purple))] text-white p-4">
        {!collapsed && (
          <div>
            <h2 className="font-bold text-lg leading-tight">Nova Imobiliária</h2>
            <p className="text-xs text-white/70">Painel Admin</p>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <span className="font-bold text-lg">N</span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className="bg-[hsl(var(--nova-purple))]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/50 text-xs uppercase tracking-wider">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                          active
                            ? "bg-white/20 text-white font-medium"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
