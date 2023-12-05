'use client';
import React, { useState, useEffect, useReducer } from 'react';
import TextEditor from '../../components/TextEditor';
import { SkillsPicker } from '../../components/SearchableSelectMenus';
import { Button } from '@/components/Buttons';
import { getLesson, updateLesson } from '@/app/api';
import { InputText } from '../../components/InputText';
import { LessonType, QuestionType, QuestionBriefInfo } from '@/app/types';
import { QuestionPicker } from '../../components/SearchableSelectMenus';
import DraggableList from '../../components/DraggableList';

// Define the props for the Page component
interface PageProps {
  searchParams: {
    id: string;
  };
}

// Define the Page component
const Page: React.FC<PageProps> = ({ searchParams: { id } }) => {
  // Define the keys for local storage
  const CONTENT_LOCAL_STORAGE_ID = `lesson_edit_content_${id}`;
  const NAME_LOCAL_STORAGE_ID = `lesson_edit_name_${id}`;
  const SKILLS_LOCAL_STORAGE_ID = `lesson_edit_skills_${id}`;
  const QUESTIONS_LOCAL_STORAGE_ID = `lesson_edit_questions_${id}`;

  const [fetchedLesson, setFetchedLesson] = useState<LessonType | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(
    null
  );

  // Define the reducer for handling state updates
  // When the 'SET_STATE' action is dispatched, the new state is first calculated,
  // then each part of the state is stored in local storage, and finally the new state is returned.
  // The 'RESET' action removes the items from local storage and returns the fetched lesson as the new state.
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_STATE':
        const newState = { ...state, ...action.payload };
        localStorage.setItem(CONTENT_LOCAL_STORAGE_ID, newState.content);
        localStorage.setItem(NAME_LOCAL_STORAGE_ID, newState.name);
        localStorage.setItem(
          SKILLS_LOCAL_STORAGE_ID,
          JSON.stringify(newState.skills)
        );
        localStorage.setItem(
          QUESTIONS_LOCAL_STORAGE_ID,
          JSON.stringify(newState.questions)
        );
        return newState;
      case 'RESET':
        localStorage.removeItem(CONTENT_LOCAL_STORAGE_ID);
        localStorage.removeItem(NAME_LOCAL_STORAGE_ID);
        localStorage.removeItem(SKILLS_LOCAL_STORAGE_ID);
        localStorage.removeItem(QUESTIONS_LOCAL_STORAGE_ID);
        return { ...fetchedLesson };
      default:
        throw new Error();
    }
  };

  // Define the state and dispatch function using the reducer
  const [state, dispatch] = useReducer(reducer, {
    content: '',
    name: '',
    skills: [],
    questions: []
  });

  // Define a function for getting an item from local storage
  // If we're on the server, return the default value
  // Try to get the item from local storage
  // If the item doesn't exist, return the default value
  // Try to parse the item as JSON
  // If parsing fails, return the item as a string
  const getItem = (key, defaultValue) => {
    if (typeof window === 'undefined') return defaultValue;
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return defaultValue;
    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue;
    }
  };

  // Define an effect for fetching the lesson
  // Fetch the lesson data
  // Set the fetched lesson
  // Dispatch the 'SET_STATE' action with the fetched data
  useEffect(() => {
    const fetchLesson = async () => {
      const lessonData = await getLesson(id as string);
      setFetchedLesson(lessonData);
      dispatch({
        type: 'SET_STATE',
        payload: {
          content: getItem(CONTENT_LOCAL_STORAGE_ID, lessonData.content),
          name: getItem(NAME_LOCAL_STORAGE_ID, lessonData.name),
          skills: getItem(SKILLS_LOCAL_STORAGE_ID, lessonData.skills),
          questions: getItem(QUESTIONS_LOCAL_STORAGE_ID, lessonData.questions)
        }
      });
    };
    fetchLesson();
  }, [id]);


  const handleContentChange = (content: string) => {
    dispatch({ type: 'SET_STATE', payload: { content } });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_STATE', payload: { name: event.target.value } });
  };

  const handleSkillsChange = (selectedSkills: string[]) => {
    dispatch({ type: 'SET_STATE', payload: { skills: selectedSkills } });
  };

  const handleQuestionsChange = (questions: QuestionBriefInfo[]) => {
    dispatch({ type: 'SET_STATE', payload: { questions } });
  };

  const addQuestion = () => {
    if (
      selectedQuestion &&
      !state.questions.find(
        (question: QuestionBriefInfo) =>
          question.id === selectedQuestion.id
      )
    ) {
      const updatedQuestions = [...state.questions, {name: selectedQuestion.content, id: selectedQuestion.id}];
      dispatch({ type: 'SET_STATE', payload: { questions: updatedQuestions } });
      setSelectedQuestion(null);
    }
  };
  

  // Remove a question from the list of questions
  const removeQuestion = (id: string) => {
    const updatedQuestions = state.questions.filter(
      (question: QuestionBriefInfo) => question.id !== id
    );
    dispatch({ type: 'SET_STATE', payload: { questions: updatedQuestions } });
  };

  // Update the lesson
  // Dispatch the 'SET_STATE' action with the updated lesson
  // Set the fetched lesson to the updated lesson
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Get a list of just the question ids
    const updatedQuestions = state.questions.map(
      (question: QuestionBriefInfo) => question.id
    )
    // Update the lesson
    try {
      const updatedLesson = await updateLesson(id as string, {...state, question_ids: updatedQuestions});
      dispatch({ type: 'SET_STATE', payload: updatedLesson });
      setFetchedLesson(updatedLesson);
      alert('Lesson updated successfully');
    } catch (error) {
      alert(error.message || 'An error occurred while updating the lesson');
    }
  };

  // Define a function for handling clear button clicks
  // Dispatch the 'RESET' action
  const handleClear = () => {
    dispatch({ type: 'RESET' });
  };

  // Render the component
  return (
    <div className='m-1'>
      <h3 className="text-2xl">Edit this lesson</h3>
      <InputText
        title="Lesson Title"
        content={state.name}
        onChange={handleNameChange}
      />
      <h4 className="text-xl font-semibold">Content</h4>
      <TextEditor handleChange={handleContentChange} content={state.content} />
      <h4 className="text-xl font-semibold">Skills</h4>
      <SkillsPicker onChange={handleSkillsChange} selected={state.skills} />
      <h4 className="text-xl font-semibold">Questions</h4>
      <QuestionPicker
        selectedQuestion={selectedQuestion}
        onQuestionChange={setSelectedQuestion}
      />
      <Button innerText="Add Question" onClick={addQuestion} />
      <DraggableList
        items={state.questions}
        onRemove={removeQuestion}
        onDragEnd={handleQuestionsChange}
      />
      <Button innerText="Update" onClick={handleSubmit} />
      <Button innerText="Clear" onClick={handleClear} />
    </div>
  );
};

export default Page;
