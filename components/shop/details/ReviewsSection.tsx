"use client";

import React from "react";
import { motion } from "motion/react";
import { Star, ThumbsUp, ThumbsDown, Edit3 } from "lucide-react";
import { StarRating } from "./StarRating";
import { Button } from "@/components/ui/button";

const REVIEWS = [
  {
    id: 1,
    author: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    date: "2 days ago",
    title: "Absolutely stunning rug",
    text: "The quality of the wool is incredible and it feels so soft underfoot. It looks even better in person than on the site. The delivery was surprisingly fast to New York.",
    helpful: 12,
  },
  {
    id: 2,
    author: "James Wilson",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    date: "1 week ago",
    title: "Worth every penny",
    text: "I was hesitant to buy a rug online, but the detail photos gave me confidence. The colors are exactly as shown. Packaging was secure and robust.",
    helpful: 8,
  },
  {
    id: 3,
    author: "Elena K.",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    rating: 4,
    date: "2 weeks ago",
    title: "Beautiful craftsmanship",
    text: "Takes a bit of time to settle flat, but that is expected with hand-knotted rugs. The customer service team was very helpful answering my questions about cleaning.",
    helpful: 3,
  },
  {
    id: 4,
    author: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 5,
    date: "1 month ago",
    title: "A masterpiece",
    text: "This is not just a rug, it's art. The knot density is evident in the crispness of the pattern.",
    helpful: 5,
  },
];

export const ReviewsSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-t border-gray-200 pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-24 bg-gray-50 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
          {/* Reviews Summary Column */}
          <div className="md:col-span-4 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-2">Reviews</h2>
              <div className="flex items-center gap-3 sm:gap-4 mb-2">
                <span className="text-4xl sm:text-5xl md:text-6xl font-serif text-primary">4.8</span>
                <div className="space-y-1">
                  <StarRating rating={5} size="md" />
                  <p className="text-xs sm:text-sm text-muted">24 reviews</p>
                </div>
              </div>
            </div>

            {/* Stats Bars */}
            <div className="space-y-2 sm:space-y-3">
              {[
                { stars: 5, count: "5.21k", percent: "80%" },
                { stars: 4, count: "2.44k", percent: "15%" },
                { stars: 3, count: "523", percent: "3%" },
                { stars: 2, count: "423", percent: "1%" },
                { stars: 1, count: "80", percent: "1%" },
              ].map((stat) => (
                <div
                  key={stat.stars}
                  className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm"
                >
                  <span className="w-3 font-medium">{stat.stars}</span>
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
                  <div className="flex-1 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: stat.percent }}
                    />
                  </div>
                  <span className="w-8 sm:w-10 text-right text-muted text-[10px] sm:text-xs">
                    {stat.count}
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="default"
              size="default"
              className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 text-xs sm:text-sm"
            >
              <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Write a review
            </Button>
          </div>

          {/* Review List Column */}
          <div className="md:col-span-8 space-y-6 sm:space-y-8">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-primary">
                        {review.author}
                      </h4>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted mt-1">
                        <span>{review.date}</span>
                        <span>•</span>
                        <span className="text-green-600 font-medium">
                          Verified Purchase
                        </span>
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                <h5 className="font-bold text-sm sm:text-base mb-1.5 sm:mb-2">{review.title}</h5>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {review.text}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted">
                  <span className="font-medium text-[10px] sm:text-xs uppercase tracking-wide">
                    Was this review helpful?
                  </span>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Yes ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <ThumbsDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> No
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination Mock */}
            <div className="flex justify-center gap-1.5 sm:gap-2 pt-4">
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary font-bold hover:bg-gray-50 text-xs sm:text-sm">
                1
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-transparent flex items-center justify-center text-muted hover:bg-gray-50 text-xs sm:text-sm">
                2
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-transparent flex items-center justify-center text-muted hover:bg-gray-50 text-xs sm:text-sm">
                3
              </button>
              <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-muted text-xs sm:text-sm">
                ...
              </span>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-transparent flex items-center justify-center text-muted hover:bg-gray-50 text-xs sm:text-sm">
                8
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

