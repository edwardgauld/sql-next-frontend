import React from 'react';
import { getCourseMenu } from '@/app/api';
import { Sidebar } from '@/components/Sidebars';
import Link from 'next/link';
import ModuleContentsList from './ModuleContentsList';
import { SidebarToggle } from '@/components/Sidebars';
import { NextButton, PrevButton } from '@/components/Buttons';
import { notFound } from 'next/navigation'

interface CourseItem {
  lesson?: string;
  question?: string;
}

interface CourseMenu {
  module_names: string[];
  module_contents: {
    [key: string]: CourseItem[];
  };
}

interface ModulePosition {
  moduleName: string;
  position: number;
}

interface DropdownProps {
  moduleNames: string[];
  currentModule: string;
}

const Dropdown: React.FC<DropdownProps> = ({ moduleNames, currentModule }) => {
  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-default"
        type="button"
        className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      >
        {currentModule}
        <svg
          className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
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
          />
        </svg>
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-61 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
        aria-labelledby="hs-dropdown-default"
      >
        {moduleNames.map((item, index) => (
          <Link
            key={index}
            href={`/course/${item}/1`}
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            {index + 1}. {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

const getNextUnit = (
  courseMenu: CourseMenu,
  moduleName: string,
  position: string
): ModulePosition | null => {
  // Convert position to a number
  let pos = Number(position);
  // Check if the module name exists in the data
  if (courseMenu.module_contents.hasOwnProperty(moduleName)) {
    // Check if the next position exists in the module contents
    if (pos < courseMenu.module_contents[moduleName].length) {
      // Return the module name and the next position
      return { moduleName: moduleName, position: pos + 1 };
    } else {
      // Find the index of the current module
      var currentModuleIndex = courseMenu.module_names.indexOf(moduleName);
      // Check if there is a next module
      if (currentModuleIndex < courseMenu.module_names.length - 1) {
        // Get the next module name
        var nextModuleName = courseMenu.module_names[currentModuleIndex + 1];
        // Return the next module name and the first position
        return { moduleName: nextModuleName, position: 1 };
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
};

const getPreviousUnit = (
  courseMenu: CourseMenu,
  moduleName: string,
  position: string
): ModulePosition | null => {
  // Convert position to a number
  let pos = Number(position);
  // Check if the module name exists in the data
  if (courseMenu.module_contents.hasOwnProperty(moduleName)) {
    // Check if the previous position exists in the module contents
    if (pos > 1) {
      // Return the module name and the previous position
      return { moduleName: moduleName, position: pos - 1 };
    } else {
      // Find the index of the current module
      var currentModuleIndex = courseMenu.module_names.indexOf(moduleName);
      // Check if there is a previous module
      if (currentModuleIndex > 0) {
        // Get the previous module name
        var previousModuleName =
          courseMenu.module_names[currentModuleIndex - 1];
        // Return the previous module name and the last position
        return {
          moduleName: previousModuleName,
          position: courseMenu.module_contents[previousModuleName].length
        };
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
};

const isValidPosition = (
  courseMenu: CourseMenu,
  moduleName: string,
  position: number
): boolean => {
  // Check if the module name exists in the data
  if (courseMenu.module_contents.hasOwnProperty(moduleName)) {
    // Check if the position is within the range of the module contents
    if (
      position >= 1 &&
      position <= courseMenu.module_contents[moduleName].length
    ) {
      return true;
    }
  }
  return false;
};

export default async function CourseLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { moduleName: string; position: string };
}) {

  const courseMenu = await getCourseMenu();
  const decodedModuleName = decodeURIComponent(params.moduleName);

  const isPositionValid = isValidPosition(
    courseMenu,
    decodedModuleName,
    Number(params.position)
  );

  if (!isPositionValid) {
    notFound();
  }

  const nextUnit = getNextUnit(courseMenu, decodedModuleName, params.position);
  const previousUnit = getPreviousUnit(
    courseMenu,
    decodedModuleName,
    params.position
  );

  return (
    <>
      <header className="z-50 w-full bg-white text-sm border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <nav
          className="w-full flex items-center justify-between"
          aria-label="Global"
        >
          <SidebarToggle />
          <div className="flex flex-row items-center gap-5 justify-end pr-1">
            {previousUnit && (
              <PrevButton
                navlink={`/course/${previousUnit.moduleName}/${previousUnit.position}`}
              />
            )}
            {nextUnit && (
              <NextButton
                navlink={`/course/${nextUnit.moduleName}/${nextUnit.position}`}
              />
            )}
          </div>
        </nav>
      </header>
      {courseMenu && (
        <div className="sm:flex flex-row">
          <Sidebar>
            <Dropdown
              moduleNames={courseMenu.module_names}
              currentModule={decodedModuleName}
            />
            <ModuleContentsList
              moduleContents={courseMenu.module_contents[decodedModuleName]}
              currentPosition={Number(params.position) - 1}
              currentModule={params.moduleName}
            />
          </Sidebar>

          <section className="flex-auto">{children}</section>
        </div>
      )}
    </>
  );
}
