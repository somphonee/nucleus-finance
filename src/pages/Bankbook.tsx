import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { RowsPerPageSelector } from "@/components/ui/rows-per-page-selector";
import { mockBankbookAPI, BankTransaction } from "@/lib/mockData/bankbook";

export default function Bankbook() {
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const loadData = async () => {
      const response = await mockBankbookAPI.getTransactions();
      setTransactions(response.data);
    };
    loadData();
  }, []);

  const currentBalance = transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;
  const totalDeposit = transactions.reduce((sum, t) => sum + t.deposit, 0);
  const totalWithdrawal = transactions.reduce((sum, t) => sum + t.withdrawal, 0);

  // Pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ປື້ມບັນຊີທະນາຄານ</h1>
        <p className="text-muted-foreground mt-2">ບັນທຶກລາຍການທະນາຄານ</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ຍອດເງິນທະນາຄານ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentBalance.toLocaleString()} ກີບ</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ຝາກເງິນ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">{totalDeposit.toLocaleString()} ກີບ</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ຖອນເງິນ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">{totalWithdrawal.toLocaleString()} ກີບ</div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>ລາຍການທະນາຄານ</CardTitle>
          <CardDescription>ບັນທຶກການເຄື່ອນໄຫວທະນາຄານທັງໝົດ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ວັນທີ</TableHead>
                  <TableHead>ລາຍລະອຽດ</TableHead>
                  <TableHead>ທະນາຄານ</TableHead>
                  <TableHead className="text-right">ຝາກເງິນ</TableHead>
                  <TableHead className="text-right">ຖອນເງິນ</TableHead>
                  <TableHead className="text-right">ຍອດເງິນ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.bank_name}</TableCell>
                    <TableCell className="text-right text-income font-medium">
                      {transaction.deposit > 0 ? transaction.deposit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right text-expense font-medium">
                      {transaction.withdrawal > 0 ? transaction.withdrawal.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {transaction.balance.toLocaleString()}
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
