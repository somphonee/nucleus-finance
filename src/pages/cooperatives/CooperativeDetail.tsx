import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockCooperativesAPI, CooperativeMockData } from '@/lib/mockData/cooperatives';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CooperativeCertificate } from '@/components/CooperativeCertificate';
import { ArrowLeft, Download, FileText, Building2, User, MapPin, Calendar, Eye } from 'lucide-react';

export default function CooperativeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  const t = {
    registrationInfo: language === 'en' ? 'Registration Information' : 'ຂໍ້ມູນການລົງທະບຽນ',
    licenseNumber: language === 'en' ? 'License Number' : 'ເລກທີ່ໃບອະນຸຍາດ',
    registrationDate: language === 'en' ? 'Registration Date' : 'ວັນທີ່ລົງທະບຽນ',
    applicationDate: language === 'en' ? 'Application Date' : 'ວັນທີ່ຍື່ນຄໍາຮ້ອງ',
    issuanceLocation: language === 'en' ? 'Issuance Location' : 'ສະຖານທີ່ອອກໃບ',
    issuanceDate: language === 'en' ? 'Issuance Date' : 'ວັນທີ່ອອກໃບ',
    cooperativeInfo: language === 'en' ? 'Cooperative Information' : 'ຂໍ້ມູນສະຫະກອນ',
    cooperativeNameLao: language === 'en' ? 'Cooperative Name (Lao)' : 'ຊື່ສະຫະກອນ (ລາວ)',
    cooperativeNameEng: language === 'en' ? 'Cooperative Name (English)' : 'ຊື່ສະຫະກອນ (ອັງກິດ)',
    cooperativeType: language === 'en' ? 'Cooperative Type' : 'ປະເພດສະຫະກອນ',
    numberOfMembers: language === 'en' ? 'Number of Members' : 'ຈໍານວນສະມາຊິກ',
    supervisingAuthority: language === 'en' ? 'Supervising Authority' : 'ອົງການກວດກາ',
    contactInfo: language === 'en' ? 'Contact Information' : 'ຂໍ້ມູນການຕິດຕໍ່',
    officeAddress: language === 'en' ? 'Office Address' : 'ທີ່ຢູ່ສໍານັກງານ',
    taxId: language === 'en' ? 'Tax ID' : 'ເລກທີ່ຜູ້ເສຍພາສີ',
    chairmanInfo: language === 'en' ? 'Chairman Information' : 'ຂໍ້ມູນປະທານ',
    chairmanName: language === 'en' ? 'Chairman Name' : 'ຊື່ປະທານ',
    nationality: language === 'en' ? 'Nationality' : 'ສັນຊາດ',
    financialInfo: language === 'en' ? 'Financial Information' : 'ຂໍ້ມູນການເງິນ',
    registeredCapital: language === 'en' ? 'Registered Capital' : 'ທຶນຈົດທະບຽນ',
    capitalInWords: language === 'en' ? 'Capital in Words' : 'ທຶນເປັນຕົວອັກສອນ',
    businessPurpose: language === 'en' ? 'Cooperative Purpose & Business Activities' : 'ຈຸດປະສົງ ແລະ ກິດຈະກໍາທຸລະກິດ',
    mainPurpose: language === 'en' ? 'Main Purpose' : 'ຈຸດປະສົງຕົ້ນຕໍ',
    viewCertificate: language === 'en' ? 'View Certificate' : 'ເບິ່ງໃບຢັ້ງຢືນ',
    showData: language === 'en' ? 'Show Data' : 'ສະແດງຂໍ້ມູນ',
    downloadPdf: language === 'en' ? 'Download PDF' : 'ດາວໂຫຼດ PDF',
    backToList: language === 'en' ? 'Back to List' : 'ກັບໄປບັນຊີລາຍການ',
  };

  const [certificate, setCertificate] = useState<CooperativeMockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    if (id) {
      loadCertificate();
    }

    // Cleanup: revoke PDF URL when component unmounts
    return () => {
      if (pdfUrl) {
        window.URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [id]);

  const loadCertificate = async () => {
    try {
      setLoading(true);
      const response = await mockCooperativesAPI.getCertificateById(Number(id));
      setCertificate(response.data);

      // Load PDF for viewing
      const blob = await mockCooperativesAPI.downloadPDF(Number(id));
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
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
      const blob = await mockCooperativesAPI.downloadPDF(Number(id));
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

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
      default:
        return <Badge variant="default">Active</Badge>;
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
          {t.backToList}
        </Button>
        <div className="flex gap-2">
          <Button
            variant={showCertificate ? "default" : "outline"}
            onClick={() => setShowCertificate(!showCertificate)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {showCertificate ? t.showData : t.viewCertificate}
          </Button>
          <Button onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            {t.downloadPdf}
          </Button>
        </div>
      </div>

      {/* Certificate/PDF View */}
      {showCertificate ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Certificate Document (PDF)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pdfUrl ? (
              <>
                <div className="w-full border rounded-lg overflow-hidden bg-gray-50">
                  <iframe
                    src={pdfUrl}
                    className="w-full"
                    style={{ height: '800px' }}
                    title="Cooperative Certificate PDF"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  If the PDF doesn't display properly, please use the "Download PDF" button above.
                </p>
              </>
            ) : (
              <p className="text-center py-8 text-muted-foreground">Loading PDF...</p>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Registration Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {t.registrationInfo}
                </CardTitle>
                {getStatusBadge(certificate.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t.licenseNumber}</p>
                  <p className="font-medium">{certificate.license_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.registrationDate}</p>
                  <p className="font-medium">{new Date(certificate.registration_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.applicationDate}</p>
                  <p className="font-medium">{new Date(certificate.application_date).toLocaleDateString()}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t.issuanceLocation}</p>
                  <p className="font-medium">{certificate.issuance_location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.issuanceDate}</p>
                  <p className="font-medium">{new Date(certificate.issuance_date).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cooperative Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t.cooperativeInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{t.cooperativeNameLao}</p>
                <p className="font-medium text-lg">{certificate.cooperative_name_lao}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">{t.cooperativeNameEng}</p>
                <p className="font-medium text-lg">{certificate.cooperative_name_english}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t.cooperativeType}</p>
                  <p className="font-medium">{certificate.cooperative_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.numberOfMembers}</p>
                  <p className="font-medium">{certificate.number_of_members}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">{t.supervisingAuthority}</p>
                <p className="font-medium">{certificate.supervising_authority}</p>
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
                  {t.contactInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{t.officeAddress}</p>
                  <p className="font-medium">{certificate.office_address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.taxId}</p>
                  <p className="font-medium">{certificate.tax_id}</p>
                </div>
              </CardContent>
            </Card>

            {/* Chairman Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t.chairmanInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{t.chairmanName}</p>
                  <p className="font-medium">{certificate.chairman_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.nationality}</p>
                  <p className="font-medium">{certificate.chairman_nationality}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {t.financialInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t.registeredCapital}</p>
                  <p className="font-medium text-lg">{new Intl.NumberFormat('en-US').format(certificate.registered_capital)} KIP</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.capitalInWords}</p>
                  <p className="font-medium">{certificate.capital_in_words}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Activities */}
          <Card>
            <CardHeader>
              <CardTitle>{t.businessPurpose}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{t.mainPurpose}</p>
              <p>{certificate.cooperative_purpose}</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
