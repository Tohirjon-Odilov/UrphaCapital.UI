export interface Student {
    id: number;
    fullName: string;
    address: string;
    phoneNumber: string;
    email: string;
    passwordHash: string;
    salt: string;
    courseIds: number[];
    role: string;
}