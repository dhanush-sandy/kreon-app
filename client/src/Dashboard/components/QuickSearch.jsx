// QuickSketch.js
import React from "react";

const QuickSketch = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium mb-3">Quick Sketch</h3>
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex flex-col space-y-4">
          <div className="w-full h-[200px] bg-white rounded border border-gray-200"></div>
          <div className="flex justify-between">
            <div className="flex space-x-1">
              <button className="w-5 h-5 rounded-full bg-gray-800"></button>
              <button className="w-5 h-5 rounded-full bg-red-500"></button>
              <button className="w-5 h-5 rounded-full bg-blue-500"></button>
              <button className="w-5 h-5 rounded-full bg-green-500"></button>
              <button className="w-5 h-5 rounded-full bg-yellow-500"></button>
            </div>
            <button className="text-xs bg-amber-500 text-white px-2 py-1 rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSketch;
