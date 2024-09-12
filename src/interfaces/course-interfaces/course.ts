import { Mentor } from "../mentor-interfaces/mentor"

export interface Course {
    id: string
    name: string
    description: string
    subtitle: string
    picture: string
    price: string
    mentorId: number
    mentor: Mentor
  }
  