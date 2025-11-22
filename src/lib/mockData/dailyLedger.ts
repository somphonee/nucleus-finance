// Mock data for Daily Ledger (ບັນຊີປະຈຳວັນ)
export interface DailyLedgerEntry {
    id: number;
    date: string;
    account_code: string;
    account_name: string;
    description: string;
    debit: number;
    credit: number;
    balance: number;
    reference?: string;
}

export const mockDailyLedgerEntries: DailyLedgerEntry[] = [
    {
        id: 1,
        date: '2025-11-01',
        account_code: '1001',
        account_name: 'ເງິນສົດ (Cash)',
        description: 'ຍອດຍົກມາ (Opening Balance)',
        debit: 50000000,
        credit: 0,
        balance: 50000000,
        reference: 'OB-001',
    },
    {
        id: 2,
        date: '2025-11-01',
        account_code: '1002',
        account_name: 'ທະນາຄານ (Bank)',
        description: 'ຍອດຍົກມາ (Opening Balance)',
        debit: 100000000,
        credit: 0,
        balance: 100000000,
        reference: 'OB-002',
    },
    {
        id: 3,
        date: '2025-11-05',
        account_code: '4001',
        account_name: 'ລາຍຮັບຈາກການຂາຍ (Sales Revenue)',
        description: 'ຂາຍສິນຄ້າ (Product Sales)',
        debit: 0,
        credit: 15000000,
        balance: 15000000,
        reference: 'SAL-001',
    },
    {
        id: 4,
        date: '2025-11-05',
        account_code: '1001',
        account_name: 'ເງິນສົດ (Cash)',
        description: 'ຮັບເງິນສົດຈາກການຂາຍ (Cash from Sales)',
        debit: 15000000,
        credit: 0,
        balance: 65000000,
        reference: 'SAL-001',
    },
    {
        id: 5,
        date: '2025-11-07',
        account_code: '5001',
        account_name: 'ຄ່າເຊົ່າ (Rent Expense)',
        description: 'ຈ່າຍຄ່າເຊົ່າສຳນັກງານ (Office Rent)',
        debit: 5000000,
        credit: 0,
        balance: 5000000,
        reference: 'EXP-001',
    },
    {
        id: 6,
        date: '2025-11-07',
        account_code: '1001',
        account_name: 'ເງິນສົດ (Cash)',
        description: 'ຈ່າຍຄ່າເຊົ່າ (Rent Payment)',
        debit: 0,
        credit: 5000000,
        balance: 60000000,
        reference: 'EXP-001',
    },
    {
        id: 7,
        date: '2025-11-12',
        account_code: '5002',
        account_name: 'ເງິນເດືອນ (Salaries)',
        description: 'ຈ່າຍເງິນເດືອນພະນັກງານ (Staff Salaries)',
        debit: 12000000,
        credit: 0,
        balance: 12000000,
        reference: 'SAL-002',
    },
    {
        id: 8,
        date: '2025-11-12',
        account_code: '1001',
        account_name: 'ເງິນສົດ (Cash)',
        description: 'ຈ່າຍເງິນເດືອນ (Salary Payment)',
        debit: 0,
        credit: 12000000,
        balance: 48000000,
        reference: 'SAL-002',
    },
    {
        id: 9,
        date: '2025-11-15',
        account_code: '4001',
        account_name: 'ລາຍຮັບຈາກການຂາຍ (Sales Revenue)',
        description: 'ຂາຍສິນຄ້າ (Product Sales)',
        debit: 0,
        credit: 20000000,
        balance: 35000000,
        reference: 'SAL-003',
    },
    {
        id: 10,
        date: '2025-11-15',
        account_code: '1001',
        account_name: 'ເງິນສົດ (Cash)',
        description: 'ຮັບເງິນສົດຈາກການຂາຍ (Cash from Sales)',
        debit: 20000000,
        credit: 0,
        balance: 68000000,
        reference: 'SAL-003',
    },
    {
        id: 11,
        date: '2025-11-18',
        account_code: '5003',
        account_name: 'ຄ່າໄຟຟ້າ-ນ້ຳ (Utilities)',
        description: 'ຈ່າຍຄ່າໄຟຟ້າ ແລະ ນ້ຳປະປາ (Electricity & Water)',
        debit: 1500000,
        credit: 0,
        balance: 1500000,
        reference: 'UTL-001',
    },
    {
        id: 12,
        date: '2025-11-18',
        account_code: '1001',
        account_name: 'ເງິນສົດ (Cash)',
        description: 'ຈ່າຍຄ່າສາທາລະນູປະໂພກ (Utilities Payment)',
        debit: 0,
        credit: 1500000,
        balance: 66500000,
        reference: 'UTL-001',
    },
    {
        id: 13,
        date: '2025-11-22',
        account_code: '5004',
        account_name: 'ອຸປະກອນສຳນັກງານ (Office Supplies)',
        description: 'ຊື້ອຸປະກອນສຳນັກງານ (Purchase Supplies)',
        debit: 2500000,
        credit: 0,
        balance: 2500000,
        reference: 'SUP-001',
    },
    {
        id: 14,
        date: '2025-11-22',
        account_code: '1001',
        account_name: 'ເງິນສົດ (Cash)',
        description: 'ຈ່າຍຄ່າອຸປະກອນ (Supplies Payment)',
        debit: 0,
        credit: 2500000,
        balance: 64000000,
        reference: 'SUP-001',
    },
];

export const mockDailyLedgerAPI = {
    getEntries: async () => {
        return {
            data: mockDailyLedgerEntries,
            meta: {
                total: mockDailyLedgerEntries.length,
                total_debit: mockDailyLedgerEntries.reduce((sum, e) => sum + e.debit, 0),
                total_credit: mockDailyLedgerEntries.reduce((sum, e) => sum + e.credit, 0),
            },
        };
    },
};
