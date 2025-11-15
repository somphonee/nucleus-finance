// Central export file for all API services
export * from './auth';
export * from './certificates';
export * from './provinces';
export * from './organizations';
export * from './members';
export * from './coa';
export * from './cash';
export * from './bank';
export * from './savings';
export * from './shares';
export * from './loans';
export * from './reports';

// Re-export all API instances for easy access
export { authAPI } from './auth';
export { certificatesAPI } from './certificates';
export { provincesAPI } from './provinces';
export { organizationsAPI } from './organizations';
export { membersAPI } from './members';
export { coaAPI } from './coa';
export { cashAPI } from './cash';
export { bankAPI } from './bank';
export { savingsAPI } from './savings';
export { sharesAPI } from './shares';
export { loansAPI } from './loans';
export { reportsAPI } from './reports';
