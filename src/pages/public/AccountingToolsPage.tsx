import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calculator,
  Download,
  FileSpreadsheet,
  Percent,
  DollarSign,
  TrendingUp,
  FileText,
  ExternalLink,
} from 'lucide-react';

const templates = [
  {
    id: 1,
    title: 'Monthly Financial Report Template',
    titleLao: 'ແບບຟອມລາຍງານການເງິນປະຈຳເດືອນ',
    description: 'Standard template for cooperative monthly financial reporting.',
    descriptionLao: 'ແບບຟອມມາດຕະຖານສຳລັບການລາຍງານການເງິນປະຈຳເດືອນຂອງສະຫະກອນ.',
    format: 'Excel',
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Annual Balance Sheet Template',
    titleLao: 'ແບບຟອມໃບດຸນການປະຈຳປີ',
    description: 'Template for preparing annual balance sheets.',
    descriptionLao: 'ແບບຟອມສຳລັບການກະກຽມໃບດຸນການປະຈຳປີ.',
    format: 'Excel',
    downloadUrl: '#',
  },
  {
    id: 3,
    title: 'Member Registry Form',
    titleLao: 'ແບບຟອມທະບຽນສະມາຊິກ',
    description: 'Form for registering and tracking cooperative members.',
    descriptionLao: 'ແບບຟອມສຳລັບການລົງທະບຽນ ແລະ ຕິດຕາມສະມາຊິກສະຫະກອນ.',
    format: 'PDF',
    downloadUrl: '#',
  },
  {
    id: 4,
    title: 'Loan Application Form',
    titleLao: 'ແບບຟອມຂໍກູ້ຢືມ',
    description: 'Standard loan application form for credit cooperatives.',
    descriptionLao: 'ແບບຟອມຂໍກູ້ຢືມມາດຕະຖານສຳລັບສະຫະກອນສິນເຊື່ອ.',
    format: 'PDF',
    downloadUrl: '#',
  },
  {
    id: 5,
    title: 'Meeting Minutes Template',
    titleLao: 'ແບບຟອມບັນທຶກກອງປະຊຸມ',
    description: 'Template for recording cooperative meeting minutes.',
    descriptionLao: 'ແບບຟອມສຳລັບບັນທຶກກອງປະຊຸມສະຫະກອນ.',
    format: 'Word',
    downloadUrl: '#',
  },
];

export default function AccountingToolsPage() {
  const { language } = useLanguage();

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState('1000000');
  const [interestRate, setInterestRate] = useState('12');
  const [loanTerm, setLoanTerm] = useState('12');

  // Savings Calculator State
  const [savingsAmount, setSavingsAmount] = useState('100000');
  const [savingsRate, setSavingsRate] = useState('6');
  const [savingsTerm, setSavingsTerm] = useState('12');

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const term = parseFloat(loanTerm) || 1;

    if (rate === 0) {
      return {
        monthlyPayment: principal / term,
        totalPayment: principal,
        totalInterest: 0,
      };
    }

    const monthlyPayment =
      (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  };

  const calculateSavings = () => {
    const principal = parseFloat(savingsAmount) || 0;
    const rate = (parseFloat(savingsRate) || 0) / 100 / 12;
    const term = parseFloat(savingsTerm) || 1;

    const futureValue = principal * Math.pow(1 + rate, term);
    const interestEarned = futureValue - principal;

    return {
      futureValue,
      interestEarned,
    };
  };

  const loanResult = calculateLoan();
  const savingsResult = calculateSavings();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(value));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              {language === 'en' ? 'Resources' : 'ຊັບພະຍາກອນ'}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              {language === 'en' ? 'Accounting Tools & Resources' : 'ເຄື່ອງມືບັນຊີ ແລະ ຊັບພະຍາກອນ'}
            </h1>
            <p className="text-xl opacity-90">
              {language === 'en'
                ? 'Free calculators and templates to help manage your cooperative finances.'
                : 'ເຄື່ອງຄິດໄລ່ ແລະ ແບບຟອມຟຣີເພື່ອຊ່ວຍຈັດການການເງິນສະຫະກອນຂອງທ່ານ.'}
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="calculators" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="calculators" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                {language === 'en' ? 'Calculators' : 'ເຄື່ອງຄິດໄລ່'}
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                {language === 'en' ? 'Templates' : 'ແບບຟອມ'}
              </TabsTrigger>
            </TabsList>

            {/* Calculators Tab */}
            <TabsContent value="calculators">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Loan Calculator */}
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>
                      {language === 'en' ? 'Loan Calculator' : 'ເຄື່ອງຄິດໄລ່ເງິນກູ້'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en'
                        ? 'Calculate monthly payments and total interest'
                        : 'ຄຳນວນການຊຳລະປະຈຳເດືອນ ແລະ ດອກເບ້ຍທັງໝົດ'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Loan Amount (₭)' : 'ຈຳນວນເງິນກູ້ (₭)'}</Label>
                      <Input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>
                        {language === 'en' ? 'Annual Interest Rate (%)' : 'ອັດຕາດອກເບ້ຍປະຈຳປີ (%)'}
                      </Label>
                      <Input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Loan Term (months)' : 'ໄລຍະເງິນກູ້ (ເດືອນ)'}</Label>
                      <Input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                      />
                    </div>
                    <div className="pt-4 border-t space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Monthly Payment:' : 'ການຊຳລະປະຈຳເດືອນ:'}
                        </span>
                        <span className="font-semibold text-primary">
                          ₭{formatCurrency(loanResult.monthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Total Interest:' : 'ດອກເບ້ຍທັງໝົດ:'}
                        </span>
                        <span className="font-semibold text-warning">
                          ₭{formatCurrency(loanResult.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Total Payment:' : 'ການຊຳລະທັງໝົດ:'}
                        </span>
                        <span className="font-bold">₭{formatCurrency(loanResult.totalPayment)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Savings Calculator */}
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-success" />
                    </div>
                    <CardTitle>
                      {language === 'en' ? 'Savings Calculator' : 'ເຄື່ອງຄິດໄລ່ເງິນຝາກ'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en'
                        ? 'Calculate future value and interest earned'
                        : 'ຄຳນວນມູນຄ່າໃນອະນາຄົດ ແລະ ດອກເບ້ຍທີ່ໄດ້ຮັບ'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Initial Deposit (₭)' : 'ເງິນຝາກເບື້ອງຕົ້ນ (₭)'}</Label>
                      <Input
                        type="number"
                        value={savingsAmount}
                        onChange={(e) => setSavingsAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>
                        {language === 'en' ? 'Annual Interest Rate (%)' : 'ອັດຕາດອກເບ້ຍປະຈຳປີ (%)'}
                      </Label>
                      <Input
                        type="number"
                        value={savingsRate}
                        onChange={(e) => setSavingsRate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Period (months)' : 'ໄລຍະ (ເດືອນ)'}</Label>
                      <Input
                        type="number"
                        value={savingsTerm}
                        onChange={(e) => setSavingsTerm(e.target.value)}
                      />
                    </div>
                    <div className="pt-4 border-t space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Interest Earned:' : 'ດອກເບ້ຍທີ່ໄດ້ຮັບ:'}
                        </span>
                        <span className="font-semibold text-success">
                          ₭{formatCurrency(savingsResult.interestEarned)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Future Value:' : 'ມູນຄ່າໃນອະນາຄົດ:'}
                        </span>
                        <span className="font-bold">₭{formatCurrency(savingsResult.futureValue)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="h-8 w-8 text-primary" />
                        <Badge variant="secondary">{template.format}</Badge>
                      </div>
                      <CardTitle className="text-base">
                        {language === 'en' ? template.title : template.titleLao}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {language === 'en' ? template.description : template.descriptionLao}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Download' : 'ດາວໂຫຼດ'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Need Help with Accounting?' : 'ຕ້ອງການຄວາມຊ່ວຍເຫຼືອດ້ານບັນຊີບໍ?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Contact our support team for assistance with financial management and reporting.'
              : 'ຕິດຕໍ່ທີມງານສະໜັບສະໜູນຂອງພວກເຮົາເພື່ອຂໍຄວາມຊ່ວຍເຫຼືອດ້ານການຈັດການການເງິນ.'}
          </p>
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Contact Support' : 'ຕິດຕໍ່ຝ່າຍສະໜັບສະໜູນ'}
          </Button>
        </div>
      </section>
    </div>
  );
}
