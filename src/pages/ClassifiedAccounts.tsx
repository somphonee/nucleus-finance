import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function ClassifiedAccounts() {
  const { toast } = useToast();
  const { user } = useAuth();

  // Province data would be added here for filtering
  // For now, all users see the same data (admin sees all, userprovince sees their province)

  const assetAccounts = [
    { code: "1011", name: "ເງິນສົດ", balance: 6500000, type: "ດີບິດ" },
    { code: "1021", name: "ທະນາຄານ BCEL", balance: 7000000, type: "ດີບິດ" },
    { code: "1022", name: "ທະນາຄານ LDB", balance: 5000000, type: "ດີບິດ" },
    { code: "1031", name: "ລູກໜີ້ການຄ້າ", balance: 3000000, type: "ດີບິດ" },
  ];

  const liabilityAccounts = [
    { code: "2011", name: "ເຈົ້າໜີ້ການຄ້າ", balance: 2000000, type: "ເຄຣດິດ" },
    { code: "2021", name: "ເງິນກູ້ຢືມທະນາຄານ", balance: 5000000, type: "ເຄຣດິດ" },
    { code: "2031", name: "ພາສີຄ້າງຈ່າຍ", balance: 500000, type: "ເຄຣດິດ" },
  ];

  const equityAccounts = [
    { code: "3011", name: "ທຶນຈົດທະບຽນ", balance: 20000000, type: "ເຄຣດິດ" },
    { code: "3021", name: "ກຳໄລສະສົມ", balance: 4000000, type: "ເຄຣດິດ" },
  ];

  const totalAssets = assetAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalLiabilities = liabilityAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalEquity = equityAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  const AccountTable = ({ accounts, title }: { accounts: typeof assetAccounts, title: string }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ລະຫັດ</TableHead>
              <TableHead>ຊື່ບັນຊີ</TableHead>
              <TableHead>ປະເພດ</TableHead>
              <TableHead className="text-right">ຍອດເງິນ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.code}>
                <TableCell className="font-mono">{account.code}</TableCell>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>
                  <span className={account.type === "ດີບິດ" ? "text-income" : "text-expense"}>
                    {account.type}
                  </span>
                </TableCell>
                <TableCell className="text-right font-bold">
                  {account.balance.toLocaleString()} ກີບ
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ບັນຊີແຍກປະເພດ 1011</h1>
        <p className="text-muted-foreground mt-2">ຈັດປະເພດ ແລະ ຈັດການບັນຊີຕາມປະເພດ</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ຊັບສິນ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">{totalAssets.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">{assetAccounts.length} ບັນຊີ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ໜີ້ສິນ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">{totalLiabilities.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">{liabilityAccounts.length} ບັນຊີ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ທຶນ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-balance">{totalEquity.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">{equityAccounts.length} ບັນຊີ</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>ບັນຊີແຍກປະເພດ</CardTitle>
              <CardDescription>ສະຫຼຸບຕາມປະເພດບັນຊີ</CardDescription>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => {
              toast({ title: "ກຳລັງສົ່ງອອກ", description: "ກຳລັງສົ່ງອອກຂໍ້ມູນເປັນໄຟລ໌ Excel..." });
            }}>
              <Download className="h-4 w-4" />
              ສົ່ງອອກ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assets" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="assets">ຊັບສິນ</TabsTrigger>
              <TabsTrigger value="liabilities">ໜີ້ສິນ</TabsTrigger>
              <TabsTrigger value="equity">ທຶນ</TabsTrigger>
            </TabsList>
            <TabsContent value="assets" className="mt-4">
              <AccountTable accounts={assetAccounts} title="ບັນຊີຊັບສິນ" />
            </TabsContent>
            <TabsContent value="liabilities" className="mt-4">
              <AccountTable accounts={liabilityAccounts} title="ບັນຊີໜີ້ສິນ" />
            </TabsContent>
            <TabsContent value="equity" className="mt-4">
              <AccountTable accounts={equityAccounts} title="ບັນຊີທຶນ" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ສະຫຼຸບລວມ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">ຊັບສິນທັງໝົດ:</span>
              <span className="text-xl font-bold text-income">{totalAssets.toLocaleString()} ກີບ</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">ໜີ້ສິນທັງໝົດ:</span>
              <span className="text-xl font-bold text-expense">{totalLiabilities.toLocaleString()} ກີບ</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">ທຶນທັງໝົດ:</span>
              <span className="text-xl font-bold text-balance">{totalEquity.toLocaleString()} ກີບ</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-muted rounded-lg px-4">
              <span className="font-bold text-lg">ຍອດດຸ່ນດ່ຽງ:</span>
              <span className={`text-xl font-bold ${totalAssets === (totalLiabilities + totalEquity) ? 'text-success' : 'text-destructive'}`}>
                {totalAssets === (totalLiabilities + totalEquity) ? '✓ ດຸ່ນດ່ຽງ' : '✗ ບໍ່ດຸ່ນດ່ຽງ'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
