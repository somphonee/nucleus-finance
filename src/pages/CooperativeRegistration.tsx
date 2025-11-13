import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const [formData, setFormData] = useState<CooperativeData>(mockData);
  const [chairmanPhoto, setChairmanPhoto] = useState<string | null>(null);

  const canManageCooperatives = user?.role === 'admin' || user?.role === 'userprovince';

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChairmanPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportCertificate = async () => {
    try {
      await exportCooperativeCertificate({
        ...formData,
        chairmanPhoto: chairmanPhoto || undefined
      }, language);
      
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
            {t('cooperative.basicInfo')}
          </CardTitle>
          <CardDescription>{t('cooperative.basicInfoDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('cooperative.licenseNumber')}</Label>
              <Input 
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.registrationDate')}</Label>
              <Input 
                type="date"
                value={formData.registrationDate}
                onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.cooperativeNameLao')}</Label>
              <Input 
                value={formData.cooperativeNameLao}
                onChange={(e) => setFormData({ ...formData, cooperativeNameLao: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.cooperativeNameEnglish')}</Label>
              <Input 
                value={formData.cooperativeNameEnglish}
                onChange={(e) => setFormData({ ...formData, cooperativeNameEnglish: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.cooperativeType')}</Label>
              <Input 
                value={formData.cooperativeType}
                onChange={(e) => setFormData({ ...formData, cooperativeType: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.chairmanName')}</Label>
              <Input 
                value={formData.chairmanName}
                onChange={(e) => setFormData({ ...formData, chairmanName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.chairmanNationality')}</Label>
              <Input 
                value={formData.chairmanNationality}
                onChange={(e) => setFormData({ ...formData, chairmanNationality: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.chairmanPhoto')}</Label>
              <Input 
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.registeredCapital')}</Label>
              <Input 
                type="number"
                value={formData.registeredCapital}
                onChange={(e) => setFormData({ ...formData, registeredCapital: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.capitalInWords')}</Label>
              <Input 
                value={formData.capitalInWords}
                onChange={(e) => setFormData({ ...formData, capitalInWords: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.taxId')}</Label>
              <Input 
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.numberOfMembers')}</Label>
              <Input 
                type="number"
                value={formData.numberOfMembers}
                onChange={(e) => setFormData({ ...formData, numberOfMembers: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.supervisingAuthority')}</Label>
              <Input 
                value={formData.supervisingAuthority}
                onChange={(e) => setFormData({ ...formData, supervisingAuthority: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('cooperative.issuanceLocation')}</Label>
              <Input 
                value={formData.issuanceLocation}
                onChange={(e) => setFormData({ ...formData, issuanceLocation: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('cooperative.officeAddress')}</Label>
            <Textarea 
              value={formData.officeAddress}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('cooperative.cooperativePurpose')}</Label>
            <Textarea 
              value={formData.cooperativePurpose}
              onChange={(e) => setFormData({ ...formData, cooperativePurpose: e.target.value })}
              rows={3}
            />
          </div>

          {chairmanPhoto && (
            <div className="space-y-2">
              <Label>{t('cooperative.photoPreview')}</Label>
              <div className="w-32 h-32 border rounded-lg overflow-hidden">
                <img src={chairmanPhoto} alt="Chairman" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
