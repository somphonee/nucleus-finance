import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  description: string;
  category: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN001",
    type: "income",
    amount: 15000,
    description: "Member Monthly Savings - John Doe",
    category: "Member Savings",
    date: "2024-12-15",
    status: "completed"
  },
  {
    id: "TXN002",
    type: "expense",
    amount: 5000,
    description: "Office Supplies Purchase",
    category: "Administrative",
    date: "2024-12-14",
    status: "completed"
  },
  {
    id: "TXN003",
    type: "income",
    amount: 25000,
    description: "Loan Interest Payment - Sarah Smith",
    category: "Loan Interest",
    date: "2024-12-14",
    status: "pending"
  },
  {
    id: "TXN004",
    type: "transfer",
    amount: 10000,
    description: "Share Purchase - Mike Johnson",
    category: "Share Capital",
    date: "2024-12-13",
    status: "completed"
  },
  {
    id: "TXN005",
    type: "expense",
    amount: 3500,
    description: "Bank Service Charges",
    category: "Banking Fees",
    date: "2024-12-13",
    status: "completed"
  }
];

export function RecentTransactions() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <ArrowUpRight className="w-4 h-4 text-success" />;
      case "expense":
        return <ArrowDownLeft className="w-4 h-4 text-destructive" />;
      case "transfer":
        return <ArrowUpRight className="w-4 h-4 text-primary" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="status-income">Completed</Badge>;
      case "pending":
        return <Badge className="status-pending">Pending</Badge>;
      case "failed":
        return <Badge className="status-expense">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatAmount = (amount: number, type: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LAK',
      minimumFractionDigits: 0
    }).format(amount).replace('LAK', '₭');
    
    return type === "expense" ? `-${formatted}` : `+${formatted}`;
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case "income":
        return "text-success font-semibold";
      case "expense":
        return "text-destructive font-semibold";
      case "transfer":
        return "text-primary font-semibold";
      default:
        return "text-foreground font-semibold";
    }
  };

  return (
    <div className="financial-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <button className="text-sm text-primary hover:text-primary-hover font-medium transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-muted rounded-lg">
                {getTypeIcon(transaction.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {transaction.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {transaction.category}
                  </p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {getStatusBadge(transaction.status)}
              <p className={`text-sm ${getAmountColor(transaction.type)}`}>
                {formatAmount(transaction.amount, transaction.type)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}