import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2, Globe } from 'lucide-react';
import daecLogo from '@/assets/daec-logo.png';
import { LanguageToggle } from '@/components/LanguageToggle';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, register, loginBypass, loginBypassProvince, loginBypassSuperAdmin, isAuthenticated, user } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'en' | 'lo');
  };

  // Redirect based on user role
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'userprovince') {
        navigate('/cashbook', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        const result = await register(username, email, password, fullName);
        if (result.success) {
          setSuccess(t('login.registrationSuccess'));
          setIsSignUp(false);
          setEmail('');
          setPassword('');
          setUsername('');
          setFullName('');
        } else {
          setError(result.error || t('login.registrationFailed'));
        }
      } else {
        const success = await login(email, password);
        if (!success) {
          setError(t('login.invalidCredentials'));
        }
      }
    } catch (err) {
      setError(`An error occurred during ${isSignUp ? 'registration' : 'login'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBypass = () => {
    loginBypass();
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="w-full max-w-md space-y-6">


        {/* Language Toggle */}
        <div className="flex justify-end">
          <LanguageToggle />
        </div>


        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <img src={daecLogo} alt="DAEC Logo" className="w-40 h-40 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">{t('login.title')}</h1>
          <p className="text-lg text-foreground/80">{t('login.subtitle')}</p>
          <p className="text-muted-foreground">{t('login.signInMessage')}</p>
        </div>

        {/* Login/Register Form */}
        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? t('login.signUp') : t('login.signIn')}</CardTitle>
            <CardDescription>
              {isSignUp
                ? t('login.createAccount')
                : t('login.enterCredentials')
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="username">{t('login.username')}</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder={t('login.enterUsername')}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t('login.fullName')}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={t('login.enterFullName')}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login.enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('login.enterPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription className="text-green-600">{success}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSignUp ? t('login.signUp') : t('login.signIn')}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setSuccess('');
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  {isSignUp
                    ? t('login.alreadyHaveAccount')
                    : t('login.dontHaveAccount')
                  }
                </button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('login.or')}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => loginBypass()}
                type="button"
              >
                Skip Login (Demo mode admin)
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => loginBypassProvince()}
                type="button"
              >
                Skip Login (Demo mode province)
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => loginBypassSuperAdmin()}
                type="button"
              >
                Skip Login (Demo mode SuperAdmin)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        {/*<Card>*/}
        {/*  <CardHeader>*/}
        {/*    <CardTitle className="text-sm">{t('login.demoAccounts')}</CardTitle>*/}
        {/*    <CardDescription className="text-xs">*/}
        {/*      {t('login.demoAccountsDesc')}*/}
        {/*    </CardDescription>*/}
        {/*  </CardHeader>*/}
        {/*  <CardContent className="space-y-3">*/}
        {/*    <div*/}
        {/*      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"*/}
        {/*      onClick={() => handleDemoLogin('admin@company.com')}*/}
        {/*    >*/}
        {/*      <div className="space-y-1">*/}
        {/*        <p className="text-sm font-medium">{t('login.adminUser')}</p>*/}
        {/*        <p className="text-xs text-muted-foreground">admin@company.com</p>*/}
        {/*      </div>*/}
        {/*      <Badge variant="default">Admin</Badge>*/}
        {/*    </div>*/}

        {/*    <div*/}
        {/*      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"*/}
        {/*      onClick={() => handleDemoLogin('user@company.com')}*/}
        {/*    >*/}
        {/*      <div className="space-y-1">*/}
        {/*        <p className="text-sm font-medium">{t('login.regularUser')}</p>*/}
        {/*        <p className="text-xs text-muted-foreground">user@company.com</p>*/}
        {/*      </div>*/}
        {/*      <Badge variant="secondary">User</Badge>*/}
        {/*    </div>*/}

        {/*    <div*/}
        {/*      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"*/}
        {/*      onClick={() => handleDemoLogin('userprovince@company.com')}*/}
        {/*    >*/}
        {/*      <div className="space-y-1">*/}
        {/*        <p className="text-sm font-medium">{t('login.provinceUser')}</p>*/}
        {/*        <p className="text-xs text-muted-foreground">userprovince@company.com</p>*/}
        {/*      </div>*/}
        {/*      <Badge variant="outline">Province</Badge>*/}
        {/*    </div>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}

        <p className="text-center text-xs text-muted-foreground">
          {t('login.demoNote')}
        </p>
      </div>
    </div>
  );
};

export default Login;