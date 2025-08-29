import { Bell, Search, User, LogOut, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <header className="h-16 bg-card border-b border-card-border px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <SidebarTrigger className="md:hidden" />
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search transactions, members, reports..."
            className="pl-10 bg-background border-input-border focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:bg-primary-light/20">
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'EN' : 'ລາວ'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-card-border">
            <DropdownMenuItem className="hover:bg-primary-light/20" onClick={() => setLanguage('en')}>
              <span>English</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary-light/20" onClick={() => setLanguage('lo')}>
              <span>ລາວ (Lao)</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative hover:bg-primary-light/20">
              <Bell className="w-4 h-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card border-card-border">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-primary-light/20">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Loan Payment Due</p>
                <p className="text-xs text-muted-foreground">Member #1234 payment due in 2 days</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary-light/20">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Monthly Report Ready</p>
                <p className="text-xs text-muted-foreground">Financial summary for November 2024</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary-light/20">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">New Member Registration</p>
                <p className="text-xs text-muted-foreground">5 new members joined this week</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-primary-light/20">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card border-card-border" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">admin@nucleusfin.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-primary-light/20">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary-light/20">
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-destructive/10 text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}