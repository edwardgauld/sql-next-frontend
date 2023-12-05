'use client';
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Head from 'next/head';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const TextEditor = (props: { handleChange: (value: string) => void, content: string }) => {

  const [editorContent, setEditorContent] = useState(props.content);
  const handleChange = props.handleChange;

  const config = {
    readonly: false,
  };

  useEffect(() => {
    setEditorContent(props.content);
  }, [props.content]);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jodit/3.6.1/jodit.min.css"/>
      </Head>
      <JoditEditor
        value={editorContent}
        config={config}
        onBlur={(newContent: string) => {
          handleChange(newContent);
          setEditorContent(newContent);
        }} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default TextEditor;
