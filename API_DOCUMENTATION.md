# API Documentation

## Response Format Standards

### Simple Response
```json
{
  "code": "S200",
  "message": "success",
  "data": []
}
```

### Paginated Response
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 3,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 22,
    "data": []
  }
}
```

---

## Authentication

### Login
**POST** `/api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "admin|accountant|userprovince",
      "organizationId": "uuid"
    },
    "token": "jwt_token"
  }
}
```

### Logout
**POST** `/api/auth/logout`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": null
}
```

---

## User Management

### Get Users (Paginated)
**GET** `/api/users?page=1&limit=10`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 3,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 22,
    "data": [
      {
        "id": "uuid",
        "email": "user@example.com",
        "role": "admin",
        "organizationId": "uuid",
        "createdAt": "2024-01-01T00:00:00Z",
        "lastLogin": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### Create User
**POST** `/api/users`

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "accountant",
  "organizationId": "uuid"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "email": "newuser@example.com",
    "role": "accountant",
    "organizationId": "uuid"
  }
}
```

### Update User
**PUT** `/api/users/:id`

**Request:**
```json
{
  "email": "updated@example.com",
  "role": "admin"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "email": "updated@example.com",
    "role": "admin"
  }
}
```

### Delete User
**DELETE** `/api/users/:id`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": null
}
```

---

## Organizations

### Get Organizations (Paginated)
**GET** `/api/organizations?page=1&limit=10`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 2,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 15,
    "data": [
      {
        "id": "uuid",
        "name": "Organization Name",
        "code": "ORG001",
        "province": "Vientiane",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### Create Organization
**POST** `/api/organizations`

**Request:**
```json
{
  "name": "New Organization",
  "code": "ORG002",
  "province": "Luang Prabang"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "name": "New Organization",
    "code": "ORG002",
    "province": "Luang Prabang"
  }
}
```

---

## Members

### Get Members (Paginated)
**GET** `/api/members?page=1&limit=10&organizationId=uuid`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 5,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 48,
    "data": [
      {
        "id": "uuid",
        "name": "Member Name",
        "memberCode": "M001",
        "phone": "020-12345678",
        "village": "Village Name",
        "district": "District Name",
        "province": "Province Name",
        "organizationId": "uuid",
        "joinedDate": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### Create Member
**POST** `/api/members`

**Request:**
```json
{
  "name": "New Member",
  "memberCode": "M002",
  "phone": "020-98765432",
  "village": "Village Name",
  "district": "District Name",
  "province": "Province Name",
  "organizationId": "uuid"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "name": "New Member",
    "memberCode": "M002"
  }
}
```

---

## Transactions

### Get Transactions (Paginated)
**GET** `/api/transactions?page=1&limit=10&type=income&startDate=2024-01-01&endDate=2024-12-31`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 10,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 95,
    "data": [
      {
        "id": "uuid",
        "date": "2024-01-15T00:00:00Z",
        "type": "income",
        "category": "Member Fees",
        "amount": 500000,
        "description": "Monthly membership fee",
        "memberId": "uuid",
        "organizationId": "uuid",
        "createdBy": "uuid"
      }
    ]
  }
}
```

### Create Transaction
**POST** `/api/transactions`

**Request:**
```json
{
  "date": "2024-01-15",
  "type": "income",
  "category": "Member Fees",
  "amount": 500000,
  "description": "Monthly membership fee",
  "memberId": "uuid",
  "organizationId": "uuid"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "date": "2024-01-15T00:00:00Z",
    "type": "income",
    "amount": 500000
  }
}
```

---

## Cashbook

### Get Cashbook Entries (Paginated)
**GET** `/api/cashbook?page=1&limit=10&startDate=2024-01-01&endDate=2024-12-31`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 8,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 75,
    "data": [
      {
        "id": "uuid",
        "date": "2024-01-15T00:00:00Z",
        "description": "Cash payment",
        "debit": 1000000,
        "credit": 0,
        "balance": 5000000,
        "organizationId": "uuid"
      }
    ]
  }
}
```

### Create Cashbook Entry
**POST** `/api/cashbook`

**Request:**
```json
{
  "date": "2024-01-15",
  "description": "Cash payment",
  "debit": 1000000,
  "credit": 0,
  "organizationId": "uuid"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "balance": 5000000
  }
}
```

---

## Bankbook

### Get Bankbook Entries (Paginated)
**GET** `/api/bankbook?page=1&limit=10&startDate=2024-01-01&endDate=2024-12-31`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 6,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 58,
    "data": [
      {
        "id": "uuid",
        "date": "2024-01-15T00:00:00Z",
        "description": "Bank transfer",
        "debit": 2000000,
        "credit": 0,
        "balance": 10000000,
        "bankName": "BCEL",
        "accountNumber": "123456789",
        "organizationId": "uuid"
      }
    ]
  }
}
```

### Create Bankbook Entry
**POST** `/api/bankbook`

**Request:**
```json
{
  "date": "2024-01-15",
  "description": "Bank transfer",
  "debit": 2000000,
  "credit": 0,
  "bankName": "BCEL",
  "accountNumber": "123456789",
  "organizationId": "uuid"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "balance": 10000000
  }
}
```

---

## Card Transactions

### Get Card Transactions (Paginated)
**GET** `/api/card-transactions?page=1&limit=10&startDate=2024-01-01&endDate=2024-12-31`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 4,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 35,
    "data": [
      {
        "id": "uuid",
        "date": "2024-01-15T00:00:00Z",
        "cardNumber": "**** **** **** 1234",
        "merchant": "Store Name",
        "amount": 150000,
        "type": "purchase",
        "status": "completed",
        "organizationId": "uuid"
      }
    ]
  }
}
```

---

## Categories

### Get Categories
**GET** `/api/categories?organizationId=uuid`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": [
    {
      "id": "uuid",
      "name": "Member Fees",
      "type": "income",
      "code": "CAT001",
      "organizationId": "uuid"
    },
    {
      "id": "uuid",
      "name": "Office Supplies",
      "type": "expense",
      "code": "CAT002",
      "organizationId": "uuid"
    }
  ]
}
```

### Create Category
**POST** `/api/categories`

**Request:**
```json
{
  "name": "New Category",
  "type": "income",
  "code": "CAT003",
  "organizationId": "uuid"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "name": "New Category",
    "type": "income",
    "code": "CAT003"
  }
}
```

---

## Loans

### Get Loans (Paginated)
**GET** `/api/loans?page=1&limit=10&status=active`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 7,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 68,
    "data": [
      {
        "id": "uuid",
        "memberId": "uuid",
        "memberName": "Member Name",
        "amount": 10000000,
        "interestRate": 12,
        "startDate": "2024-01-01T00:00:00Z",
        "endDate": "2025-01-01T00:00:00Z",
        "remainingBalance": 8000000,
        "status": "active",
        "organizationId": "uuid"
      }
    ]
  }
}
```

### Create Loan
**POST** `/api/loans`

**Request:**
```json
{
  "memberId": "uuid",
  "amount": 10000000,
  "interestRate": 12,
  "startDate": "2024-01-01",
  "endDate": "2025-01-01",
  "organizationId": "uuid"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "amount": 10000000,
    "status": "active"
  }
}
```

### Record Loan Payment
**POST** `/api/loans/:id/payments`

**Request:**
```json
{
  "amount": 500000,
  "paymentDate": "2024-02-01",
  "principal": 400000,
  "interest": 100000
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "remainingBalance": 9600000
  }
}
```

---

## Member Savings

### Get Member Savings (Paginated)
**GET** `/api/member-savings?page=1&limit=10&memberId=uuid`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 3,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 25,
    "data": [
      {
        "id": "uuid",
        "memberId": "uuid",
        "memberName": "Member Name",
        "savingsType": "regular",
        "amount": 5000000,
        "interestRate": 5,
        "balance": 5250000,
        "organizationId": "uuid"
      }
    ]
  }
}
```

### Create Savings Entry
**POST** `/api/member-savings`

**Request:**
```json
{
  "memberId": "uuid",
  "savingsType": "regular",
  "amount": 1000000,
  "date": "2024-01-15",
  "organizationId": "uuid"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "balance": 6250000
  }
}
```

---

## Shares Tracking

### Get Share Contributions (Paginated)
**GET** `/api/shares?page=1&limit=10&memberId=uuid`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 4,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 38,
    "data": [
      {
        "id": "uuid",
        "memberId": "uuid",
        "memberName": "Member Name",
        "shareNumber": "SH001",
        "shares": 100,
        "pricePerShare": 100000,
        "totalValue": 10000000,
        "purchaseDate": "2024-01-01T00:00:00Z",
        "organizationId": "uuid"
      }
    ]
  }
}
```

### Create Share Contribution
**POST** `/api/shares`

**Request:**
```json
{
  "memberId": "uuid",
  "shares": 50,
  "pricePerShare": 100000,
  "purchaseDate": "2024-01-15",
  "organizationId": "uuid"
}
```

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "id": "uuid",
    "shareNumber": "SH002",
    "totalValue": 5000000
  }
}
```

---

## General Ledger

### Get Ledger Entries (Paginated)
**GET** `/api/general-ledger?page=1&limit=10&startDate=2024-01-01&endDate=2024-12-31`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 15,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 145,
    "data": [
      {
        "id": "uuid",
        "date": "2024-01-15T00:00:00Z",
        "accountCode": "1001",
        "accountName": "Cash",
        "description": "Cash receipt",
        "debit": 1000000,
        "credit": 0,
        "balance": 5000000,
        "organizationId": "uuid"
      }
    ]
  }
}
```

---

## Daily Ledger

### Get Daily Ledger (Paginated)
**GET** `/api/daily-ledger?page=1&limit=10&date=2024-01-15`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 2,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 18,
    "data": [
      {
        "id": "uuid",
        "date": "2024-01-15T00:00:00Z",
        "description": "Daily transaction",
        "debit": 500000,
        "credit": 0,
        "organizationId": "uuid"
      }
    ]
  }
}
```

---

## Trial Balance

### Get Trial Balance
**GET** `/api/trial-balance?startDate=2024-01-01&endDate=2024-12-31`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": [
    {
      "accountCode": "1001",
      "accountName": "Cash",
      "debit": 50000000,
      "credit": 30000000,
      "balance": 20000000
    },
    {
      "accountCode": "2001",
      "accountName": "Accounts Payable",
      "debit": 10000000,
      "credit": 15000000,
      "balance": -5000000
    }
  ]
}
```

---

## Income Statement

### Get Income Statement
**GET** `/api/income-statement?startDate=2024-01-01&endDate=2024-12-31`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "revenue": {
      "memberFees": 50000000,
      "interestIncome": 10000000,
      "otherIncome": 5000000,
      "total": 65000000
    },
    "expenses": {
      "salaries": 20000000,
      "utilities": 5000000,
      "supplies": 3000000,
      "other": 2000000,
      "total": 30000000
    },
    "netIncome": 35000000
  }
}
```

---

## Financial Report

### Get Financial Report
**GET** `/api/financial-report?startDate=2024-01-01&endDate=2024-12-31`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "balanceSheet": {
      "assets": {
        "currentAssets": 100000000,
        "fixedAssets": 50000000,
        "total": 150000000
      },
      "liabilities": {
        "currentLiabilities": 30000000,
        "longTermLiabilities": 20000000,
        "total": 50000000
      },
      "equity": {
        "capital": 80000000,
        "retainedEarnings": 20000000,
        "total": 100000000
      }
    },
    "incomeStatement": {
      "revenue": 65000000,
      "expenses": 30000000,
      "netIncome": 35000000
    },
    "cashFlow": {
      "operating": 40000000,
      "investing": -10000000,
      "financing": 5000000,
      "net": 35000000
    }
  }
}
```

---

## Audit Logs

### Get Audit Logs (Paginated)
**GET** `/api/audit-logs?page=1&limit=10&userId=uuid&action=create`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalPage": 20,
    "currentPage": 1,
    "limit": 10,
    "totalRecord": 195,
    "data": [
      {
        "id": "uuid",
        "userId": "uuid",
        "userName": "User Name",
        "action": "create",
        "resource": "transaction",
        "resourceId": "uuid",
        "details": "Created new transaction",
        "ipAddress": "192.168.1.1",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

## Dashboard Statistics

### Get Dashboard Stats
**GET** `/api/dashboard/stats?organizationId=uuid`

**Response:**
```json
{
  "code": "S200",
  "message": "success",
  "data": {
    "totalMembers": 150,
    "totalLoans": 50,
    "totalSavings": 500000000,
    "totalShares": 1000000000,
    "cashBalance": 50000000,
    "bankBalance": 200000000,
    "monthlyIncome": 30000000,
    "monthlyExpenses": 15000000
  }
}
```

---

## Error Response Format

```json
{
  "code": "E400",
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Error Codes
- `S200` - Success
- `E400` - Bad Request / Validation Error
- `E401` - Unauthorized
- `E403` - Forbidden
- `E404` - Not Found
- `E500` - Internal Server Error
