'use client';
import React, { useState, useEffect } from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem('sidebarState');
    if (storedState) {
      setIsHidden(JSON.parse(storedState));
    }
  }, []);

  return (
    <div
      id="menu"
      className={`top-0 left-0 bottom-0 w-full sm:w-64 sm:h-screen bg-white border-r border-gray-200 pb-10 overflow-y-auto scrollbar-y dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700 ${
        isHidden ? 'hidden' : ''
      }`}
    >
      <nav className="pl-2 pt-2 w-full flex flex-col flex-wrap">{children}</nav>
    </div>
  );
};

export const SidebarToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem('sidebarState');
    if (storedState) {
      setIsOpen(JSON.parse(storedState));
    }
  }, []);

  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.toggle('hidden');
      setIsOpen(!isOpen);
      localStorage.setItem('sidebarState', JSON.stringify(!isOpen));
    }
  };

  return (
    <>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex sm:w-64 cursor-pointer items-center justify-between px-4 py-2 text-gray-500 dark:text-white hover:bg-gray-100 hover:text-gray-700 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={toggleMenu}
        >
          <span className="text-sm font-medium"> Menu </span>
          <span className={`shrink-0 ${isOpen ? '-rotate-180' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
      </details>
    </>
  );
};
