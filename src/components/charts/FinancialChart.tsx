import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', income: 120000, expenses: 80000, balance: 40000 },
  { month: 'Feb', income: 135000, expenses: 85000, balance: 50000 },
  { month: 'Mar', income: 148000, expenses: 92000, balance: 56000 },
  { month: 'Apr', income: 155000, expenses: 88000, balance: 67000 },
  { month: 'May', income: 162000, expenses: 95000, balance: 67000 },
  { month: 'Jun', income: 158000, expenses: 90000, balance: 68000 },
  { month: 'Jul', income: 170000, expenses: 98000, balance: 72000 },
  { month: 'Aug', income: 165000, expenses: 94000, balance: 71000 },
  { month: 'Sep', income: 175000, expenses: 102000, balance: 73000 },
  { month: 'Oct', income: 182000, expenses: 105000, balance: 77000 },
  { month: 'Nov', income: 188000, expenses: 108000, balance: 80000 },
  { month: 'Dec', income: 195000, expenses: 110000, balance: 85000 },
];

const categoryData = [
  { name: 'Member Savings', value: 45, color: '#004A67' },
  { name: 'Loan Interest', value: 25, color: '#22C55E' },
  { name: 'Share Capital', value: 20, color: '#F59E0B' },
  { name: 'Other Income', value: 10, color: '#8B5CF6' },
];

interface FinancialChartProps {
  type: 'line' | 'bar' | 'pie';
  title: string;
  height?: number;
}

export function FinancialChart({ type, title, height = 300 }: FinancialChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LAK',
      minimumFractionDigits: 0
    }).format(value).replace('LAK', '₭');
  };

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="month" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={formatCurrency}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            fontSize: '12px'
          }}
          formatter={(value: number) => [formatCurrency(value), '']}
        />
        <Line 
          type="monotone" 
          dataKey="income" 
          stroke="hsl(var(--success))" 
          strokeWidth={2}
          name="Income"
          dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="expenses" 
          stroke="hsl(var(--destructive))" 
          strokeWidth={2}
          name="Expenses"
          dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="balance" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          name="Net Balance"
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="month" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={formatCurrency}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            fontSize: '12px'
          }}
          formatter={(value: number) => [formatCurrency(value), '']}
        />
        <Bar dataKey="income" fill="hsl(var(--success))" name="Income" radius={[2, 2, 0, 0]} />
        <Bar dataKey="expenses" fill="hsl(var(--destructive))" name="Expenses" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            fontSize: '12px'
          }}
          formatter={(value: number) => [`${value}%`, 'Percentage']}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderLineChart();
    }
  };

  return (
    <div className="financial-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      {renderChart()}
      {type === 'pie' && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {categoryData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="text-sm font-medium text-foreground">{item.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}