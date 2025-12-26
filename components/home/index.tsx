import React from "react";
import { HeroSection } from "./HeroSection";
import { FeaturedCollections } from "./FeaturedCollections";
import { BrandStory } from "./BrandStory";
import { FeaturedProducts } from "./FeaturedProducts";
import { ColorShowcase } from "./ColorShowcase";
import { BespokeCTA } from "./BespokeCTA";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BrandStory />
      <ColorShowcase />
      <FeaturedProducts />
      <BespokeCTA />
    </>
  );
};
