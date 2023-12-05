import { QuestionType, LessonType, ModuleType } from "./types";

const API = "http://127.0.0.1:8001";

const getIdToken = async () => {
  const response = await fetch('/api/auth/session');
  const session = await response.json();
  const idToken = session.id_token;
  return idToken;
};

const fetchAPI = async (url: string, options = {}) => {
    const id_token = await getIdToken();
    const response = await fetch(`${API}${url}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${id_token}`
      },
      ...options,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred while making the API request');
    }
  
    return response.json();
};

const fetchPublicAPI = async (url: string, options = {}) => {

  const response = await fetch(`${API}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred while making the API request');
  }

  return response.json();
};

export const getCourseMenu = async () => {
  return fetchPublicAPI(`/course_menu`);
};

export const getCurrentPage = async (module_name: string, position: string ) => {
  return fetchPublicAPI(`/course/${module_name}/${position}`);
};

export const makeSubmission = async (question_id: string, submission_query: string) => {
  return fetchPublicAPI('/submission', {
    method: 'POST',
    body: JSON.stringify({
      question_id: question_id,
      query: submission_query,
    })
  });
};

export const getSubmissionResult = async (submission_id: string) => {
  return fetchPublicAPI(`/submission/${submission_id}`);
};


/* Admin API */

export const createQuestion = async (data: QuestionType) => {
  return fetchAPI(`/question/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateQuestion = async (id: string, data: QuestionType) => {
  return fetchAPI(`/question/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export const getAllQuestions = async (): Promise<QuestionType[]> => {
  return fetchAPI(`/questions`);
};

export const getQuestion = async (id: string): Promise<QuestionType> => {
  return fetchAPI(`/question/${id}`);
};

export const deleteQuestion = async (id: string) => {
  return fetchAPI(`/question/${id}`, {
    method: 'DELETE'
  });
};

export const getAllSkills = async (): Promise<Array<Skill>> => {
  return fetchAPI(`/skill`);
};

export const getAllModules = async (): Promise<ModuleType[]> =>{
  return fetchAPI(`/module`);
};

export const getAllModulesNamesIds = async () => {
  const modules = await getAllModules();

};

export const createModule = async (data: ModuleType) => {
  return fetchAPI(`/module/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export const deleteModule = async (id: string) => {
  return fetchAPI(`/module/${id}`, {
    method: 'DELETE'
  });
}

export const getCourseModules = async (course_id: string) => {
  return fetchAPI(`/course/${course_id}`);
}


export const getAllLessons = async () => {
  return fetchAPI(`/lesson`);
}

export const createLesson = async (data: LessonType): Promise<LessonType> => {
  return fetchAPI(`/lesson/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export const updateLesson = async (id: string, data: LessonType): Promise<LessonType> => {
  return fetchAPI(`/lesson/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export const getLesson = async (id: string): Promise<LessonType> => {
  let lesson = await fetchAPI(`/lesson/${id}`);
  // ensure all question ids are strings
  lesson.questions = lesson.questions.map(question => {
    return { ...question, id: String(question.id) };
  })
  return lesson;
}

export const deleteLesson = async (id: string) => {
  return fetchAPI(`/lesson/${id}`, {
    method: 'DELETE'
  });
}

export const updateModuleLessons = async (id: string, lesson_ids: string[]) => {
  return fetchAPI(`/module/${id}/lessons`, {
    method: "PUT",
    body: JSON.stringify({lesson_ids: lesson_ids}),
  });
}

export const updateCourseModules = async (module_ids: string[]) => {
  return fetchAPI(`/course/1`, {
    method: "PUT",
    body: JSON.stringify({module_ids: module_ids}),
  });
}