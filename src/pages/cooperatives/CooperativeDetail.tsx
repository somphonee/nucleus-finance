import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { certificatesAPI, CertificateData } from '@/lib/api/certificates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, FileText, Building2, User, MapPin, Calendar } from 'lucide-react';

export default function CooperativeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCertificate();
    }
  }, [id]);

  const loadCertificate = async () => {
    try {
      setLoading(true);
      const response = await certificatesAPI.getCertificateById(Number(id));
      setCertificate(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load cooperative details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!id) return;
    
    try {
      const blob = await certificatesAPI.downloadPDF(Number(id));
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cooperative-${certificate?.license_number || id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: 'Success',
        description: 'PDF downloaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download PDF',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Cooperative not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/cooperatives')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
        <Button onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Registration Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Registration Information
            </CardTitle>
            <Badge variant="default">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">License Number</p>
              <p className="font-medium">{certificate.license_number}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Registration Date</p>
              <p className="font-medium">{new Date(certificate.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cooperative Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Cooperative Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Cooperative Name (Lao)</p>
            <p className="font-medium text-lg">{certificate.cooperative_name_lao}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Cooperative Name (English)</p>
            <p className="font-medium text-lg">{certificate.cooperative_name_english}</p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Office Address</p>
              <p className="font-medium">To be implemented</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tax ID</p>
              <p className="font-medium">To be implemented</p>
            </div>
          </CardContent>
        </Card>

        {/* Chairman Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Chairman Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Chairman Name</p>
              <p className="font-medium">To be implemented</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nationality</p>
              <p className="font-medium">To be implemented</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Business Activities & Purpose</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Details to be implemented</p>
        </CardContent>
      </Card>
    </div>
  );
}
