import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search, MapPin, Building2, Users, Calendar, Eye, Filter } from 'lucide-react';

const provinces = [
  { value: 'all', label: 'All Provinces', labelLao: 'ທຸກແຂວງ' },
  { value: 'vientiane', label: 'Vientiane Capital', labelLao: 'ນະຄອນຫຼວງວຽງຈັນ' },
  { value: 'savannakhet', label: 'Savannakhet', labelLao: 'ສະຫວັນນະເຂດ' },
  { value: 'champasak', label: 'Champasak', labelLao: 'ຈຳປາສັກ' },
  { value: 'luangprabang', label: 'Luang Prabang', labelLao: 'ຫຼວງພະບາງ' },
  { value: 'oudomxay', label: 'Oudomxay', labelLao: 'ອຸດົມໄຊ' },
];

const cooperativeTypes = [
  { value: 'all', label: 'All Types', labelLao: 'ທຸກປະເພດ' },
  { value: 'agricultural', label: 'Agricultural', labelLao: 'ກະສິກຳ' },
  { value: 'savings', label: 'Savings & Credit', labelLao: 'ເງິນຝາກ ແລະ ສິນເຊື່ອ' },
  { value: 'consumer', label: 'Consumer', labelLao: 'ຜູ້ບໍລິໂພກ' },
  { value: 'production', label: 'Production', labelLao: 'ການຜະລິດ' },
];

const mockCooperatives = [
  {
    id: 1,
    registrationNumber: 'COOP-VT-2024-001',
    name: 'Vientiane Agricultural Cooperative',
    nameLao: 'ສະຫະກອນກະສິກຳວຽງຈັນ',
    type: 'agricultural',
    typeLabel: 'Agricultural',
    typeLabelLao: 'ກະສິກຳ',
    province: 'vientiane',
    provinceLabel: 'Vientiane Capital',
    provinceLabelLao: 'ນະຄອນຫຼວງວຽງຈັນ',
    memberCount: 156,
    registrationDate: '2020-03-15',
    status: 'active',
  },
  {
    id: 2,
    registrationNumber: 'COOP-SVK-2024-002',
    name: 'Savannakhet Savings & Credit Union',
    nameLao: 'ສະຫະພັນເງິນຝາກ ແລະ ສິນເຊື່ອ ສະຫວັນນະເຂດ',
    type: 'savings',
    typeLabel: 'Savings & Credit',
    typeLabelLao: 'ເງິນຝາກ ແລະ ສິນເຊື່ອ',
    province: 'savannakhet',
    provinceLabel: 'Savannakhet',
    provinceLabelLao: 'ສະຫວັນນະເຂດ',
    memberCount: 423,
    registrationDate: '2019-08-20',
    status: 'active',
  },
  {
    id: 3,
    registrationNumber: 'COOP-CPS-2024-003',
    name: 'Champasak Rice Producers Cooperative',
    nameLao: 'ສະຫະກອນຜູ້ຜະລິດເຂົ້າ ຈຳປາສັກ',
    type: 'production',
    typeLabel: 'Production',
    typeLabelLao: 'ການຜະລິດ',
    province: 'champasak',
    provinceLabel: 'Champasak',
    provinceLabelLao: 'ຈຳປາສັກ',
    memberCount: 89,
    registrationDate: '2021-01-10',
    status: 'active',
  },
  {
    id: 4,
    registrationNumber: 'COOP-LPB-2024-004',
    name: 'Luang Prabang Tourism Cooperative',
    nameLao: 'ສະຫະກອນການທ່ອງທ່ຽວ ຫຼວງພະບາງ',
    type: 'consumer',
    typeLabel: 'Consumer',
    typeLabelLao: 'ຜູ້ບໍລິໂພກ',
    province: 'luangprabang',
    provinceLabel: 'Luang Prabang',
    provinceLabelLao: 'ຫຼວງພະບາງ',
    memberCount: 67,
    registrationDate: '2022-05-05',
    status: 'active',
  },
  {
    id: 5,
    registrationNumber: 'COOP-ODX-2024-005',
    name: 'Oudomxay Coffee Growers Cooperative',
    nameLao: 'ສະຫະກອນຜູ້ປູກກາເຟ ອຸດົມໄຊ',
    type: 'agricultural',
    typeLabel: 'Agricultural',
    typeLabelLao: 'ກະສິກຳ',
    province: 'oudomxay',
    provinceLabel: 'Oudomxay',
    provinceLabelLao: 'ອຸດົມໄຊ',
    memberCount: 234,
    registrationDate: '2018-11-30',
    status: 'active',
  },
  {
    id: 6,
    registrationNumber: 'COOP-VT-2024-006',
    name: 'Vientiane Women\'s Credit Cooperative',
    nameLao: 'ສະຫະກອນສິນເຊື່ອແມ່ຍິງ ວຽງຈັນ',
    type: 'savings',
    typeLabel: 'Savings & Credit',
    typeLabelLao: 'ເງິນຝາກ ແລະ ສິນເຊື່ອ',
    province: 'vientiane',
    provinceLabel: 'Vientiane Capital',
    provinceLabelLao: 'ນະຄອນຫຼວງວຽງຈັນ',
    memberCount: 189,
    registrationDate: '2020-07-22',
    status: 'active',
  },
];

export default function CooperativesInfoPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCooperatives = mockCooperatives.filter((coop) => {
    const matchesSearch =
      coop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coop.nameLao.includes(searchTerm) ||
      coop.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = selectedProvince === 'all' || coop.province === selectedProvince;
    const matchesType = selectedType === 'all' || coop.type === selectedType;
    return matchesSearch && matchesProvince && matchesType;
  });

  const totalPages = Math.ceil(filteredCooperatives.length / itemsPerPage);
  const paginatedCooperatives = filteredCooperatives.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'agricultural':
        return 'bg-success/10 text-success';
      case 'savings':
        return 'bg-primary/10 text-primary';
      case 'consumer':
        return 'bg-warning/10 text-warning';
      case 'production':
        return 'bg-secondary text-secondary-foreground';
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
              {language === 'en' ? 'Directory' : 'ລາຍການ'}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              {language === 'en' ? 'Registered Cooperatives' : 'ສະຫະກອນທີ່ຈົດທະບຽນ'}
            </h1>
            <p className="text-xl opacity-90">
              {language === 'en'
                ? 'Browse and find information about registered cooperatives across Lao PDR.'
                : 'ຊອກຫາ ແລະ ຄົ້ນພົບຂໍ້ມູນກ່ຽວກັບສະຫະກອນທີ່ຈົດທະບຽນທົ່ວ ສປປ ລາວ.'}
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
                placeholder={
                  language === 'en'
                    ? 'Search by name or registration number...'
                    : 'ຄົ້ນຫາຕາມຊື່ ຫຼື ເລກທະບຽນ...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger className="w-full md:w-[200px]">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((prov) => (
                  <SelectItem key={prov.value} value={prov.value}>
                    {language === 'en' ? prov.label : prov.labelLao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cooperativeTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {language === 'en' ? type.label : type.labelLao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Cooperatives List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            {language === 'en'
              ? `Showing ${filteredCooperatives.length} cooperatives`
              : `ສະແດງ ${filteredCooperatives.length} ສະຫະກອນ`}
          </div>

          <div className="space-y-4">
            {paginatedCooperatives.map((coop) => (
              <Card key={coop.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(coop.type)}>
                          {language === 'en' ? coop.typeLabel : coop.typeLabelLao}
                        </Badge>
                        <Badge variant="outline">{coop.registrationNumber}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {language === 'en' ? coop.name : coop.nameLao}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {language === 'en' ? coop.provinceLabel : coop.provinceLabelLao}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {coop.memberCount} {language === 'en' ? 'members' : 'ສະມາຊິກ'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {language === 'en' ? 'Registered:' : 'ຈົດທະບຽນ:'}{' '}
                          {new Date(coop.registrationDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link to={`/cooperatives-info/${coop.id}`}>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'View Details' : 'ເບິ່ງລາຍລະອຽດ'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCooperatives.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'No cooperatives found' : 'ບໍ່ພົບສະຫະກອນ'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'ລອງປັບປ່ຽນການຄົ້ນຫາ ຫຼື ເງື່ອນໄຂການກັ່ນຕອງ.'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={
                        currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
