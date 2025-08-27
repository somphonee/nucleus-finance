import { DollarSign, Users, PieChart, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { FinancialChart } from "@/components/charts/FinancialChart";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your financial data and key metrics
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Cash Balance"
            value="₭2,450,000"
            change={12.5}
            changeType="increase"
            icon={<DollarSign className="w-6 h-6 text-primary" />}
            description="Current cash on hand"
            gradient
          />
          <MetricCard
            title="Active Members"
            value="1,247"
            change={8.2}
            changeType="increase"
            icon={<Users className="w-6 h-6 text-success" />}
            description="Total registered members"
          />
          <MetricCard
            title="Total Savings"
            value="₭18,750,000"
            change={5.7}
            changeType="increase"
            icon={<PieChart className="w-6 h-6 text-warning" />}
            description="Member savings deposits"
          />
          <MetricCard
            title="Outstanding Loans"
            value="₭12,340,000"
            change={-2.3}
            changeType="decrease"
            icon={<TrendingUp className="w-6 h-6 text-destructive" />}
            description="Active loan balances"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FinancialChart 
            type="line" 
            title="Monthly Income vs Expenses" 
            height={350}
          />
          <FinancialChart 
            type="pie" 
            title="Income Distribution" 
            height={350}
          />
        </div>

        {/* Data Tables and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentTransactions />
          </div>
          <div>
            <QuickActionsCard />
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 gap-6">
          <FinancialChart 
            type="bar" 
            title="Yearly Financial Overview" 
            height={400}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
