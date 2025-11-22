// Mock data for Cooperative Registration System
// File: src/lib/mockData/cooperatives.ts

import pdf1 from '@/assets/1.pdf';
import pdf2 from '@/assets/2.pdf';

export interface CooperativeMockData {
    id: number;
    license_number: string;
    registration_date: string;
    application_date: string;
    cooperative_name_lao: string;
    cooperative_name_english: string;
    cooperative_type: string;
    chairman_name: string;
    chairman_nationality: string;
    registered_capital: number;
    capital_in_words: string;
    office_address: string;
    tax_id: string;
    issuance_location: string;
    issuance_date: string;
    number_of_members: number;
    cooperative_purpose: string;
    supervising_authority: string;
    chairman_photo?: string;
    status: 'active' | 'pending' | 'inactive';
    created_at: string;
    updated_at: string;
}

let mockCooperativesData: CooperativeMockData[] = [
    {
        id: 1,
        license_number: "020555/COOP",
        registration_date: "2023-03-15",
        application_date: "2023-02-20",
        cooperative_name_lao: "ສະຫະກອນ ການເງິນ ຄວີນແຄສ",
        cooperative_name_english: "Queen Cash Financial Cooperative",
        cooperative_type: "Financial Cooperative",
        chairman_name: "Mrs. Vongsakone Senaphon",
        chairman_nationality: "Lao",
        registered_capital: 100000000000,
        capital_in_words: "One Hundred Billion Kip",
        office_address: "House No. 88, Unit 28, Ban Thaoubok, Sikhottabong District, Vientiane Capital",
        tax_id: "383773265000",
        issuance_location: "ນະຄອນຫຼວງວຽງຈັນ",
        issuance_date: "2023-03-20",
        number_of_members: 120,
        cooperative_purpose: "Providing financial services and promoting economic welfare for members through savings, loans, and investment opportunities",
        supervising_authority: "Bank of the Lao PDR",
        status: "active",
        created_at: "2023-03-15T08:30:00Z",
        updated_at: "2023-03-15T08:30:00Z"
    },
    {
        id: 2,
        license_number: "020556/COOP",
        registration_date: "2023-04-10",
        application_date: "2023-03-25",
        cooperative_name_lao: "ສະຫະກອນ ກະສິກໍາ ສີໂຄດຕະບອງ",
        cooperative_name_english: "Sikhottabong Agricultural Cooperative",
        cooperative_type: "Agricultural Cooperative",
        chairman_name: "Mr. Bounthong Phommalath",
        chairman_nationality: "Lao",
        registered_capital: 50000000000,
        capital_in_words: "Fifty Billion Kip",
        office_address: "Village 12, Ban Nongbone, Sikhottabong District, Vientiane Capital",
        tax_id: "383773266000",
        issuance_location: "ນະຄອນຫຼວງວຽງຈັນ",
        issuance_date: "2023-04-15",
        number_of_members: 85,
        cooperative_purpose: "Supporting agricultural production, marketing, and distribution of farm products for member farmers",
        supervising_authority: "Ministry of Agriculture and Forestry",
        status: "active",
        created_at: "2023-04-10T09:15:00Z",
        updated_at: "2023-04-10T09:15:00Z"
    },
    {
        id: 3,
        license_number: "020557/COOP",
        registration_date: "2023-05-22",
        application_date: "2023-05-05",
        cooperative_name_lao: "ສະຫະກອນ ຜູ້ບໍລິໂພກ ສີສັດຕະນາກ",
        cooperative_name_english: "Sisattanak Consumer Cooperative",
        cooperative_type: "Consumer Cooperative",
        chairman_name: "Ms. Khamphone Rattanavong",
        chairman_nationality: "Lao",
        registered_capital: 30000000000,
        capital_in_words: "Thirty Billion Kip",
        office_address: "Block 5, Unit 19, Ban Sibounheuang, Sisattanak District, Vientiane Capital",
        tax_id: "383773267000",
        issuance_location: "ນະຄອນຫຼວງວຽງຈັນ",
        issuance_date: "2023-05-25",
        number_of_members: 65,
        cooperative_purpose: "Providing affordable consumer goods and services to members at competitive prices",
        supervising_authority: "Ministry of Industry and Commerce",
        status: "active",
        created_at: "2023-05-22T10:45:00Z",
        updated_at: "2023-05-22T10:45:00Z"
    },
    {
        id: 4,
        license_number: "020558/COOP",
        registration_date: "2023-06-18",
        application_date: "2023-06-01",
        cooperative_name_lao: "ສະຫະກອນ ຫັດຖະກໍາ ຊຽງທອງ",
        cooperative_name_english: "Xaythani Handicraft Cooperative",
        cooperative_type: "Producer Cooperative",
        chairman_name: "Mrs. Somphone Chanthaboun",
        chairman_nationality: "Lao",
        registered_capital: 20000000000,
        capital_in_words: "Twenty Billion Kip",
        office_address: "Village 8, Ban Phonphanao, Xaythani District, Vientiane Capital",
        tax_id: "383773268000",
        issuance_location: "ນະຄອນຫຼວງວຽງຈັນ",
        issuance_date: "2023-06-20",
        number_of_members: 45,
        cooperative_purpose: "Promoting traditional handicrafts, providing training, and marketing handmade products locally and internationally",
        supervising_authority: "Ministry of Industry and Commerce",
        status: "active",
        created_at: "2023-06-18T11:20:00Z",
        updated_at: "2023-06-18T11:20:00Z"
    },
    {
        id: 5,
        license_number: "020559/COOP",
        registration_date: "2023-07-30",
        application_date: "2023-07-10",
        cooperative_name_lao: "ສະຫະກອນ ປະມົງ ຈໍາປາສັກ",
        cooperative_name_english: "Champasak Fishery Cooperative",
        cooperative_type: "Fishery Cooperative",
        chairman_name: "Mr. Vilay Keomany",
        chairman_nationality: "Lao",
        registered_capital: 40000000000,
        capital_in_words: "Forty Billion Kip",
        office_address: "Village 3, Ban Wattay, Chanthabuly District, Vientiane Capital",
        tax_id: "383773269000",
        issuance_location: "ນະຄອນຫຼວງວຽງຈັນ",
        issuance_date: "2023-08-02",
        number_of_members: 72,
        cooperative_purpose: "Managing fishery resources, providing equipment and training to members, and marketing fish products",
        supervising_authority: "Ministry of Agriculture and Forestry",
        status: "active",
        created_at: "2023-07-30T14:30:00Z",
        updated_at: "2023-07-30T14:30:00Z"
    },
    {
        id: 6,
        license_number: "020560/COOP",
        registration_date: "2023-08-25",
        application_date: "2023-08-05",
        cooperative_name_lao: "ສະຫະກອນ ການຂົນສົ່ງ ນາຊາຍທອງ",
        cooperative_name_english: "Nasaithong Transport Cooperative",
        cooperative_type: "Transport Cooperative",
        chairman_name: "Mr. Khamla Sounthavong",
        chairman_nationality: "Lao",
        registered_capital: 60000000000,
        capital_in_words: "Sixty Billion Kip",
        office_address: "Km 6, Thadeua Road, Hadxaifong District, Vientiane Capital",
        tax_id: "383773270000",
        issuance_location: "ນະຄອນຫຼວງວຽງຈັນ",
        issuance_date: "2023-08-28",
        number_of_members: 95,
        cooperative_purpose: "Providing transportation services, vehicle maintenance, and supporting members in the transport sector",
        supervising_authority: "Ministry of Public Works and Transport",
        status: "active",
        created_at: "2023-08-25T09:00:00Z",
        updated_at: "2023-08-25T09:00:00Z"
    },
    {
        id: 7,
        license_number: "020561/COOP",
        registration_date: "2023-09-15",
        application_date: "2023-08-30",
        cooperative_name_lao: "ສະຫະກອນ ທຸລະກິດຊຸມຊົນ ແສນສະຫວ່າງ",
        cooperative_name_english: "Saensavang Community Enterprise Cooperative",
        cooperative_type: "Multi-purpose Cooperative",
        chairman_name: "Mrs. Thongdam Keobounphan",
        chairman_nationality: "Lao",
        registered_capital: 35000000000,
        capital_in_words: "Thirty-Five Billion Kip",
        office_address: "Village 15, Ban Nongnieng, Xaysettha District, Vientiane Capital",
        tax_id: "383773271000",
        issuance_location: "ນະຄອນຫຼວງວຽງຈັນ",
        issuance_date: "2023-09-18",
        number_of_members: 110,
        cooperative_purpose: "Supporting community businesses through financial services, training, and market access for local entrepreneurs",
        supervising_authority: "Ministry of Industry and Commerce",
        status: "pending",
        created_at: "2023-09-15T13:45:00Z",
        updated_at: "2023-09-15T13:45:00Z"
    },
    {
        id: 8,
        license_number: "020562/COOP",
        registration_date: "2023-10-05",
        application_date: "2023-09-20",
        cooperative_name_lao: "ສະຫະກອນ ເຄື່ອງນຸ່ງຫົ່ມ ພູວຽງ",
        cooperative_name_english: "Phouviang Textile Cooperative",
        cooperative_type: "Producer Cooperative",
        chairman_name: "Ms. Vanhsy Sayarath",
        chairman_nationality: "Lao",
        registered_capital: 25000000000,
        capital_in_words: "Twenty-Five Billion Kip",
        office_address: "Village 22, Ban Phonetan, Saysettha District, Vientiane Capital",
        tax_id: "383773272000",
        issuance_location: "ນະຄອນຫຼວງວຽງຈັນ",
        issuance_date: "2023-10-08",
        number_of_members: 58,
        cooperative_purpose: "Manufacturing and marketing traditional Lao textiles, providing training in weaving techniques",
        supervising_authority: "Ministry of Industry and Commerce",
        status: "active",
        created_at: "2023-10-05T10:15:00Z",
        updated_at: "2023-10-05T10:15:00Z"
    }
];

// Mock API functions
export const mockCooperativesAPI = {
    getCertificates: async ({ page = 1, page_size = 10, search = '' }) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filtered = [...mockCooperativesData];

        // Search filter
        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter(coop =>
                coop.license_number.toLowerCase().includes(term) ||
                coop.cooperative_name_lao.toLowerCase().includes(term) ||
                coop.cooperative_name_english.toLowerCase().includes(term) ||
                coop.chairman_name.toLowerCase().includes(term)
            );
        }

        // Pagination
        const startIndex = (page - 1) * page_size;
        const endIndex = startIndex + page_size;
        const paginatedData = filtered.slice(startIndex, endIndex);

        return {
            data: paginatedData,
            meta: {
                page,
                page_size,
                total: filtered.length,
                total_pages: Math.ceil(filtered.length / page_size)
            }
        };
    },

    getCertificateById: async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const certificate = mockCooperativesData.find(c => c.id === id);
        if (!certificate) {
            throw new Error('Certificate not found');
        }
        return { data: certificate };
    },

    createCertificate: async (data: any) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newId = Math.max(...mockCooperativesData.map(c => c.id)) + 1;
        const newCertificate: CooperativeMockData = {
            id: newId,
            ...data,
            status: 'active' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        mockCooperativesData.push(newCertificate);
        return { data: newCertificate };
    },

    updateCertificate: async (id: number, data: any) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockCooperativesData.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Certificate not found');
        }
        mockCooperativesData[index] = {
            ...mockCooperativesData[index],
            ...data,
            updated_at: new Date().toISOString()
        };
        return { data: mockCooperativesData[index] };
    },

    deleteCertificate: async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockCooperativesData.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Certificate not found');
        }
        mockCooperativesData.splice(index, 1);
        return { success: true };
    },

    downloadPDF: async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Use the imported PDF files
        // For demonstration, alternate between pdf1 and pdf2 based on ID
        const pdfUrl = id % 2 === 0 ? pdf2 : pdf1;

        try {
            const response = await fetch(pdfUrl);
            return await response.blob();
        } catch (error) {
            console.error('Error fetching PDF:', error);
            // Fallback to text blob if fetch fails
            const content = `Mock PDF for Certificate ID: ${id}`;
            return new Blob([content], { type: 'application/pdf' });
        }
    }
};

// Helper functions
export const getCooperativeById = (id: number): CooperativeMockData | undefined => {
    return mockCooperativesData.find(coop => coop.id === id);
};

export const searchCooperatives = (searchTerm: string): CooperativeMockData[] => {
    if (!searchTerm) return mockCooperativesData;

    const term = searchTerm.toLowerCase();
    return mockCooperativesData.filter(coop =>
        coop.license_number.toLowerCase().includes(term) ||
        coop.cooperative_name_lao.toLowerCase().includes(term) ||
        coop.cooperative_name_english.toLowerCase().includes(term) ||
        coop.chairman_name.toLowerCase().includes(term)
    );
};

export const filterByStatus = (status: 'active' | 'pending' | 'inactive'): CooperativeMockData[] => {
    return mockCooperativesData.filter(coop => coop.status === status);
};

export const getAllCooperatives = (): CooperativeMockData[] => {
    return [...mockCooperativesData];
};