import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import { FaHouse, FaInbox, FaCalendar, FaMagnifyingGlass, FaGear } from "react-icons/fa6";

  // Menu items.
  const items = [
    {
      title: "Home",
      url: "#",
      icon: FaHouse,
    },
    {
      title: "Inbox",
      url: "#",
      icon: FaInbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: FaCalendar,
    },
    {
      title: "Search",
      url: "#",
      icon: FaMagnifyingGlass,
    },
    {
      title: "Settings",
      url: "#",
      icon: FaGear,
    },
  ]
  export function AdminSidebar() {
    return (
        <Sidebar variant="inset" collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
    )
  }
  