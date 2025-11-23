import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { RowsPerPageSelector } from "@/components/ui/rows-per-page-selector";
import { mockCardTransactionsAPI, CardTransaction } from "@/lib/mockData/cardTransactions";

export default function CardTransactions() {
  const [transactions, setTransactions] = useState<CardTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const loadData = async () => {
      const response = await mockCardTransactionsAPI.getTransactions();
      setTransactions(response.data);
    };
    loadData();
  }, []);

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const completed = transactions.filter(t => t.status === 'completed').length;
  const pending = transactions.filter(t => t.status === 'pending').length;

  // Pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ປະຫວັດລາຍການບັດ</h1>
        <p className="text-muted-foreground mt-2">ບັນທຶກລາຍການຊຳລະດ້ວຍບັດ</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ລວມລາຍການ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount.toLocaleString()} ກີບ</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ສຳເລັດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">{completed} ລາຍການ</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ລໍຖ້າ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pending} ລາຍການ</div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>ລາຍການບັດ</CardTitle>
          <CardDescription>ບັນທຶກການຊຳລະດ້ວຍບັດທັງໝົດ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ວັນທີ</TableHead>
                  <TableHead>ເວລາ</TableHead>
                  <TableHead>ລາຍລະອຽດ</TableHead>
                  <TableHead>ຮ້ານຄ້າ</TableHead>
                  <TableHead>ບັດ</TableHead>
                  <TableHead className="text-right">ຈຳນວນ</TableHead>
                  <TableHead>ສະຖານະ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.time}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.merchant}</TableCell>
                    <TableCell>{transaction.card_type} ****{transaction.card_last4}</TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status === 'completed' ? 'ສຳເລັດ' : 'ລໍຖ້າ'}
                      </Badge>
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
