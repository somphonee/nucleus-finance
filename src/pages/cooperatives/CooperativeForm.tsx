import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { certificatesAPI } from '@/lib/api/certificates';
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
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      loadCertificate();
    }
  }, [id, isEditMode]);

  const loadCertificate = async () => {
    try {
      const response = await certificatesAPI.getCertificateById(Number(id));
      // Populate form with existing data
      // Note: The API response might need to be mapped to form fields
      form.reset(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load cooperative data',
        variant: 'destructive',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const payload: any = {
        ...data,
        chairman_photo: photoPreview || undefined,
      };

      if (isEditMode && id) {
        await certificatesAPI.updateCertificate(Number(id), payload);
        toast({
          title: 'Success',
          description: 'Cooperative updated successfully',
        });
      } else {
        await certificatesAPI.createCertificate(payload);
        toast({
          title: 'Success',
          description: 'Cooperative registered successfully',
        });
      }
      
      navigate('/cooperatives');
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEditMode ? 'update' : 'register'} cooperative`,
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
          Back to List
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEditMode ? 'Edit Cooperative' : 'Add New Cooperative'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Registration Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Registration Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="license_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Registration Date</FormLabel>
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
                        <FormLabel>Application Date</FormLabel>
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
                <h3 className="text-lg font-semibold">Cooperative Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cooperative_name_lao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cooperative Name (Lao)</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Cooperative Name (English)</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Cooperative Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Supervising Authority</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Chairman Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Chairman Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="chairman_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chairman Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Chairman Photo</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" onChange={handleFileChange} />
                    </FormControl>
                  </FormItem>
                </div>
                {photoPreview && (
                  <div className="mt-2">
                    <img src={photoPreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Financial Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="registered_capital"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registered Capital</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
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
                        <FormLabel>Capital in Words</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Address & Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address & Contact</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="office_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} />
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
                        <FormLabel>Tax ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="number_of_members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Members</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="issuance_location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issuance Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Issuance Date</FormLabel>
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
                      <FormLabel>Cooperative Purpose</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
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
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  {isEditMode ? 'Update' : 'Save'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
