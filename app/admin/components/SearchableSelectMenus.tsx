'use client';
import React, { useState, useEffect } from 'react';
import { QuestionType } from '@/app/types';
import { getAllQuestions, getAllLessons, getAllSkills } from '@/app/api';

interface Option {
  id: string;
  content: string;
  skills?: string[];
}

interface SingleSelectProps {
  options: Option[];
  selected: Option | null;
  onChange: (selected: Option) => void;
}

function SingleSelect({ options, selected, onChange }: SingleSelectProps) {
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter((option) =>
    option.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleOptionChange = (option: Option) => {
    onChange(option);
  };

  return (
    <div className="relative">
      <div className="grid space-y-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          placeholder="Search..."
        />
        {filteredOptions.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className="max-w-xs flex p-3 block w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          >
            <input
              id={option.id}
              type="radio"
              name={option.id}
              className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              checked={selected ? selected.id === option.id : false}
              onChange={() => handleOptionChange(option)}
            />
            <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
              {option.content.substring(0, 50)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}


interface MultiSelectProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

function MultiSelect({ options, title, selectedOptions, onChange }: MultiSelectProps) {
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleOptionChange = (option: string) => {
    let nextSelected = [];
    if (selectedOptions.includes(option)) {
      nextSelected = selectedOptions.filter((o) => o !== option);
    } else {
      nextSelected = [...selectedOptions, option];
    }
    // setSelected(nextSelected);
    onChange(nextSelected); // Call the onChange prop whenever the selected options change
  };

  return (
    <ul
      className="hs-accordion hs-accordion-group"
      id="projects-accordion"
      data-hs-accordion-always-open
    >
      {title && (
        <a className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white">
          {title}
          <svg
            className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
          <svg
            className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
        </a>
      )}
      <div
        id="projects-accordion-sub"
        className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
      >
        <input
          className=" py-2 px-3 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul className="pt-2 pl-2">
          {filteredOptions.map((option) => (
            <li
              className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300"
              key={option}
            >
              <input
                id={option}
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              <label htmlFor={option}>{option}</label>
            </li>
          ))}
        </ul>
      </div>
    </ul>
  );
}

interface CombinedMenuProps {
  singleOptions: Option[];
  multiOptions: string[];
  selectedSingle: Option | null; // Add this line
  onSingleSelectChange: (selected: Option) => void;
}

function CombinedMenu({
  singleOptions,
  multiOptions,
  selectedSingle,
  onSingleSelectChange
}: CombinedMenuProps) {
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [newSelectedMulti, setNewSelectedMulti] = useState<string[]>([]);

  useEffect(() => {
    setSelectedMulti(newSelectedMulti);
  }, [newSelectedMulti]);

  const filteredSingleOptions =
  selectedMulti.length > 0
    ? singleOptions.filter((option) =>
        selectedMulti.every((skill) => option.skills?.includes(skill))
      )
    : singleOptions;

  return (
    <nav className="p-6 w-full flex flex-col flex-wrap">
      <ul className="space-y-1.5">
        <MultiSelect
          title="Skills"
          options={multiOptions}
          selectedOptions={selectedMulti}
          onChange={setNewSelectedMulti}
        />
        <SingleSelect 
          options={filteredSingleOptions} 
          selected={selectedSingle}
          onChange={onSingleSelectChange} 
        />
      </ul>
    </nav>
  );
}



interface QuestionPickerProps {
  onQuestionChange: (selected: Option) => void;
  selectedQuestion: Option | null;
}

export function QuestionPicker({ onQuestionChange, selectedQuestion }: QuestionPickerProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await getAllQuestions();
      setQuestions(data);
    };
    getQuestions();
  }, []);

  useEffect(() => {
    const getSkills = async () => {
      const data = await getAllSkills();
      const skillNames = data.map((skill: { name: string }) => skill.name);
      setSkills(skillNames);
    };
    getSkills();
  }, []);

  return (
    <CombinedMenu
      singleOptions={questions}
      multiOptions={skills}
      selectedSingle={selectedQuestion} // Add this line
      onSingleSelectChange={onQuestionChange}
    />
  );
}


interface LessonPickerProps {
  onLessonChange: (selected: Option) => void;
  selectedLesson: Option | null;
}

export function LessonPicker({ onLessonChange, selectedLesson }: LessonPickerProps) {
  const [lessons, setLessons] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    const getLessons = async () => {
      const data = await getAllLessons();
      data.map((item: any) => {  
        item.content = item.name;
        return item;
      })
      setLessons(data);
    };
    getLessons();
  }, []);

  useEffect(() => {
    const getSkills = async () => {
      const data = await getAllSkills();
      const skillNames = data.map((skill: { name: string }) => skill.name);
      setSkills(skillNames);
    };
    getSkills();
  }, []);

  return (
    <CombinedMenu
      singleOptions={lessons}
      multiOptions={skills}
      selectedSingle={selectedLesson}
      onSingleSelectChange={onLessonChange}
    />
  )
}


interface SkillsPickerProps {
  onChange: (selected: string[]) => void;
  selected: string[];
}

export function SkillsPicker({ onChange, selected }: SkillsPickerProps) {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const getSkills = async () => {
      const data = await getAllSkills();
      const skillNames = data.map((skill: { name: string }) => skill.name);
      setSkills(skillNames);
    };
    getSkills();
  }, []);

  return (
    <MultiSelect title="Select Skills" options={skills} selectedOptions={selected} onChange={onChange} />
  );
}

// interface ModulePickerProps {
//   onModuleChange: (selected) => void;
//   selectedModule: any;
// }

// export function ModulePicker({ onModuleChange, selectedModule }: ModulePickerProps) {
  
// }