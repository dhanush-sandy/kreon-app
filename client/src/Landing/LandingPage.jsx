import React from "react";
import LandingHeader from "./components/LandingHeader";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import CallToAction from "./components/CallToActions";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <LandingHeader />
      <section className=" max-w-7xl mx-auto">
        <Hero />
        <Features />
        <Testimonials />
        <Faq />
        <CallToAction />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
