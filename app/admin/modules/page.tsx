'use client';
// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import ContentRenderer from '@/components/ContentRenderer';
import {
  getLesson,
  getQuestion,
  getAllModules,
  updateModuleLessons,
  createModule,
  deleteModule
} from '@/app/api';
import DraggableList from '../components/DraggableList';
import { LessonPicker } from '../components/SearchableSelectMenus';
import { Button } from '@/components/Buttons';
import { InputText } from '../components/InputText';
import ModulePicker from '../components/ModulePicker';
import { BasicCard } from '@/components/Cards';
import Modal from '@/components/Modals';

// Define the type for a module item
type ModuleItem = {
  type: string;
  id: string;
  name?: string;
};

// Define the props for the ModuleViewer component
interface ModuleViewerProps {
  moduleContents: ModuleItem[];
}

// The ModuleViewer component displays the contents of a module
const ModuleViewer: React.FC<ModuleViewerProps> = ({ moduleContents }) => {
  // State for the currently selected item and its content
  const [selectedItem, setSelectedItem] = useState<ModuleItem | null>(null);
  const [selectedItemContent, setSelectedItemContent] = useState<string>('');

  // Fetch the question or lesson depending on selectedItem
  useEffect(() => {
    if (!selectedItem) return;
    if (selectedItem.type === 'lesson') {
      getLesson(selectedItem.id).then((lesson) =>
        setSelectedItemContent(lesson.content)
      );
    } else if (selectedItem.type === 'question') {
      getQuestion(selectedItem.id).then((question) =>
        setSelectedItemContent(question.content)
      );
    }
  }, [selectedItem]);

  // Reset the selected item and its content when the module contents change
  useEffect(() => {
    setSelectedItem(null);
    setSelectedItemContent('');
  }, [moduleContents]);

  // Counter for the number of questions in a lesson
  let questionCount = 0;

  // Render the list of module contents and the content of the selected item
  return (
    <>
      <ul>
        {moduleContents.map((item, index) => {
          if (item.type === 'lesson') {
            questionCount = 0;
          }
          if (item.type === 'question') {
            questionCount++;
          }
          return (
            <li
              key={index}
              className={`${
                item === selectedItem
                  ? 'bg-blue-200 dark:bg-blue-800 text-blue-500 dark:text-white'
                  : 'text-black dark:text-gray-300'
              } ${
                item.type === 'lesson' && item === selectedItem
                  ? 'font-bold'
                  : 'font-normal'
              } ${
                item.type === 'question' ? 'ml-5' : ''
              } cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded`}
            >
              <div onClick={() => setSelectedItem(item)}>
                {item.name || `Practice ${questionCount}`}
              </div>
            </li>
          );
        })}
      </ul>
      {selectedItem && (
        <BasicCard>
          <ContentRenderer content={selectedItemContent} />
        </BasicCard>
      )}
    </>
  );
};

// Define the props for the ModuleEditor component
interface ModuleEditorProps {
  module: any;
}

// The ModuleEditor component allows the user to edit a module
const ModuleEditor: React.FC<ModuleEditorProps> = ({ module }) => {
  // State for the lessons in the module, the selected lesson, and the updated list of lesson IDs
  const [moduleLessons, setModuleLessons] = useState<ModuleItem[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<ModuleItem | null>(null);
  // When the module contents change, update the list of lessons and the updated list of lesson IDs
  useEffect(() => {
    const filteredModuleContents = module.contents
      .map((item: any) => {
        return { ...item, id: item.id.toString() };
      })
      .filter((item: any) => item.type === 'lesson');

    setModuleLessons(filteredModuleContents);
  }, [module.contents]);

  // Add the selected lesson to the list of lessons and the updated list of lesson IDs
  const addLesson = () => {
    if (
      selectedLesson &&
      !moduleLessons.find(
        (lesson) => lesson.id === selectedLesson.id.toString()
      )
    ) {
      setModuleLessons([
        ...moduleLessons,
        { ...selectedLesson, id: selectedLesson.id.toString() }
      ]);
      setSelectedLesson(null);
    }
  };

  // Remove a lesson from the list of lessons and the updated list of lesson IDs
  const removeLesson = (id: string) => {
    setModuleLessons(moduleLessons.filter((item) => item.id !== id));
  };

  // Update the lessons in the module using the updated list of lesson IDs
  const submitUpdateLessons = () => {
    // Create a list of lesson IDs from the list of lessons
    const lessonIds = moduleLessons.map((lesson) => lesson.id);
    // Update the lessons in the module
    try {
      updateModuleLessons(module.id, lessonIds);
      alert('Lessons updated successfully');
    } catch (error) {
      alert(error.message || 'An error occurred while updating the lessons');
    }
  };

  const handleDeleteModule = () => {
    try {
      deleteModule(module.id);
      alert('Module deleted successfully');
    } catch (error) {
      alert(error.message || 'An error occurred while deleting the module');
    }
  };

  // Render the lesson picker, add and update buttons, and the list of lessons
  return (
    <div>
      <LessonPicker
        selectedLesson={selectedLesson}
        onLessonChange={setSelectedLesson}
      />
      <Button innerText="Add Lesson" onClick={addLesson} />
      <Button innerText="Update" onClick={submitUpdateLessons} />
      {moduleLessons !== undefined && moduleLessons !== null && (
        <DraggableList
          items={moduleLessons}
          onDragEnd={setModuleLessons}
          onRemove={removeLesson}
        />
      )}
      <Modal
        title="Delete Module"
        message="Are you sure you want to delete this module?"
        onConfirm={handleDeleteModule}
        openButtonInnerText="Delete"
        confirmButtonInnerText="Delete"
      />
    </div>
  );
};

const ModuleCreator = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  // Create the module
  const handleSubmit = async () => {
    try {
      await createModule({ name, description });
      alert('Module created successfully');
    } catch (error) {
      alert(error.message || 'An error occurred while creating the module');
    }
  };

  return (
    <>
      <InputText
        title="Module Name"
        content={name}
        onChange={handleNameChange}
      />
      <InputText
        title="Description"
        content={description}
        onChange={handleDescriptionChange}
      />
      <Button innerText="Create" onClick={handleSubmit} />
    </>
  );
};

// The main component for the page
const page = () => {
  // State for the list of modules and the selected module ID
  const [modules, setModules] = useState<any[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // Fetch the list of modules when the component mounts
  useEffect(() => {
    const fetchModules = async () => {
      const data = await getAllModules();
      setModules(data);
    };
    fetchModules();
  }, []);

  // Find the selected module from the list of modules
  const selectedModule = modules.find(
    (module) => module.id == selectedModuleId
  );

  // Render the tabs and the corresponding content for each tab
  return (
    <>
      {modules && (
        <>
          <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
            <button
              type="button"
              className="hs-tab-active:bg-blue-600 hs-tab-active:text-white basis-0 grow py-3 px-4 inline-flex justify-center items-center gap-2 bg-transparent text-center text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 dark:hover:text-gray-400 active"
              id="equal-width-elements-item-1"
              data-hs-tab="#equal-width-elements-1"
              aria-controls="equal-width-elements-1"
              role="tab"
            >
              View
            </button>
            <button
              type="button"
              className="hs-tab-active:bg-blue-600 hs-tab-active:text-white basis-0 grow py-3 px-4 inline-flex justify-center items-center gap-2 bg-transparent text-center text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 dark:hover:text-gray-400 dark:hover:text-gray-300"
              id="equal-width-elements-item-2"
              data-hs-tab="#equal-width-elements-2"
              aria-controls="equal-width-elements-2"
              role="tab"
            >
              Edit
            </button>
            <button
              type="button"
              className="hs-tab-active:bg-blue-600 hs-tab-active:text-white basis-0 grow py-3 px-4 inline-flex justify-center items-center gap-2 bg-transparent text-center text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 dark:hover:text-gray-400 dark:hover:text-gray-300"
              id="equal-width-elements-item-3"
              data-hs-tab="#equal-width-elements-3"
              aria-controls="equal-width-elements-3"
              role="tab"
            >
              Create
            </button>
          </nav>

          <div className="mt-3">
            <div
              id="equal-width-elements-1"
              role="tabpanel"
              aria-labelledby="equal-width-elements-item-1"
            >
              <ModulePicker
                modules={modules}
                selectedModuleId={selectedModuleId}
                setSelectedModuleId={setSelectedModuleId}
              />
              {selectedModule && (
                <ModuleViewer moduleContents={selectedModule.contents} />
              )}
            </div>
            <div
              id="equal-width-elements-2"
              className="hidden"
              role="tabpanel"
              aria-labelledby="equal-width-elements-item-2"
            >
              <ModulePicker
                modules={modules}
                selectedModuleId={selectedModuleId}
                setSelectedModuleId={setSelectedModuleId}
              />
              {selectedModule && <ModuleEditor module={selectedModule} />}
            </div>
            <div
              id="equal-width-elements-3"
              className="hidden"
              role="tabpanel"
              aria-labelledby="equal-width-elements-item-3"
            >
              <ModuleCreator />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
