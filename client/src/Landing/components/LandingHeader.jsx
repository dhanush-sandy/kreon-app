import React from "react";
import { PenLine } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  const { isSignedIn } = useAuth();


  return (
    <nav className="container mx-auto max-w-7xl py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <PenLine className="text-amber-500 mr-2" size={28} />
          <span className="text-xl font-bold text-gray-800">Kreon</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-amber-500 transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-amber-500 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-gray-600 hover:text-amber-500 transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            className="text-gray-600 hover:text-amber-500 transition-colors"
          >
            FAQ
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center justify-center gap-2">
              <Link to="/dashboard">
                <button className="bg-orange-400 px-4 py-2 text-sm rounded-md font-medium text text-neutral-100 hover:bg-orange-400/90 transition-colors cursor-pointer">
                  Dashboard
                </button>
              </Link>
              <div className="hover:text-neutral-900 transition-colors px-4 py-2 cursor-pointer">
                <SignOutButton />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <div className="hover:text-neutral-900 transition-colors px-4 py-2 cursor-pointer">
                <SignInButton afterSignInUrl="/dashboard" />
              </div>
              <div className="bg-orange-400 px-4 py-2 text-sm rounded-md font-medium text-neutral-100 hover:bg-orange-400/90 transition-colors cursor-pointer">
                <SignUpButton afterSignUpUrl="/dashboard" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;
