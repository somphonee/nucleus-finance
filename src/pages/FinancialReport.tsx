import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function FinancialReport() {
  const { toast } = useToast();
  const { user } = useAuth();

  // Province data would be added here for filtering

  const assets = [
    { category: "ຊັບສິນຫມູນວຽນ", items: [
      { name: "ເງິນສົດ", amount: 6500000 },
      { name: "ທະນາຄານ", amount: 12000000 },
      { name: "ລູກໜີ້ການຄ້າ", amount: 3000000 },
      { name: "ສິນຄ້າຄົງຄັງ", amount: 5000000 },
    ]},
    { category: "ຊັບສິນຖາວອນ", items: [
      { name: "ທີ່ດິນ", amount: 50000000 },
      { name: "ອາຄານສະຖານທີ່", amount: 30000000 },
      { name: "ອຸປະກອນສຳນັກງານ", amount: 5000000 },
      { name: "ຍານພາຫະນະ", amount: 8000000 },
    ]},
  ];

  const liabilities = [
    { category: "ໜີ້ສິນຫມູນວຽນ", items: [
      { name: "ເຈົ້າໜີ້ການຄ້າ", amount: 2000000 },
      { name: "ພາສີຄ້າງຈ່າຍ", amount: 500000 },
      { name: "ເງິນກູ້ສະເພາະກິດ", amount: 3000000 },
    ]},
    { category: "ໜີ້ສິນໄລຍະຍາວ", items: [
      { name: "ເງິນກູ້ຢືມທະນາຄານ", amount: 20000000 },
    ]},
  ];

  const equity = [
    { name: "ທຶນຈົດທະບຽນ", amount: 80000000 },
    { name: "ກຳໄລສະສົມ", amount: 14000000 },
  ];

  const totalCurrentAssets = assets[0].items.reduce((sum, item) => sum + item.amount, 0);
  const totalFixedAssets = assets[1].items.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;

  const totalCurrentLiabilities = liabilities[0].items.reduce((sum, item) => sum + item.amount, 0);
  const totalLongTermLiabilities = liabilities[1].items.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = equity.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">ໃບລາຍງານຖານະການເງິນ</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">ລາຍງານງົບການເງິນສົມບູນ</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ຊັບສິນທັງໝົດ</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">{totalAssets.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ຫມູນວຽນ + ຖາວອນ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ໜີ້ສິນທັງໝົດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">{totalLiabilities.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ສັ້ນ + ຍາວ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ທຶນທັງໝົດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-balance">{totalEquity.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ທຶນຂອງເຈົ້າຂອງ</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">ງົບດຸ່ນການເງິນ</CardTitle>
              <CardDescription className="text-xs sm:text-sm">ວັນທີ: {new Date().toLocaleDateString('lo-LA')}</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select defaultValue="current">
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">ປັດຈຸບັນ</SelectItem>
                  <SelectItem value="monthly">ລາຍເດືອນ</SelectItem>
                  <SelectItem value="quarterly">ລາຍໄຕມາດ</SelectItem>
                  <SelectItem value="yearly">ລາຍປີ</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-1 sm:gap-2 flex-1 sm:flex-none" onClick={() => {
                toast({ title: "ກຳລັງພິມ", description: "ກຳລັງພິມລາຍງານການເງິນ..." });
              }}>
                <Printer className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">ພິມ</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1 sm:gap-2 flex-1 sm:flex-none" onClick={() => {
                toast({ title: "ກຳລັງສົ່ງອອກ", description: "ກຳລັງສົ່ງອອກເປັນ PDF/Excel..." });
              }}>
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">ສົ່ງອອກ</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="balance-sheet" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="balance-sheet">ງົບດຸ່ນ</TabsTrigger>
              <TabsTrigger value="summary">ສະຫຼຸບ</TabsTrigger>
            </TabsList>

            <TabsContent value="balance-sheet" className="space-y-6 mt-6">
              {/* Assets Section */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-income/10">
                      <TableHead colSpan={2} className="font-bold text-income text-lg">ຊັບສິນ (ASSETS)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((category, idx) => (
                      <React.Fragment key={idx}>
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={2} className="font-bold">{category.category}</TableCell>
                        </TableRow>
                        {category.items.map((item, itemIdx) => (
                          <TableRow key={itemIdx}>
                            <TableCell className="pl-8">{item.name}</TableCell>
                            <TableCell className="text-right font-medium">{item.amount.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/30">
                          <TableCell className="pl-8 font-semibold">ລວມ{category.category}</TableCell>
                          <TableCell className="text-right font-bold">
                            {category.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                    <TableRow className="bg-income/20 border-t-2 border-income">
                      <TableCell className="font-bold text-lg">ລວມຊັບສິນທັງໝົດ</TableCell>
                      <TableCell className="text-right font-bold text-lg text-income">{totalAssets.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Liabilities & Equity Section */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-expense/10">
                      <TableHead colSpan={2} className="font-bold text-expense text-lg">ໜີ້ສິນ ແລະ ທຶນ (LIABILITIES & EQUITY)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Liabilities */}
                    <TableRow className="bg-warning/10">
                      <TableCell colSpan={2} className="font-bold">ໜີ້ສິນ</TableCell>
                    </TableRow>
                    {liabilities.map((category, idx) => (
                      <React.Fragment key={idx}>
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={2} className="font-semibold pl-4">{category.category}</TableCell>
                        </TableRow>
                        {category.items.map((item, itemIdx) => (
                          <TableRow key={itemIdx}>
                            <TableCell className="pl-8">{item.name}</TableCell>
                            <TableCell className="text-right font-medium">{item.amount.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/30">
                          <TableCell className="pl-8 font-semibold">ລວມ{category.category}</TableCell>
                          <TableCell className="text-right font-bold">
                            {category.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                    <TableRow className="bg-expense/20">
                      <TableCell className="font-bold pl-4">ລວມໜີ້ສິນທັງໝົດ</TableCell>
                      <TableCell className="text-right font-bold text-expense">{totalLiabilities.toLocaleString()}</TableCell>
                    </TableRow>

                    {/* Equity */}
                    <TableRow className="bg-balance/10">
                      <TableCell colSpan={2} className="font-bold">ທຶນ</TableCell>
                    </TableRow>
                    {equity.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="pl-8">{item.name}</TableCell>
                        <TableCell className="text-right font-medium">{item.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-balance/20">
                      <TableCell className="font-bold pl-4">ລວມທຶນທັງໝົດ</TableCell>
                      <TableCell className="text-right font-bold text-balance">{totalEquity.toLocaleString()}</TableCell>
                    </TableRow>

                    {/* Total */}
                    <TableRow className="bg-primary/20 border-t-2 border-primary">
                      <TableCell className="font-bold text-lg">ລວມໜີ້ສິນ ແລະ ທຶນ</TableCell>
                      <TableCell className="text-right font-bold text-lg text-primary">{totalLiabilitiesAndEquity.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Balance Check */}
              <Card className={totalAssets === totalLiabilitiesAndEquity ? "border-success bg-success/5" : "border-destructive bg-destructive/5"}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">ການກວດສອບຄວາມດຸ່ນດ່ຽງ:</span>
                    <span className={`font-bold text-xl ${totalAssets === totalLiabilitiesAndEquity ? 'text-success' : 'text-destructive'}`}>
                      {totalAssets === totalLiabilitiesAndEquity ? '✓ ດຸ່ນດ່ຽງ' : '✗ ບໍ່ດຸ່ນດ່ຽງ'}
                    </span>
                  </div>
                  {totalAssets !== totalLiabilitiesAndEquity && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ຕ່າງກັນ: {Math.abs(totalAssets - totalLiabilitiesAndEquity).toLocaleString()} ກີບ
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>ສະຫຼຸບຖານະການເງິນ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">ຊັບສິນຫມູນວຽນ:</span>
                      <span className="font-bold">{totalCurrentAssets.toLocaleString()} ກີບ</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">ຊັບສິນຖາວອນ:</span>
                      <span className="font-bold">{totalFixedAssets.toLocaleString()} ກີບ</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg bg-income/10">
                      <span className="font-bold">ຊັບສິນທັງໝົດ:</span>
                      <span className="font-bold text-income text-xl">{totalAssets.toLocaleString()} ກີບ</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">ໜີ້ສິນທັງໝົດ:</span>
                      <span className="font-bold text-expense">{totalLiabilities.toLocaleString()} ກີບ</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">ທຶນທັງໝົດ:</span>
                      <span className="font-bold text-balance">{totalEquity.toLocaleString()} ກີບ</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border-2 border-primary rounded-lg bg-primary/10">
                      <span className="font-bold">ອັດຕາສ່ວນໜີ້ຕໍ່ທຶນ:</span>
                      <span className="font-bold text-primary text-xl">
                        {(totalLiabilities / totalEquity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
