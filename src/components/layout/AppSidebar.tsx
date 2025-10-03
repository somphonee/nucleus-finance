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
  ChevronLeft,
  UserCog,
  User,
  Wallet,
  Building2,
  CreditCard as CardIcon,
  BookOpen,
  FolderTree,
  Scale,
  TrendingUp,
  FileBarChart
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
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

// Province-specific accounting modules
const provinceAccountingItems = [
  { title: "nav.cashbook", url: "/cashbook", icon: Wallet },
  { title: "nav.bankbook", url: "/bankbook", icon: Building2 },
  { title: "nav.cardTransactions", url: "/card-transactions", icon: CardIcon },
  { title: "nav.dailyLedger", url: "/daily-ledger", icon: BookOpen },
  { title: "nav.classifiedAccounts", url: "/classified-accounts", icon: FolderTree },
  { title: "nav.trialBalance", url: "/trial-balance", icon: Scale },
  { title: "nav.incomeStatement", url: "/income-statement", icon: TrendingUp },
  { title: "nav.financialReport", url: "/financial-report", icon: FileBarChart },
];

const systemItems = [
  { title: "nav.userManagement", url: "/user-management", icon: UserCog },
  { title: "nav.userProfile", url: "/user-profile", icon: User },
  { title: "nav.settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();
  const { user } = useAuth();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Filter menu items based on user role
  const displayedNavigationItems = user?.role === "userprovince" 
    ? provinceAccountingItems 
    : navigationItems;

  // Filter system items based on user role
  const filteredSystemItems = systemItems.filter(item => {
    if (item.url === "/user-management") {
      return user?.role === "admin";
    }
    return true;
  });

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const allItems = [...displayedNavigationItems, ...filteredSystemItems];
    
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
    <Sidebar 
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 bg-sidebar border-r border-sidebar-border`}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-sidebar-foreground">ລະບົບບັນຊີ</h2>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="hover:bg-sidebar-accent hidden md:flex"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2" onKeyDown={handleKeyDown}>
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "hidden" : ""} text-sidebar-foreground/70 font-medium`}>
            {user?.role === "userprovince" ? "ບັນຊີແຂວງ" : "ໂມດູນຫຼັກ"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {displayedNavigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      ref={(el) => (menuRefs.current[index] = el)}
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-sidebar-ring ${getNavClass({ isActive })}`
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
          <SidebarGroupLabel className={`${collapsed ? "hidden" : ""} text-sidebar-foreground/70 font-medium`}>
            ລະບົບ
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {filteredSystemItems.map((item, index) => {
                const globalIndex = displayedNavigationItems.length + index;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                       <NavLink 
                         ref={(el) => (menuRefs.current[globalIndex] = el)}
                         to={item.url} 
                         className={({ isActive }) => 
                           `flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-sidebar-ring ${getNavClass({ isActive })}`
                         }
                         tabIndex={0}
                         onFocus={() => setFocusedIndex(globalIndex)}
                       >
                         <item.icon className="w-5 h-5 flex-shrink-0" />
                         {!collapsed && <span className="font-medium">{t(item.title)}</span>}
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