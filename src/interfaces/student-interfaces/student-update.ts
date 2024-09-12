export interface StudentUpdate {
    id: string;
    fullName: string;
    address: string;
    phoneNumber: string;
    email: string;
    passwordHash: string;
    courseIds: string[];
  }