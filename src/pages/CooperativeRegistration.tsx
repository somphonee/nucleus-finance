import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportCooperativeCertificate } from "@/lib/cooperativePdfExport";

interface CooperativeData {
  licenseNumber: string;
  registrationDate: string;
  applicationDate: string;
  cooperativeNameLao: string;
  cooperativeNameEnglish: string;
  cooperativeType: string;
  chairmanName: string;
  chairmanNationality: string;
  registeredCapital: number;
  capitalInWords: string;
  officeAddress: string;
  taxId: string;
  issuanceLocation: string;
  issuanceDate: string;
  numberOfMembers: number;
  cooperativePurpose: string;
  supervisingAuthority: string;
  chairmanPhoto?: string;
}

const mockData: CooperativeData = {
  licenseNumber: "020555/COOP",
  registrationDate: "04/04/2025",
  applicationDate: "03/04/2025",
  cooperativeNameLao: "ສະຫະກອນ ການເງິນ ຄວີນແຄຊ",
  cooperativeNameEnglish: "Queen Cash Financial Cooperative",
  cooperativeType: "Financial Cooperative",
  chairmanName: "Mrs. Vongsakone Senaphon",
  chairmanNationality: "Lao",
  registeredCapital: 100000000000.00,
  capitalInWords: "One Hundred Billion Kip",
  officeAddress: "House No. 88, Unit 28, Ban Thaoubok, Sikhottabong District, Vientiane Capital",
  taxId: "383773265000",
  issuanceLocation: "ນະຄອນຫຼວງວຽງຈັນ",
  issuanceDate: "04/04/2025",
  numberOfMembers: 120,
  cooperativePurpose: "Providing financial services and promoting economic welfare for members",
  supervisingAuthority: "Bank of the Lao PDR"
};

export default function CooperativeRegistration() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const canManageCooperatives = user?.role === 'admin' || user?.role === 'userprovince';

  const handleExportCertificate = async () => {
    try {
      await exportCooperativeCertificate(mockData, language);
      
      toast({
        title: language === 'lo' ? 'ສຳເລັດ' : 'Success',
        description: language === 'lo' 
          ? 'ສົ່ງອອກໃບທະບຽນສຳເລັດແລ້ວ' 
          : 'Certificate exported successfully',
      });
    } catch (error) {
      toast({
        title: language === 'lo' ? 'ຜິດພາດ' : 'Error',
        description: language === 'lo' 
          ? 'ບໍ່ສາມາດສົ່ງອອກໃບທະບຽນໄດ້' 
          : 'Failed to export certificate',
        variant: 'destructive'
      });
    }
  };

  if (!canManageCooperatives) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            {language === 'lo' ? 'ບໍ່ມີສິດເຂົ້າເຖິງ' : 'Access Denied'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'lo' 
              ? 'ທ່ານບໍ່ມີສິດໃນການຈັດການສະຫະກອນ' 
              : 'You do not have permission to manage cooperatives'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('cooperative.registration')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('cooperative.subtitle')}
          </p>
        </div>
        <Button onClick={handleExportCertificate} className="gap-2">
          <Download className="w-4 h-4" />
          {t('cooperative.exportCertificate')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t('cooperative.certificatePreview')}
          </CardTitle>
          <CardDescription>{t('cooperative.certificatePreviewDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">{t('cooperative.licenseNumber')}:</span>
              <span className="ml-2">{mockData.licenseNumber}</span>
            </div>
            <div>
              <span className="font-semibold">{t('cooperative.registrationDate')}:</span>
              <span className="ml-2">{mockData.registrationDate}</span>
            </div>
            <div className="md:col-span-2">
              <span className="font-semibold">{t('cooperative.cooperativeNameLao')}:</span>
              <span className="ml-2">{mockData.cooperativeNameLao}</span>
            </div>
            <div className="md:col-span-2">
              <span className="font-semibold">{t('cooperative.cooperativeNameEnglish')}:</span>
              <span className="ml-2">{mockData.cooperativeNameEnglish}</span>
            </div>
            <div>
              <span className="font-semibold">{t('cooperative.cooperativeType')}:</span>
              <span className="ml-2">{mockData.cooperativeType}</span>
            </div>
            <div>
              <span className="font-semibold">{t('cooperative.chairmanName')}:</span>
              <span className="ml-2">{mockData.chairmanName}</span>
            </div>
            <div>
              <span className="font-semibold">{t('cooperative.registeredCapital')}:</span>
              <span className="ml-2">{mockData.registeredCapital.toLocaleString()} Kip</span>
            </div>
            <div>
              <span className="font-semibold">{t('cooperative.numberOfMembers')}:</span>
              <span className="ml-2">{mockData.numberOfMembers}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
