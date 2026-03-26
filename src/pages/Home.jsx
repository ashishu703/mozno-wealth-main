import React from "react";
import HeroSection from "../components/landingPage/HeroSection";
import StickyStepsSection from "../components/landingPage/ServiceStep";
import BlogSection from "../components/landingPage/BlogSection";
import FAQSection from "../components/landingPage/FAQSection";
import SocialMediaSection from "../components/landingPage/media";
import AnimatedGraphSection from "../components/landingPage/Graph";
import OurServicesSection from "../components/landingPage/OurServicesSection";
import TestimonialSection from "../components/landingPage/TestimonialSection";

const Home = () => {
  return (
    <div className="min-h-screen w-full pt-14 sm:pt-12 lg:pt-9">
      <HeroSection />
      <AnimatedGraphSection />
      <OurServicesSection />
      <StickyStepsSection />
      <TestimonialSection />
      <SocialMediaSection />
      <BlogSection />
      <FAQSection />
    </div>
  );
};

export default Home;