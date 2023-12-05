"use client";
import React, { useState } from "react";

// Define the props for the ModulePicker component
type ModulePickerProps = {
    modules: any[];
    selectedModuleId: string | null;
    setSelectedModuleId: (value: string | null) => void;
  };

const ModulePicker: React.FC<ModulePickerProps> = ({
    modules,
    selectedModuleId,
    setSelectedModuleId
  }) => {
    // Handle change event for the select input
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedModuleId(event.target.value);
    };
  
    // Render the select input with options for each module
    return (
      <select
        value={selectedModuleId || ''}
        onChange={handleChange}
        className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      >
        <option value="">Select Module</option>
        {modules.map((module, index) => (
          <option key={index} value={module.id}>
            {module.name}
          </option>
        ))}
      </select>
    );
  };

export default ModulePicker;