export interface QuestionType {
    id: string;
    content: string;
    expected_output?: string;
    solution?: string;
    skills?: string[];
}

export interface CreateQuestionType {
    content: string;
    solution: string;
    skills?: string[];
}

export type QuestionBriefInfo = {
    id: string;
    name: string;
}

export interface LessonType {
    id: string;
    module_id?: number;
    name?: string;
    content: string;
    lesson_order?: number;
    questions?: QuestionBriefInfo[];
    skills?: string[];
  }

export interface CreateLessonType {
    name: string;
    content: string;
    skills?: string[];
}

export interface ModuleType {
    id: string;
    name: string;
    description?: string;
    lessons?: LessonType[];
}

export interface CreateModuleType {
    name: string;
    description: string;
}

export interface SkillType {
    id: string;
    name: string;
    description?: string;
    prerequisites?: string[];
    postrequisites?: string[];
}

export interface ApiError {
    message: string;
}