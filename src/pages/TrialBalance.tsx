import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function TrialBalance() {
  const { toast } = useToast();
  const { user } = useAuth();

  // Province data would be added here for filtering

  const accounts = [
    { code: "1011", name: "ເງິນສົດ", debit: 6500000, credit: 0 },
    { code: "1021", name: "ທະນາຄານ BCEL", debit: 7000000, credit: 0 },
    { code: "1022", name: "ທະນາຄານ LDB", debit: 5000000, credit: 0 },
    { code: "1031", name: "ລູກໜີ້ການຄ້າ", debit: 3000000, credit: 0 },
    { code: "2011", name: "ເຈົ້າໜີ້ການຄ້າ", debit: 0, credit: 2000000 },
    { code: "2021", name: "ເງິນກູ້ຢືມທະນາຄານ", debit: 0, credit: 5000000 },
    { code: "2031", name: "ພາສີຄ້າງຈ່າຍ", debit: 0, credit: 500000 },
    { code: "3011", name: "ທຶນຈົດທະບຽນ", debit: 0, credit: 20000000 },
    { code: "3021", name: "ກຳໄລສະສົມ", debit: 0, credit: 4000000 },
    { code: "4011", name: "ລາຍໄດ້ຈາກການຂາຍ", debit: 0, credit: 8000000 },
    { code: "5011", name: "ຕົ້ນທຶນຂາຍ", debit: 5000000, credit: 0 },
    { code: "5021", name: "ຄ່າໃຊ້ຈ່າຍດຳເນີນງານ", debit: 3000000, credit: 0 },
    { code: "5031", name: "ຄ່າເຊົ່າ", debit: 2000000, credit: 0 },
    { code: "5041", name: "ເງິນເດືອນພະນັກງານ", debit: 8000000, credit: 0 },
  ];

  const totalDebit = accounts.reduce((sum, acc) => sum + acc.debit, 0);
  const totalCredit = accounts.reduce((sum, acc) => sum + acc.credit, 0);
  const isBalanced = totalDebit === totalCredit;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ໃບດຸ່ນດ່ຽງ</h1>
        <p className="text-muted-foreground mt-2">ກວດສອບສະຖານະຄວາມດຸ່ນດ່ຽງຂອງບັນຊີດີບິດ/ເຄຣດິດ</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ດີບິດທັງໝົດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">{totalDebit.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ຍອດລວມດ້ານດີບິດ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ເຄຣດິດທັງໝົດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">{totalCredit.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ຍອດລວມດ້ານເຄຣດິດ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ສະຖານະຄວາມດຸ່ນດ່ຽງ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isBalanced ? 'text-success' : 'text-destructive'}`}>
              {isBalanced ? '✓ ດຸ່ນດ່ຽງ' : '✗ ບໍ່ດຸ່ນດ່ຽງ'}
            </div>
            <p className="text-xs text-muted-foreground">
              ຕ່າງກັນ: {Math.abs(totalDebit - totalCredit).toLocaleString()} ກີບ
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>ໃບດຸ່ນດ່ຽງ - {new Date().toLocaleDateString('lo-LA')}</CardTitle>
              <CardDescription>ລາຍການບັນຊີທັງໝົດພ້ອມຍອດດີບິດ ແລະ ເຄຣດິດ</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2" onClick={() => {
                toast({ title: "ກຳລັງພິມ", description: "ກຳລັງພິມໃບດຸ່ນດ່ຽງ..." });
              }}>
                <Printer className="h-4 w-4" />
                ພິມ
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => {
                toast({ title: "ກຳລັງສົ່ງອອກ", description: "ກຳລັງສົ່ງອອກຂໍ້ມູນເປັນໄຟລ໌ Excel..." });
              }}>
                <Download className="h-4 w-4" />
                ສົ່ງອອກ PDF/Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
                  <TableHead className="text-primary-foreground">ລະຫັດບັນຊີ</TableHead>
                  <TableHead className="text-primary-foreground">ຊື່ບັນຊີ</TableHead>
                  <TableHead className="text-right text-primary-foreground">ດີບິດ</TableHead>
                  <TableHead className="text-right text-primary-foreground">ເຄຣດິດ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.code}>
                    <TableCell className="font-mono font-medium">{account.code}</TableCell>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell className="text-right text-income font-medium">
                      {account.debit > 0 ? account.debit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right text-expense font-medium">
                      {account.credit > 0 ? account.credit.toLocaleString() : "-"}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50 font-bold border-t-2 border-primary">
                  <TableCell colSpan={2} className="text-right text-lg">ລວມທັງໝົດ:</TableCell>
                  <TableCell className="text-right text-income text-lg border-t-2 border-primary">
                    {totalDebit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-expense text-lg border-t-2 border-primary">
                    {totalCredit.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-primary/10 font-bold">
                  <TableCell colSpan={2} className="text-right text-lg">ສະຖານະ:</TableCell>
                  <TableCell colSpan={2} className="text-center">
                    {isBalanced ? (
                      <span className="text-success text-lg">✓ ດີບິດ ແລະ ເຄຣດິດດຸ່ນດ່ຽງ</span>
                    ) : (
                      <span className="text-destructive text-lg">
                        ✗ ບໍ່ດຸ່ນດ່ຽງ (ຕ່າງກັນ {Math.abs(totalDebit - totalCredit).toLocaleString()} ກີບ)
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {!isBalanced && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">⚠️ ແຈ້ງເຕືອນ: ບັນຊີບໍ່ດຸ່ນດ່ຽງ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              ຍອດລວມດີບິດ ແລະ ເຄຣດິດບໍ່ເທົ່າກັນ. ກະລຸນາກວດສອບການບັນທຶກລາຍການເພື່ອໃຫ້ແນ່ໃຈວ່າມີຄວາມຖືກຕ້ອງ.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
