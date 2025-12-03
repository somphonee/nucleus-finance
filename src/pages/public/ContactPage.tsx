import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  Globe,
  MessageSquare,
} from 'lucide-react';

const inquiryTypes = [
  { value: 'registration', label: 'Cooperative Registration', labelLao: 'ການຈົດທະບຽນສະຫະກອນ' },
  { value: 'membership', label: 'Membership Inquiry', labelLao: 'ການສອບຖາມກ່ຽວກັບສະມາຊິກ' },
  { value: 'legislation', label: 'Legislation & Regulations', labelLao: 'ກົດໝາຍ ແລະ ລະບຽບການ' },
  { value: 'technical', label: 'Technical Support', labelLao: 'ການສະໜັບສະໜູນທາງເທັກນິກ' },
  { value: 'general', label: 'General Inquiry', labelLao: 'ການສອບຖາມທົ່ວໄປ' },
];

const provincialOffices = [
  {
    name: 'Vientiane Capital Office',
    nameLao: 'ຫ້ອງການ ນະຄອນຫຼວງວຽງຈັນ',
    address: 'Lane Xang Avenue, Vientiane Capital',
    addressLao: 'ຖະໜົນລ້ານຊ້າງ, ນະຄອນຫຼວງວຽງຈັນ',
    phone: '(+856) 21 412 341',
    email: 'vientiane@daec.gov.la',
  },
  {
    name: 'Savannakhet Office',
    nameLao: 'ຫ້ອງການ ສະຫວັນນະເຂດ',
    address: 'Savannakhet Province',
    addressLao: 'ແຂວງສະຫວັນນະເຂດ',
    phone: '(+856) 41 212 345',
    email: 'savannakhet@daec.gov.la',
  },
  {
    name: 'Champasak Office',
    nameLao: 'ຫ້ອງການ ຈຳປາສັກ',
    address: 'Champasak Province',
    addressLao: 'ແຂວງຈຳປາສັກ',
    phone: '(+856) 31 212 456',
    email: 'champasak@daec.gov.la',
  },
];

export default function ContactPage() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: language === 'en' ? 'Message Sent' : 'ສົ່ງຂໍ້ຄວາມແລ້ວ',
      description:
        language === 'en'
          ? 'Thank you for contacting us. We will respond within 2-3 business days.'
          : 'ຂອບໃຈທີ່ຕິດຕໍ່ພວກເຮົາ. ພວກເຮົາຈະຕອບກັບພາຍໃນ 2-3 ວັນລັດຖະການ.',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              {language === 'en' ? 'Get in Touch' : 'ຕິດຕໍ່ພວກເຮົາ'}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              {language === 'en' ? 'Contact Us' : 'ຕິດຕໍ່ພວກເຮົາ'}
            </h1>
            <p className="text-xl opacity-90">
              {language === 'en'
                ? 'Have questions? Our team is here to help you with cooperative registration and management.'
                : 'ມີຄຳຖາມບໍ? ທີມງານຂອງພວກເຮົາພ້ອມຊ່ວຍເຫຼືອທ່ານ.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'en' ? 'Phone' : 'ໂທລະສັບ'}
                </h3>
                <p className="text-muted-foreground">(+856) 21 412 341</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'en' ? 'Mon-Fri, 8:00-16:30' : 'ຈັນ-ສຸກ, 8:00-16:30'}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'en' ? 'Email' : 'ອີເມວ'}
                </h3>
                <p className="text-muted-foreground">info@daec.gov.la</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'en' ? 'Response within 2-3 days' : 'ຕອບກັບພາຍໃນ 2-3 ວັນ'}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'en' ? 'Address' : 'ທີ່ຢູ່'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' ? 'Lane Xang Avenue' : 'ຖະໜົນລ້ານຊ້າງ'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'en' ? 'Vientiane Capital, Lao PDR' : 'ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {language === 'en' ? 'Send us a Message' : 'ສົ່ງຂໍ້ຄວາມຫາພວກເຮົາ'}
                </CardTitle>
                <CardDescription>
                  {language === 'en'
                    ? 'Fill out the form below and we will get back to you soon.'
                    : 'ກະລຸນາຕື່ມແບບຟອມຂ້າງລຸ່ມ ແລະ ພວກເຮົາຈະຕອບກັບທ່ານໃນໄວໆນີ້.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {language === 'en' ? 'Full Name' : 'ຊື່ເຕັມ'} *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'en' ? 'Enter your name' : 'ໃສ່ຊື່ຂອງທ່ານ'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {language === 'en' ? 'Email' : 'ອີເມວ'} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={language === 'en' ? 'Enter your email' : 'ໃສ່ອີເມວຂອງທ່ານ'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{language === 'en' ? 'Phone' : 'ໂທລະສັບ'}</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={language === 'en' ? 'Enter your phone' : 'ໃສ່ເບີໂທຂອງທ່ານ'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Inquiry Type' : 'ປະເພດການສອບຖາມ'} *</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={language === 'en' ? 'Select type' : 'ເລືອກປະເພດ'}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {language === 'en' ? type.label : type.labelLao}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {language === 'en' ? 'Message' : 'ຂໍ້ຄວາມ'} *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        language === 'en'
                          ? 'Enter your message or question...'
                          : 'ໃສ່ຂໍ້ຄວາມ ຫຼື ຄຳຖາມຂອງທ່ານ...'
                      }
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting
                      ? language === 'en'
                        ? 'Sending...'
                        : 'ກຳລັງສົ່ງ...'
                      : language === 'en'
                      ? 'Send Message'
                      : 'ສົ່ງຂໍ້ຄວາມ'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Hours & Map */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {language === 'en' ? 'Office Hours' : 'ເວລາເຮັດວຽກ'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Monday - Friday' : 'ວັນຈັນ - ວັນສຸກ'}</span>
                      <span className="font-medium">8:00 - 16:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Saturday' : 'ວັນເສົາ'}</span>
                      <span className="text-muted-foreground">
                        {language === 'en' ? 'Closed' : 'ປິດ'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Sunday' : 'ວັນອາທິດ'}</span>
                      <span className="text-muted-foreground">
                        {language === 'en' ? 'Closed' : 'ປິດ'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="h-[300px] bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Globe className="h-12 w-12 mx-auto mb-2" />
                    <p>{language === 'en' ? 'Map Location' : 'ແຜນທີ່ສະຖານທີ່'}</p>
                    <p className="text-sm">Vientiane Capital, Lao PDR</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Provincial Offices */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {language === 'en' ? 'Provincial Offices' : 'ຫ້ອງການແຂວງ'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {provincialOffices.map((office, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {language === 'en' ? office.name : office.nameLao}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {language === 'en' ? office.address : office.addressLao}
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {office.phone}
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {office.email}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
