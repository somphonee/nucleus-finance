import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DailyLedger() {
  const { toast } = useToast();

  const dailyEntries = [
    { id: 1, accountCode: "1011", accountName: "ເງິນສົດ", debit: 5000000, credit: 0, balance: 5000000 },
    { id: 2, accountCode: "1021", accountName: "ທະນາຄານ BCEL", debit: 10000000, credit: 0, balance: 10000000 },
    { id: 3, accountCode: "2011", accountName: "ເງິນກູ້ຢືມ", debit: 0, credit: 3000000, balance: 3000000 },
    { id: 4, accountCode: "3011", accountName: "ທຶນຈົດທະບຽນ", debit: 0, credit: 12000000, balance: 12000000 },
  ];

  const totalDebit = dailyEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = dailyEntries.reduce((sum, entry) => sum + entry.credit, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ປື້ມບັນຊີປະຈຳວັນ</h1>
        <p className="text-muted-foreground mt-2">ບັນທຶກກິດຈະກຳການເງິນປະຈຳວັນ</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ດີບິດທັງໝົດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">{totalDebit.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ວັນນີ້</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ເຄຣດິດທັງໝົດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">{totalCredit.toLocaleString()} ກີບ</div>
            <p className="text-xs text-muted-foreground">ວັນນີ້</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ຍອດດຸ່ນດ່ຽງ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalDebit === totalCredit ? 'text-success' : 'text-destructive'}`}>
              {totalDebit === totalCredit ? 'ດຸ່ນດ່ຽງ' : 'ບໍ່ດຸ່ນດ່ຽງ'}
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
              <CardTitle>ບັນຊີປະຈຳວັນ - {new Date().toLocaleDateString('lo-LA')}</CardTitle>
              <CardDescription>ລາຍການກິດຈະກຳການເງິນວັນນີ້</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2" onClick={() => {
                toast({ title: "ກຳລັງພິມ", description: "ກຳລັງພິມລາຍງານປະຈຳວັນ..." });
              }}>
                <Printer className="h-4 w-4" />
                ພິມ
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => {
                toast({ title: "ກຳລັງສົ່ງອອກ", description: "ກຳລັງສົ່ງອອກຂໍ້ມູນເປັນໄຟລ์ Excel..." });
              }}>
                <Download className="h-4 w-4" />
                ສົ່ງອອກ
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ລະຫັດບັນຊີ</TableHead>
                  <TableHead>ຊື່ບັນຊີ</TableHead>
                  <TableHead className="text-right">ດີບິດ</TableHead>
                  <TableHead className="text-right">ເຄຣດິດ</TableHead>
                  <TableHead className="text-right">ຍອດເງິນ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-mono">{entry.accountCode}</TableCell>
                    <TableCell className="font-medium">{entry.accountName}</TableCell>
                    <TableCell className="text-right text-income font-medium">
                      {entry.debit > 0 ? entry.debit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right text-expense font-medium">
                      {entry.credit > 0 ? entry.credit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {entry.balance.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50 font-bold">
                  <TableCell colSpan={2} className="text-right">ລວມທັງໝົດ:</TableCell>
                  <TableCell className="text-right text-income">{totalDebit.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-expense">{totalCredit.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {totalDebit === totalCredit ? (
                      <span className="text-success">✓ ດຸ່ນດ່ຽງ</span>
                    ) : (
                      <span className="text-destructive">✗ ບໍ່ດຸ່ນດ່ຽງ</span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
