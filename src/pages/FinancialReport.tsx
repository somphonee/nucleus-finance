import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer, FileText, Wallet, CreditCard, PieChart, TrendingUp, ArrowUpRight, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { FinancialChart } from "@/components/charts/FinancialChart";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function FinancialReport() {
  const { toast } = useToast();
  const { user } = useAuth();

  // Province data would be added here for filtering

  const assets = [
    {
      category: "ຊັບສິນຫມູນວຽນ (Current Assets)", items: [
        { name: "ເງິນສົດ (Cash)", amount: 6500000 },
        { name: "ທະນາຄານ (Bank)", amount: 12000000 },
        { name: "ລູກໜີ້ການຄ້າ (Accounts Receivable)", amount: 3000000 },
        { name: "ສິນຄ້າຄົງຄັງ (Inventory)", amount: 5000000 },
      ]
    },
    {
      category: "ຊັບສິນຖາວອນ (Fixed Assets)", items: [
        { name: "ທີ່ດິນ (Land)", amount: 50000000 },
        { name: "ອາຄານສະຖານທີ່ (Building)", amount: 30000000 },
        { name: "ອຸປະກອນສຳນັກງານ (Office Equipment)", amount: 5000000 },
        { name: "ຍານພາຫະນະ (Vehicles)", amount: 8000000 },
      ]
    },
  ];

  const liabilities = [
    {
      category: "ໜີ້ສິນຫມູນວຽນ (Current Liabilities)", items: [
        { name: "ເຈົ້າໜີ້ການຄ້າ (Accounts Payable)", amount: 2000000 },
        { name: "ພາສີຄ້າງຈ່າຍ (Tax Payable)", amount: 500000 },
        { name: "ເງິນກູ້ສະເພາະກິດ (Short-term Loans)", amount: 3000000 },
      ]
    },
    {
      category: "ໜີ້ສິນໄລຍະຍາວ (Long-term Liabilities)", items: [
        { name: "ເງິນກູ້ຢືມທະນາຄານ (Bank Loans)", amount: 20000000 },
      ]
    },
  ];

  const equity = [
    { name: "ທຶນຈົດທະບຽນ (Registered Capital)", amount: 80000000 },
    { name: "ກຳໄລສະສົມ (Retained Earnings)", amount: 14000000 },
  ];

  const totalCurrentAssets = assets[0].items.reduce((sum, item) => sum + item.amount, 0);
  const totalFixedAssets = assets[1].items.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;

  const totalCurrentLiabilities = liabilities[0].items.reduce((sum, item) => sum + item.amount, 0);
  const totalLongTermLiabilities = liabilities[1].items.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = equity.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;

  const isBalanced = totalAssets === totalLiabilitiesAndEquity;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            ໃບລາຍງານຖານະການເງິນ
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Statement of Financial Position (Balance Sheet)
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg border">
            <Select defaultValue="current">
              <SelectTrigger className="w-[140px] border-0 bg-transparent focus:ring-0 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">ປັດຈຸບັນ (Current)</SelectItem>
                <SelectItem value="monthly">ລາຍເດືອນ (Monthly)</SelectItem>
                <SelectItem value="quarterly">ລາຍໄຕມາດ (Quarterly)</SelectItem>
                <SelectItem value="yearly">ລາຍປີ (Yearly)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors" onClick={() => {
            toast({ title: "ກຳລັງພິມ", description: "ກຳລັງພິມລາຍງານການເງິນ..." });
          }}>
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">ພິມ (Print)</span>
          </Button>
          <Button variant="default" size="sm" className="gap-2 shadow-lg shadow-primary/20" onClick={() => {
            toast({ title: "ກຳລັງສົ່ງອອກ", description: "ກຳລັງສົ່ງອອກເປັນ PDF/Excel..." });
          }}>
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">ສົ່ງອອກ (Export)</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-emerald-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ຊັບສິນທັງໝົດ (Total Assets)</CardTitle>
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">{totalAssets.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">ກີບ</span></div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500" />
              +2.5% ຈາກເດືອນກ່ອນ
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-rose-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-rose-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ໜີ້ສິນທັງໝົດ (Total Liabilities)</CardTitle>
            <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-rose-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700">{totalLiabilities.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">ກີບ</span></div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-rose-500" />
              +1.2% ຈາກເດືອນກ່ອນ
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-blue-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ທຶນທັງໝົດ (Total Equity)</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <PieChart className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{totalEquity.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">ກີບ</span></div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-blue-500" />
              +5.0% ຈາກເດືອນກ່ອນ
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="balance-sheet" className="w-full space-y-6">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted/50 p-1">
            <TabsTrigger value="balance-sheet" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">ງົບດຸ່ນ</TabsTrigger>
            <TabsTrigger value="summary" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">ສະຫຼຸບ</TabsTrigger>
            <TabsTrigger value="charts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">ກາຟຟິກ</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="balance-sheet" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Assets Column */}
            <Card className="border-t-4 border-t-emerald-500 shadow-md">
              <CardHeader className="bg-emerald-50/50 pb-4 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-emerald-700 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    ຊັບສິນ (ASSETS)
                  </CardTitle>
                  <Badge variant="outline" className="bg-white text-emerald-700 border-emerald-200">
                    {totalAssets.toLocaleString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {assets.map((category, idx) => (
                      <React.Fragment key={idx}>
                        <TableRow className="bg-muted/30 hover:bg-muted/50">
                          <TableCell colSpan={2} className="font-semibold text-foreground py-3">{category.category}</TableCell>
                        </TableRow>
                        {category.items.map((item, itemIdx) => (
                          <TableRow key={itemIdx} className="hover:bg-emerald-50/30 transition-colors border-0">
                            <TableCell className="pl-6 py-3 text-muted-foreground">{item.name}</TableCell>
                            <TableCell className="text-right font-mono font-medium">{item.amount.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-emerald-50/50 font-medium">
                          <TableCell className="pl-6 py-3 text-emerald-700">ລວມ{category.category}</TableCell>
                          <TableCell className="text-right font-bold text-emerald-700">
                            {category.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <div className="p-4 bg-emerald-100/50 border-t flex justify-between items-center">
                <span className="font-bold text-lg text-emerald-900">ລວມຊັບສິນທັງໝົດ</span>
                <span className="font-bold text-xl text-emerald-700">{totalAssets.toLocaleString()}</span>
              </div>
            </Card>

            {/* Liabilities & Equity Column */}
            <div className="space-y-6">
              {/* Liabilities */}
              <Card className="border-t-4 border-t-rose-500 shadow-md">
                <CardHeader className="bg-rose-50/50 pb-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-rose-700 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-rose-500" />
                      ໜີ້ສິນ (LIABILITIES)
                    </CardTitle>
                    <Badge variant="outline" className="bg-white text-rose-700 border-rose-200">
                      {totalLiabilities.toLocaleString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {liabilities.map((category, idx) => (
                        <React.Fragment key={idx}>
                          <TableRow className="bg-muted/30 hover:bg-muted/50">
                            <TableCell colSpan={2} className="font-semibold text-foreground py-3">{category.category}</TableCell>
                          </TableRow>
                          {category.items.map((item, itemIdx) => (
                            <TableRow key={itemIdx} className="hover:bg-rose-50/30 transition-colors border-0">
                              <TableCell className="pl-6 py-3 text-muted-foreground">{item.name}</TableCell>
                              <TableCell className="text-right font-mono font-medium">{item.amount.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-rose-50/50 font-medium">
                            <TableCell className="pl-6 py-3 text-rose-700">ລວມ{category.category}</TableCell>
                            <TableCell className="text-right font-bold text-rose-700">
                              {category.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <div className="p-4 bg-rose-100/50 border-t flex justify-between items-center">
                  <span className="font-bold text-lg text-rose-900">ລວມໜີ້ສິນທັງໝົດ</span>
                  <span className="font-bold text-xl text-rose-700">{totalLiabilities.toLocaleString()}</span>
                </div>
              </Card>

              {/* Equity */}
              <Card className="border-t-4 border-t-blue-500 shadow-md">
                <CardHeader className="bg-blue-50/50 pb-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-blue-700 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      ທຶນ (EQUITY)
                    </CardTitle>
                    <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
                      {totalEquity.toLocaleString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {equity.map((item, idx) => (
                        <TableRow key={idx} className="hover:bg-blue-50/30 transition-colors border-0">
                          <TableCell className="pl-6 py-3 text-muted-foreground">{item.name}</TableCell>
                          <TableCell className="text-right font-mono font-medium">{item.amount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <div className="p-4 bg-blue-100/50 border-t flex justify-between items-center">
                  <span className="font-bold text-lg text-blue-900">ລວມທຶນທັງໝົດ</span>
                  <span className="font-bold text-xl text-blue-700">{totalEquity.toLocaleString()}</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Balance Check Footer */}
          <Card className={`border-2 shadow-lg transition-all ${isBalanced ? "border-emerald-500 bg-emerald-50/30" : "border-destructive bg-destructive/5"}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isBalanced ? "bg-emerald-100 text-emerald-600" : "bg-destructive/10 text-destructive"}`}>
                    {isBalanced ? <CheckCircle2 className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">ການກວດສອບຄວາມດຸ່ນດ່ຽງ (Balance Check)</h3>
                    <p className="text-muted-foreground">
                      {isBalanced
                        ? "ຊັບສິນ ເທົ່າກັບ ໜີ້ສິນ ບວກ ທຶນ (Assets = Liabilities + Equity)"
                        : "ກະລຸນາກວດສອບຂໍ້ມູນຄືນໃໝ່ (Please review the data)"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Total Assets: {totalAssets.toLocaleString()}</span>
                    <span>vs</span>
                    <span>L+E: {totalLiabilitiesAndEquity.toLocaleString()}</span>
                  </div>
                  <Badge variant={isBalanced ? "default" : "destructive"} className={`text-lg px-4 py-1 ${isBalanced ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}>
                    {isBalanced ? "✓ ດຸ່ນດ່ຽງ (Balanced)" : "✗ ບໍ່ດຸ່ນດ່ຽງ (Unbalanced)"}
                  </Badge>
                  {!isBalanced && (
                    <span className="text-destructive font-medium">
                      Difference: {Math.abs(totalAssets - totalLiabilitiesAndEquity).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="mt-6 animate-in fade-in duration-500">
          <Card>
            <CardHeader>
              <CardTitle>ສະຫຼຸບຖານະການເງິນ (Financial Summary)</CardTitle>
              <CardDescription>Key financial metrics and ratios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Current Ratio</div>
                  <div className="text-2xl font-bold">{(totalCurrentAssets / totalCurrentLiabilities).toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground mt-1">Target: &gt; 1.5</div>
                </div>
                <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Debt to Equity</div>
                  <div className="text-2xl font-bold">{(totalLiabilities / totalEquity).toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground mt-1">Target: &lt; 1.0</div>
                </div>
                <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Working Capital</div>
                  <div className="text-2xl font-bold text-primary">{(totalCurrentAssets - totalCurrentLiabilities).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Assets - Liabilities</div>
                </div>
                <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Asset Turnover</div>
                  <div className="text-2xl font-bold">0.85</div>
                  <div className="text-xs text-muted-foreground mt-1">Industry Avg: 0.75</div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Structure Analysis</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Assets</span>
                        <span className="font-medium">{((totalCurrentAssets / totalAssets) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${(totalCurrentAssets / totalAssets) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fixed Assets</span>
                        <span className="font-medium">{((totalFixedAssets / totalAssets) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600" style={{ width: `${(totalFixedAssets / totalAssets) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Funding Structure</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Liabilities</span>
                        <span className="font-medium">{((totalLiabilities / totalLiabilitiesAndEquity) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500" style={{ width: `${(totalLiabilities / totalLiabilitiesAndEquity) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Equity</span>
                        <span className="font-medium">{((totalEquity / totalLiabilitiesAndEquity) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${(totalEquity / totalLiabilitiesAndEquity) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6 mt-6 animate-in fade-in duration-500">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <FinancialChart
              type="pie"
              title="ໂຄງສ້າງຊັບສິນ (Assets Structure)"
              height={350}
            />
            <FinancialChart
              type="bar"
              title="ໜີ້ສິນ ແລະ ທຶນ (Liabilities vs Equity)"
              height={350}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>ແນວໂນ້ມການເງິນ (Financial Trends)</CardTitle>
              <CardDescription>6-month historical performance</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialChart
                type="line"
                title=""
                height={400}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
