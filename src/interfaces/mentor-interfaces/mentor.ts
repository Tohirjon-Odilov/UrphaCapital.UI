import { Course } from "../course-interfaces/course"

export interface Mentor {
    id: number
    name: string
    description: string
    email: string
    phoneNumber: string
    picture: string
    passwordHash: string
    salt: string
    role: string
    courses: Course[]
  }
  