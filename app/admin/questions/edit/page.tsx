'use client';
import React, { useReducer, useEffect, useState } from 'react';
import TextEditor from '../../components/TextEditor';
import CodeEditor from '@/components/CodeEditor';
import { SkillsPicker } from '../../components/SearchableSelectMenus';
import { Button } from '@/components/Buttons';
import { getQuestion, updateQuestion } from '@/app/api';
import { QuestionType } from '@/app/types';
import AnswerChecker from '@/components/AnswerChecker';

interface PageProps {
  searchParams: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ searchParams: { id } }) => {
  const LOCAL_STORAGE_ID = `question_edit_${id}`;
  const [fetchedQuestion, setFetchedQuestion] = useState<QuestionType | null>(
    null
  );

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_STATE':
        const newState = { ...state, ...action.payload };
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(newState));
        return newState;
      case 'RESET':
        localStorage.removeItem(LOCAL_STORAGE_ID);
        return { ...fetchedQuestion };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    content: '',
    solution: '',
    skills: []
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      const question = await getQuestion(id);
      setFetchedQuestion(question);
      if (localStorage.getItem(LOCAL_STORAGE_ID)) {
        const storedUpdates = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_ID) ?? '{}'
        );
        dispatch({ type: 'SET_STATE', payload: storedUpdates });
      } else {
        dispatch({ type: 'SET_STATE', payload: question });
      }
    };

    fetchQuestion();
  }, [id]);

  const handleContentChange = (content) =>
    dispatch({ type: 'SET_STATE', payload: { content } });
  const handleSolutionChange = (solution) =>
    dispatch({ type: 'SET_STATE', payload: { solution } });
  const handleSkillsChange = (skills) =>
    dispatch({ type: 'SET_STATE', payload: { skills } });

  const handleSubmit = async () => {
    try {
      const updatedQuestion = await updateQuestion(id, state);
      dispatch({ type: 'SET_STATE', payload: updatedQuestion });
      setFetchedQuestion(updatedQuestion);
      alert('Question updated successfully');
    } catch (error) {
      alert(error.message || 'An error occurred while updating the question');
    }
  };

  return state && state.content ? (
    <div className="m-1">
      <h3 className="text-2xl">Edit this question</h3>
      <h4 className="text-xl font-semibold">Content</h4>
      <TextEditor handleChange={handleContentChange} content={state.content} />
      <h4 className="text-xl font-semibold">Solution</h4>
      <CodeEditor
        handleChange={handleSolutionChange}
        content={state.solution}
      />
      <h4 className="text-xl font-semibold">Skills</h4>
      <SkillsPicker onChange={handleSkillsChange} selected={state.skills} />
      <Button innerText="Update" onClick={handleSubmit} />
      <Button innerText="Clear" onClick={() => dispatch({ type: 'RESET' })} />
      <h4 className="text-lg font-semibold">Try out the solution</h4>
      <AnswerChecker questionId={'1'} expectedOutput={'admin'} />
    </div>
  ) : (
    <></>
  );
};

export default Page;
