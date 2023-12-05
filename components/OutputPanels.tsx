import React from 'react';

interface OutputTableProps {
  output: string;
}

const OutputTable: React.FC<OutputTableProps> = ({ output }) => {
  const output_array = JSON.parse(output);

  let index = 0;
  const keyPrefix = 'a';
  function generateKey() {
    index = index + 1;
    return keyPrefix + index;
  }

  return (
    <table className="table-auto m-1 border-collapse border border-gray-300 dark:border-gray-700 text-sm">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr key={generateKey()}>
          {output_array[0].map((col) => {
            return (
              <th
                key={generateKey()}
                className="border border-gray-300 dark:border-gray-500 p-1"
              >
                {col}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {output_array.slice(1).map((row) => {
          return (
            <tr key={generateKey()}>
              {row.map((col) => {
                return (
                  <td
                    key={generateKey()}
                    className="border border-gray-300 dark:border-gray-500 p-1"
                  >
                    {col}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

interface OutputProps {
  output: string;
}

interface OutputPanelProps {
  output: string;
  icon: React.ReactNode;
  title: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output, icon, title }) => {
  function canParseJSON(s: string) {
    try {
      JSON.parse(s);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <details
      className="group [&_summary::-webkit-details-marker]:hidden border dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800"
      open
    >
      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300">
        <div className="flex items-center">
          {icon}
          <span className="text-sm font-medium"> {title} </span>
        </div>

        <span className="shrink-0 transition group-open:-rotate-180">
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
      <div className="overflow-x-auto">
        {canParseJSON(output) ? (
          <OutputTable output={output} />
        ) : (
          <p className="p-4 pt-0">{output}</p>
        )}
      </div>
    </details>
  );
};

export const ExpectedOutput: React.FC<OutputProps> = ({ output }) => {
  return (
    <OutputPanel
      title="Expected Output"
      output={output}
      icon={
        <svg
          className="h-4 w-4 text-blue-500 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
      }
    />
  );
};

export const WrongOutput: React.FC<OutputProps> = ({ output }) => {
  return (
    <OutputPanel
      title="Wrong Output"
      output={output}
      icon={
        <svg
          className="h-4 w-4 text-red-500 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      }
    />
  );
};

export const Correct = () => {
  return (
    <div
      className="bg-green-50 border border-green-200 text-sm text-green-600 font-bold rounded-md p-4"
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-4 w-4 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        </div>
        <div className="ml-3">Correct!</div>
      </div>
    </div>
  );
};

export const SqlError: React.FC<OutputProps> = ({ output }) => {
  return (
    <OutputPanel
      title="SQL Error"
      output={output}
      icon={
        <svg
          className="h-4 w-4 text-orange-500 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      }
    />
  );
};
