import { Course } from "../course-interfaces/course"

export interface Lesson {
    id: number
    name: string
    courseId: number
    course: Course
    video: string
  }
  