import React from 'react'
import { Sparkles } from "lucide-react";

const CallToActions = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Sparkles className="text-white" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your note-taking experience?
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Join thousands of users who have already improved their productivity
            with Notely.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="bg-white text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              Get Started Free
            </button>
            <button className="border border-white text-white hover:bg-amber-600 px-6 py-3 rounded-lg font-medium text-lg transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToActions