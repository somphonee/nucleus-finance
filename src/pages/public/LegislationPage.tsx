import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Download, Search, Calendar, ExternalLink, Filter } from 'lucide-react';

const legislationData = [
  {
    id: 1,
    title: 'Cooperative Law No. 02/NA',
    titleLao: 'ກົດໝາຍວ່າດ້ວຍສະຫະກອນ ສະບັບເລກທີ 02/ສພຊ',
    category: 'law',
    categoryLabel: 'Law',
    categoryLabelLao: 'ກົດໝາຍ',
    date: '2018-07-24',
    description: 'Primary law governing cooperative formation, operation, and dissolution in Lao PDR.',
    descriptionLao: 'ກົດໝາຍຫຼັກທີ່ຄຸ້ມຄອງການສ້າງຕັ້ງ, ການດຳເນີນງານ, ແລະ ການຍຸບເລີກສະຫະກອນ ໃນ ສປປ ລາວ.',
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Decree on Cooperative Registration',
    titleLao: 'ດຳລັດວ່າດ້ວຍການຈົດທະບຽນສະຫະກອນ',
    category: 'decree',
    categoryLabel: 'Decree',
    categoryLabelLao: 'ດຳລັດ',
    date: '2019-03-15',
    description: 'Guidelines for cooperative registration procedures and requirements.',
    descriptionLao: 'ຂໍ້ແນະນຳສຳລັບຂັ້ນຕອນ ແລະ ເງື່ອນໄຂການຈົດທະບຽນສະຫະກອນ.',
    downloadUrl: '#',
  },
  {
    id: 3,
    title: 'Agricultural Cooperative Guidelines',
    titleLao: 'ຂໍ້ແນະນຳສະຫະກອນກະສິກຳ',
    category: 'guideline',
    categoryLabel: 'Guideline',
    categoryLabelLao: 'ຂໍ້ແນະນຳ',
    date: '2020-01-10',
    description: 'Specific guidelines for agricultural cooperative establishment and management.',
    descriptionLao: 'ຂໍ້ແນະນຳສະເພາະສຳລັບການສ້າງຕັ້ງ ແລະ ການຈັດການສະຫະກອນກະສິກຳ.',
    downloadUrl: '#',
  },
  {
    id: 4,
    title: 'Savings and Credit Cooperative Regulations',
    titleLao: 'ລະບຽບການສະຫະກອນເງິນຝາກ ແລະ ສິນເຊື່ອ',
    category: 'regulation',
    categoryLabel: 'Regulation',
    categoryLabelLao: 'ລະບຽບການ',
    date: '2019-08-20',
    description: 'Regulations for savings and credit cooperatives including capital requirements.',
    descriptionLao: 'ລະບຽບການສຳລັບສະຫະກອນເງິນຝາກ ແລະ ສິນເຊື່ອ ລວມທັງຂໍ້ກຳນົດດ້ານທຶນ.',
    downloadUrl: '#',
  },
  {
    id: 5,
    title: 'Cooperative Financial Reporting Standards',
    titleLao: 'ມາດຕະຖານການລາຍງານການເງິນສະຫະກອນ',
    category: 'standard',
    categoryLabel: 'Standard',
    categoryLabelLao: 'ມາດຕະຖານ',
    date: '2021-05-01',
    description: 'Financial reporting requirements and standards for all types of cooperatives.',
    descriptionLao: 'ຂໍ້ກຳນົດ ແລະ ມາດຕະຖານການລາຍງານການເງິນສຳລັບສະຫະກອນທຸກປະເພດ.',
    downloadUrl: '#',
  },
  {
    id: 6,
    title: 'Cooperative Audit Requirements',
    titleLao: 'ຂໍ້ກຳນົດການກວດສອບສະຫະກອນ',
    category: 'regulation',
    categoryLabel: 'Regulation',
    categoryLabelLao: 'ລະບຽບການ',
    date: '2020-11-15',
    description: 'Requirements for cooperative audits and financial oversight.',
    descriptionLao: 'ຂໍ້ກຳນົດສຳລັບການກວດສອບສະຫະກອນ ແລະ ການຕິດຕາມການເງິນ.',
    downloadUrl: '#',
  },
];

const categories = [
  { value: 'all', label: 'All Categories', labelLao: 'ທຸກໝວດໝູ່' },
  { value: 'law', label: 'Laws', labelLao: 'ກົດໝາຍ' },
  { value: 'decree', label: 'Decrees', labelLao: 'ດຳລັດ' },
  { value: 'regulation', label: 'Regulations', labelLao: 'ລະບຽບການ' },
  { value: 'guideline', label: 'Guidelines', labelLao: 'ຂໍ້ແນະນຳ' },
  { value: 'standard', label: 'Standards', labelLao: 'ມາດຕະຖານ' },
];

export default function LegislationPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredLegislation = legislationData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleLao.includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'law':
        return 'bg-primary/10 text-primary';
      case 'decree':
        return 'bg-success/10 text-success';
      case 'regulation':
        return 'bg-warning/10 text-warning';
      case 'guideline':
        return 'bg-secondary text-secondary-foreground';
      case 'standard':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              {language === 'en' ? 'Legal Framework' : 'ກອບກົດໝາຍ'}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              {language === 'en' ? 'Legislation & Regulations' : 'ກົດໝາຍ ແລະ ລະບຽບການ'}
            </h1>
            <p className="text-xl opacity-90">
              {language === 'en'
                ? 'Access laws, decrees, regulations, and guidelines governing cooperatives in Lao PDR.'
                : 'ເຂົ້າເຖິງກົດໝາຍ, ດຳລັດ, ລະບຽບການ, ແລະ ຂໍ້ແນະນຳທີ່ຄຸ້ມຄອງສະຫະກອນ ໃນ ສປປ ລາວ.'}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'en' ? 'Search legislation...' : 'ຄົ້ນຫາກົດໝາຍ...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {language === 'en' ? cat.label : cat.labelLao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Legislation List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            {language === 'en'
              ? `Showing ${filteredLegislation.length} documents`
              : `ສະແດງ ${filteredLegislation.length} ເອກະສານ`}
          </div>
          <div className="space-y-4">
            {filteredLegislation.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(item.category)}>
                          {language === 'en' ? item.categoryLabel : item.categoryLabelLao}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg flex items-start gap-2">
                        <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        {language === 'en' ? item.title : item.titleLao}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {language === 'en' ? item.description : item.descriptionLao}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        {language === 'en' ? 'View' : 'ເບິ່ງ'}
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        {language === 'en' ? 'Download' : 'ດາວໂຫຼດ'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {filteredLegislation.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'No documents found' : 'ບໍ່ພົບເອກະສານ'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'ລອງປັບປ່ຽນການຄົ້ນຫາ ຫຼື ເງື່ອນໄຂການກັ່ນຕອງ.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
