import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, PieChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  ]);

  const [newContribution, setNewContribution] = useState({
    memberId: "",
    memberName: "",
    amount: "",
    date: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                    onChange={(e) => setNewContribution({...newContribution, memberId: e.target.value})}
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
                    onChange={(e) => setNewContribution({...newContribution, memberName: e.target.value})}
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
                    onChange={(e) => setNewContribution({...newContribution, amount: e.target.value})}
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
                    onChange={(e) => setNewContribution({...newContribution, date: e.target.value})}
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
              Contributing members
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('shares.ownership')} Summary</CardTitle>
          <CardDescription>
            Member ownership percentages based on contributions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('common.id')}</TableHead>
                <TableHead>{t('common.name')}</TableHead>
                <TableHead>{t('common.total')}</TableHead>
                <TableHead>{t('shares.ownership')} %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getMemberTotals().map((member) => (
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('shares.contribution')} History</CardTitle>
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
              {contributions.map((contribution) => (
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
        </CardContent>
      </Card>
    </div>
  );
}