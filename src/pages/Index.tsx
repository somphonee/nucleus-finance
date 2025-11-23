import { DollarSign, Users, PieChart, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { FinancialChart } from "@/components/charts/FinancialChart";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{t('common.lastUpdated')}: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <MetricCard
          title={t('dashboard.totalCash')}
          value="₭2,450,000"
          change={12.5}
          changeType="increase"
          icon={<DollarSign className="w-6 h-6 text-primary" />}
          description={t('dashboard.desc.cash')}
          gradient
        />
        <MetricCard
          title={t('dashboard.activeMembers')}
          value="1,247"
          change={8.2}
          changeType="increase"
          icon={<Users className="w-6 h-6 text-success" />}
          description={t('dashboard.desc.members')}
        />
        <MetricCard
          title={t('dashboard.totalSavings')}
          value="₭18,750,000"
          change={5.7}
          changeType="increase"
          icon={<PieChart className="w-6 h-6 text-warning" />}
          description={t('dashboard.desc.savings')}
        />
        <MetricCard
          title={t('dashboard.activeLoans')}
          value="₭12,340,000"
          change={-2.3}
          changeType="decrease"
          icon={<TrendingUp className="w-6 h-6 text-destructive" />}
          description={t('dashboard.desc.loans')}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <FinancialChart
          type="line"
          title={t('reports.incomeVsExpenses')}
          height={350}
        />
        <FinancialChart
          type="pie"
          title={t('reports.incomeDistribution')}
          height={350}
        />
      </div>

      {/* Data Tables and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div>
          <QuickActionsCard />
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <FinancialChart
          type="bar"
          title={t('reports.yearlyOverview')}
          height={400}
        />
      </div>
    </div>
  );
};

export default Index;
