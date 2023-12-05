import React from 'react'

interface DashboardCardProps {
    title: string;
    description: string;
    link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, link }) => {
  return (
    <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800" href={link}>
    <div className="p-4 md:p-5">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
            {title}
          </h3>
          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
        <div className="pl-3">
          <svg className="w-3.5 h-3.5 text-gray-500" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  </a>
  )
}

export default DashboardCard