import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function IncomeStatement() {
  const { toast } = useToast();
  const { user } = useAuth();

  // Province data would be added here for filtering

  const revenueItems = [
    { code: "4011", name: "ລາຍໄດ້ຈາກການຂາຍ", amount: 25000000 },
    { code: "4012", name: "ລາຍໄດ້ຈາກການບໍລິການ", amount: 8000000 },
    { code: "4013", name: "ລາຍໄດ້ອື່ນໆ", amount: 2000000 },
  ];

  const costItems = [
    { code: "5011", name: "ຕົ້ນທຶນຂອງສິນຄ້າທີ່ຂາຍ", amount: 15000000 },
  ];

  const expenseItems = [
    { code: "5021", name: "ຄ່າໃຊ້ຈ່າຍດຳເນີນງານ", amount: 3000000 },
    { code: "5031", name: "ຄ່າເຊົ່າສະຖານທີ່", amount: 2000000 },
    { code: "5041", name: "ເງິນເດືອນພະນັກງານ", amount: 8000000 },
    { code: "5051", name: "ຄ່າໄຟຟ້າ ແລະ ນ້ຳ", amount: 500000 },
    { code: "5061", name: "ຄ່າໂທລະສັບ ແລະ ອິນເຕີເນັດ", amount: 300000 },
    { code: "5071", name: "ຄ່າຂົນສົ່ງ", amount: 1200000 },
  ];

  const totalRevenue = revenueItems.reduce((sum, item) => sum + item.amount, 0);
  const totalCost = costItems.reduce((sum, item) => sum + item.amount, 0);
  const grossProfit = totalRevenue - totalCost;
  const totalExpenses = expenseItems.reduce((sum, item) => sum + item.amount, 0);
  const netIncome = grossProfit - totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ໃບແຈ້ງຜົນໄດ້ຮັບ</h1>
        <p className="text-muted-foreground mt-2">ລາຍງານລາຍຮັບປະຈຳເດືອນ/ປີ</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ລາຍຮັບທັງໝົດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">{totalRevenue.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ລວມລາຍຮັບທຸກປະເພດ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ກຳໄລຂັ້ນຕົ້ນ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-balance">{grossProfit.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ລາຍຮັບ - ຕົ້ນທຶນ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ຄ່າໃຊ້ຈ່າຍ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">{totalExpenses.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ຄ່າໃຊ້ຈ່າຍທັງໝົດ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ກຳໄລສຸດທິ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome > 0 ? 'text-success' : 'text-destructive'}`}>
              {netIncome.toLocaleString()} ກີບ
            </div>
            <p className="text-xs text-muted-foreground">
              {netIncome > 0 ? 'ມີກຳໄລ' : 'ຂາດທຶນ'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>ໃບແຈ້ງຜົນໄດ້ຮັບ</CardTitle>
              <CardDescription>ສຳລັບເດືອນ ມັງກອນ 2025</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <Select defaultValue="monthly">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">ລາຍເດືອນ</SelectItem>
                  <SelectItem value="quarterly">ລາຍໄຕມາດ</SelectItem>
                  <SelectItem value="yearly">ລາຍປີ</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2" onClick={() => {
                toast({ title: "ກຳລັງພິມ", description: "ກຳລັງພິມລາຍງານ..." });
              }}>
                <Printer className="h-4 w-4" />
                ພິມ
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => {
                toast({ title: "ກຳລັງສົ່ງອອກ", description: "ກຳລັງສົ່ງອອກເປັນ PDF/Excel..." });
              }}>
                <Download className="h-4 w-4" />
                ສົ່ງອອກ
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Revenue Section */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-income/10">
                    <TableHead colSpan={3} className="font-bold text-income">ລາຍຮັບ</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead>ລະຫັດ</TableHead>
                    <TableHead>ລາຍການ</TableHead>
                    <TableHead className="text-right">ຈຳນວນເງິນ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueItems.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell className="font-mono">{item.code}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right font-medium">
                        {item.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-income/5 font-bold">
                    <TableCell colSpan={2} className="text-right">ລາຍຮັບລວມ:</TableCell>
                    <TableCell className="text-right text-income">{totalRevenue.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Cost of Goods Sold */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-warning/10">
                    <TableHead colSpan={3} className="font-bold text-warning">ຕົ້ນທຶນຂອງສິນຄ້າທີ່ຂາຍ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costItems.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell className="font-mono">{item.code}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right font-medium">
                        ({item.amount.toLocaleString()})
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-balance/10 font-bold border-t-2">
                    <TableCell colSpan={2} className="text-right">ກຳໄລຂັ້ນຕົ້ນ:</TableCell>
                    <TableCell className="text-right text-balance text-lg">{grossProfit.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Operating Expenses */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-expense/10">
                    <TableHead colSpan={3} className="font-bold text-expense">ຄ່າໃຊ້ຈ່າຍດຳເນີນງານ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseItems.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell className="font-mono">{item.code}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right font-medium">
                        ({item.amount.toLocaleString()})
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-expense/5 font-bold">
                    <TableCell colSpan={2} className="text-right">ຄ່າໃຊ້ຈ່າຍລວມ:</TableCell>
                    <TableCell className="text-right text-expense">({totalExpenses.toLocaleString()})</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Net Income */}
            <div className="rounded-md border-2 border-primary bg-primary/5">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="font-bold text-lg" colSpan={2}>ກຳໄລສຸດທິ (ຂາດທຶນສຸດທິ):</TableCell>
                    <TableCell className={`text-right font-bold text-2xl ${netIncome > 0 ? 'text-success' : 'text-destructive'}`}>
                      {netIncome.toLocaleString()} ກີບ
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
