'use client';
import { useEffect, useReducer } from 'react';
import { makeSubmission, getSubmissionResult } from '@/app/api';
import { SubmitButton, ClearButton } from '@/components/Buttons';
import CodeEditor from '@/components/CodeEditor';
import {
  Correct,
  ExpectedOutput,
  SqlError,
  WrongOutput
} from '@/components/OutputPanels';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.query
      };
    case 'SUBMIT':
      return {
        ...state,
        submissionStatus: 'pending',
        submissionId: action.submissionId
      };
    case 'SET_RESULT':
      return {
        ...state,
        submissionStatus: action.payload.status,
        submissionOutput: action.payload.output
      };
    case 'RESET':
      return {
        query: '',
        submissionId: null,
        submissionStatus: null,
        submissionOutput: null
      };
    default:
      return state;
  }
};

interface AnswerCheckerProps {
  questionId: string;
  expectedOutput: string;
}

const AnswerChecker: React.FC<AnswerCheckerProps> = ({
  questionId,
  expectedOutput
}) => {
  const [state, dispatch] = useReducer(reducer, {
    query: '',
    submissionId: null,
    submissionStatus: null,
    submissionOutput: null
  });

  // Submit the SQL query
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await makeSubmission(questionId, state.query);
    dispatch({ type: 'SUBMIT', submissionId: data.id });
  };

  const handleQueryChange = (query: string) => {
    dispatch({ type: 'SET_QUERY', query });
  };

  const handleClear = () => {
    dispatch({ type: 'RESET' });
  };

  // Poll for the result
  useEffect(() => {
    if (!state.submissionId) return;

    const intervalId = setInterval(async () => {
      const data = await getSubmissionResult(state.submissionId);

      if (data.status !== 'pending') {
        clearInterval(intervalId);
        dispatch({ type: 'SET_RESULT', payload: data });
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [state.submissionId]);

  return (
    <div>
      <div className="relative">
        <CodeEditor handleChange={handleQueryChange} content={state.query} />
        <ClearButton onClick={handleClear} />
      </div>
      <SubmitButton
        innerText="Submit"
        loadingText="Checking..."
        isDisabled={state.query == '' || state.submissionStatus == 'pending'}
        isLoading={state.submissionStatus == 'pending'}
        onClick={handleSubmit}
      />
      {expectedOutput != 'admin' && <ExpectedOutput output={expectedOutput} />}
      {state.submissionStatus == 'error' && (
        <SqlError output={state.submissionOutput} />
      )}
      {state.submissionStatus == 'correct' && <Correct />}
      {state.submissionStatus == 'incorrect' && (
        <WrongOutput output={state.submissionOutput} />
      )}
      {state.submissionStatus == 'admin' && (
        <ExpectedOutput output={state.submissionOutput} />
      )}
    </div>
  );
};

export default AnswerChecker;
