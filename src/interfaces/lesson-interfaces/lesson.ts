import { Course } from "../course-interfaces/course"

export interface Lesson {
    id: string
    name: string
    courseId: string
    course: Course
    video: string
  }
  