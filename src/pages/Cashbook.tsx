import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { mockCashbookAPI, CashTransaction } from "@/lib/mockData/cashbook";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RowsPerPageSelector } from "@/components/ui/rows-per-page-selector";

export default function Cashbook() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [transactions, setTransactions] = useState<CashTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await mockCashbookAPI.getTransactions();
        setTransactions(response.data);
      } catch (error) {
        toast({
          title: "ຜິດພາດ",
          description: "ບໍ່ສາມາດໂຫຼດຂໍ້ມູນໄດ້",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    toast({
      title: "ກຳລັງສົ່ງອອກ",
      description: "ກຳລັງສົ່ງອອກຂໍ້ມູນເປັນໄຟລ์ Excel...",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ປື້ມບັນຊີເງິນສົດ</h1>
        <p className="text-muted-foreground mt-2">ບັນທຶກ ແລະ ເບິ່ງການເຄື່ອນໄຫວເງິນສົດປະຈຳວັນ</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ຍອດເງິນສົດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-balance">
              {transactions.length > 0 ? transactions[transactions.length - 1].balance.toLocaleString() : '0'} ກີບ
            </div>
            <p className="text-xs text-muted-foreground">ຍອດເງິນປັດຈຸບັນ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ລາຍຮັບ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">
              {transactions.reduce((sum, t) => sum + t.income, 0).toLocaleString()} ກີບ
            </div>
            <p className="text-xs text-muted-foreground">ເດືອນນີ້</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ລາຍຈ່າຍ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">
              {transactions.reduce((sum, t) => sum + t.expense, 0).toLocaleString()} ກີບ
            </div>
            <p className="text-xs text-muted-foreground">ເດືອນນີ້</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>ລາຍການເງິນສົດ</CardTitle>
              <CardDescription>ບັນທຶກການເຄື່ອນໄຫວເງິນສົດທັງໝົດ</CardDescription>
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
                    <DialogTitle>ເພີ່ມລາຍການເງິນສົດ</DialogTitle>
                    <DialogDescription>ກະລຸນາປ້ອນຂໍ້ມູນລາຍການເງິນສົດໃໝ່</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
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
                          <SelectItem value="income">ລາຍຮັບ</SelectItem>
                          <SelectItem value="expense">ລາຍຈ່າຍ</SelectItem>
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
              <Button variant="outline" className="gap-2" onClick={handleExport}>
                <Download className="h-4 w-4" />
                ສົ່ງອອກ Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ຄົ້ນຫາລາຍການ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-auto"
              />

            </div>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ວັນທີ</TableHead>
                  <TableHead>ລາຍລະອຽດ</TableHead>
                  <TableHead>ປະເພດ</TableHead>
                  <TableHead className="text-right">ລາຍຮັບ</TableHead>
                  <TableHead className="text-right">ລາຍຈ່າຍ</TableHead>
                  <TableHead className="text-right">ຍອດເງິນ</TableHead>
                  <TableHead className="text-right">ຈັດການ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-right text-income font-medium">
                      {transaction.income > 0 ? transaction.income.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right text-expense font-medium">
                      {transaction.expense > 0 ? transaction.expense.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {transaction.balance.toLocaleString()}
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
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <RowsPerPageSelector
                value={itemsPerPage}
                onValueChange={(value) => {
                  setItemsPerPage(value);
                  setCurrentPage(1);
                }}
              />
              <Pagination className="justify-end">
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
