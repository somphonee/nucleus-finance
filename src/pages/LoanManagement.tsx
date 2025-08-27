import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Download, DollarSign, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Loan {
  id: string;
  loanId: string;
  memberId: string;
  memberName: string;
  amount: number;
  dateIssued: string;
  interestRate: number;
  status: 'active' | 'completed';
  remaining: number;
}

interface Repayment {
  id: string;
  loanId: string;
  amount: number;
  date: string;
  balanceAfter: number;
}

export default function LoanManagement() {
  const { t } = useLanguage();
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: "1",
      loanId: "L001",
      memberId: "M001",
      memberName: "John Doe",
      amount: 5000000,
      dateIssued: "2024-01-15",
      interestRate: 5,
      status: 'active',
      remaining: 3500000,
    },
    {
      id: "2",
      loanId: "L002",
      memberId: "M002",
      memberName: "Jane Smith",
      amount: 3000000,
      dateIssued: "2024-02-01",
      interestRate: 5,
      status: 'active',
      remaining: 2100000,
    },
  ]);

  const [repayments, setRepayments] = useState<Repayment[]>([
    {
      id: "1",
      loanId: "L001",
      amount: 1500000,
      date: "2024-02-15",
      balanceAfter: 3500000,
    },
    {
      id: "2",
      loanId: "L002",
      amount: 900000,
      date: "2024-03-01",
      balanceAfter: 2100000,
    },
  ]);

  const [newLoan, setNewLoan] = useState({
    loanId: "",
    memberId: "",
    memberName: "",
    amount: "",
    dateIssued: "",
    interestRate: "5",
  });

  const [newRepayment, setNewRepayment] = useState({
    loanId: "",
    amount: "",
    date: "",
  });

  const [isLoanDialogOpen, setIsLoanDialogOpen] = useState(false);
  const [isRepaymentDialogOpen, setIsRepaymentDialogOpen] = useState(false);

  const handleAddLoan = () => {
    if (newLoan.loanId && newLoan.memberId && newLoan.memberName && newLoan.amount && newLoan.dateIssued) {
      const loan: Loan = {
        id: Date.now().toString(),
        loanId: newLoan.loanId,
        memberId: newLoan.memberId,
        memberName: newLoan.memberName,
        amount: parseFloat(newLoan.amount),
        dateIssued: newLoan.dateIssued,
        interestRate: parseFloat(newLoan.interestRate),
        status: 'active',
        remaining: parseFloat(newLoan.amount),
      };
      
      setLoans([loan, ...loans]);
      setNewLoan({ loanId: "", memberId: "", memberName: "", amount: "", dateIssued: "", interestRate: "5" });
      setIsLoanDialogOpen(false);
    }
  };

  const handleAddRepayment = () => {
    if (newRepayment.loanId && newRepayment.amount && newRepayment.date) {
      const loan = loans.find(l => l.loanId === newRepayment.loanId);
      if (loan) {
        const repaymentAmount = parseFloat(newRepayment.amount);
        const newBalance = Math.max(0, loan.remaining - repaymentAmount);
        
        const repayment: Repayment = {
          id: Date.now().toString(),
          loanId: newRepayment.loanId,
          amount: repaymentAmount,
          date: newRepayment.date,
          balanceAfter: newBalance,
        };
        
        setRepayments([repayment, ...repayments]);
        
        // Update loan remaining balance
        setLoans(loans.map(l => 
          l.loanId === newRepayment.loanId 
            ? { ...l, remaining: newBalance, status: newBalance === 0 ? 'completed' : 'active' }
            : l
        ));
        
        setNewRepayment({ loanId: "", amount: "", date: "" });
        setIsRepaymentDialogOpen(false);
      }
    }
  };

  const calculateTotalLoans = () => {
    return loans.reduce((sum, loan) => sum + loan.amount, 0);
  };

  const calculateTotalRemaining = () => {
    return loans.reduce((sum, loan) => sum + loan.remaining, 0);
  };

  const getActiveLoans = () => {
    return loans.filter(loan => loan.status === 'active').length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('loans.title')}</h1>
          <p className="text-muted-foreground mt-1">
            Track loans issued and repayments with interest calculations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t('common.export')}
          </Button>
          <Dialog open={isRepaymentDialogOpen} onOpenChange={setIsRepaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <DollarSign className="h-4 w-4 mr-2" />
                Add {t('loans.repayment')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Loan {t('loans.repayment')}</DialogTitle>
                <DialogDescription>
                  Record a loan repayment transaction
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="repayLoanId" className="text-right">
                    {t('loans.loanId')}
                  </Label>
                  <Input
                    id="repayLoanId"
                    value={newRepayment.loanId}
                    onChange={(e) => setNewRepayment({...newRepayment, loanId: e.target.value})}
                    className="col-span-3"
                    placeholder="L001"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="repayAmount" className="text-right">
                    {t('common.amount')}
                  </Label>
                  <Input
                    id="repayAmount"
                    type="number"
                    value={newRepayment.amount}
                    onChange={(e) => setNewRepayment({...newRepayment, amount: e.target.value})}
                    className="col-span-3"
                    placeholder="500000"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="repayDate" className="text-right">
                    {t('common.date')}
                  </Label>
                  <Input
                    id="repayDate"
                    type="date"
                    value={newRepayment.date}
                    onChange={(e) => setNewRepayment({...newRepayment, date: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsRepaymentDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleAddRepayment}>
                  {t('common.add')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isLoanDialogOpen} onOpenChange={setIsLoanDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t('loans.addLoan')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('loans.addLoan')}</DialogTitle>
                <DialogDescription>
                  Issue a new loan to a member
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="loanId" className="text-right">
                    {t('loans.loanId')}
                  </Label>
                  <Input
                    id="loanId"
                    value={newLoan.loanId}
                    onChange={(e) => setNewLoan({...newLoan, loanId: e.target.value})}
                    className="col-span-3"
                    placeholder="L001"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="loanMemberId" className="text-right">
                    {t('common.id')}
                  </Label>
                  <Input
                    id="loanMemberId"
                    value={newLoan.memberId}
                    onChange={(e) => setNewLoan({...newLoan, memberId: e.target.value})}
                    className="col-span-3"
                    placeholder="M001"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="loanMemberName" className="text-right">
                    {t('common.name')}
                  </Label>
                  <Input
                    id="loanMemberName"
                    value={newLoan.memberName}
                    onChange={(e) => setNewLoan({...newLoan, memberName: e.target.value})}
                    className="col-span-3"
                    placeholder="Member Name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="loanAmount" className="text-right">
                    {t('common.amount')}
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={newLoan.amount}
                    onChange={(e) => setNewLoan({...newLoan, amount: e.target.value})}
                    className="col-span-3"
                    placeholder="5000000"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="loanDate" className="text-right">
                    {t('common.date')}
                  </Label>
                  <Input
                    id="loanDate"
                    type="date"
                    value={newLoan.dateIssued}
                    onChange={(e) => setNewLoan({...newLoan, dateIssued: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="interestRate" className="text-right">
                    {t('loans.interest')} %
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    value={newLoan.interestRate}
                    onChange={(e) => setNewLoan({...newLoan, interestRate: e.target.value})}
                    className="col-span-3"
                    placeholder="5"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsLoanDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleAddLoan}>
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
            <CardTitle className="text-sm font-medium">{t('common.total')} {t('loans.issued')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculateTotalLoans().toLocaleString()} ₭
            </div>
            <p className="text-xs text-muted-foreground">
              All-time loans issued
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.activeLoans')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getActiveLoans()}</div>
            <p className="text-xs text-muted-foreground">
              Currently active loans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('loans.remaining')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculateTotalRemaining().toLocaleString()} ₭
            </div>
            <p className="text-xs text-muted-foreground">
              Total outstanding amount
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="loans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="loans">Loan Records</TabsTrigger>
          <TabsTrigger value="repayments">{t('loans.repayment')} History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="loans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Records</CardTitle>
              <CardDescription>
                All loans issued to members with current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('loans.loanId')}</TableHead>
                    <TableHead>{t('common.member')}</TableHead>
                    <TableHead>{t('common.amount')}</TableHead>
                    <TableHead>{t('loans.remaining')}</TableHead>
                    <TableHead>{t('loans.interest')} %</TableHead>
                    <TableHead>{t('common.date')}</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell className="font-medium">{loan.loanId}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{loan.memberName}</div>
                          <div className="text-sm text-muted-foreground">{loan.memberId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{loan.amount.toLocaleString()} ₭</TableCell>
                      <TableCell>{loan.remaining.toLocaleString()} ₭</TableCell>
                      <TableCell>{loan.interestRate}%</TableCell>
                      <TableCell>{new Date(loan.dateIssued).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={loan.status === 'active' ? 'destructive' : 'default'}>
                          {loan.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repayments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('loans.repayment')} History</CardTitle>
              <CardDescription>
                All loan repayment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.date')}</TableHead>
                    <TableHead>{t('loans.loanId')}</TableHead>
                    <TableHead>{t('common.amount')}</TableHead>
                    <TableHead>Balance After</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repayments.map((repayment) => (
                    <TableRow key={repayment.id}>
                      <TableCell>{new Date(repayment.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{repayment.loanId}</TableCell>
                      <TableCell>{repayment.amount.toLocaleString()} ₭</TableCell>
                      <TableCell>{repayment.balanceAfter.toLocaleString()} ₭</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}