export interface StudentUpdate {
    id: number;
    fullName: string;
    address: string;
    phoneNumber: string;
    email: string;
    passwordHash: string;
    courseIds: number[];
  }