import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { RowsPerPageSelector } from "@/components/ui/rows-per-page-selector";
import { mockDailyLedgerAPI, DailyLedgerEntry } from "@/lib/mockData/dailyLedger";

export default function DailyLedger() {
  const [entries, setEntries] = useState<DailyLedgerEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const loadData = async () => {
      const response = await mockDailyLedgerAPI.getEntries();
      setEntries(response.data);
    };
    loadData();
  }, []);

  const totalDebit = entries.reduce((sum, e) => sum + e.debit, 0);
  const totalCredit = entries.reduce((sum, e) => sum + e.credit, 0);

  // Pagination
  const totalPages = Math.ceil(entries.length / itemsPerPage);
  const paginatedEntries = entries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ບັນຊີປະຈຳວັນ</h1>
        <p className="text-muted-foreground mt-2">ບັນທຶກລາຍການບັນຊີປະຈຳວັນ</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ລວມລາຍການ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries.length} ລາຍການ</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ລວມເດບິດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">{totalDebit.toLocaleString()} ກີບ</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ລວມເຄຣດິດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">{totalCredit.toLocaleString()} ກີບ</div>
          </CardContent>
        </Card>
      </div>

      {/* Ledger Table */}
      <Card>
        <CardHeader>
          <CardTitle>ລາຍການບັນຊີ</CardTitle>
          <CardDescription>ບັນທຶກການບັນຊີແບບເດບິດ-ເຄຣດິດ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ວັນທີ</TableHead>
                  <TableHead>ລະຫັດບັນຊີ</TableHead>
                  <TableHead>ຊື່ບັນຊີ</TableHead>
                  <TableHead>ລາຍລະອຽດ</TableHead>
                  <TableHead className="text-right">ເດບິດ</TableHead>
                  <TableHead className="text-right">ເຄຣດິດ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.account_code}</TableCell>
                    <TableCell>{entry.account_name}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell className="text-right text-income font-medium">
                      {entry.debit > 0 ? entry.debit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right text-expense font-medium">
                      {entry.credit > 0 ? entry.credit.toLocaleString() : "-"}
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
