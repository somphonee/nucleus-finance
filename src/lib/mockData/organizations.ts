export interface Organization {
    id: string;
    code: string;
    name: string;
    province: string;
    address: string;
    phone: string;
    email: string;
    memberCount: number;
    isActive: boolean;
}

let mockOrganizations: Organization[] = [
    {
        id: "1",
        code: "ORG-VTE",
        name: "Vientiane Capital Office",
        province: "Vientiane Capital",
        address: "Main Street, Chanthabouly District",
        phone: "+856 21 123456",
        email: "vte@example.la",
        memberCount: 1250,
        isActive: true,
    },
    {
        id: "2",
        code: "ORG-LPB",
        name: "Luang Prabang Office",
        province: "Luang Prabang",
        address: "Heritage Avenue, Luang Prabang",
        phone: "+856 71 234567",
        email: "lpb@example.la",
        memberCount: 890,
        isActive: true,
    },
    {
        id: "3",
        code: "ORG-SVK",
        name: "Savannakhet Office",
        province: "Savannakhet",
        address: "Commercial Road, Savannakhet",
        phone: "+856 41 345678",
        email: "svk@example.la",
        memberCount: 1050,
        isActive: true,
    },
    {
        id: "4",
        code: "ORG-CPV",
        name: "Champasak Office",
        province: "Champasak",
        address: "Provincial Center, Pakse",
        phone: "+856 31 456789",
        email: "cpv@example.la",
        memberCount: 780,
        isActive: true,
    },
    {
        id: "5",
        code: "ORG-KHM",
        name: "Khammouane Office",
        province: "Khammouane",
        address: "Thakhek District Center",
        phone: "+856 51 567890",
        email: "khm@example.la",
        memberCount: 650,
        isActive: true,
    },
    {
        id: "6",
        code: "ORG-BOK",
        name: "Bokeo Office",
        province: "Bokeo",
        address: "Houayxay District Center",
        phone: "+856 84 678901",
        email: "bok@example.la",
        memberCount: 420,
        isActive: true,
    },
];

export const mockOrganizationsAPI = {
    getOrganizations: async ({ page = 1, pageSize = 10, search = '' }) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        let filtered = [...mockOrganizations];

        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter(org =>
                org.name.toLowerCase().includes(term) ||
                org.code.toLowerCase().includes(term) ||
                org.province.toLowerCase().includes(term)
            );
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

    createOrganization: async (org: Omit<Organization, 'id' | 'memberCount' | 'isActive'>) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newOrg: Organization = {
            ...org,
            id: Date.now().toString(),
            memberCount: 0,
            isActive: true
        };
        mockOrganizations.push(newOrg);
        return { data: newOrg };
    },

    updateOrganization: async (id: string, updates: Partial<Organization>) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockOrganizations.findIndex(o => o.id === id);
        if (index !== -1) {
            mockOrganizations[index] = { ...mockOrganizations[index], ...updates };
            return { data: mockOrganizations[index] };
        }
        throw new Error('Organization not found');
    },

    deleteOrganization: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        mockOrganizations = mockOrganizations.filter(o => o.id !== id);
        return { success: true };
    }
};
