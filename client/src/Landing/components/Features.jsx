import React from "react";
import {
  Check,
  PenLine,
  Bell,
  Calendar,
} from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Everything you need in one place
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Notely combines note-taking, task management, and reminders in one
          beautiful, intuitive interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
            <PenLine className="text-amber-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Rich Note Taking
          </h3>
          <p className="text-gray-600">
            Create beautiful notes with rich formatting, drawings, and images.
            Organize them your way.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <Bell className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Smart Reminders
          </h3>
          <p className="text-gray-600">
            Never miss a deadline with customizable reminders via email or
            WhatsApp notifications.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
            <Calendar className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Task Management
          </h3>
          <p className="text-gray-600">
            Turn your notes into actionable tasks. Track progress and stay
            organized.
          </p>
        </div>
      </div>

      <div className="mt-20">
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Express your creativity with drawing tools
              </h3>
              <p className="text-gray-700 mb-6">
                Notely's drawing canvas lets you sketch ideas, create diagrams,
                or just doodle. With multiple tools and colors, your creativity
                has no limits.
              </p>
              <ul className="space-y-3">
                {[
                  "Multiple drawing tools",
                  "Color customization",
                  "Easy sharing",
                  "Seamless integration with notes",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check size={18} className="text-amber-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544819679-57b273d6a2a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  alt="Drawing Tools"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
