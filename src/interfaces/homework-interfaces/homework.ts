import { Lesson } from "../lesson-interfaces/lesson";

export interface Homework {
    id: number;
    title: string;
    fILE: string;
    description: string;
    studentId: number,
    mentorId?: number,
    grade?: number,
    lessonId: string;
    lesson: Lesson;
}