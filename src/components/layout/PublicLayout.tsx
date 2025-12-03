import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, Globe, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import daecLogo from '@/assets/daec-logo.png';
import { cn } from '@/lib/utils';

interface PublicLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/members', labelKey: 'nav.members' },
  { href: '/legislation', labelKey: 'nav.legislation' },
  { href: '/accounting-tools', labelKey: 'nav.accountingTools' },
  { href: '/cooperatives-info', labelKey: 'nav.cooperativesInfo' },
  { href: '/contact', labelKey: 'nav.contact' },
];

export function PublicLayout({ children }: PublicLayoutProps) {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              (+856) 21 412 341
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              info@daec.gov.la
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              Vientiane, Lao PDR
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-primary-foreground hover:bg-primary-hover">
                  <Globe className="h-3 w-3 mr-1" />
                  {language === 'en' ? 'English' : 'ລາວ'}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('lo')}>ລາວ (Lao)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={daecLogo} alt="DAEC Logo" className="h-14 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-primary leading-tight">DAEC</h1>
                <p className="text-xs text-muted-foreground leading-tight">
                  {t('app.fullName')}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>

            {/* Login Button & Mobile Menu */}
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  {t('nav.login')}
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-4 mt-8">
                    {/* Language Selector Mobile */}
                    <div className="flex items-center justify-between pb-4 border-b">
                      <span className="text-sm font-medium">{t('language')}</span>
                      <div className="flex gap-2">
                        <Button
                          variant={language === 'en' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setLanguage('en')}
                        >
                          EN
                        </Button>
                        <Button
                          variant={language === 'lo' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setLanguage('lo')}
                        >
                          ລາວ
                        </Button>
                      </div>
                    </div>

                    {/* Mobile Nav Links */}
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'px-4 py-3 text-base font-medium rounded-md transition-colors',
                          isActive(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent'
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}

                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full mt-4">{t('nav.login')}</Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={daecLogo} alt="DAEC Logo" className="h-12 w-auto brightness-0 invert" />
                <h3 className="text-lg font-bold">DAEC</h3>
              </div>
              <p className="text-sm opacity-80 mb-4">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/members" className="hover:opacity-100 transition-opacity">{t('nav.members')}</Link></li>
                <li><Link to="/legislation" className="hover:opacity-100 transition-opacity">{t('nav.legislation')}</Link></li>
                <li><Link to="/cooperatives-info" className="hover:opacity-100 transition-opacity">{t('nav.cooperativesInfo')}</Link></li>
                <li><Link to="/contact" className="hover:opacity-100 transition-opacity">{t('nav.contact')}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contactUs')}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Vientiane Capital, Lao PDR
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  (+856) 21 412 341
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  info@daec.gov.la
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>© {new Date().getFullYear()} DAEC - Department of Agricultural Extension and Cooperatives. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
