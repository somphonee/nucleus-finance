import { Plus, Download, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface CashTransaction {
  id: string;
  date: string;
  description: string;
  type: "inflow" | "outflow";
  amount: number;
  category: string;
  balance: number;
  reference?: string;
}

const mockTransactions: CashTransaction[] = [
  {
    id: "CASH001",
    date: "2024-12-15",
    description: "Member Monthly Savings Deposit",
    type: "inflow",
    amount: 150000,
    category: "Member Savings",
    balance: 2450000,
    reference: "MB-001-202412"
  },
  {
    id: "CASH002", 
    date: "2024-12-14",
    description: "Office Rent Payment",
    type: "outflow",
    amount: 45000,
    category: "Administrative Expenses",
    balance: 2300000,
    reference: "RENT-202412"
  },
  {
    id: "CASH003",
    date: "2024-12-14", 
    description: "Loan Interest Collection",
    type: "inflow",
    amount: 85000,
    category: "Loan Interest",
    balance: 2345000,
    reference: "INT-202412-15"
  },
  {
    id: "CASH004",
    date: "2024-12-13",
    description: "Equipment Purchase", 
    type: "outflow",
    amount: 120000,
    category: "Capital Expenditure",
    balance: 2260000,
    reference: "EQ-2024-08"
  }
];

const CashManagement = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LAK',
      minimumFractionDigits: 0
    }).format(amount).replace('LAK', '₭');
  };

  const getTypeColor = (type: string) => {
    return type === "inflow" ? "text-success" : "text-destructive";
  };

  const getTypeBadge = (type: string) => {
    return type === "inflow" 
      ? <Badge className="status-income">Inflow</Badge>
      : <Badge className="status-expense">Outflow</Badge>;
  };

  return (
    <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cash Management</h1>
            <p className="text-muted-foreground mt-1">
              Track daily cash inflows and outflows with running balances
            </p>
          </div>
        </div>

        {/* Current Balance Card */}
        <div className="financial-card bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Current Cash Balance</h3>
              <p className="text-3xl font-bold text-primary">₭2,450,000</p>
              <p className="text-sm text-muted-foreground mt-1">As of {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Today's Net Change</p>
              <p className="text-xl font-semibold text-success">+₭65,000</p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 gap-4 w-full sm:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="financial-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Running Balance</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="text-muted-foreground font-mono text-sm">
                      {transaction.reference || "-"}
                    </td>
                    <td className="font-medium">{transaction.description}</td>
                    <td>
                      <span className="px-2 py-1 bg-muted rounded-md text-sm">
                        {transaction.category}
                      </span>
                    </td>
                    <td>{getTypeBadge(transaction.type)}</td>
                    <td className={`font-semibold ${getTypeColor(transaction.type)}`}>
                      {transaction.type === "outflow" ? "-" : "+"}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="font-bold text-foreground">
                      {formatCurrency(transaction.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="financial-card text-center">
            <h4 className="font-medium text-muted-foreground mb-2">Total Inflows (This Month)</h4>
            <p className="text-2xl font-bold text-success">₭785,000</p>
          </div>
          <div className="financial-card text-center">
            <h4 className="font-medium text-muted-foreground mb-2">Total Outflows (This Month)</h4>
            <p className="text-2xl font-bold text-destructive">₭520,000</p>
          </div>
          <div className="financial-card text-center">
            <h4 className="font-medium text-muted-foreground mb-2">Net Change (This Month)</h4>
            <p className="text-2xl font-bold text-primary">₭265,000</p>
          </div>
        </div>
      </div>
  );
};

export default CashManagement;