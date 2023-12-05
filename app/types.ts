export interface QuestionType {
    id: string;
    content: string;
    expected_output?: string;
    solution: string;
    skills: string[];
}

export type QuestionBriefInfo = {
    id: string;
    name: string;
}

export interface LessonType {
    id: number;
    module_id: number;
    name: string;
    content: string;
    lesson_order: number;
    questions: QuestionBriefInfo[];
    skills: string[];
}


export interface ModuleType {
    id: string;
    name: string;
    description?: string;
    lessons?: LessonType[];
}