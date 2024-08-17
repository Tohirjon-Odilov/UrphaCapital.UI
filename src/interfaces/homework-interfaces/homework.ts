import { Lesson } from "../lesson-interfaces/lesson";

export interface Homework {
    id: number;
    title: string;
    fILE: string;
    description: string;
    lessonId: number;
    lesson: Lesson;
}