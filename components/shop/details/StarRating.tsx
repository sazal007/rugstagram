"use client";

import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = "sm",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < rating
              ? "fill-primary text-primary"
              : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

