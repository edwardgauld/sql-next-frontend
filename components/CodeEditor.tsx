'use client';
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { PostgreSQL, sql } from '@codemirror/lang-sql';

function CodeEditor(props: {
  handleChange: (value: string) => void;
  content: string;
}) {
  const handleChange = props.handleChange;
  const onChange = React.useCallback(
    (value: any, viewUpdate: any) => {
      handleChange(value);
    },
    [handleChange]
  );
  let theme: 'light' | 'dark' = 'light'; // default to light theme
  if (typeof window !== 'undefined') {
    // now we know we're on the client side, it's safe to access window
    theme = window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
  return (
    <CodeMirror
      className="rounded-lg"
      value={props.content}
      height="200px"
      theme={theme}
      extensions={[sql({ dialect: PostgreSQL })]}
      onChange={onChange}
      basicSetup={{
        autocompletion: false
      }}
    />
  );
}
export default CodeEditor;
