// Mock data for Card Transactions (ປະຫວັດລາຍການບັດ)
export interface CardTransaction {
    id: number;
    date: string;
    time: string;
    description: string;
    merchant: string;
    category: string;
    amount: number;
    card_type: string;
    card_last4: string;
    status: 'completed' | 'pending' | 'failed';
}

export const mockCardTransactions: CardTransaction[] = [
    {
        id: 1,
        date: '2025-11-02',
        time: '09:30:00',
        description: 'ຊື້ອຸປະກອນສຳນັກງານ (Office Supplies)',
        merchant: 'ຮ້ານອຸປະກອນສຳນັກງານ ABC',
        category: 'ລາຍຈ່າຍ',
        amount: 1500000,
        card_type: 'VISA',
        card_last4: '4532',
        status: 'completed',
    },
    {
        id: 2,
        date: '2025-11-05',
        time: '14:15:00',
        description: 'ຈ່າຍຄ່າອາຫານກາງວັນ (Lunch)',
        merchant: 'ຮ້ານອາຫານ ສະບາຍດີ',
        category: 'ລາຍຈ່າຍ',
        amount: 450000,
        card_type: 'VISA',
        card_last4: '4532',
        status: 'completed',
    },
    {
        id: 3,
        date: '2025-11-08',
        time: '10:45:00',
        description: 'ຊື້ນ້ຳມັນລົດ (Fuel)',
        merchant: 'ສະຖານີນ້ຳມັນ PTT',
        category: 'ລາຍຈ່າຍ',
        amount: 800000,
        card_type: 'VISA',
        card_last4: '4532',
        status: 'completed',
    },
    {
        id: 4,
        date: '2025-11-10',
        time: '16:20:00',
        description: 'ຊື້ອຸປະກອນຄອມພິວເຕີ (Computer Equipment)',
        merchant: 'ຮ້ານຄອມພິວເຕີ TechMart',
        category: 'ລາຍຈ່າຍ',
        amount: 3500000,
        card_type: 'VISA',
        card_last4: '4532',
        status: 'completed',
    },
    {
        id: 5,
        date: '2025-11-13',
        time: '11:00:00',
        description: 'ຈ່າຍຄ່າອິນເຕີເນັດ (Internet Service)',
        merchant: 'Unitel',
        category: 'ລາຍຈ່າຍ',
        amount: 600000,
        card_type: 'VISA',
        card_last4: '4532',
        status: 'completed',
    },
    {
        id: 6,
        date: '2025-11-15',
        time: '13:30:00',
        description: 'ຊື້ເຄື່ອງໃຊ້ສຳນັກງານ (Office Furniture)',
        merchant: 'ຮ້ານເຟີນີເຈີ Modern',
        category: 'ລາຍຈ່າຍ',
        amount: 5000000,
        card_type: 'VISA',
        card_last4: '4532',
        status: 'completed',
    },
    {
        id: 7,
        date: '2025-11-18',
        time: '09:00:00',
        description: 'ຈ່າຍຄ່າບໍລິການ Cloud (Cloud Service)',
        merchant: 'AWS',
        category: 'ລາຍຈ່າຍ',
        amount: 2000000,
        card_type: 'VISA',
        card_last4: '4532',
        status: 'completed',
    },
    {
        id: 8,
        date: '2025-11-20',
        time: '15:45:00',
        description: 'ຊື້ເຄື່ອງພິມ (Printer)',
        merchant: 'ຮ້ານອຸປະກອນສຳນັກງານ XYZ',
        category: 'ລາຍຈ່າຍ',
        amount: 4500000,
        card_type: 'VISA',
        card_last4: '4532',
        status: 'completed',
    },
    {
        id: 9,
        date: '2025-11-22',
        time: '10:30:00',
        description: 'ຊື້ເຄື່ອງຂຽນ (Stationery)',
        merchant: 'ຮ້ານເຄື່ອງຂຽນ BookPlus',
        category: 'ລາຍຈ່າຍ',
        amount: 750000,
        card_type: 'VISA',
        card_last4: '4532',
        status: 'pending',
    },
];

export const mockCardTransactionsAPI = {
    getTransactions: async () => {
        return {
            data: mockCardTransactions,
            meta: {
                total: mockCardTransactions.length,
                total_amount: mockCardTransactions.reduce((sum, t) => sum + t.amount, 0),
                completed: mockCardTransactions.filter(t => t.status === 'completed').length,
                pending: mockCardTransactions.filter(t => t.status === 'pending').length,
            },
        };
    },
};
