"use client";

import { Check } from "lucide-react";
import { CheckoutStep } from "./types";

interface CheckoutStepsProps {
  currentStep: number;
  steps: CheckoutStep[];
}

export function CheckoutSteps({ currentStep, steps }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 ${
              currentStep >= step.number
                ? "text-black"
                : "text-black/60"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                currentStep > step.number
                  ? "bg-primary text-primary-foreground"
                  : currentStep === step.number
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-4 h-4" />
              ) : (
                step.number
              )}
            </div>
            <span className="hidden sm:inline text-sm font-medium">
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && <div className="w-12 h-px bg-border" />}
        </div>
      ))}
    </div>
  );
}
