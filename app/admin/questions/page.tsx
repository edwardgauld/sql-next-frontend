'use client';
import React, { useEffect, useState } from 'react';
import QuestionRenderer from '../components/QuestionRenderer';
import { QuestionPicker } from '../components/SearchableSelectMenus';
import { QuestionType } from '@/app/types';
import { Button } from '@/components/Buttons';
import { deleteQuestion } from '@/app/api';
import Modal from '@/components/Modals';
import { Sidebar } from '@/components/Sidebars';

export default function Page() {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(
    null
  );
  
  const handleSelectedQuestionChange = (question: QuestionType) => {
    setSelectedQuestion(question);
  };

  const handleDeleteQuestion = () => {
    if (selectedQuestion) {
      deleteQuestion(selectedQuestion.id);
      setSelectedQuestion(null);
    }
  };

  return (
    <div className="sm:flex flex-row">
      <Sidebar>
        <QuestionPicker
          selectedQuestion={selectedQuestion}
          onQuestionChange={handleSelectedQuestionChange}
        />
      </Sidebar>
      <div className="p-1">
        <Button
          innerText="New Question"
          onClick={() => window.open('/admin/questions/create')}
        />
        {selectedQuestion && (
          <div className="pt-1">
            <Modal
              title="Delete Question"
              message="Are you sure you want to delete this question?"
              onConfirm={handleDeleteQuestion}
              openButtonInnerText="Delete"
              confirmButtonInnerText="Delete"
            />
            <Button
              innerText="Edit"
              onClick={() =>
                window.open(`/admin/questions/edit?id=${selectedQuestion.id}`)
              }
            />
            <QuestionRenderer id={selectedQuestion.id} />
          </div>
        )}
      </div>
    </div>
  );
}
