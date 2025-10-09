import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Bell, Lock, Globe, Moon, Mail, Shield } from "lucide-react";

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: false,
    autoSave: true,
    sessionTimeout: "30",
  });

  useEffect(() => {
    // Sync theme with settings
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSave = () => {
    toast({
      title: t("success"),
      description: t("Settings saved successfully"),
    });
  };

  const handleLanguageChange = (value: "en" | "lo") => {
    setLanguage(value);
    toast({
      title: t("success"),
      description: t("Language changed successfully"),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("settings")}</h1>
        <p className="text-muted-foreground">
          {t("Manage your application preferences")}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {t("Notifications")}
            </CardTitle>
            <CardDescription>
              {t("Configure how you receive notifications")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">
                  <Mail className="inline mr-2 h-4 w-4" />
                  {t("Email Notifications")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("Receive notifications via email")}
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">
                  <Bell className="inline mr-2 h-4 w-4" />
                  {t("Push Notifications")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("Receive push notifications in browser")}
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, pushNotifications: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t("Security")}
            </CardTitle>
            <CardDescription>
              {t("Manage your security preferences")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">
                  <Lock className="inline mr-2 h-4 w-4" />
                  {t("Two-Factor Authentication")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("Add an extra layer of security")}
                </p>
              </div>
              <Switch
                id="two-factor"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, twoFactorAuth: checked })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="session-timeout">
                {t("Session Timeout")}
              </Label>
              <Select
                value={settings.sessionTimeout}
                onValueChange={(value) =>
                  setSettings({ ...settings, sessionTimeout: value })
                }
              >
                <SelectTrigger id="session-timeout">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 {t("minutes")}</SelectItem>
                  <SelectItem value="30">30 {t("minutes")}</SelectItem>
                  <SelectItem value="60">60 {t("minutes")}</SelectItem>
                  <SelectItem value="120">120 {t("minutes")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t("Preferences")}
            </CardTitle>
            <CardDescription>
              {t("Customize your experience")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">
                <Globe className="inline mr-2 h-4 w-4" />
                {t("language")}
              </Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="lo">ລາວ (Lao)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">
                  <Moon className="inline mr-2 h-4 w-4" />
                  {t("Dark Mode")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("Enable dark theme")}
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) => {
                  setTheme(checked ? "dark" : "light");
                  toast({
                    title: t("success"),
                    description: checked ? "Dark mode enabled" : "Light mode enabled",
                  });
                }}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-save">
                  {t("Auto Save")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("Automatically save changes")}
                </p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoSave: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">{t("Reset to Default")}</Button>
          <Button onClick={handleSave}>{t("Save Settings")}</Button>
        </div>
      </div>
    </div>
  );
}
