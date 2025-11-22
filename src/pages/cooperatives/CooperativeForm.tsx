import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
// Replace the API import with mock data
// import { certificatesAPI } from '@/lib/api/certificates';
import { mockCooperativesAPI } from '@/lib/mockData/cooperatives';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const formSchema = z.object({
    license_number: z.string().min(1, 'License number is required'),
    registration_date: z.string().min(1, 'Registration date is required'),
    application_date: z.string().min(1, 'Application date is required'),
    cooperative_name_lao: z.string().min(1, 'Cooperative name in Lao is required'),
    cooperative_name_english: z.string().min(1, 'Cooperative name in English is required'),
    cooperative_type: z.string().min(1, 'Cooperative type is required'),
    chairman_name: z.string().min(1, 'Chairman name is required'),
    chairman_nationality: z.string().min(1, 'Chairman nationality is required'),
    registered_capital: z.coerce.number().min(0, 'Registered capital must be positive'),
    capital_in_words: z.string().min(1, 'Capital in words is required'),
    office_address: z.string().min(1, 'Office address is required'),
    tax_id: z.string().min(1, 'Tax ID is required'),
    issuance_location: z.string().min(1, 'Issuance location is required'),
    issuance_date: z.string().min(1, 'Issuance date is required'),
    number_of_members: z.coerce.number().min(1, 'Number of members must be at least 1'),
    cooperative_purpose: z.string().min(1, 'Cooperative purpose is required'),
    supervising_authority: z.string().min(1, 'Supervising authority is required'),
    chairman_photo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function CooperativeForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string>('');

    const isEditMode = Boolean(id);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            license_number: '',
            registration_date: '',
            application_date: '',
            cooperative_name_lao: '',
            cooperative_name_english: '',
            cooperative_type: '',
            chairman_name: '',
            chairman_nationality: '',
            registered_capital: 0,
            capital_in_words: '',
            office_address: '',
            tax_id: '',
            issuance_location: '',
            issuance_date: '',
            number_of_members: 0,
            cooperative_purpose: '',
            supervising_authority: '',
            chairman_photo: '',
        },
    });

    useEffect(() => {
        const loadCertificate = async () => {
            try {
                const response = await mockCooperativesAPI.getCertificateById(Number(id));
                const data = response.data;

                // Populate form with existing data
                form.reset({
                    license_number: data.license_number,
                    registration_date: data.registration_date,
                    application_date: data.application_date,
                    cooperative_name_lao: data.cooperative_name_lao,
                    cooperative_name_english: data.cooperative_name_english,
                    cooperative_type: data.cooperative_type,
                    chairman_name: data.chairman_name,
                    chairman_nationality: data.chairman_nationality,
                    registered_capital: data.registered_capital,
                    capital_in_words: data.capital_in_words,
                    office_address: data.office_address,
                    tax_id: data.tax_id,
                    issuance_location: data.issuance_location,
                    issuance_date: data.issuance_date,
                    number_of_members: data.number_of_members,
                    cooperative_purpose: data.cooperative_purpose,
                    supervising_authority: data.supervising_authority,
                    chairman_photo: data.chairman_photo || '',
                });

                if (data.chairman_photo) {
                    setPhotoPreview(data.chairman_photo);
                }
            } catch (error) {
                toast({
                    title: t('common.error'),
                    description: t('cooperative.errorLoad'),
                    variant: 'destructive',
                });
            }
        };

        if (isEditMode && id) {
            loadCertificate();
        }
    }, [id, isEditMode, form, toast, t]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPhotoPreview(result);
                form.setValue('chairman_photo', result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: FormData) => {
        try {
            setIsSubmitting(true);

            const payload = {
                ...data,
                chairman_photo: photoPreview || undefined,
            };

            if (isEditMode && id) {
                await mockCooperativesAPI.updateCertificate(Number(id), payload);
                toast({
                    title: t('common.success'),
                    description: t('cooperative.successUpdate'),
                });
            } else {
                await mockCooperativesAPI.createCertificate(payload);
                toast({
                    title: t('common.success'),
                    description: t('cooperative.successRegister'),
                });
            }

            navigate('/cooperatives');
        } catch (error) {
            toast({
                title: t('common.error'),
                description: isEditMode ? t('cooperative.errorUpdate') : t('cooperative.errorRegister'),
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/cooperatives')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('cooperative.backToList')}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {isEditMode ? t('cooperative.editTitle') : t('cooperative.addTitle')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Registration Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{t('cooperative.registrationInfo')}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="license_number"
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
                                        name="registration_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cooperative.registrationDate')}</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="application_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cooperative.applicationDate')}</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Cooperative Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{t('cooperative.cooperativeInfo')}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="cooperative_name_lao"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cooperative.cooperativeNameLao')}</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="ສະຫະກອນ..." />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cooperative_name_english"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cooperative.cooperativeNameEnglish')}</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Cooperative Name..." />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cooperative_type"
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
                                        name="supervising_authority"
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
                                </div>
                            </div>

                            {/* Chairman Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{t('cooperative.chairmanInfo')}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="chairman_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cooperative.chairmanName')}</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Mr./Mrs. Full Name" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="chairman_nationality"
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
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>{t('cooperative.chairmanPhoto')}</FormLabel>
                                        <FormControl>
                                            <Input type="file" accept="image/*" onChange={handleFileChange} />
                                        </FormControl>
                                    </FormItem>
                                </div>
                                {photoPreview && (
                                    <div className="mt-2">
                                        <img src={photoPreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg border" />
                                    </div>
                                )}
                            </div>

                            {/* Financial Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{t('cooperative.financialInfo')}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="registered_capital"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cooperative.registeredCapital')}</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} placeholder="100000000000" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="capital_in_words"
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
                                </div>
                            </div>

                            {/* Address & Contact */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{t('cooperative.addressContact')}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="office_address"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel>{t('cooperative.officeAddress')}</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} rows={3} placeholder="Full address..." />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="tax_id"
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
                                        name="number_of_members"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cooperative.numberOfMembers')}</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} placeholder="120" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{t('cooperative.additionalInfo')}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="issuance_location"
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
                                        name="issuance_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cooperative.issuanceDate')}</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="cooperative_purpose"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('cooperative.cooperativePurpose')}</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} rows={4} placeholder="Describe the purpose and activities..." />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/cooperatives')}
                                    disabled={isSubmitting}
                                >
                                    {t('cooperative.cancel')}
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    <Save className="mr-2 h-4 w-4" />
                                    {isEditMode ? t('cooperative.update') : t('cooperative.save')}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}