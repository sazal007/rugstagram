import React from "react";
import { HeroSection } from "./HeroSection";
import { FeaturedCollections } from "./FeaturedCollections";
import { BentoGrid } from "./BentoGrid";
import { BrandStory } from "./BrandStory";
import { FeaturedProducts } from "./FeaturedProducts";
import { ColorShowcase } from "./ColorShowcase";
import { BespokeCTA } from "./BespokeCTA";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <ColorShowcase />
      <BentoGrid />
      <BrandStory />
      <FeaturedProducts />
      <BespokeCTA />
    </>
  );
};
