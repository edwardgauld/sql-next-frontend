'use client';
import React, { useState, useEffect } from 'react';
import { getLesson } from '@/app/api';
import ContentRenderer from '../../../components/ContentRenderer';
import { LessonType } from '@/app/types';

interface LessonProps {
  id: string;
}

const LessonRenderer: React.FC<LessonProps> = ({ id }) => {
  const [lesson, setLesson] = useState<LessonType | null>(null);

  useEffect(() => {
    async function fetchLesson() {
      const data = await getLesson(id);
      setLesson(data);
    }
    fetchLesson();
  }, [id]);

  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400">
      {lesson && <ContentRenderer content={lesson['content']} />}
    </div>
  );
};

export default LessonRenderer;
