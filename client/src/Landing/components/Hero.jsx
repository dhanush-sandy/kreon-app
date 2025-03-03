import React from "react";
import {
  ArrowRight,
  Check,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Capture ideas, <span className="text-amber-500">organize life</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Notely helps you capture and organize ideas, projects, and to-dos so
            nothing falls through the cracks.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors flex items-center justify-center"
            >
              Get Started Free <ArrowRight size={18} className="ml-2" />
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium text-lg transition-colors">
              Watch Demo
            </button>
          </div>

          <div className="mt-8 flex items-center text-sm text-gray-500">
            <Check size={16} className="text-green-500 mr-2" />
            No credit card required
            <span className="mx-3">•</span>
            <Check size={16} className="text-green-500 mr-2" />
            Free 14-day trial
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>

            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Notely App Interface"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
