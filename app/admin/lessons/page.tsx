'use client';
import React, { useEffect, useState } from 'react';
import LessonRenderer from '../components/LessonRenderer';
import { LessonPicker } from '../components/SearchableSelectMenus';
import { LessonType } from '@/app/types';
import { Button } from '@/components/Buttons';
import { deleteLesson } from '@/app/api';
import Modal from '@/components/Modals';
import { Sidebar } from '@/components/Sidebars';

export default function Page() {
  const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);

  const handleSelectedLessonChange = (lesson: LessonType) => {
    setSelectedLesson(lesson);
  };

  const handleDeleteLesson = () => {
    deleteLesson(selectedLesson.id);
    setSelectedLesson(null);
  };

  return (
    <div className="sm:flex flex-row">
      <Sidebar title="Lessons">
        <LessonPicker
          selectedLesson={selectedLesson}
          onLessonChange={handleSelectedLessonChange}
        />
      </Sidebar>
      <div className="p-1">
        <Button
          innerText="New Lesson"
          onClick={() => window.open('/admin/lessons/create')}
        />
        {selectedLesson && (
          <div className="pt-1">
            <Modal
              title="Delete Lesson"
              message="Are you sure you want to delete this lesson?"
              onConfirm={handleDeleteLesson}
              openButtonInnerText="Delete"
              confirmButtonInnerText="Delete"
            />
            <Button
              innerText="Edit"
              onClick={() =>
                window.open(`/admin/lessons/edit?id=${selectedLesson.id}`)
              }
            />
            <LessonRenderer id={selectedLesson.id} />
          </div>
        )}
      </div>
    </div>
  );
}
