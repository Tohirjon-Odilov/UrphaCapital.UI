import { Mentor } from "../mentor-interfaces/mentor"

export interface Course {
    id: number
    name: string
    description: string
    subtitle: string
    picture: string
    price: string
    mentorId: number
    mentor: Mentor
  }
  