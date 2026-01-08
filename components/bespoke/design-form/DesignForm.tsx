"use client";

import React, { useState,  useRef } from "react";
import { motion } from "motion/react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CustomButton } from "@/components/ui/custom-button";
import { PhoneInput } from "@/components/ui/phone-input";
import type * as RPNInput from "react-phone-number-input";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import { useCreateBespoke } from "@/hooks/use-bespoke";
import { toast } from "sonner";

// Define Zod schema
// ... (rest of schema)
const designSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  description: z.string().min(1, "Description is required"),
  photos: z.array(z.any()).optional(),
});

type DesignFormValues = z.infer<typeof designSchema>;

export const DesignForm: React.FC = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<DesignFormValues>({
    resolver: zodResolver(designSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      description: "",
    },
  });

  const { createBespoke, isSubmitting } = useCreateBespoke();

  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());
  const watchedValues = useWatch({ control });

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => new Set(prev).add(field));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => {
      const newSet = new Set(prev);
      newSet.delete(field);
      return newSet;
    });
  };

  const isLabelFloating = (field: keyof Omit<DesignFormValues, "photos">) => {
    const value = watchedValues[field];
    return (value !== "" && value !== undefined) || focusedFields.has(field);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(photoPreviews[index]);
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: DesignFormValues) => {
    if (photos.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const promise = createBespoke({
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phone,
      message: data.description,
      image: photos[0],
    });

    toast.promise(promise, {
      loading: "Sending your design...",
      success: () => {
        reset();
        setPhotos([]);
        setPhotoPreviews([]);
        return "Your design has been submitted successfully!";
      },
      error: (err) =>
        err.message || "Something went wrong. Please try again later.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Create Your Own Rug</h1>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Send us your own Design</p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8  bg-card/50 border-[0.5px] border-gray-300 p-6 md:p-8  ">
        {/* Photo Upload Section */}
        <div className="space-y-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-base p-4 text-center cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 bg-accent/5"
          >
            <Upload className="size-8 text-muted" />
            <div>
              <p className="text-lg font-medium">Upload reference images</p>
              <p className="text-sm text-muted-">Click to select files</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              multiple 
              accept="image/*"
              className="hidden"
            />
          </div>

          {photoPreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square rounded-base overflow-hidden border border-border group">
                  <Image 
                    src={preview} 
                    alt={`Preview ${index}`} 
                    fill 
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="relative">
            <textarea
              id="description"
              {...register("description")}
              onFocus={() => handleFocus("description")}
              onBlur={(e) => {
                register("description").onBlur(e);
                handleBlur("description");
              }}
              rows={2}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${
                errors.description ? "border-red-500" : "border-border"
              } appearance-none focus:outline-none focus:ring-0 focus:border-primary resize-none`}
              placeholder=" "
            />
            <label
              htmlFor="description"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 pointer-events-none ${
                isLabelFloating("description")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              I was thinking if my rug could have a...
            </label>
          </div>
          {errors.description && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Personal Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                {...register("fullName")}
                onFocus={() => handleFocus("fullName")}
                onBlur={(e) => {
                  register("fullName").onBlur(e);
                  handleBlur("fullName");
                }}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${
                  errors.fullName ? "border-red-500" : "border-border"
                } appearance-none focus:outline-none focus:ring-0 focus:border-primary`}
                placeholder=" "
              />
              <label
                htmlFor="fullName"
                className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 pointer-events-none ${
                  isLabelFloating("fullName")
                    ? "-translate-y-4 scale-75 top-2 text-primary"
                    : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                }`}
              >
                Full Name
              </label>
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1 ml-1 text-left">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register("email")}
                onFocus={() => handleFocus("email")}
                onBlur={(e) => {
                  register("email").onBlur(e);
                  handleBlur("email");
                }}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${
                  errors.email ? "border-red-500" : "border-border"
                } appearance-none focus:outline-none focus:ring-0 focus:border-primary`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 pointer-events-none ${
                  isLabelFloating("email")
                    ? "-translate-y-4 scale-75 top-2 text-primary"
                    : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                }`}
              >
                Email
              </label>
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 ml-1 text-left">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <div
            className="relative"
            onFocus={() => handleFocus("phone")}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                handleBlur("phone");
              }
            }}
          >
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  id="phone"
                  value={field.value as RPNInput.Value}
                  onChange={(value) => field.onChange(value || "")}
                  defaultCountry="CN"
                  className={`w-full ${errors.phone ? "border-red-500" : ""}`}
                  placeholder=" "
                />
              )}
            />
            <label
              htmlFor="phone"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 left-[60px] z-10 pointer-events-none ${
                isLabelFloating("phone")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              Phone
            </label>
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 ml-1 text-left">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <CustomButton
          type="submit"
          variant="sand"
          size="hero"
          className="px-16 h-14 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "SEND"}
        </CustomButton>
      </form>
    </div>
  );
};
