import { useState } from "react";
import { Search, Download, Filter, Eye, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  status: "success" | "warning" | "error";
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-12-15 14:23:45",
    user: "admin@example.la",
    action: "Create Transaction",
    module: "Cash Management",
    details: "Added cash inflow transaction: Member Savings Deposit - ₭150,000",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "2",
    timestamp: "2024-12-15 14:15:12",
    user: "province.vte@example.la",
    action: "Update Member",
    module: "Member Savings",
    details: "Updated member profile: MB-001 - Changed contact information",
    ipAddress: "192.168.1.105",
    status: "success",
  },
  {
    id: "3",
    timestamp: "2024-12-15 13:45:30",
    user: "admin@example.la",
    action: "Delete Category",
    module: "Categories",
    details: "Attempted to delete active category: EXP-010",
    ipAddress: "192.168.1.100",
    status: "warning",
  },
  {
    id: "4",
    timestamp: "2024-12-15 13:30:22",
    user: "province.lpb@example.la",
    action: "Login",
    module: "Authentication",
    details: "User logged in successfully",
    ipAddress: "192.168.2.50",
    status: "success",
  },
  {
    id: "5",
    timestamp: "2024-12-15 13:20:15",
    user: "unknown@example.la",
    action: "Login Failed",
    module: "Authentication",
    details: "Failed login attempt - Invalid credentials",
    ipAddress: "192.168.3.100",
    status: "error",
  },
  {
    id: "6",
    timestamp: "2024-12-15 12:50:33",
    user: "admin@example.la",
    action: "Export Report",
    module: "Reports",
    details: "Exported Financial Report to PDF",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "7",
    timestamp: "2024-12-15 12:30:18",
    user: "province.svk@example.la",
    action: "Create Loan",
    module: "Loan Management",
    details: "Created new loan: LOAN-2024-089 - Member MB-156 - ₭5,000,000",
    ipAddress: "192.168.4.75",
    status: "success",
  },
  {
    id: "8",
    timestamp: "2024-12-15 11:45:55",
    user: "admin@example.la",
    action: "Update Settings",
    module: "Settings",
    details: "Changed system settings: Interest rate calculation method",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "9",
    timestamp: "2024-12-15 11:20:40",
    user: "province.cpv@example.la",
    action: "Bank Reconciliation",
    module: "Bank Book",
    details: "Completed bank reconciliation for BCEL account ending in 1234",
    ipAddress: "192.168.5.90",
    status: "success",
  },
  {
    id: "10",
    timestamp: "2024-12-15 10:55:28",
    user: "admin@example.la",
    action: "Create User",
    module: "User Management",
    details: "Created new user account: province.vientiane@example.la",
    ipAddress: "192.168.1.100",
    status: "success",
  },
];

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesModule = filterModule === "all" || log.module === filterModule;
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;

    return matchesSearch && matchesModule && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="status-income">Success</Badge>;
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "error":
        return <Badge className="status-expense">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const successCount = mockAuditLogs.filter(log => log.status === "success").length;
  const warningCount = mockAuditLogs.filter(log => log.status === "warning").length;
  const errorCount = mockAuditLogs.filter(log => log.status === "error").length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Track all system activities and user actions
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => toast({ title: "Exporting", description: "Exporting audit logs..." })}
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export Logs</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{mockAuditLogs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Successful
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">{successCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">{warningCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{errorCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterModule} onValueChange={setFilterModule}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="Authentication">Authentication</SelectItem>
                <SelectItem value="Cash Management">Cash Management</SelectItem>
                <SelectItem value="Bank Book">Bank Book</SelectItem>
                <SelectItem value="Member Savings">Member Savings</SelectItem>
                <SelectItem value="Loan Management">Loan Management</SelectItem>
                <SelectItem value="Reports">Reports</SelectItem>
                <SelectItem value="Settings">Settings</SelectItem>
                <SelectItem value="User Management">User Management</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm whitespace-nowrap">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.module}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={log.details}>
                      {log.details}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        {getStatusBadge(log.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast({
                          title: "Log Details",
                          description: log.details
                        })}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No audit logs found matching your filters
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
