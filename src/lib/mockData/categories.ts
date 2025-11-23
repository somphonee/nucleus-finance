export interface Category {
    id: string;
    code: string;
    name: string;
    type: "income" | "expense";
    parentId?: string;
    isActive: boolean;
}

let mockCategories: Category[] = [
    { id: "1", code: "INC-001", name: "Member Savings", type: "income", isActive: true },
    { id: "2", code: "INC-002", name: "Loan Interest", type: "income", isActive: true },
    { id: "3", code: "INC-003", name: "Share Contributions", type: "income", isActive: true },
    { id: "4", code: "INC-004", name: "Investment Returns", type: "income", isActive: true },
    { id: "5", code: "EXP-001", name: "Staff Salaries", type: "expense", isActive: true },
    { id: "6", code: "EXP-002", name: "Office Rent", type: "expense", isActive: true },
    { id: "7", code: "EXP-003", name: "Utilities", type: "expense", isActive: true },
    { id: "8", code: "EXP-004", name: "Office Supplies", type: "expense", isActive: true },
    { id: "9", code: "EXP-005", name: "Administrative Expenses", type: "expense", isActive: true },
];

export const mockCategoriesAPI = {
    getCategories: async ({ page = 1, pageSize = 10, type = 'all' }) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        let filtered = [...mockCategories];

        if (type && type !== 'all') {
            filtered = filtered.filter(cat => cat.type === type);
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
    },

    createCategory: async (category: Omit<Category, 'id' | 'isActive'>) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newCategory: Category = {
            ...category,
            id: Date.now().toString(),
            isActive: true
        };
        mockCategories.push(newCategory);
        return { data: newCategory };
    },

    updateCategory: async (id: string, updates: Partial<Category>) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockCategories.findIndex(c => c.id === id);
        if (index !== -1) {
            mockCategories[index] = { ...mockCategories[index], ...updates };
            return { data: mockCategories[index] };
        }
        throw new Error('Category not found');
    },

    deleteCategory: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        mockCategories = mockCategories.filter(c => c.id !== id);
        return { success: true };
    }
};
