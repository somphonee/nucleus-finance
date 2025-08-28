import { useState, useRef, useEffect } from "react";
import { 
  DollarSign, 
  Users, 
  PieChart, 
  CreditCard, 
  FileText, 
  BarChart3,
  Home,
  Settings,
  ChevronLeft
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
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
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "nav.dashboard", url: "/", icon: Home },
  { title: "nav.cashManagement", url: "/cash-management", icon: DollarSign },
  { title: "nav.memberSavings", url: "/member-savings", icon: Users },
  { title: "nav.sharesTracking", url: "/shares-tracking", icon: PieChart },
  { title: "nav.loanManagement", url: "/loan-management", icon: CreditCard },
  { title: "nav.generalLedger", url: "/general-ledger", icon: FileText },
  { title: "nav.reports", url: "/reports", icon: BarChart3 },
];

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-primary" 
      : "hover:bg-primary-light/20 hover:text-primary transition-colors";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const allItems = [...navigationItems, ...systemItems];
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = focusedIndex < allItems.length - 1 ? focusedIndex + 1 : 0;
      setFocusedIndex(nextIndex);
      menuRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : allItems.length - 1;
      setFocusedIndex(prevIndex);
      menuRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      menuRefs.current[focusedIndex]?.click();
    }
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 bg-card border-r border-card-border`}>
      <SidebarHeader className="p-4 border-b border-card-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-foreground">Accounting System</h2>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="hover:bg-primary-light/20"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2" onKeyDown={handleKeyDown}>
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "hidden" : ""} text-muted-foreground font-medium`}>
            Main Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      ref={(el) => (menuRefs.current[index] = el)}
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary ${getNavClass({ isActive })}`
                      }
                      tabIndex={0}
                      onFocus={() => setFocusedIndex(index)}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{t(item.title)}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className={`${collapsed ? "hidden" : ""} text-muted-foreground font-medium`}>
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {systemItems.map((item, index) => {
                const globalIndex = navigationItems.length + index;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        ref={(el) => (menuRefs.current[globalIndex] = el)}
                        to={item.url} 
                        className={({ isActive }) => 
                          `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary ${getNavClass({ isActive })}`
                        }
                        tabIndex={0}
                        onFocus={() => setFocusedIndex(globalIndex)}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
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