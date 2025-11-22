// Mock data for Bankbook (ລາຍການທະນາຄານ)
export interface BankTransaction {
    id: number;
    date: string;
    description: string;
    category: string;
    deposit: number;
    withdrawal: number;
    balance: number;
    reference?: string;
    bank_name?: string;
}

export const mockBankTransactions: BankTransaction[] = [
    {
        id: 1,
        date: '2025-11-01',
        description: 'ຍອດຍົກມາ (Opening Balance)',
        category: 'ຍອດຍົກມາ',
        deposit: 100000000,
        withdrawal: 0,
        balance: 100000000,
        reference: 'OB-001',
        bank_name: 'BCEL',
    },
    {
        id: 2,
        date: '2025-11-03',
        description: 'ຮັບເງິນໂອນຈາກລູກຄ້າ (Customer Transfer)',
        category: 'ລາຍຮັບ',
        deposit: 25000000,
        withdrawal: 0,
        balance: 125000000,
        reference: 'TRF-001',
        bank_name: 'BCEL',
    },
    {
        id: 3,
        date: '2025-11-06',
        description: 'ຈ່າຍຄ່າສິນຄ້າໃຫ້ຜູ້ສະໜອງ (Supplier Payment)',
        category: 'ລາຍຈ່າຍ',
        deposit: 0,
        withdrawal: 15000000,
        balance: 110000000,
        reference: 'PAY-001',
        bank_name: 'BCEL',
    },
    {
        id: 4,
        date: '2025-11-09',
        description: 'ຮັບດອກເບ້ຍທະນາຄານ (Bank Interest)',
        category: 'ລາຍຮັບ',
        deposit: 500000,
        withdrawal: 0,
        balance: 110500000,
        reference: 'INT-001',
        bank_name: 'BCEL',
    },
    {
        id: 5,
        date: '2025-11-11',
        description: 'ຖອນເງິນສົດ (Cash Withdrawal)',
        category: 'ຖອນເງິນ',
        deposit: 0,
        withdrawal: 10000000,
        balance: 100500000,
        reference: 'WTH-001',
        bank_name: 'BCEL',
    },
    {
        id: 6,
        date: '2025-11-14',
        description: 'ຮັບເງິນໂອນຈາກລູກຄ້າ (Customer Transfer)',
        category: 'ລາຍຮັບ',
        deposit: 30000000,
        withdrawal: 0,
        balance: 130500000,
        reference: 'TRF-002',
        bank_name: 'BCEL',
    },
    {
        id: 7,
        date: '2025-11-17',
        description: 'ຈ່າຍຄ່າທຳນຽມທະນາຄານ (Bank Fees)',
        category: 'ລາຍຈ່າຍ',
        deposit: 0,
        withdrawal: 200000,
        balance: 130300000,
        reference: 'FEE-001',
        bank_name: 'BCEL',
    },
    {
        id: 8,
        date: '2025-11-19',
        description: 'ຝາກເງິນສົດ (Cash Deposit)',
        category: 'ຝາກເງິນ',
        deposit: 20000000,
        withdrawal: 0,
        balance: 150300000,
        reference: 'DEP-001',
        bank_name: 'BCEL',
    },
    {
        id: 9,
        date: '2025-11-22',
        description: 'ຈ່າຍຄ່າເຊົ່າຜ່ານທະນາຄານ (Rent Payment)',
        category: 'ລາຍຈ່າຍ',
        deposit: 0,
        withdrawal: 8000000,
        balance: 142300000,
        reference: 'RENT-001',
        bank_name: 'BCEL',
    },
];

export const mockBankbookAPI = {
    getTransactions: async () => {
        return {
            data: mockBankTransactions,
            meta: {
                total: mockBankTransactions.length,
                current_balance: mockBankTransactions[mockBankTransactions.length - 1].balance,
                total_deposit: mockBankTransactions.reduce((sum, t) => sum + t.deposit, 0),
                total_withdrawal: mockBankTransactions.reduce((sum, t) => sum + t.withdrawal, 0),
            },
        };
    },
};
