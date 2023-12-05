import React from 'react';

interface BasicCardProps {
  children: React.ReactNode;
}

export const BasicCard: React.FC<BasicCardProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400">
      {children}
    </div>
  );
};

export const QuestionCard: React.FC<BasicCardProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-white border dark:border-gray-700 shadow-sm rounded-t-xl p-4 md:p-5 dark:bg-gray-800 dark:text-gray-400">
      {children}
    </div>
  );
};
