'use client';
import React, { useReducer } from 'react';
import TextEditor from '../../components/TextEditor';
import { SkillsPicker } from '../../components/SearchableSelectMenus';
import { Button } from '@/components/Buttons';
import { createLesson } from '@/app/api';
import { InputText } from '../../components/InputText';

const CONTENT_LOCAL_STORAGE_ID = 'lesson_create_content';
const NAME_LOCAL_STORAGE_ID = 'lesson_create_name';
const SKILLS_LOCAL_STORAGE_ID = 'lesson_create_skills';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      localStorage.setItem(CONTENT_LOCAL_STORAGE_ID, action.content);
      return { ...state, content: action.content };
    case 'SET_NAME':
      localStorage.setItem(NAME_LOCAL_STORAGE_ID, action.name);
      return { ...state, name: action.name };
    case 'SET_SKILLS':
      localStorage.setItem(
        SKILLS_LOCAL_STORAGE_ID,
        JSON.stringify(action.skills)
      );
      return { ...state, skills: action.skills };
    case 'RESET':
      localStorage.removeItem(CONTENT_LOCAL_STORAGE_ID);
      localStorage.removeItem(NAME_LOCAL_STORAGE_ID);
      localStorage.removeItem(SKILLS_LOCAL_STORAGE_ID);
      return { ...state, content: '', name: '', skills: [] };
    default:
      throw new Error();
  }
};

const page = () => {
  const [state, dispatch] = useReducer(reducer, {
    content:
      typeof window !== 'undefined'
        ? localStorage.getItem(CONTENT_LOCAL_STORAGE_ID) ?? ''
        : '',
    name:
      typeof window !== 'undefined'
        ? localStorage.getItem(NAME_LOCAL_STORAGE_ID) ?? ''
        : '',
    skills:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem(SKILLS_LOCAL_STORAGE_ID) ?? '[]')
        : []
  });

  const handleContentChange = (content: string) => {
    dispatch({ type: 'SET_CONTENT', content });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NAME', name: event.target.value });
  };
  

  const handleSkillsChange = (selectedSkills: string[]) => {
    dispatch({ type: 'SET_SKILLS', skills: selectedSkills });
  };

  const handleSubmit = async () => {
    try {
      await createLesson(state);
      dispatch({ type: 'RESET' });
      alert('Lesson created successfully');
    } catch (error) {
      alert(error.message || 'An error occurred while creating the lesson');
    }
  };

  return (
    <div>
      <h3 className="text-2xl">Create a new lesson</h3>
      <InputText
        title="Title"
        content={state.name}
        onChange={handleNameChange}
      />
      <h4 className="text-xl font-semibold">Content</h4>
      <TextEditor handleChange={handleContentChange} content={state.content} />
      <h4 className="text-xl font-semibold">Skills</h4>
      <SkillsPicker onChange={handleSkillsChange} selected={state.skills} />
      <Button innerText="Create" onClick={handleSubmit} />
      <Button innerText="Clear" onClick={() => dispatch({ type: 'RESET' })} />
    </div>
  );
};

export default page;
