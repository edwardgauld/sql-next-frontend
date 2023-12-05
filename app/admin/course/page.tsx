"use client";
import React, { useState, useEffect } from 'react';
import DraggableList from '../components/DraggableList';
import ModulePicker from '../components/ModulePicker';
import { getCourseModules, getAllModules, updateCourseModules } from '@/app/api';
import { Button } from '@/components/Buttons';

interface Module {
    id: string;
    name: string;
}

const page = () => {
    // Define the types for modules and selectedModule
    const [courseModules, setCourseModules] = useState<Module[]>([]);
    const [allModules, setAllModules] = useState<Module[]>([]);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

    useEffect(() => {
      // Function to fetch modules from the API
      const loadCourseModules = async () => {
        let data: Module[] = await getCourseModules('1');
        // Convert the id of each module to a string
        data = data.map(module => ({...module, id: module.id.toString()}));
        setCourseModules(data);
      };

      const loadAllModules = async () => {
        let data: Module[] = await getAllModules();
        data = data.map(module => ({...module, id: module.id.toString()}));
        setAllModules(data);
      };
      // Call the functions to fetch the data
      loadCourseModules();
      loadAllModules();
    }, []);

    const addModule = () => {
        if (selectedModuleId && !allModules.find(module => module.name === selectedModuleId)) {
          // Find the module with selectedModuleId from allModules
          const moduleToAdd = allModules.find(module => module.id === selectedModuleId);
          // Check if moduleToAdd is not undefined before adding it to courseModules
          if (moduleToAdd) {
            setCourseModules(oldModules => [...oldModules, moduleToAdd]);
          }
          setSelectedModuleId(null);
        }
      };

    // Fix the argument types for removeModule
    const removeModule = (id: string) => {
      setCourseModules(oldModules => oldModules.filter(moduleId => moduleId.id !== id));
    };

    const handleSubmitUpdate = async () => {
      // Make a list of all the course module ids
      const moduleIds = courseModules.map(module => module.id);
      // Update the course modules
      try {
        await updateCourseModules(moduleIds);
        alert('Course modules updated successfully');
      } catch (error) {
        alert(error.message || 'An error occurred while updating the course modules');
      }
    };
    
    return (
        <div>
        {allModules && allModules.length > 0 && <ModulePicker modules={allModules} selectedModuleId={selectedModuleId} setSelectedModuleId={setSelectedModuleId} />}
        <Button innerText='Add Module' onClick={addModule}/>
        <DraggableList items={courseModules} onDragEnd={setCourseModules} onRemove={removeModule} />
        <Button innerText="Update" onClick={handleSubmitUpdate} />
      </div>
    );
}

export default page;
