// Mock data for Cashbook (ລາຍການເງິນສົດ)
export interface CashTransaction {
    id: number;
    date: string;
    description: string;
    category: string;
    income: number;
    expense: number;
    balance: number;
    reference?: string;
}

export const mockCashTransactions: CashTransaction[] = [
    {
        id: 1,
        date: '2025-11-01',
        description: 'ຍອດຍົກມາ (Opening Balance)',
        category: 'ຍອດຍົກມາ',
        income: 50000000,
        expense: 0,
        balance: 50000000,
        reference: 'OB-001',
    },
    {
        id: 2,
        date: '2025-11-05',
        description: 'ລາຍຮັບຈາກການຂາຍສິນຄ້າ (Sales Revenue)',
        category: 'ລາຍຮັບ',
        income: 15000000,
        expense: 0,
        balance: 65000000,
        reference: 'SAL-001',
    },
    {
        id: 3,
        date: '2025-11-07',
        description: 'ຈ່າຍຄ່າເຊົ່າສຳນັກງານ (Office Rent)',
        category: 'ລາຍຈ່າຍ',
        income: 0,
        expense: 5000000,
        balance: 60000000,
        reference: 'EXP-001',
    },
    {
        id: 4,
        date: '2025-11-10',
        description: 'ລາຍຮັບຈາກການບໍລິການ (Service Income)',
        category: 'ລາຍຮັບ',
        income: 8000000,
        expense: 0,
        balance: 68000000,
        reference: 'SRV-001',
    },
    {
        id: 5,
        date: '2025-11-12',
        description: 'ຈ່າຍເງິນເດືອນພະນັກງານ (Staff Salaries)',
        category: 'ລາຍຈ່າຍ',
        income: 0,
        expense: 12000000,
        balance: 56000000,
        reference: 'SAL-002',
    },
    {
        id: 6,
        date: '2025-11-15',
        description: 'ລາຍຮັບຈາກການຂາຍສິນຄ້າ (Sales Revenue)',
        category: 'ລາຍຮັບ',
        income: 20000000,
        expense: 0,
        balance: 76000000,
        reference: 'SAL-003',
    },
    {
        id: 7,
        date: '2025-11-18',
        description: 'ຈ່າຍຄ່າໄຟຟ້າ ແລະ ນ້ຳປະປາ (Utilities)',
        category: 'ລາຍຈ່າຍ',
        income: 0,
        expense: 1500000,
        balance: 74500000,
        reference: 'UTL-001',
    },
    {
        id: 8,
        date: '2025-11-20',
        description: 'ລາຍຮັບຈາກການບໍລິການ (Service Income)',
        category: 'ລາຍຮັບ',
        income: 10000000,
        expense: 0,
        balance: 84500000,
        reference: 'SRV-002',
    },
    {
        id: 9,
        date: '2025-11-22',
        description: 'ຊື້ອຸປະກອນສຳນັກງານ (Office Supplies)',
        category: 'ລາຍຈ່າຍ',
        income: 0,
        expense: 2500000,
        balance: 82000000,
        reference: 'SUP-001',
    },
];

export const mockCashbookAPI = {
    getTransactions: async () => {
        return {
            data: mockCashTransactions,
            meta: {
                total: mockCashTransactions.length,
                current_balance: mockCashTransactions[mockCashTransactions.length - 1].balance,
                total_income: mockCashTransactions.reduce((sum, t) => sum + t.income, 0),
                total_expense: mockCashTransactions.reduce((sum, t) => sum + t.expense, 0),
            },
        };
    },
};
