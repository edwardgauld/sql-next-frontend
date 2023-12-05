'use client';
import React, { useState, useEffect } from 'react';
import { getQuestion } from '@/app/api';
import { QuestionType } from '@/app/types';
import ContentRenderer from '../../../components/ContentRenderer';

interface QuestionProps {
  id: string;
}

const QuestionRenderer: React.FC<QuestionProps> = ({ id }) => {
  const [question, setQuestion] = useState<QuestionType | null>(null);
  useEffect(() => {
    async function fetchQuestion() {
      const data = await getQuestion(id);
      setQuestion(data);
    }
    fetchQuestion();
  }, [id]);

  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400">
      {question && <ContentRenderer content={question['content']} />}
    </div>
  );
};

export default QuestionRenderer;
