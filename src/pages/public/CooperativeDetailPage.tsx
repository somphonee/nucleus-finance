import { useParams, Link } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  FileText,
  Globe 
} from 'lucide-react';
import { getCooperativeById } from '@/lib/mockData/cooperatives';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CooperativeDetailPage() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const cooperative = getCooperativeById(Number(id));

  if (!cooperative) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Cooperative Not Found</h1>
          <p className="text-muted-foreground mb-8">The cooperative you're looking for doesn't exist.</p>
          <Link to="/cooperatives-info">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cooperatives
            </Button>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      Active: 'default',
      Pending: 'secondary',
      Suspended: 'destructive',
      Expired: 'outline',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/cooperatives-info" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cooperative Directory
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {language === 'lo' ? cooperative.cooperative_name_lao : cooperative.cooperative_name_english}
              </h1>
              <p className="text-lg text-muted-foreground">
                {language === 'lo' ? cooperative.cooperative_name_english : cooperative.cooperative_name_lao}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(cooperative.status)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Registration Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Registration Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">License Number</label>
                    <p className="text-foreground font-medium">{cooperative.license_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Registration Date</label>
                    <p className="text-foreground">{new Date(cooperative.registration_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cooperative Type</label>
                    <p className="text-foreground">{cooperative.cooperative_type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tax ID</label>
                    <p className="text-foreground">{cooperative.tax_id || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Purpose</label>
                  <p className="text-foreground">{cooperative.cooperative_purpose || 'Agricultural cooperative focused on supporting local farmers and promoting sustainable agriculture practices.'}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Number of Members</label>
                    <p className="text-foreground font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {cooperative.number_of_members} members
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Registered Capital</label>
                    <p className="text-foreground font-medium">
                      {cooperative.registered_capital?.toLocaleString()} LAK
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chairman Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Leadership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{cooperative.chairman_name}</h3>
                    <p className="text-sm text-muted-foreground">Chairman</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Nationality: {cooperative.chairman_nationality || 'Lao'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p className="text-foreground text-sm">{cooperative.office_address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Province</label>
                  <p className="text-foreground">{cooperative.issuance_location || 'Vientiane Capital'}</p>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">(+856) 21 XXX XXX</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">contact@cooperative.la</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(cooperative.status)}
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span className="text-sm font-medium">{cooperative.cooperative_type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Members</span>
                  <span className="text-sm font-medium">{cooperative.number_of_members}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Registered</span>
                  <span className="text-sm font-medium">
                    {new Date(cooperative.registration_date).getFullYear()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Supervising Authority */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Supervising Authority</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">
                  {cooperative.supervising_authority || 'Department of Agricultural Extension and Cooperatives (DAEC)'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}