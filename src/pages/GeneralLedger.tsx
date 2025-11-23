import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Download, Filter, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { RowsPerPageSelector } from "@/components/ui/rows-per-page-selector";

interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  account: 'cash' | 'capital' | 'shares' | 'loans' | 'income' | 'expenditure';
  debit: number;
  credit: number;
  balance: number;
  reference?: string;
}

export default function GeneralLedger() {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<LedgerEntry[]>([
    {
      id: "1",
      date: "2024-01-15",
      description: "Initial capital deposit",
      account: 'capital',
      debit: 10000000,
      credit: 0,
      balance: 10000000,
      reference: "REF001",
    },
    {
      id: "2",
      date: "2024-01-20",
      description: "Member savings deposit",
      account: 'cash',
      debit: 2000000,
      credit: 0,
      balance: 12000000,
      reference: "TXN001",
    },
    {
      id: "3",
      date: "2024-01-25",
      description: "Loan disbursement",
      account: 'loans',
      debit: 5000000,
      credit: 0,
      balance: 17000000,
      reference: "L001",
    },
    {
      id: "4",
      date: "2024-02-01",
      description: "Office rent payment",
      account: 'expenditure',
      debit: 0,
      credit: 500000,
      balance: 16500000,
      reference: "EXP001",
    },
    // Mock data for pagination
    {
      id: "5",
      date: "2024-02-05",
      description: "Utility bill payment",
      account: 'expenditure',
      debit: 0,
      credit: 150000,
      balance: 16350000,
      reference: "EXP002",
    },
    {
      id: "6",
      date: "2024-02-10",
      description: "New member registration",
      account: 'income',
      debit: 500000,
      credit: 0,
      balance: 16850000,
      reference: "INC001",
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    date: "",
    description: "",
    account: "",
    debit: "",
    credit: "",
    reference: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterAccount, setFilterAccount] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleAddEntry = () => {
    if (newEntry.date && newEntry.description && newEntry.account && (newEntry.debit || newEntry.credit)) {
      const debitAmount = parseFloat(newEntry.debit) || 0;
      const creditAmount = parseFloat(newEntry.credit) || 0;
      const lastBalance = entries.length > 0 ? entries[entries.length - 1].balance : 0;
      const newBalance = lastBalance + debitAmount - creditAmount;

      const entry: LedgerEntry = {
        id: Date.now().toString(),
        date: newEntry.date,
        description: newEntry.description,
        account: newEntry.account as LedgerEntry['account'],
        debit: debitAmount,
        credit: creditAmount,
        balance: newBalance,
        reference: newEntry.reference,
      };

      setEntries([...entries, entry]);
      setNewEntry({ date: "", description: "", account: "", debit: "", credit: "", reference: "" });
      setIsDialogOpen(false);
    }
  };

  const getAccountBadgeVariant = (account: string) => {
    switch (account) {
      case 'cash': return 'default';
      case 'capital': return 'secondary';
      case 'shares': return 'outline';
      case 'loans': return 'destructive';
      case 'income': return 'default';
      case 'expenditure': return 'secondary';
      default: return 'outline';
    }
  };

  const getAccountBalance = (account: string) => {
    return entries
      .filter(entry => entry.account === account)
      .reduce((sum, entry) => sum + entry.debit - entry.credit, 0);
  };

  const getFilteredEntries = () => {
    if (filterAccount === "all") return entries;
    return entries.filter(entry => entry.account === filterAccount);
  };

  const getTotalDebits = () => {
    return entries.reduce((sum, entry) => sum + entry.debit, 0);
  };

  const getTotalCredits = () => {
    return entries.reduce((sum, entry) => sum + entry.credit, 0);
  };

  const accounts = [
    { value: 'cash', label: t('ledger.cash') },
    { value: 'capital', label: t('ledger.capitalFund') },
    { value: 'shares', label: t('ledger.shares') },
    { value: 'loans', label: t('ledger.loans') },
    { value: 'income', label: t('ledger.income') },
    { value: 'expenditure', label: t('ledger.expenditure') },
  ];

  // Pagination calculations
  const filteredEntries = getFilteredEntries();
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('ledger.title')}</h1>
          <p className="text-muted-foreground mt-1">
            Categorized account transactions and financial records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t('common.export')}
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Ledger Entry</DialogTitle>
                <DialogDescription>
                  Record a new transaction in the general ledger
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="entryDate" className="text-right">
                    {t('common.date')}
                  </Label>
                  <Input
                    id="entryDate"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="entryDescription" className="text-right">
                    {t('common.description')}
                  </Label>
                  <Input
                    id="entryDescription"
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                    className="col-span-3"
                    placeholder="Transaction description"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="entryAccount" className="text-right">
                    Account
                  </Label>
                  <Select value={newEntry.account} onValueChange={(value) => setNewEntry({ ...newEntry, account: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.value} value={account.value}>
                          {account.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="entryDebit" className="text-right">
                    Debit
                  </Label>
                  <Input
                    id="entryDebit"
                    type="number"
                    value={newEntry.debit}
                    onChange={(e) => setNewEntry({ ...newEntry, debit: e.target.value })}
                    className="col-span-3"
                    placeholder="0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="entryCredit" className="text-right">
                    Credit
                  </Label>
                  <Input
                    id="entryCredit"
                    type="number"
                    value={newEntry.credit}
                    onChange={(e) => setNewEntry({ ...newEntry, credit: e.target.value })}
                    className="col-span-3"
                    placeholder="0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="entryReference" className="text-right">
                    Reference
                  </Label>
                  <Input
                    id="entryReference"
                    value={newEntry.reference}
                    onChange={(e) => setNewEntry({ ...newEntry, reference: e.target.value })}
                    className="col-span-3"
                    placeholder="REF001"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleAddEntry}>
                  {t('common.add')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getTotalDebits().toLocaleString()} ₭
            </div>
            <p className="text-xs text-muted-foreground">
              All debit entries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getTotalCredits().toLocaleString()} ₭
            </div>
            <p className="text-xs text-muted-foreground">
              All credit entries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(getTotalDebits() - getTotalCredits()).toLocaleString()} ₭
            </div>
            <p className="text-xs text-muted-foreground">
              Debits minus credits
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="entries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="entries">All Entries</TabsTrigger>
          <TabsTrigger value="accounts">Account Balances</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={filterAccount} onValueChange={(value) => {
              setFilterAccount(value);
              setCurrentPage(1); // Reset to first page on filter change
            }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account.value} value={account.value}>
                    {account.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ledger Entries</CardTitle>
              <CardDescription>
                All financial transactions categorized by account type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.date')}</TableHead>
                    <TableHead>{t('common.description')}</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Debit</TableHead>
                    <TableHead>Credit</TableHead>
                    <TableHead>{t('common.balance')}</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>
                        <Badge variant={getAccountBadgeVariant(entry.account)}>
                          {accounts.find(a => a.value === entry.account)?.label || entry.account}
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.debit ? `${entry.debit.toLocaleString()} ₭` : '-'}</TableCell>
                      <TableCell>{entry.credit ? `${entry.credit.toLocaleString()} ₭` : '-'}</TableCell>
                      <TableCell>{entry.balance.toLocaleString()} ₭</TableCell>
                      <TableCell>{entry.reference || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

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
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                            className="cursor-pointer"
                          >
                            {i + 1}
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
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Balances</CardTitle>
              <CardDescription>
                Current balance for each account category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>{t('common.balance')}</TableHead>
                    <TableHead>Entries</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => {
                    const balance = getAccountBalance(account.value);
                    const entryCount = entries.filter(e => e.account === account.value).length;
                    return (
                      <TableRow key={account.value}>
                        <TableCell>
                          <Badge variant={getAccountBadgeVariant(account.value)}>
                            {account.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {balance.toLocaleString()} ₭
                        </TableCell>
                        <TableCell>{entryCount} entries</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}