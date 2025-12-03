import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Users,
  CheckCircle,
  FileText,
  Building2,
  ArrowRight,
  Award,
  Handshake,
  TrendingUp,
  Shield,
} from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Legal Recognition',
    titleLao: 'ການຮັບຮູ້ທາງກົດໝາຍ',
    description: 'Operate with official government recognition and legal protection.',
    descriptionLao: 'ດຳເນີນງານດ້ວຍການຮັບຮູ້ຢ່າງເປັນທາງການຈາກລັດຖະບານ.',
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    titleLao: 'ການເຕີບໂຕຂອງທຸລະກິດ',
    description: 'Access to training, resources, and networking opportunities.',
    descriptionLao: 'ເຂົ້າເຖິງການຝຶກອົບຮົມ, ຊັບພະຍາກອນ, ແລະ ໂອກາດເຄືອຂ່າຍ.',
  },
  {
    icon: Handshake,
    title: 'Market Access',
    titleLao: 'ການເຂົ້າເຖິງຕະຫຼາດ',
    description: 'Connect with markets and partners through cooperative networks.',
    descriptionLao: 'ເຊື່ອມຕໍ່ກັບຕະຫຼາດ ແລະ ຄູ່ຮ່ວມງານຜ່ານເຄືອຂ່າຍສະຫະກອນ.',
  },
  {
    icon: Award,
    title: 'Government Support',
    titleLao: 'ການສະໜັບສະໜູນຈາກລັດຖະບານ',
    description: 'Eligible for government programs, subsidies, and incentives.',
    descriptionLao: 'ມີສິດໄດ້ຮັບໂຄງການລັດຖະບານ, ເງິນອຸດໜູນ, ແລະ ແຮງຈູງໃຈ.',
  },
];

const membershipTypes = [
  {
    title: 'Agricultural Cooperative',
    titleLao: 'ສະຫະກອນກະສິກຳ',
    description: 'For farmers and agricultural producers',
    descriptionLao: 'ສຳລັບຊາວກະສິກອນ ແລະ ຜູ້ຜະລິດກະສິກຳ',
    requirements: ['Minimum 7 founding members', 'Agricultural focus', 'Registration fee'],
    requirementsLao: ['ຢ່າງໜ້ອຍ 7 ສະມາຊິກກໍ່ຕັ້ງ', 'ເນັ້ນໃສ່ກະສິກຳ', 'ຄ່າທຳນຽມລົງທະບຽນ'],
  },
  {
    title: 'Savings & Credit Cooperative',
    titleLao: 'ສະຫະກອນເງິນຝາກ ແລະ ສິນເຊື່ອ',
    description: 'For financial services and credit unions',
    descriptionLao: 'ສຳລັບບໍລິການການເງິນ ແລະ ສະຫະພັນສິນເຊື່ອ',
    requirements: ['Minimum 15 founding members', 'Financial services focus', 'Capital requirements'],
    requirementsLao: ['ຢ່າງໜ້ອຍ 15 ສະມາຊິກກໍ່ຕັ້ງ', 'ເນັ້ນໃສ່ບໍລິການການເງິນ', 'ຂໍ້ກຳນົດດ້ານທຶນ'],
  },
  {
    title: 'Consumer Cooperative',
    titleLao: 'ສະຫະກອນຜູ້ບໍລິໂພກ',
    description: 'For retail and consumer services',
    descriptionLao: 'ສຳລັບການຂາຍຍ່ອຍ ແລະ ບໍລິການຜູ້ບໍລິໂພກ',
    requirements: ['Minimum 10 founding members', 'Consumer focus', 'Business plan'],
    requirementsLao: ['ຢ່າງໜ້ອຍ 10 ສະມາຊິກກໍ່ຕັ້ງ', 'ເນັ້ນໃສ່ຜູ້ບໍລິໂພກ', 'ແຜນທຸລະກິດ'],
  },
];

const registrationSteps = [
  {
    step: 1,
    title: 'Prepare Documents',
    titleLao: 'ກຽມເອກະສານ',
    description: 'Gather required documents including member list, bylaws, and business plan.',
    descriptionLao: 'ລວບລວມເອກະສານທີ່ຕ້ອງການລວມທັງລາຍຊື່ສະມາຊິກ, ກົດລະບຽບ, ແລະ ແຜນທຸລະກິດ.',
  },
  {
    step: 2,
    title: 'Submit Application',
    titleLao: 'ສົ່ງໃບສະໝັກ',
    description: 'Submit your application to the provincial or district DAEC office.',
    descriptionLao: 'ສົ່ງໃບສະໝັກຂອງທ່ານໄປຫ້ອງການ DAEC ແຂວງ ຫຼື ເມືອງ.',
  },
  {
    step: 3,
    title: 'Review Process',
    titleLao: 'ຂັ້ນຕອນການກວດສອບ',
    description: 'Your application will be reviewed by DAEC officials.',
    descriptionLao: 'ໃບສະໝັກຂອງທ່ານຈະຖືກກວດສອບໂດຍເຈົ້າໜ້າທີ່ DAEC.',
  },
  {
    step: 4,
    title: 'Receive Certificate',
    titleLao: 'ຮັບໃບຢັ້ງຢືນ',
    description: 'Upon approval, receive your official registration certificate.',
    descriptionLao: 'ເມື່ອໄດ້ຮັບການອະນຸມັດ, ຮັບໃບຢັ້ງຢືນການລົງທະບຽນຢ່າງເປັນທາງການ.',
  },
];

export default function MembersPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              {language === 'en' ? 'Membership' : 'ສະມາຊິກ'}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              {language === 'en' ? 'Become a Member' : 'ສະໝັກເປັນສະມາຊິກ'}
            </h1>
            <p className="text-xl opacity-90">
              {language === 'en'
                ? 'Join the cooperative movement and unlock benefits for your organization.'
                : 'ເຂົ້າຮ່ວມການເຄື່ອນໄຫວສະຫະກອນ ແລະ ປົດລັອກຜົນປະໂຫຍດສຳລັບອົງກອນຂອງທ່ານ.'}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Membership Benefits' : 'ຜົນປະໂຫຍດຂອງສະມາຊິກ'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">
                    {language === 'en' ? benefit.title : benefit.titleLao}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {language === 'en' ? benefit.description : benefit.descriptionLao}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Types of Cooperatives' : 'ປະເພດສະຫະກອນ'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{language === 'en' ? type.title : type.titleLao}</CardTitle>
                  <CardDescription>
                    {language === 'en' ? type.description : type.descriptionLao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2 text-sm">
                    {language === 'en' ? 'Requirements:' : 'ເງື່ອນໄຂ:'}
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'en' ? type.requirements : type.requirementsLao).map((req, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success mr-2 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Registration Process' : 'ຂັ້ນຕອນການລົງທະບຽນ'}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {registrationSteps.map((step, index) => (
                <div key={step.step} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    {index < registrationSteps.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'en' ? step.title : step.titleLao}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'en' ? step.description : step.descriptionLao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Ready to Get Started?' : 'ພ້ອມທີ່ຈະເລີ່ມຕົ້ນບໍ?'}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Contact our team for guidance on the registration process.'
              : 'ຕິດຕໍ່ທີມງານຂອງພວກເຮົາເພື່ອຂໍຄຳແນະນຳກ່ຽວກັບຂັ້ນຕອນການລົງທະບຽນ.'}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              {language === 'en' ? 'Contact Us' : 'ຕິດຕໍ່ພວກເຮົາ'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
