import React from "react";
import { HeroSection } from "./HeroSection";
import { FeaturedCollections } from "./FeaturedCollections";
import { BentoGrid } from "./BentoGrid";
import { BrandStory } from "./BrandStory";
import { FeaturedProducts } from "./FeaturedProducts";
import { BespokeCTA } from "./BespokeCTA";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BentoGrid />
      <BrandStory />
      <FeaturedProducts />
      <BespokeCTA />
    </>
  );
};
