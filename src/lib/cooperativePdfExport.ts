import jsPDF from 'jspdf';
import emblemImage from '@/assets/emblem-of-laos.png';
import watermarkImage from '@/assets/watermark.jpg';

interface CooperativeData {
  licenseNumber: string;
  registrationDate: string;
  applicationDate: string;
  cooperativeNameLao: string;
  cooperativeNameEnglish: string;
  cooperativeType: string;
  chairmanName: string;
  chairmanNationality: string;
  registeredCapital: number;
  capitalInWords: string;
  officeAddress: string;
  taxId: string;
  issuanceLocation: string;
  issuanceDate: string;
  numberOfMembers: number;
  cooperativePurpose: string;
  supervisingAuthority: string;
  chairmanPhoto?: string;
}

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const exportCooperativeCertificate = async (
  data: CooperativeData,
  language: 'en' | 'lo'
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Add watermark as background
  try {
    const watermark = await loadImage(watermarkImage);
    doc.addImage(watermark, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'NONE');
  } catch (error) {
    console.error('Failed to load watermark:', error);
  }

  // Add emblem at top center
  try {
    const emblem = await loadImage(emblemImage);
    const emblemSize = 30;
    doc.addImage(emblem, 'PNG', (pageWidth - emblemSize) / 2, 15, emblemSize, emblemSize);
  } catch (error) {
    console.error('Failed to load emblem:', error);
  }

  // Header text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(
    language === 'lo' 
      ? 'ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ'
      : 'Lao People\'s Democratic Republic',
    pageWidth / 2,
    50,
    { align: 'center' }
  );

  doc.setFontSize(10);
  doc.text(
    language === 'lo'
      ? 'ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ'
      : 'Peace, Independence, Democracy, Unity and Prosperity',
    pageWidth / 2,
    56,
    { align: 'center' }
  );

  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(
    language === 'lo' 
      ? 'ໃບທະບຽນສະຫະກອນ'
      : 'COOPERATIVE REGISTRATION CERTIFICATE',
    pageWidth / 2,
    70,
    { align: 'center' }
  );

  // License number
  doc.setFontSize(12);
  doc.text(
    `${language === 'lo' ? 'ເລກທີ:' : 'License No:'} ${data.licenseNumber}`,
    pageWidth / 2,
    78,
    { align: 'center' }
  );

  // Content
  let y = 90;
  const leftMargin = 25;
  const rightMargin = pageWidth - 25;
  const lineHeight = 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  // Registration date
  doc.text(
    `${language === 'lo' ? 'ວັນທີລົງທະບຽນ:' : 'Registration Date:'} ${data.registrationDate}`,
    leftMargin,
    y
  );
  y += lineHeight;

  // Application date
  doc.text(
    `${language === 'lo' ? 'ວັນທີຍື່ນຄໍາຮ້ອງ:' : 'Application Date:'} ${data.applicationDate}`,
    leftMargin,
    y
  );
  y += lineHeight + 3;

  // Cooperative names
  doc.setFont('helvetica', 'bold');
  doc.text(
    `${language === 'lo' ? 'ຊື່ສະຫະກອນ (ລາວ):' : 'Cooperative Name (Lao):'}`,
    leftMargin,
    y
  );
  doc.setFont('helvetica', 'normal');
  y += lineHeight;
  doc.text(data.cooperativeNameLao, leftMargin + 5, y);
  y += lineHeight;

  doc.setFont('helvetica', 'bold');
  doc.text(
    `${language === 'lo' ? 'ຊື່ສະຫະກອນ (ອັງກິດ):' : 'Cooperative Name (English):'}`,
    leftMargin,
    y
  );
  doc.setFont('helvetica', 'normal');
  y += lineHeight;
  doc.text(data.cooperativeNameEnglish, leftMargin + 5, y);
  y += lineHeight + 3;

  // Type
  doc.text(
    `${language === 'lo' ? 'ປະເພດສະຫະກອນ:' : 'Cooperative Type:'} ${data.cooperativeType}`,
    leftMargin,
    y
  );
  y += lineHeight;

  // Chairman
  doc.text(
    `${language === 'lo' ? 'ຊື່ປະທານ:' : 'Chairman:'} ${data.chairmanName}`,
    leftMargin,
    y
  );
  y += lineHeight;

  doc.text(
    `${language === 'lo' ? 'ສັນຊາດ:' : 'Nationality:'} ${data.chairmanNationality}`,
    leftMargin,
    y
  );
  y += lineHeight + 3;

  // Capital
  doc.text(
    `${language === 'lo' ? 'ທຶນຈົດທະບຽນ:' : 'Registered Capital:'} ${data.registeredCapital.toLocaleString()} Kip`,
    leftMargin,
    y
  );
  y += lineHeight;

  const capitalWords = doc.splitTextToSize(`(${data.capitalInWords})`, rightMargin - leftMargin - 5);
  doc.text(capitalWords, leftMargin + 5, y);
  y += lineHeight * capitalWords.length + 3;

  // Address
  doc.setFont('helvetica', 'bold');
  doc.text(
    `${language === 'lo' ? 'ທີ່ຕັ້ງສໍານັກງານ:' : 'Office Address:'}`,
    leftMargin,
    y
  );
  doc.setFont('helvetica', 'normal');
  y += lineHeight;
  const addressLines = doc.splitTextToSize(data.officeAddress, rightMargin - leftMargin - 5);
  doc.text(addressLines, leftMargin + 5, y);
  y += lineHeight * addressLines.length + 3;

  // Tax ID
  doc.text(
    `${language === 'lo' ? 'ເລກປະຈໍາຕົວຜູ້ເສຍອາກອນ:' : 'Tax ID:'} ${data.taxId}`,
    leftMargin,
    y
  );
  y += lineHeight;

  // Number of members
  doc.text(
    `${language === 'lo' ? 'ຈໍານວນສະມາຊິກ:' : 'Number of Members:'} ${data.numberOfMembers}`,
    leftMargin,
    y
  );
  y += lineHeight + 3;

  // Purpose
  doc.setFont('helvetica', 'bold');
  doc.text(
    `${language === 'lo' ? 'ຈຸດປະສົງ:' : 'Purpose:'}`,
    leftMargin,
    y
  );
  doc.setFont('helvetica', 'normal');
  y += lineHeight;
  const purposeLines = doc.splitTextToSize(data.cooperativePurpose, rightMargin - leftMargin - 5);
  doc.text(purposeLines, leftMargin + 5, y);
  y += lineHeight * purposeLines.length + 3;

  // Supervising authority
  doc.text(
    `${language === 'lo' ? 'ອົງການຄຸ້ມຄອງ:' : 'Supervising Authority:'} ${data.supervisingAuthority}`,
    leftMargin,
    y
  );
  y += lineHeight + 5;

  // Chairman photo if provided
  if (data.chairmanPhoto) {
    try {
      const photo = await loadImage(data.chairmanPhoto);
      const photoSize = 30;
      doc.addImage(photo, 'JPEG', rightMargin - photoSize, y, photoSize, photoSize);
    } catch (error) {
      console.error('Failed to load chairman photo:', error);
    }
  }

  // Signature section
  y = pageHeight - 40;
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${language === 'lo' ? 'ທີ່' : 'At'} ${data.issuanceLocation}, ${language === 'lo' ? 'ວັນທີ' : 'Date'} ${data.issuanceDate}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );

  y += lineHeight + 5;
  doc.setFont('helvetica', 'bold');
  doc.text(
    language === 'lo' 
      ? 'ເຈົ້າໜ້າທີ່ທະບຽນສະຫະກອນ'
      : 'Cooperative Registration Officer',
    pageWidth / 2,
    y,
    { align: 'center' }
  );

  // Save PDF
  const filename = language === 'lo' 
    ? `ໃບທະບຽນສະຫະກອນ-${data.licenseNumber}.pdf`
    : `Cooperative-Certificate-${data.licenseNumber}.pdf`;
  
  doc.save(filename);
};
