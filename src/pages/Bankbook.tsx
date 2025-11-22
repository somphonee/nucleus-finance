import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Bankbook() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const allTransactions = [
    { id: 1, date: "2025-01-15", bank: "BCEL", accountNo: "001-234-567", description: "ຝາກເງິນ", debit: 10000000, credit: 0, balance: 10000000, status: "completed", province: "ວຽງຈັນ" },
    { id: 2, date: "2025-01-16", bank: "BCEL", accountNo: "001-234-567", description: "ໂອນເງິນ", debit: 0, credit: 2000000, balance: 8000000, status: "completed", province: "ວຽງຈັນ" },
    { id: 3, date: "2025-01-17", bank: "BCEL", accountNo: "001-234-567", description: "ຖອນເງິນ", debit: 0, credit: 1000000, balance: 7000000, status: "pending", province: "ວຽງຈັນ" },
    { id: 4, date: "2025-01-15", bank: "LDB", accountNo: "002-345-678", description: "ຝາກເງິນ", debit: 5000000, credit: 0, balance: 5000000, status: "completed", province: "ຫຼວງພະບາງ" },
  ];

  const bankTransactions = useMemo(() => {
    if (user?.role === 'userprovince' && user?.province) {
      return allTransactions.filter(t => t.province === user.province);
    }
    if (selectedProvince !== 'all') {
      return allTransactions.filter(t => t.province === selectedProvince);
    }
    return allTransactions;
  }, [user, selectedProvince]);

  // Pagination
  const totalPages = Math.ceil(bankTransactions.length / itemsPerPage);
  const paginatedTransactions = bankTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ປື້ມບັນຊີທະນາຄານ</h1>
        <p className="text-muted-foreground mt-2">ບັນທຶກ ແລະ ຕິດຕາມການເຄື່ອນໄຫວບັນຊີທະນາຄານ</p>
      </div>

      {/* Bank Account Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BCEL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,000,000 ກີບ</div>
            <p className="text-xs text-muted-foreground">001-234-567</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LDB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,000,000 ກີບ</div>
            <p className="text-xs text-muted-foreground">002-345-678</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ຍອດລວມ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-balance">12,000,000 ກີບ</div>
            <p className="text-xs text-muted-foreground">ທຸກບັນຊີ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ລໍຖ້າອະນຸມັດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">1,000,000 ກີບ</div>
            <p className="text-xs text-muted-foreground">1 ລາຍການ</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>ລາຍການທະນາຄານ</CardTitle>
              <CardDescription>ບັນທຶກການເຄື່ອນໄຫວທະນາຄານທັງໝົດ</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    ເພີ່ມລາຍການ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>ເພີ່ມລາຍການທະນາຄານ</DialogTitle>
                    <DialogDescription>ກະລຸນາປ້ອນຂໍ້ມູນລາຍການທະນາຄານໃໝ່</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank">ທະນາຄານ</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="ເລືອກທະນາຄານ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bcel">BCEL</SelectItem>
                          <SelectItem value="ldb">LDB</SelectItem>
                          <SelectItem value="apl">APL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNo">ເລກບັນຊີ</Label>
                      <Input id="accountNo" placeholder="001-234-567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">ວັນທີ</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">ລາຍລະອຽດ</Label>
                      <Input id="description" placeholder="ລາຍລະອຽດ..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">ປະເພດ</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="ເລືອກປະເພດ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debit">ຝາກເງິນ</SelectItem>
                          <SelectItem value="credit">ຖອນເງິນ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">ຈຳນວນເງິນ</Label>
                      <Input id="amount" type="number" placeholder="0" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">ຍົກເລີກ</Button>
                    <Button>ບັນທຶກ</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="gap-2" onClick={() => {
                toast({ title: "ກຳລັງສົ່ງອອກ", description: "ກຳລັງສົ່ງອອກຂໍ້ມູນເປັນໄຟລ์ Excel..." });
              }}>
                <Download className="h-4 w-4" />
                ສົ່ງອອກ
              </Button>
              <Button variant="outline">ປະສານບັນຊີ</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ຄົ້ນຫາລາຍການ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ວັນທີ</TableHead>
                  <TableHead>ທະນາຄານ</TableHead>
                  <TableHead>ເລກບັນຊີ</TableHead>
                  <TableHead>ລາຍລະອຽດ</TableHead>
                  <TableHead className="text-right">ຝາກເງິນ</TableHead>
                  <TableHead className="text-right">ຖອນເງິນ</TableHead>
                  <TableHead className="text-right">ຍອດເງິນ</TableHead>
                  <TableHead>ສະຖານະ</TableHead>
                  <TableHead className="text-right">ຈັດການ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.bank}</TableCell>
                    <TableCell>{transaction.accountNo}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right text-income font-medium">
                      {transaction.debit > 0 ? transaction.debit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right text-expense font-medium">
                      {transaction.credit > 0 ? transaction.credit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {transaction.balance.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                        {transaction.status === "completed" ? "ສຳເລັດ" : "ລໍຖ້າ"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">ແກ້ໄຂ</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
