import { UserRole } from "@/contexts/AuthContext";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: 'active' | 'inactive';
    createdAt: string;
    lastLogin?: string;
    allowedMenus?: string[];
}

let mockUsers: User[] = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@company.com',
        role: 'admin',
        status: 'active',
        createdAt: '2024-01-01',
        lastLogin: '2024-03-15'
    },
    {
        id: '2',
        name: 'Regular User',
        email: 'user@company.com',
        role: 'user',
        status: 'active',
        createdAt: '2024-01-15',
        lastLogin: '2024-03-14'
    },
    {
        id: '3',
        name: 'Province User',
        email: 'userprovince@company.com',
        role: 'userprovince',
        status: 'active',
        createdAt: '2024-02-01',
        lastLogin: '2024-03-13'
    },
    {
        id: '4',
        name: 'John Doe',
        email: 'john.doe@company.com',
        role: 'user',
        status: 'inactive',
        createdAt: '2024-02-15'
    },
    {
        id: '5',
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        role: 'user',
        status: 'active',
        createdAt: '2024-02-20',
        lastLogin: '2024-03-10'
    },
    {
        id: '6',
        name: 'Bob Johnson',
        email: 'bob.johnson@company.com',
        role: 'user',
        status: 'active',
        createdAt: '2024-02-25',
        lastLogin: '2024-03-12'
    }
];

export const mockUsersAPI = {
    getUsers: async ({ page = 1, pageSize = 10, search = '', role = 'all' }) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        let filtered = [...mockUsers];

        // Search filter
        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term)
            );
        }

        // Role filter
        if (role && role !== 'all') {
            filtered = filtered.filter(user => user.role === role);
        }

        // Pagination
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

    createUser: async (user: Omit<User, 'id' | 'createdAt'>) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newUser: User = {
            ...user,
            id: Date.now().toString(),
            createdAt: new Date().toISOString().split('T')[0]
        };
        mockUsers.push(newUser);
        return { data: newUser };
    },

    updateUser: async (id: string, updates: Partial<User>) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockUsers.findIndex(u => u.id === id);
        if (index !== -1) {
            mockUsers[index] = { ...mockUsers[index], ...updates };
            return { data: mockUsers[index] };
        }
        throw new Error('User not found');
    },

    deleteUser: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        mockUsers = mockUsers.filter(u => u.id !== id);
        return { success: true };
    }
};
