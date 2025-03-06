// TaskManagement.js
import React from "react";
import { Maximize2 } from "lucide-react";

const TaskManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs text-blue-600 font-medium">
            Task Management
          </span>
          <h3 className="text-sm font-medium">
            Organize your tasks efficiently
          </h3>
        </div>
        <button className="p-1 rounded hover:bg-gray-100">
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex flex-col space-y-2">
          <div className="w-full h-[120px] bg-white rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
            <p className="text-sm text-gray-400">Task management preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
