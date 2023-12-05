import React from 'react';
import Link from 'next/link';

type ModuleItem = {
  lesson?: string;
  question?: string;
};

const ModuleContentsList: React.FC<{
  moduleContents: ModuleItem[];
  currentPosition: number;
  currentModule: string;
}> = ({ moduleContents, currentPosition, currentModule }) => {
  const selectedItem = moduleContents[currentPosition];

  let questionCount = 0;

  return (
    <ul className="mt-3 mr-2">
      {moduleContents.map((item, index) => {
        if (item.lesson) {
          questionCount = 0;
        }
        if (item.question) {
          questionCount++;
        }
        return (
          <Link key={index} href={`/course/${currentModule}/${index + 1}`}>
            <li
              className={`${
                item === selectedItem
                  ? 'bg-blue-200 dark:bg-blue-800 text-blue-500 dark:text-white'
                  : 'text-black dark:text-gray-300'
              } ${
                item.lesson && item === selectedItem
                  ? 'font-bold'
                  : 'font-normal'
              } ${
                item.question ? 'ml-5' : ''
              } cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded`}
            >
              {item.lesson || `Practice ${questionCount}`}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default ModuleContentsList;
