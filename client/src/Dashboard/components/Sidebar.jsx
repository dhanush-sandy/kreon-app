import React from 'react';
import { 
  Home, Bell, Link, Folder, Trash, Settings, LogOut, 
  PenLine
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-[80px] h-screen bg-white border-r border-gray-100 flex flex-col items-center py-6">
      <div className="mb-8">
        <div className="w-10 h-10 flex items-center justify-center">
          <PenLine className="text-orange-500" size={24} />
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-8 flex-1">
        <button className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
          <Home size={20} className="text-amber-600" />
        </button>
        
        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Bell size={20} className="text-gray-500" />
        </button>
        
        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Link size={20} className="text-gray-500" />
        </button>
        
        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Folder size={20} className="text-gray-500" />
        </button>
        
        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Trash size={20} className="text-gray-500" />
        </button>
      </div>
      
      <div className="flex flex-col items-center space-y-6 mt-auto">
        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Settings size={20} className="text-gray-500" />
        </button>
        
        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <LogOut size={20} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;