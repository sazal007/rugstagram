"use client";

import React from "react";
import { motion } from "motion/react";
import { Star, Edit3 } from "lucide-react";
import { StarRating } from "./StarRating";
import { CustomButton } from "@/components/ui/custom-button";
import { useReviews, useCreateReview } from "@/hooks/use-review";
import { Review } from "@/types/review";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ReviewsSectionProps {
  productId: number;
  productSlug: string;
}

const InteractiveStarRating: React.FC<{
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}> = ({ rating, onRatingChange, size = "md" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= rating ? "fill-primary text-primary" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ productId, productSlug }) => {
  const [page, setPage] = React.useState(1);
  const { user } = useAuth();
  const { data: reviewsData, isLoading } = useReviews(productSlug, page);
  const { mutate: createReview, isPending: isSubmitting } = useCreateReview();

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [headline, setHeadline] = React.useState("");
  const [reviewText, setReviewText] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const reviews = reviewsData?.results || [];
  const totalReviews = reviewsData?.count || 0;

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc: number, rev: Review) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline || !reviewText) return;

    createReview({
      product_id: productId,
      user: Number(user?.id),
      rating,
      headline,
      review: reviewText,
      image: selectedImage,
    }, {
      onSuccess: () => {
        setIsFormOpen(false);
        setHeadline("");
        setReviewText("");
        setRating(5);
        setSelectedImage(null);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-12 text-center">
        <p className="text-muted italic">Loading reviews...</p>
      </div>
    );
  }

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
                <span className="text-4xl sm:text-5xl md:text-6xl font-serif text-primary">
                  {averageRating}
                </span>
                <div className="space-y-1">
                  <StarRating rating={Math.round(Number(averageRating))} size="md" />
                  <p className="text-xs sm:text-sm text-muted">{totalReviews} reviews</p>
                </div>
              </div>
            </div>

            {/* Stats Bars - Using mock percentages for now as we don't have full aggregate data */}
            <div className="space-y-2 sm:space-y-3">
              {[
                { stars: 5, count: totalReviews > 0 ? "80%" : "0%", percent: "80%" },
                { stars: 4, count: totalReviews > 0 ? "15%" : "0%", percent: "15%" },
                { stars: 3, count: totalReviews > 0 ? "3%" : "0%", percent: "3%" },
                { stars: 2, count: totalReviews > 0 ? "1%" : "0%", percent: "1%" },
                { stars: 1, count: totalReviews > 0 ? "1%" : "0%", percent: "1%" },
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
                      style={{ width: totalReviews > 0 ? stat.percent : "0%" }}
                    />
                  </div>
                  <span className="w-8 sm:w-10 text-right text-muted text-[10px] sm:text-xs">
                    {totalReviews > 0 ? stat.count : 0}
                  </span>
                </div>
              ))}
            </div>

            {user ? (
               <div className="space-y-4">
                 <CustomButton
                  variant={isFormOpen ? "outline" : "default"}
                  size="default"
                  onClick={() => setIsFormOpen(!isFormOpen)}
                  className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 text-xs sm:text-sm"
                >
                  <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {isFormOpen ? "Cancel" : "Write a review"}
                </CustomButton>

                {isFormOpen && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    onSubmit={handleSubmitReview}
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-100 space-y-4 overflow-hidden"
                  >
                    <div className="space-y-2">
                       <p className="text-sm font-medium">Your Rating</p>
                       <InteractiveStarRating rating={rating} onRatingChange={setRating} />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Review Title</label>
                      <Input 
                        placeholder="Summarize your experience"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        required
                        className="bg-gray-50 border-none h-10 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Your Review</label>
                      <Textarea 
                        placeholder="What did you like or dislike?"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        className="bg-gray-50 border-none min-h-[100px] text-sm resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                       <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Add Photo (Optional)</label>
                       <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                       />
                    </div>

                    <CustomButton 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-11 text-sm font-semibold"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </CustomButton>
                  </motion.form>
                )}
               </div>
            ) : (
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-3">Please sign in to share your experience</p>
                <CustomButton 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => window.location.href = '/login'}
                >
                  Sign In
                </CustomButton>
              </div>
            )}
          </div>

          {/* Review List Column */}
          <div className="md:col-span-8 space-y-6 sm:space-y-8">
            {reviews.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <p className="text-muted italic">No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              reviews.map((review: Review) => (
                <div
                  key={review.id}
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary font-bold overflow-hidden">
                        {review.image ? (
                           <Image
                            src={review.image}
                            alt={review.headline}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          "U"
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-primary">
                          {review.first_name && review.last_name 
                            ? `${review.first_name} ${review.last_name}`
                            : review.username || (typeof review.user === 'string' ? review.user : "Anonymous")}
                        </h4>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted mt-1">
                          <span>{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>

                  <h5 className="font-bold text-sm sm:text-base mb-1.5 sm:mb-2">
                    {review.headline}
                  </h5>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {review.review}
                  </p>
                </div>
              ))
            )}

            {/* Pagination */}
            {reviewsData && reviewsData.count > (reviewsData.results?.length ?? 0) && (
               <div className="flex justify-center gap-1.5 sm:gap-2 pt-4">
               {[...Array(Math.ceil(reviewsData.count / 10))].map((_, i) => (
                  <CustomButton 
                    key={i}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="icon-sm" 
                    onClick={() => setPage(i + 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-xs sm:text-sm"
                  >
                    {i + 1}
                  </CustomButton>
               ))}
             </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );

};
