import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Download, PieChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { RowsPerPageSelector } from "@/components/ui/rows-per-page-selector";

interface ShareContribution {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  year: number;
}

export default function SharesTracking() {
  const { t } = useLanguage();
  const [contributions, setContributions] = useState<ShareContribution[]>([
    {
      id: "1",
      memberId: "M001",
      memberName: "John Doe",
      amount: 500000,
      date: "2024-01-15",
      year: 2024,
    },
    {
      id: "2",
      memberId: "M002",
      memberName: "Jane Smith",
      amount: 750000,
      date: "2024-01-20",
      year: 2024,
    },
    {
      id: "3",
      memberId: "M003",
      memberName: "Mike Johnson",
      amount: 250000,
      date: "2024-01-25",
      year: 2024,
    },
    {
      id: "4",
      memberId: "M004",
      memberName: "Lisa Chen",
      amount: 1000000,
      date: "2024-02-01",
      year: 2024,
    },
    {
      id: "5",
      memberId: "M005",
      memberName: "David Wilson",
      amount: 500000,
      date: "2024-02-05",
      year: 2024,
    },
    {
      id: "6",
      memberId: "M006",
      memberName: "Emma Davis",
      amount: 300000,
      date: "2024-02-10",
      year: 2024,
    },
  ]);

  const [newContribution, setNewContribution] = useState({
    memberId: "",
    memberName: "",
    amount: "",
    date: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ownershipPage, setOwnershipPage] = useState(1);
  const [contributionPage, setContributionPage] = useState(1);
  const [ownershipItemsPerPage, setOwnershipItemsPerPage] = useState(5);
  const [contributionItemsPerPage, setContributionItemsPerPage] = useState(5);

  const handleAddContribution = () => {
    if (newContribution.memberId && newContribution.memberName && newContribution.amount && newContribution.date) {
      const contribution: ShareContribution = {
        id: Date.now().toString(),
        memberId: newContribution.memberId,
        memberName: newContribution.memberName,
        amount: parseFloat(newContribution.amount),
        date: newContribution.date,
        year: new Date(newContribution.date).getFullYear(),
      };

      setContributions([contribution, ...contributions]);
      setNewContribution({ memberId: "", memberName: "", amount: "", date: "" });
      setIsDialogOpen(false);
    }
  };

  const calculateTotalShares = () => {
    return contributions.reduce((sum, contribution) => sum + contribution.amount, 0);
  };

  const calculateOwnershipPercentage = (memberTotal: number) => {
    const total = calculateTotalShares();
    return total > 0 ? ((memberTotal / total) * 100).toFixed(2) : "0.00";
  };

  const getMemberTotals = () => {
    const memberTotals: Record<string, { name: string; total: number; memberId: string }> = {};

    contributions.forEach(contribution => {
      if (!memberTotals[contribution.memberId]) {
        memberTotals[contribution.memberId] = {
          name: contribution.memberName,
          total: 0,
          memberId: contribution.memberId,
        };
      }
      memberTotals[contribution.memberId].total += contribution.amount;
    });

    return Object.values(memberTotals);
  };

  // Ownership pagination
  const memberTotals = getMemberTotals();
  const ownershipTotalPages = Math.ceil(memberTotals.length / ownershipItemsPerPage);
  const paginatedOwnership = memberTotals.slice(
    (ownershipPage - 1) * ownershipItemsPerPage,
    ownershipPage * ownershipItemsPerPage
  );

  // Contribution pagination
  const contributionTotalPages = Math.ceil(contributions.length / contributionItemsPerPage);
  const paginatedContributions = contributions.slice(
    (contributionPage - 1) * contributionItemsPerPage,
    contributionPage * contributionItemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('shares.title')}</h1>
          <p className="text-muted-foreground mt-1">
            Track and monitor member share contributions and ownership
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
                {t('shares.addContribution')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('shares.addContribution')}</DialogTitle>
                <DialogDescription>
                  Add a new share contribution record
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="memberId" className="text-right">
                    {t('common.id')}
                  </Label>
                  <Input
                    id="memberId"
                    value={newContribution.memberId}
                    onChange={(e) => setNewContribution({ ...newContribution, memberId: e.target.value })}
                    className="col-span-3"
                    placeholder="M001"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="memberName" className="text-right">
                    {t('common.name')}
                  </Label>
                  <Input
                    id="memberName"
                    value={newContribution.memberName}
                    onChange={(e) => setNewContribution({ ...newContribution, memberName: e.target.value })}
                    className="col-span-3"
                    placeholder="Member Name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    {t('common.amount')}
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newContribution.amount}
                    onChange={(e) => setNewContribution({ ...newContribution, amount: e.target.value })}
                    className="col-span-3"
                    placeholder="500000"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    {t('common.date')}
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newContribution.date}
                    onChange={(e) => setNewContribution({ ...newContribution, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleAddContribution}>
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
            <CardTitle className="text-sm font-medium">{t('shares.title')}</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculateTotalShares().toLocaleString()} ₭
            </div>
            <p className="text-xs text-muted-foreground">
              Total share contributions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getMemberTotals().length}</div>
            <p className="text-xs text-muted-foreground">
              Members with shares
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contributions.length}</div>
            <p className="text-xs text-muted-foreground">
              Contribution records
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Contribution</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contributions.length > 0
                ? (calculateTotalShares() / contributions.length).toLocaleString(undefined, { maximumFractionDigits: 0 })
                : 0}{" "}
              ₭
            </div>
            <p className="text-xs text-muted-foreground">
              Per contribution
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ownership" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ownership">{t('shares.ownershipSummary')}</TabsTrigger>
          <TabsTrigger value="history">{t('shares.contributionHistory')}</TabsTrigger>
        </TabsList>

        <TabsContent value="ownership" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('shares.ownershipSummary')}</CardTitle>
              <CardDescription>
                Member ownership breakdown and percentages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.id')}</TableHead>
                    <TableHead>{t('common.name')}</TableHead>
                    <TableHead>{t('common.total')}</TableHead>
                    <TableHead>{t('shares.ownershipPercentage')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOwnership.map((member) => (
                    <TableRow key={member.memberId}>
                      <TableCell className="font-medium">{member.memberId}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.total.toLocaleString()} ₭</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {calculateOwnershipPercentage(member.total)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {ownershipTotalPages > 1 && (
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <RowsPerPageSelector
                    value={ownershipItemsPerPage}
                    onValueChange={(value) => {
                      setOwnershipItemsPerPage(value);
                      setOwnershipPage(1);
                    }}
                  />
                  <Pagination className="justify-end">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setOwnershipPage(p => Math.max(1, p - 1))}
                          className={ownershipPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {[...Array(ownershipTotalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setOwnershipPage(i + 1)}
                            isActive={ownershipPage === i + 1}
                            className="cursor-pointer"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setOwnershipPage(p => Math.min(ownershipTotalPages, p + 1))}
                          className={ownershipPage === ownershipTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('shares.contributionHistory')}</CardTitle>
              <CardDescription>
                All share contribution transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.date')}</TableHead>
                    <TableHead>{t('common.id')}</TableHead>
                    <TableHead>{t('common.name')}</TableHead>
                    <TableHead>{t('common.amount')}</TableHead>
                    <TableHead>Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedContributions.map((contribution) => (
                    <TableRow key={contribution.id}>
                      <TableCell>{new Date(contribution.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{contribution.memberId}</TableCell>
                      <TableCell>{contribution.memberName}</TableCell>
                      <TableCell>{contribution.amount.toLocaleString()} ₭</TableCell>
                      <TableCell>
                        <Badge variant="outline">{contribution.year}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {contributionTotalPages > 1 && (
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <RowsPerPageSelector
                    value={contributionItemsPerPage}
                    onValueChange={(value) => {
                      setContributionItemsPerPage(value);
                      setContributionPage(1);
                    }}
                  />
                  <Pagination className="justify-end">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setContributionPage(p => Math.max(1, p - 1))}
                          className={contributionPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {[...Array(contributionTotalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setContributionPage(i + 1)}
                            isActive={contributionPage === i + 1}
                            className="cursor-pointer"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setContributionPage(p => Math.min(contributionTotalPages, p + 1))}
                          className={contributionPage === contributionTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}