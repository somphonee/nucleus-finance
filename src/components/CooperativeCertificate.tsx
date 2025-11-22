import React from 'react';
import { CooperativeMockData } from '@/lib/mockData/cooperatives';

interface CooperativeCertificateProps {
    data: CooperativeMockData;
}

export const CooperativeCertificate: React.FC<CooperativeCertificateProps> = ({ data }) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-8 print:p-0">
            {/* Certificate Container */}
            <div className="border-8 border-green-600 rounded-lg p-8 relative bg-white">
                {/* Decorative Top Border */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-green-100 to-transparent opacity-30"></div>

                {/* Header with Logo */}
                <div className="text-center mb-6">
                    <div className="flex justify-center items-center mb-4">
                        {/* Lao Government Emblem Placeholder */}
                        <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">ລາວ</span>
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-green-700 mb-2">
                        ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ
                    </h1>
                    <h2 className="text-lg font-semibold text-green-600">
                        ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ
                    </h2>
                </div>

                {/* Certificate Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-700 mb-2">
                        ໃບທະບຽນສະຫະກອນ
                    </h1>
                    <p className="text-lg text-gray-700">
                        ເລກທີ່ {data.license_number}
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* Photo Section */}
                    <div className="col-span-1">
                        <div className="border-2 border-gray-300 p-2 bg-gray-50">
                            <div className="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center">
                                {data.chairman_photo ? (
                                    <img
                                        src={data.chairman_photo}
                                        alt="Chairman"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">Photo</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Information Section */}
                    <div className="col-span-2 space-y-3">
                        <div>
                            <p className="text-sm text-gray-600">ຊື່ສະຫະກອນ (ພາສາລາວ):</p>
                            <p className="font-semibold text-lg">{data.cooperative_name_lao}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">English Name: {data.cooperative_name_english}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">ປະທານ / ຜູ້ຈັດການ:</p>
                            <p className="font-semibold">{data.chairman_name}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">ທຶນຈົດທະບຽນ:</p>
                            <p className="font-semibold">
                                {new Intl.NumberFormat('en-US').format(data.registered_capital)} ກີບ
                            </p>
                            <p className="text-sm italic">({data.capital_in_words})</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">ທີ່ຢູ່ສໍານັກງານ:</p>
                            <p className="font-medium text-sm">{data.office_address}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">ເມືອງ / ແຂວງ:</p>
                            <p className="font-medium">{data.issuance_location}</p>
                        </div>
                    </div>
                </div>

                {/* QR Code Section */}
                <div className="absolute top-20 right-8">
                    <div className="w-24 h-24 border-2 border-gray-300 bg-white p-1">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-400">QR</span>
                        </div>
                    </div>
                </div>

                {/* Tax ID */}
                <div className="mb-6 text-center">
                    <p className="text-sm text-gray-600">
                        ເລກທີ່ປະຈໍາຕົວຜູ້ເສຍພາສີ (Tax ID):
                        <span className="font-mono font-semibold ml-2">
                            {data.tax_id.split('').map((digit, i) => (
                                <span key={i} className="inline-block w-6 h-6 border border-gray-400 text-center mx-0.5">
                                    {digit}
                                </span>
                            ))}
                        </span>
                    </p>
                </div>

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <div className="text-9xl font-bold text-green-600 transform rotate-[-30deg]">
                        ລາວ
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center border-t-2 border-green-600 pt-4">
                    <p className="text-sm text-gray-600">
                        ອອກໃຫ້ ນະຄອນຫຼວງວຽງຈັນ, ວັນທີ່ {new Date(data.issuance_date).toLocaleDateString('lo-LA')}
                    </p>
                    <p className="text-sm font-semibold text-green-700 mt-2">
                        ກົມສົ່ງເສີມສະຫະກອນ
                    </p>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-green-600 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-green-600 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-green-600 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-green-600 rounded-br-lg"></div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                }
            `}</style>
        </div>
    );
};
