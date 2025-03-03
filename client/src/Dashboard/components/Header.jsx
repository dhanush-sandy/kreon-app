import React from "react";
import { Search, RefreshCw, Calendar, MoreHorizontal } from "lucide-react";
import {SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'

const Header = () => {
  return (
    <div className="w-full h-16 px-6 flex items-center justify-between border-b border-gray-100">
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full py-2 pl-10 pr-4 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <RefreshCw size={18} className="text-gray-500" />
        </button>
        <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Calendar size={18} className="text-gray-500" />
        </button>
        <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <MoreHorizontal size={18} className="text-gray-500" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
