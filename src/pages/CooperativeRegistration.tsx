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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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

const formSchema = z.object({
  licenseNumber: z.string().min(1, "License number is required"),
  registrationDate: z.string().min(1, "Registration date is required"),
  applicationDate: z.string().min(1, "Application date is required"),
  cooperativeNameLao: z.string().min(1, "Cooperative name in Lao is required"),
  cooperativeNameEnglish: z.string().min(1, "Cooperative name in English is required"),
  cooperativeType: z.string().min(1, "Cooperative type is required"),
  chairmanName: z.string().min(1, "Chairman name is required"),
  chairmanNationality: z.string().min(1, "Nationality is required"),
  registeredCapital: z.number().min(0, "Capital must be positive"),
  capitalInWords: z.string().min(1, "Capital in words is required"),
  officeAddress: z.string().min(1, "Office address is required"),
  taxId: z.string().min(1, "Tax ID is required"),
  issuanceLocation: z.string().min(1, "Issuance location is required"),
  issuanceDate: z.string().min(1, "Issuance date is required"),
  numberOfMembers: z.number().min(1, "Number of members is required"),
  cooperativePurpose: z.string().min(1, "Purpose is required"),
  supervisingAuthority: z.string().min(1, "Supervising authority is required"),
});

export default function CooperativeRegistration() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const canManageCooperatives = user?.role === 'admin' || user?.role === 'userprovince';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseNumber: "",
      registrationDate: "",
      applicationDate: "",
      cooperativeNameLao: "",
      cooperativeNameEnglish: "",
      cooperativeType: "",
      chairmanName: "",
      chairmanNationality: "",
      registeredCapital: 0,
      capitalInWords: "",
      officeAddress: "",
      taxId: "",
      issuanceLocation: "",
      issuanceDate: "",
      numberOfMembers: 0,
      cooperativePurpose: "",
      supervisingAuthority: "",
    },
  });

  const handleExportCertificate = async (values: z.infer<typeof formSchema>) => {
    try {
      await exportCooperativeCertificate(values as CooperativeData, language);
      
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
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t('cooperative.registration')}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t('cooperative.subtitle')}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleExportCertificate)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t('cooperative.certificateInfo')}
              </CardTitle>
              <CardDescription>{t('cooperative.fillFormDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.licenseNumber')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="020555/COOP" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="registrationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.registrationDate')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.applicationDate')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cooperativeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.cooperativeType')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Financial Cooperative" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cooperativeNameLao"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>{t('cooperative.cooperativeNameLao')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ສະຫະກອນ ການເງິນ ຄວີນແຄຊ" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cooperativeNameEnglish"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>{t('cooperative.cooperativeNameEnglish')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Queen Cash Financial Cooperative" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chairmanName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.chairmanName')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Mrs. Vongsakone Senaphon" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chairmanNationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.chairmanNationality')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Lao" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registeredCapital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.registeredCapital')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          placeholder="100000000000"
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capitalInWords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.capitalInWords')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="One Hundred Billion Kip" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.taxId')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="383773265000" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfMembers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.numberOfMembers')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          placeholder="120"
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="officeAddress"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>{t('cooperative.officeAddress')}</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="House No. 88, Unit 28, Ban Thaoubok, Sikhottabong District, Vientiane Capital" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cooperativePurpose"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>{t('cooperative.cooperativePurpose')}</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Providing financial services and promoting economic welfare for members" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supervisingAuthority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.supervisingAuthority')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Bank of the Lao PDR" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issuanceLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.issuanceLocation')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ນະຄອນຫຼວງວຽງຈັນ" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issuanceDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cooperative.issuanceDate')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" className="gap-2">
                  <Download className="w-4 h-4" />
                  {t('cooperative.generateCertificate')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
