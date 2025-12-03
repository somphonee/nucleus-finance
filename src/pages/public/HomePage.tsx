import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  Calculator,
  Building2,
  Phone,
  ArrowRight,
  Calendar,
  ChevronRight,
  Award,
  Shield,
  TrendingUp,
} from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: 'New Cooperative Registration Guidelines 2024',
    titleLao: 'ຂໍ້ແນະນຳການຈົດທະບຽນສະຫະກອນໃໝ່ 2024',
    date: '2024-01-15',
    category: 'Announcement',
    categoryLao: 'ແຈ້ງການ',
  },
  {
    id: 2,
    title: 'Annual Cooperative Summit Successfully Held',
    titleLao: 'ກອງປະຊຸມສະຫະກອນປະຈຳປີສຳເລັດລົງ',
    date: '2024-01-10',
    category: 'Event',
    categoryLao: 'ກິດຈະກຳ',
  },
  {
    id: 3,
    title: 'Updated Financial Reporting Requirements',
    titleLao: 'ຂໍ້ກຳນົດການລາຍງານການເງິນທີ່ປັບປຸງໃໝ່',
    date: '2024-01-05',
    category: 'Policy',
    categoryLao: 'ນະໂຍບາຍ',
  },
  {
    id: 4,
    title: 'Training Program for Cooperative Managers',
    titleLao: 'ໂຄງການຝຶກອົບຮົມຜູ້ຈັດການສະຫະກອນ',
    date: '2024-01-01',
    category: 'Training',
    categoryLao: 'ຝຶກອົບຮົມ',
  },
];

const quickLinks = [
  {
    icon: Users,
    title: 'Members',
    titleLao: 'ສະມາຊິກ',
    description: 'Learn about membership benefits and how to join',
    descriptionLao: 'ຮຽນຮູ້ກ່ຽວກັບຜົນປະໂຫຍດຂອງສະມາຊິກ',
    href: '/members',
  },
  {
    icon: FileText,
    title: 'Legislation',
    titleLao: 'ກົດໝາຍ',
    description: 'Laws, regulations, and policies',
    descriptionLao: 'ກົດໝາຍ, ລະບຽບການ, ແລະ ນະໂຍບາຍ',
    href: '/legislation',
  },
  {
    icon: Calculator,
    title: 'Accounting Tools',
    titleLao: 'ເຄື່ອງມືບັນຊີ',
    description: 'Financial calculators and templates',
    descriptionLao: 'ເຄື່ອງຄິດໄລ່ການເງິນ ແລະ ແບບຟອມ',
    href: '/accounting-tools',
  },
  {
    icon: Building2,
    title: 'Cooperatives',
    titleLao: 'ສະຫະກອນ',
    description: 'Browse registered cooperatives',
    descriptionLao: 'ຄົ້ນຫາສະຫະກອນທີ່ຈົດທະບຽນ',
    href: '/cooperatives-info',
  },
];

const stats = [
  { value: '1,500+', label: 'Registered Cooperatives', labelLao: 'ສະຫະກອນທີ່ຈົດທະບຽນ' },
  { value: '50,000+', label: 'Total Members', labelLao: 'ສະມາຊິກທັງໝົດ' },
  { value: '18', label: 'Provinces Covered', labelLao: 'ແຂວງທີ່ຄອບຄຸມ' },
  { value: '30+', label: 'Years of Service', labelLao: 'ປີຂອງການບໍລິການ' },
];

export default function HomePage() {
  const { t, language } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-hover text-primary-foreground py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              {language === 'en' ? 'Official Government Portal' : 'ປະຕູລັດຖະບານຢ່າງເປັນທາງການ'}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {language === 'en' 
                ? 'Department of Agricultural Extension and Cooperatives'
                : 'ກົມສົ່ງເສີມກະສິກຳ ແລະ ສະຫະກອນ'}
            </h1>
            <p className="text-xl opacity-90 mb-8">
              {language === 'en'
                ? 'Supporting agricultural development and cooperative growth across Lao PDR. Register, manage, and grow your cooperative with our comprehensive services.'
                : 'ສະໜັບສະໜູນການພັດທະນາກະສິກຳ ແລະ ການເຕີບໂຕຂອງສະຫະກອນທົ່ວ ສປປ ລາວ.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/cooperatives-info">
                <Button size="lg" variant="secondary" className="font-semibold">
                  {language === 'en' ? 'Browse Cooperatives' : 'ຊອກຫາສະຫະກອນ'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/members">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  {language === 'en' ? 'Become a Member' : 'ສະໝັກເປັນສະມາຊິກ'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'en' ? stat.label : stat.labelLao}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {language === 'en' ? 'Our Services' : 'ບໍລິການຂອງພວກເຮົາ'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'en'
                ? 'Access our comprehensive range of services designed to support cooperatives and their members.'
                : 'ເຂົ້າເຖິງບໍລິການທີ່ຄົບຖ້ວນຂອງພວກເຮົາ.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <link.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">
                      {language === 'en' ? link.title : link.titleLao}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' ? link.description : link.descriptionLao}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-primary text-sm font-medium flex items-center group-hover:gap-2 transition-all">
                      {language === 'en' ? 'Learn more' : 'ຮຽນຮູ້ເພີ່ມເຕີມ'}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'News & Announcements' : 'ຂ່າວ ແລະ ແຈ້ງການ'}
            </h2>
            <Link to="/news" className="text-primary hover:underline font-medium flex items-center">
              {language === 'en' ? 'View all' : 'ເບິ່ງທັງໝົດ'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {language === 'en' ? item.category : item.categoryLao}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-base line-clamp-2">
                    {language === 'en' ? item.title : item.titleLao}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link to={`/news/${item.id}`} className="text-primary text-sm hover:underline">
                    {language === 'en' ? 'Read more' : 'ອ່ານເພີ່ມເຕີມ'} →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                <Award className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {language === 'en' ? 'Official Certification' : 'ການຢັ້ງຢືນຢ່າງເປັນທາງການ'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'en'
                    ? 'Receive official government-recognized certification for your cooperative.'
                    : 'ໄດ້ຮັບໃບຢັ້ງຢືນທີ່ລັດຖະບານຮັບຮູ້ຢ່າງເປັນທາງການ.'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {language === 'en' ? 'Legal Protection' : 'ການປົກປ້ອງທາງກົດໝາຍ'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'en'
                    ? 'Operate under the legal framework with full government support.'
                    : 'ດຳເນີນງານພາຍໃຕ້ກອບກົດໝາຍດ້ວຍການສະໜັບສະໜູນຈາກລັດຖະບານ.'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {language === 'en' ? 'Growth Support' : 'ການສະໜັບສະໜູນການເຕີບໂຕ'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'en'
                    ? 'Access resources, training, and support to grow your cooperative.'
                    : 'ເຂົ້າເຖິງຊັບພະຍາກອນ, ການຝຶກອົບຮົມ, ແລະ ການສະໜັບສະໜູນ.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Ready to Register Your Cooperative?' : 'ພ້ອມທີ່ຈະລົງທະບຽນສະຫະກອນຂອງທ່ານບໍ?'}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Contact us today to learn about the registration process and requirements.'
              : 'ຕິດຕໍ່ພວກເຮົາມື້ນີ້ເພື່ອຮຽນຮູ້ກ່ຽວກັບຂັ້ນຕອນ ແລະ ເງື່ອນໄຂການລົງທະບຽນ.'}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="font-semibold">
              <Phone className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Contact Us' : 'ຕິດຕໍ່ພວກເຮົາ'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
