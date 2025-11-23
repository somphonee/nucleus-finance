export interface AuditLog {
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

export const mockAuditLogsAPI = {
    getLogs: async ({ page = 1, pageSize = 10, search = '', module = 'all', status = 'all' }) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        let filtered = [...mockAuditLogs];

        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter(log =>
                log.user.toLowerCase().includes(term) ||
                log.action.toLowerCase().includes(term) ||
                log.details.toLowerCase().includes(term)
            );
        }

        if (module && module !== 'all') {
            filtered = filtered.filter(log => log.module === module);
        }

        if (status && status !== 'all') {
            filtered = filtered.filter(log => log.status === status);
        }

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = filtered.slice(startIndex, endIndex);

        return {
            data: paginatedData,
            meta: {
                page,
                pageSize,
                total: filtered.length,
                totalPages: Math.ceil(filtered.length / pageSize)
            }
        };
    }
};
