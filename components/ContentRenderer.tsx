import React from 'react';
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element
} from 'html-react-parser';

interface ContentProps {
  content: string;
}

const ContentRenderer: React.FC<ContentProps> = ({ content }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && 'name' in domNode) {
        switch (domNode.name) {
          case 'table':
            return (
              <table className="table-auto m-1 border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                {domToReact(domNode.children, options)}
              </table>
            );
          case 'thead':
            return (
              <thead className="bg-gray-100 dark:bg-gray-700">
                {domToReact(domNode.children, options)}
              </thead>
            );
          case 'tr':
            return <tr>{domToReact(domNode.children, options)}</tr>;
          case 'th':
            return (
              <th className="border border-gray-300 dark:border-gray-500 p-1">
                {domToReact(domNode.children, options)}
              </th>
            );
          case 'td':
            return (
              <td className="border border-gray-300 dark:border-gray-500 p-1">
                {domToReact(domNode.children, options)}
              </td>
            );
          default:
            break;
        }
      }
    }
  };

  return <div>{parse(content, options)}</div>;
};

export default ContentRenderer;
