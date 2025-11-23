import { useState, useEffect } from "react";
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
import { RowsPerPageSelector } from "@/components/ui/rows-per-page-selector";
import { mockAuditLogsAPI, AuditLog } from "@/lib/mockData/auditLogs";

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const loadLogs = async () => {
    try {
      const response = await mockAuditLogsAPI.getLogs({
        page: currentPage,
        pageSize: itemsPerPage,
        search: searchTerm,
        module: filterModule,
        status: filterStatus,
      });
      setLogs(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load audit logs", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadLogs();
  }, [currentPage, itemsPerPage, searchTerm, filterModule, filterStatus]);

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

  // Note: Stats are calculated based on the current page data, which is a limitation of the mock API not returning global stats.
  const successCount = logs.filter(log => log.status === "success").length;
  const warningCount = logs.filter(log => log.status === "warning").length;
  const errorCount = logs.filter(log => log.status === "error").length;

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
            {/* Using totalPages * itemsPerPage as a rough estimate or placeholder */}
            <p className="text-2xl font-bold text-foreground">{totalPages * itemsPerPage}</p>
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
                {logs.map((log) => (
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
          {logs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No audit logs found matching your filters
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <RowsPerPageSelector
                value={itemsPerPage}
                onValueChange={(value) => {
                  setItemsPerPage(value);
                  setCurrentPage(1);
                }}
              />
              <Pagination className="justify-end">
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
