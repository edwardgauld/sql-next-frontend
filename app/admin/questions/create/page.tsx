'use client';
import React, { useReducer } from 'react';
import TextEditor from '../../components/TextEditor';
import CodeEditor from '@/components/CodeEditor';
import { SkillsPicker } from '../../components/SearchableSelectMenus';
import { Button, SubmitButton } from '@/components/Buttons';
import { createQuestion } from '@/app/api';
import AnswerChecker from '@/components/AnswerChecker';
import { ApiError } from '@/app/types';

const CONTENT_LOCAL_STORAGE_ID = 'question_create_content';
const SOLUTION_LOCAL_STORAGE_ID = 'question_create_solution';
const SKILLS_LOCAL_STORAGE_ID = 'question_create_skills';

interface State {
  content: string;
  solution: string;
  skills: string[];
}

type Action =
  | { type: 'SET_CONTENT'; content: string }
  | { type: 'SET_SOLUTION'; solution: string }
  | { type: 'SET_SKILLS'; skills: string[] }
  | { type: 'RESET' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      localStorage.setItem(CONTENT_LOCAL_STORAGE_ID, action.content);
      return { ...state, content: action.content };
    case 'SET_SOLUTION':
      localStorage.setItem(SOLUTION_LOCAL_STORAGE_ID, action.solution);
      return { ...state, solution: action.solution };
    case 'SET_SKILLS':
      localStorage.setItem(
        SKILLS_LOCAL_STORAGE_ID,
        JSON.stringify(action.skills)
      );
      return { ...state, skills: action.skills };
    case 'RESET':
      localStorage.removeItem(CONTENT_LOCAL_STORAGE_ID);
      localStorage.removeItem(SOLUTION_LOCAL_STORAGE_ID);
      localStorage.removeItem(SKILLS_LOCAL_STORAGE_ID);
      return { ...state, content: '', solution: '', skills: [] };
    default:
      throw new Error();
  }
};

const Page = () => {
  const [state, dispatch] = useReducer(reducer, {
    content:
      typeof window !== 'undefined'
        ? localStorage.getItem(CONTENT_LOCAL_STORAGE_ID) ?? ''
        : '',
    solution:
      typeof window !== 'undefined'
        ? localStorage.getItem(SOLUTION_LOCAL_STORAGE_ID) ?? ''
        : '',
    skills:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem(SKILLS_LOCAL_STORAGE_ID) ?? '[]')
        : []
  });

  const handleContentChange = (content: string) => {
    dispatch({ type: 'SET_CONTENT', content });
  };

  const handleSolutionChange = (solution: string) => {
    dispatch({ type: 'SET_SOLUTION', solution });
  };

  const handleSkillsChange = (selectedSkills: string[]) => {
    dispatch({ type: 'SET_SKILLS', skills: selectedSkills });
  };

  const handleSubmit = async () => {
    try {
      await createQuestion(state);
      dispatch({ type: 'RESET' });
      alert('Question created successfully');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      alert(apiError.message || 'An error occurred while creating the question');
    }
  };

  return (
    <div className="m-1">
      <h3 className="text-2xl">Create a new question</h3>
      <h4 className="text-xl font-semibold">Content</h4>
      <TextEditor handleChange={handleContentChange} content={state.content} />
      <h4 className="text-xl font-semibold">Solution</h4>
      <CodeEditor
        handleChange={handleSolutionChange}
        content={state.solution}
      />
      <h4 className="text-xl font-semibold">Skills</h4>
      <SkillsPicker onChange={handleSkillsChange} selected={state.skills} />
      <Button innerText="Create" onClick={handleSubmit} />
      <Button innerText="Clear" onClick={() => dispatch({ type: 'RESET' })} />
      <h4 className="text-lg font-semibold">Try out the solution</h4>
      <AnswerChecker questionId={'1'} expectedOutput={'admin'} />
    </div>
  );
};

export default Page;
