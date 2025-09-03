import { useState } from "react";
import { Plus, Download, Search, Eye, Edit, DollarSign, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AddMemberDialog } from "@/components/dialogs/AddMemberDialog";

interface Member {
  id: string;
  memberNumber: string;
  name: string;
  joinDate: string;
  currentBalance: number;
  monthlyDeposit: number;
  totalDeposits: number;
  status: "active" | "inactive" | "suspended";
}

const mockMembers: Member[] = [
  {
    id: "M001",
    memberNumber: "MB-2024-001", 
    name: "John Doe",
    joinDate: "2024-01-15",
    currentBalance: 125000,
    monthlyDeposit: 15000,
    totalDeposits: 165000,
    status: "active"
  },
  {
    id: "M002",
    memberNumber: "MB-2024-002",
    name: "Sarah Smith", 
    joinDate: "2024-02-20",
    currentBalance: 98000,
    monthlyDeposit: 12000,
    totalDeposits: 122000,
    status: "active"
  },
  {
    id: "M003", 
    memberNumber: "MB-2024-003",
    name: "Mike Johnson",
    joinDate: "2024-01-10",
    currentBalance: 145000,
    monthlyDeposit: 18000,
    totalDeposits: 199000,
    status: "active"
  },
  {
    id: "M004",
    memberNumber: "MB-2023-045",
    name: "Lisa Chen",
    joinDate: "2023-12-05", 
    currentBalance: 89000,
    monthlyDeposit: 10000,
    totalDeposits: 139000,
    status: "inactive"
  }
];

const MemberSavings = () => {
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', 
      currency: 'LAK',
      minimumFractionDigits: 0
    }).format(amount).replace('LAK', '₭');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="status-income">Active</Badge>;
      case "inactive": 
        return <Badge className="status-pending">Inactive</Badge>;
      case "suspended":
        return <Badge className="status-expense">Suspended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const totalBalance = mockMembers.reduce((sum, member) => sum + member.currentBalance, 0);
  const activeMembers = mockMembers.filter(m => m.status === "active").length;
  const monthlyTotal = mockMembers.reduce((sum, member) => sum + member.monthlyDeposit, 0);

  return (
    <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Member Savings</h1>
            <p className="text-muted-foreground mt-1">
              Manage member profiles, deposits, withdrawals and savings tracking
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Savings Balance"
            value={formatCurrency(totalBalance)}
            change={5.2}
            changeType="increase"
            icon={<DollarSign className="w-6 h-6 text-primary" />}
            description="All member savings combined"
            gradient
          />
          <MetricCard
            title="Active Members"
            value={activeMembers.toString()}
            change={8.1}
            changeType="increase"
            icon={<Users className="w-6 h-6 text-success" />}
            description="Currently contributing members"
          />
          <MetricCard
            title="Monthly Deposits"
            value={formatCurrency(monthlyTotal)}
            change={3.7}
            changeType="increase"
            icon={<Calendar className="w-6 h-6 text-warning" />}
            description="Expected monthly inflow"
          />
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 gap-4 w-full sm:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search members by name or ID..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setIsMemberDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </div>
        </div>

        {/* Members Table */}
        <div className="financial-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member Number</th>
                  <th>Name</th>
                  <th>Join Date</th>
                  <th>Current Balance</th>
                  <th>Monthly Deposit</th>
                  <th>Total Deposits</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="font-mono text-sm font-medium">
                      {member.memberNumber}
                    </td>
                    <td className="font-medium">{member.name}</td>
                    <td>{new Date(member.joinDate).toLocaleDateString()}</td>
                    <td className="font-bold text-primary">
                      {formatCurrency(member.currentBalance)}
                    </td>
                    <td className="font-semibold text-success">
                      {formatCurrency(member.monthlyDeposit)}
                    </td>
                    <td className="font-medium">
                      {formatCurrency(member.totalDeposits)}
                    </td>
                    <td>{getStatusBadge(member.status)}</td>
                    <td>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="hover:bg-primary-light/20">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-primary-light/20">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="financial-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Savings Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div>
                  <p className="font-medium">John Doe - Monthly Deposit</p>
                  <p className="text-sm text-muted-foreground">Today, 2:30 PM</p>
                </div>
              </div>
              <span className="font-semibold text-success">+₭15,000</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div>
                  <p className="font-medium">Sarah Smith - Emergency Withdrawal</p>
                  <p className="text-sm text-muted-foreground">Yesterday, 11:15 AM</p>
                </div>
              </div>
              <span className="font-semibold text-destructive">-₭5,000</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div>
                  <p className="font-medium">Mike Johnson - Monthly Deposit</p>
                  <p className="text-sm text-muted-foreground">Yesterday, 9:45 AM</p>
                </div>
              </div>
              <span className="font-semibold text-success">+₭18,000</span>
            </div>
          </div>
        </div>

        <AddMemberDialog 
          open={isMemberDialogOpen}
          onOpenChange={setIsMemberDialogOpen}
        />
      </div>
  );
};

export default MemberSavings;