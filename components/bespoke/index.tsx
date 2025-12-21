"use client";

import { BespokeHeader } from "./BespokeHeader";
import { ProcessFeatures } from "./ProcessFeatures";
import { CustomizeExistingOption } from "./CustomizeExistingOption";
import { AIVisualizerOption } from "./AIVisualizerOption";
import { FullyBespokeOption } from "./FullyBespokeOption";

export const CustomRugs: React.FC = () => {
  return (
    <div className="pb-24">
      <BespokeHeader />

      <div className="max-w-7xl mx-auto px-6 mt-16 space-y-24">
        <ProcessFeatures />
        <CustomizeExistingOption />
        <AIVisualizerOption />
        <FullyBespokeOption />
      </div>
    </div>
  );
};

