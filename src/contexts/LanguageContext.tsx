import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'lo';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.cashManagement': 'Cash Management',
    'nav.memberSavings': 'Member Savings',
    'nav.sharesTracking': 'Shares Tracking',
    'nav.loanManagement': 'Loan Management',
    'nav.generalLedger': 'General Ledger',
    'nav.reports': 'Reports & Analytics',
    
    // Dashboard
    'dashboard.title': 'Financial Dashboard',
    'dashboard.totalCash': 'Total Cash',
    'dashboard.totalSavings': 'Total Savings',
    'dashboard.totalShares': 'Total Shares',
    'dashboard.activeLoans': 'Active Loans',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.addTransaction': 'Add Transaction',
    'dashboard.newMember': 'New Member',
    'dashboard.generateReport': 'Generate Report',
    'dashboard.recentTransactions': 'Recent Transactions',
    
    // Common
    'common.amount': 'Amount',
    'common.date': 'Date',
    'common.description': 'Description',
    'common.category': 'Category',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.total': 'Total',
    'common.balance': 'Balance',
    'common.member': 'Member',
    'common.name': 'Name',
    'common.id': 'ID',
    'common.type': 'Type',
    
    // Cash Management
    'cash.title': 'Cash Management',
    'cash.addTransaction': 'Add Cash Transaction',
    'cash.inflow': 'Cash Inflow',
    'cash.outflow': 'Cash Outflow',
    'cash.runningBalance': 'Running Balance',
    
    // Member Savings
    'savings.title': 'Member Savings',
    'savings.addMember': 'Add New Member',
    'savings.membershipNumber': 'Membership Number',
    'savings.deposit': 'Deposit',
    'savings.withdrawal': 'Withdrawal',
    'savings.carriedForward': 'Carried Forward',
    'savings.monthlyDeposits': 'Monthly Deposits',
    
    // Shares
    'shares.title': 'Shares Tracking',
    'shares.addContribution': 'Add Share Contribution',
    'shares.ownership': 'Ownership',
    'shares.contribution': 'Contribution',
    
    // Loans
    'loans.title': 'Loan Management',
    'loans.addLoan': 'Add New Loan',
    'loans.loanId': 'Loan ID',
    'loans.repayment': 'Repayment',
    'loans.remaining': 'Remaining',
    'loans.interest': 'Interest',
    'loans.issued': 'Issued',
    
    // General Ledger
    'ledger.title': 'General Ledger',
    'ledger.cash': 'Cash',
    'ledger.capitalFund': 'Capital Fund',
    'ledger.shares': 'Shares',
    'ledger.loans': 'Loans',
    'ledger.income': 'Income',
    'ledger.expenditure': 'Expenditure',
    
    // Reports
    'reports.title': 'Reports & Analytics',
    'reports.monthlyIncome': 'Monthly Income Report',
    'reports.yearlyIncome': 'Yearly Income Report',
    'reports.monthlyExpenses': 'Monthly Expenditure Report',
    'reports.yearlyExpenses': 'Yearly Expenditure Report',
    'reports.incomeVsExpenses': 'Income vs Expenses',
  },
  lo: {
    // Navigation
    'nav.dashboard': 'ໜ້າຫຼັກ',
    'nav.cashManagement': 'ການຈັດການເງິນສົດ',
    'nav.memberSavings': 'ເງິນຝາກສະມາຊິກ',
    'nav.sharesTracking': 'ການຕິດຕາມຮຸ້ນ',
    'nav.loanManagement': 'ການຈັດການກູ້ຢຶມ',
    'nav.generalLedger': 'ບັນຊີລາຍການທົ່ວໄປ',
    'nav.reports': 'ລາຍງານ ແລະ ການວິເຄາະ',
    
    // Dashboard
    'dashboard.title': 'ໜ້າຫຼັກການເງິນ',
    'dashboard.totalCash': 'ເງິນສົດລວມ',
    'dashboard.totalSavings': 'ເງິນຝາກລວມ',
    'dashboard.totalShares': 'ຮຸ້ນລວມ',
    'dashboard.activeLoans': 'ເງິນກູ້ທີ່ໃຊ້ໄດ້',
    'dashboard.quickActions': 'ການກະທຳດ່ວນ',
    'dashboard.addTransaction': 'ເພີ່ມລາຍການ',
    'dashboard.newMember': 'ສະມາຊິກໃໝ່',
    'dashboard.generateReport': 'ສ້າງລາຍງານ',
    'dashboard.recentTransactions': 'ລາຍການລ່າສຸດ',
    
    // Common
    'common.amount': 'ຈຳນວນເງິນ',
    'common.date': 'ວັນທີ',
    'common.description': 'ລາຍລະອຽດ',
    'common.category': 'ປະເພດ',
    'common.add': 'ເພີ່ມ',
    'common.edit': 'ແກ້ໄຂ',
    'common.delete': 'ລົບ',
    'common.save': 'ບັນທຶກ',
    'common.cancel': 'ຍົກເລີກ',
    'common.search': 'ຄົ້ນຫາ',
    'common.filter': 'ກັ່ນຕອງ',
    'common.export': 'ສົ່ງອອກ',
    'common.import': 'ນຳເຂົ້າ',
    'common.total': 'ລວມ',
    'common.balance': 'ຍອດເຫຼືອ',
    'common.member': 'ສະມາຊິກ',
    'common.name': 'ຊື່',
    'common.id': 'ລະຫັດ',
    'common.type': 'ປະເພດ',
    
    // Cash Management
    'cash.title': 'ການຈັດການເງິນສົດ',
    'cash.addTransaction': 'ເພີ່ມລາຍການເງິນສົດ',
    'cash.inflow': 'ເງິນເຂົ້າ',
    'cash.outflow': 'ເງິນອອກ',
    'cash.runningBalance': 'ຍອດເຫຼືອປະຈຳ',
    
    // Member Savings
    'savings.title': 'ເງິນຝາກສະມາຊິກ',
    'savings.addMember': 'ເພີ່ມສະມາຊິກໃໝ່',
    'savings.membershipNumber': 'ເລກທີສະມາຊິກ',
    'savings.deposit': 'ຝາກເງິນ',
    'savings.withdrawal': 'ຖອນເງິນ',
    'savings.carriedForward': 'ຍອດຍົກມາ',
    'savings.monthlyDeposits': 'ເງິນຝາກລາຍເດືອນ',
    
    // Shares
    'shares.title': 'ການຕິດຕາມຮຸ້ນ',
    'shares.addContribution': 'ເພີ່ມການປະກອບຮຸ້ນ',
    'shares.ownership': 'ການເປັນເຈົ້າຂອງ',
    'shares.contribution': 'ການປະກອບຮຸ້ນ',
    
    // Loans
    'loans.title': 'ການຈັດການກູ້ຢຶມ',
    'loans.addLoan': 'ເພີ່ມເງິນກູ້ໃໝ່',
    'loans.loanId': 'ລະຫັດເງິນກູ້',
    'loans.repayment': 'ການຊຳລະຄືນ',
    'loans.remaining': 'ຍອດເຫຼືອ',
    'loans.interest': 'ດອກເບ້ຍ',
    'loans.issued': 'ອອກໃຫ້',
    
    // General Ledger
    'ledger.title': 'ບັນຊີລາຍການທົ່ວໄປ',
    'ledger.cash': 'ເງິນສົດ',
    'ledger.capitalFund': 'ທຶນ',
    'ledger.shares': 'ຮຸ້ນ',
    'ledger.loans': 'ເງິນກູ້',
    'ledger.income': 'ລາຍຮັບ',
    'ledger.expenditure': 'ລາຍຈ່າຍ',
    
    // Reports
    'reports.title': 'ລາຍງານ ແລະ ການວິເຄາະ',
    'reports.monthlyIncome': 'ລາຍງານລາຍຮັບລາຍເດືອນ',
    'reports.yearlyIncome': 'ລາຍງານລາຍຮັບປະຈຳປີ',
    'reports.monthlyExpenses': 'ລາຍງານລາຍຈ່າຍລາຍເດືອນ',
    'reports.yearlyExpenses': 'ລາຍງານລາຍຈ່າຍປະຈຳປີ',
    'reports.incomeVsExpenses': 'ລາຍຮັບ ປຽບທຽບ ລາຍຈ່າຍ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};