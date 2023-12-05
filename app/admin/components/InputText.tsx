import React from 'react';

interface InputTextProps {
    title: string;
    content: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText: React.FC<InputTextProps> = ({ title, content, onChange }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <label
          htmlFor="with-corner-hint"
          className="block text-sm font-medium mb-2 dark:text-white"
        >
          {title}
        </label>
      </div>
      <input
        value={content}
        onChange={onChange}
        type="text"
        id="with-corner-hint"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      >
      </input>
    </>
  );
};
