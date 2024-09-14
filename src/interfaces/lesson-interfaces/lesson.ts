import { Course } from "../course-interfaces/course"

export interface Lesson {
  id: string
  title: string
  homeworkDescription: string
  courseId: string
  course: Course
  video: string
}
