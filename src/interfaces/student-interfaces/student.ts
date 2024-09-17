export interface Student {
    id: string;
    fullName: string;
    address: string;
    phoneNumber: string;
    email: string;
    passwordHash: string;
    salt: string;
    courseIds: string[];
    role: string;
    img: string;
}

