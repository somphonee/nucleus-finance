import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, CreditCard } from "lucide-react";
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

export default function CardTransactions() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("all");

  const allTransactions = [
    { id: 1, date: "2025-01-15", cardNo: "**** 1234", cardType: "Debit", merchant: "ຮ້ານອາຫານ", amount: 150000, status: "success", province: "ວຽງຈັນ" },
    { id: 2, date: "2025-01-16", cardNo: "**** 5678", cardType: "Credit", merchant: "ຮ້ານຂາຍເຄື່ອງ", amount: 500000, status: "success", province: "ວຽງຈັນ" },
    { id: 3, date: "2025-01-17", cardNo: "**** 1234", cardType: "Debit", merchant: "ປໍ້ານ້ຳມັນ", amount: 300000, status: "pending", province: "ວຽງຈັນ" },
    { id: 4, date: "2025-01-18", cardNo: "**** 5678", cardType: "Credit", merchant: "ສຸບເປີມາເກັດ", amount: 800000, status: "success", province: "ວຽງຈັນ" },
    { id: 5, date: "2025-01-15", cardNo: "**** 9012", cardType: "Debit", merchant: "ຮ້ານກາເຟ", amount: 100000, status: "success", province: "ຫຼວງພະບາງ" },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const cardTransactions = useMemo(() => {
    let filtered = allTransactions;

    if (user?.role === 'userprovince' && user?.province) {
      filtered = filtered.filter(t => t.province === user.province);
    }
    if (selectedProvince !== 'all') {
      filtered = filtered.filter(t => t.province === selectedProvince);
    }
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.cardNo.includes(searchTerm)
      );
    }
    return filtered;
  }, [user, selectedProvince, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(cardTransactions.length / itemsPerPage);
  const paginatedTransactions = cardTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ບັດຜ່ານ</h1>
        <p className="text-muted-foreground mt-2">ຈັດການລາຍການຊຳລະດ້ວຍບັດ Debit/Credit</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ລາຍການທັງໝົດ</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,750,000 ກີບ</div>
            <p className="text-xs text-muted-foreground">4 ລາຍການ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Debit Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450,000 ກີບ</div>
            <p className="text-xs text-muted-foreground">2 ລາຍການ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,300,000 ກີບ</div>
            <p className="text-xs text-muted-foreground">2 ລາຍການ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ລໍຖ້າອະນຸມັດ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">300,000 ກີບ</div>
            <p className="text-xs text-muted-foreground">1 ລາຍການ</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>ປະຫວັດລາຍການບັດ</CardTitle>
              <CardDescription>ບັນທຶກການຊຳລະດ້ວຍບັດທັງໝົດ</CardDescription>
            </div>
            <div className="flex gap-2">
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
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ຄົ້ນຫາລາຍການບັດ..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="pl-10"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ວັນທີ</TableHead>
                  <TableHead>ເລກບັດ</TableHead>
                  <TableHead>ປະເພດບັດ</TableHead>
                  <TableHead>ຮ້ານຄ້າ</TableHead>
                  <TableHead className="text-right">ຈຳນວນເງິນ</TableHead>
                  <TableHead>ສະຖານະ</TableHead>
                  <TableHead className="text-right">ຈັດການ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell className="font-mono">{transaction.cardNo}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.cardType === "Debit" ? "outline" : "secondary"}>
                          {transaction.cardType}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.merchant}</TableCell>
                      <TableCell className="text-right font-medium">
                        {transaction.amount.toLocaleString()} ກີບ
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === "success" ? "default" : "secondary"}>
                          {transaction.status === "success" ? "ສຳເລັດ" : "ລໍຖ້າ"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">ລາຍລະອຽດ</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      ບໍ່ພົບຂໍ້ມູນ
                    </TableCell>
                  </TableRow>
                )}
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
