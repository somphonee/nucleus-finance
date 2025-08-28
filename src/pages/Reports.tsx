import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, TrendingUp, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReportData {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

export default function Reports() {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("01");

  const monthlyData: ReportData[] = [
    { month: "Jan", income: 8500000, expenses: 2300000, net: 6200000 },
    { month: "Feb", income: 7200000, expenses: 2100000, net: 5100000 },
    { month: "Mar", income: 9800000, expenses: 2800000, net: 7000000 },
    { month: "Apr", income: 6900000, expenses: 2000000, net: 4900000 },
    { month: "May", income: 8100000, expenses: 2400000, net: 5700000 },
    { month: "Jun", income: 7500000, expenses: 2200000, net: 5300000 },
  ];

  const incomeCategories = [
    { name: "Member Savings", value: 25000000, color: "#004A67" },
    { name: "Loan Interest", value: 12000000, color: "#0066A3" },
    { name: "Share Contributions", value: 8000000, color: "#3399CC" },
    { name: "Investment Returns", value: 5000000, color: "#66B2E5" },
  ];

  const expenseCategories = [
    { name: "Operating Expenses", value: 8000000, color: "#D32F2F" },
    { name: "Staff Salaries", value: 6000000, color: "#F57C00" },
    { name: "Office Rent", value: 3000000, color: "#FBC02D" },
    { name: "Utilities", value: 1500000, color: "#689F38" },
  ];

  const monthlyIncomeReport = [
    { category: "Member Savings", amount: 4200000, notes: "Regular monthly deposits" },
    { category: "Loan Interest", amount: 1800000, notes: "Interest from active loans" },
    { category: "Share Contributions", amount: 1500000, notes: "New share purchases" },
    { category: "Investment Returns", amount: 800000, notes: "Fixed deposit returns" },
  ];

  const monthlyExpenseReport = [
    { category: "Staff Salaries", amount: 1200000, notes: "3 staff members" },
    { category: "Office Rent", amount: 500000, notes: "Monthly office rental" },
    { category: "Utilities", amount: 250000, notes: "Electricity, water, internet" },
    { category: "Office Supplies", amount: 150000, notes: "Stationery and materials" },
  ];

  const yearlyIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
  const yearlyExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0);
  const yearlyNet = yearlyIncome - yearlyExpenses;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('reports.title')}</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive financial reports and analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly {t('ledger.income')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {yearlyIncome.toLocaleString()} ₭
            </div>
            <p className="text-xs text-muted-foreground">
              Total income for {selectedYear}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly {t('ledger.expenditure')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {yearlyExpenses.toLocaleString()} ₭
            </div>
            <p className="text-xs text-muted-foreground">
              Total expenses for {selectedYear}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {yearlyNet.toLocaleString()} ₭
            </div>
            <p className="text-xs text-muted-foreground">
              Income minus expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((yearlyNet / yearlyIncome) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Net profit percentage
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
          <TabsTrigger value="monthly-income">{t('reports.monthlyIncome')}</TabsTrigger>
          <TabsTrigger value="yearly-income">{t('reports.yearlyIncome')}</TabsTrigger>
          <TabsTrigger value="monthly-expenses">{t('reports.monthlyExpenses')}</TabsTrigger>
          <TabsTrigger value="yearly-expenses">{t('reports.yearlyExpenses')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('reports.incomeVsExpenses')}</CardTitle>
                <CardDescription>
                  Monthly comparison of income and expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ₭`} />
                    <Bar dataKey="income" fill="#22c55e" name="Income" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income Breakdown</CardTitle>
                <CardDescription>
                  Income sources distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={incomeCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {incomeCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ₭`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Net Profit Trend</CardTitle>
                <CardDescription>
                  Monthly net profit over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ₭`} />
                    <Line type="monotone" dataKey="net" stroke="#004A67" strokeWidth={2} name="Net Profit" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>
                  Expense categories distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ₭`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly-income" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Select Month:</span>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">January 2024</SelectItem>
                <SelectItem value="02">February 2024</SelectItem>
                <SelectItem value="03">March 2024</SelectItem>
                <SelectItem value="04">April 2024</SelectItem>
                <SelectItem value="05">May 2024</SelectItem>
                <SelectItem value="06">June 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('reports.monthlyIncome')}</CardTitle>
              <CardDescription>
                Income breakdown by category for the selected month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.category')}</TableHead>
                    <TableHead>{t('common.amount')}</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyIncomeReport.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-success">
                          {item.amount.toLocaleString()} ₭
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.notes}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold">{t('common.total')}</TableCell>
                    <TableCell>
                      <Badge className="bg-success text-success-foreground">
                        {monthlyIncomeReport.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} ₭
                      </Badge>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly-income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('reports.yearlyIncome')} - {selectedYear}</CardTitle>
              <CardDescription>
                Annual income summary by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.category')}</TableHead>
                    <TableHead>{t('common.amount')}</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-success">
                          {category.value.toLocaleString()} ₭
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {((category.value / incomeCategories.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold">{t('common.total')}</TableCell>
                    <TableCell>
                      <Badge className="bg-success text-success-foreground">
                        {incomeCategories.reduce((sum, cat) => sum + cat.value, 0).toLocaleString()} ₭
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">100.0%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly-expenses" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Select Month:</span>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">January 2024</SelectItem>
                <SelectItem value="02">February 2024</SelectItem>
                <SelectItem value="03">March 2024</SelectItem>
                <SelectItem value="04">April 2024</SelectItem>
                <SelectItem value="05">May 2024</SelectItem>
                <SelectItem value="06">June 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('reports.monthlyExpenses')}</CardTitle>
              <CardDescription>
                Expense breakdown by category for the selected month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.category')}</TableHead>
                    <TableHead>{t('common.amount')}</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyExpenseReport.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">
                          {item.amount.toLocaleString()} ₭
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.notes}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold">{t('common.total')}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">
                        {monthlyExpenseReport.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} ₭
                      </Badge>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly-expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('reports.yearlyExpenses')} - {selectedYear}</CardTitle>
              <CardDescription>
                Annual expense summary by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.category')}</TableHead>
                    <TableHead>{t('common.amount')}</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">
                          {category.value.toLocaleString()} ₭
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {((category.value / expenseCategories.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold">{t('common.total')}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">
                        {expenseCategories.reduce((sum, cat) => sum + cat.value, 0).toLocaleString()} ₭
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">100.0%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}