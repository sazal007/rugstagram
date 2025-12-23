"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CustomButton } from "@/components/ui/custom-button";
import { PhoneInput } from "@/components/ui/phone-input";
import type * as RPNInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import { useContact } from "@/hooks/use-contact";

// Define Zod schema
const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactHeader: React.FC = () => {
  const { createContact, isSubmitting, error: apiError, isSuccess, resetSuccess } =
    useContact();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

  // Watch fields for floating label logic
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        resetSuccess();
        reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, resetSuccess, reset]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Format phone number: +9779813671117 -> +977-9813671117
      let formattedPhone = data.phone;
      if (data.phone) {
        const parsedNode = parsePhoneNumber(data.phone);
        if (parsedNode) {
          formattedPhone = `+${parsedNode.countryCallingCode}-${parsedNode.nationalNumber}`;
        }
      }

      await createContact({
        full_name: data.fullName,
        email: data.email,
        phone_number: formattedPhone,
        message: data.message,
      });

      // Form reset is handled in the useEffect on success
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

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

  const isLabelFloating = (field: keyof ContactFormValues) => {
    const value = watchedValues[field];
    return (
      (value !== "" && value !== undefined) ||
      focusedFields.has(field)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-3xl mx-auto"
    >
      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
        Get In Touch
      </span>
      <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 mt-8">
        {isSuccess && (
          <div className="p-4 bg-green-100 text-green-700 rounded-base border border-green-200 text-center">
            Thank you! Your message has been submitted successfully.
          </div>
        )}

        {apiError && (
          <div className="p-4 bg-red-100 text-red-700 rounded-base border border-red-200 text-center">
            {apiError}
          </div>
        )}

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
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
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
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
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

        {/* Phone */}
        <div>
          <div
            className="relative"
            onFocus={() => handleFocus("phone")}
            onBlur={(e) => {
              // Only blur if focus is not moving to a child element
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
                  defaultCountry="NP"
                  className={`w-full ${errors.phone ? "border-red-500" : ""}`}
                  placeholder=" "
                />
              )}
            />
            <label
              htmlFor="phone"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 left-[104px] z-10 pointer-events-none ${
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

        {/* Message */}
        <div>
          <div className="relative">
            <textarea
              id="message"
              {...register("message")}
              onFocus={() => handleFocus("message")}
              onBlur={(e) => {
                register("message").onBlur(e);
                handleBlur("message");
              }}
              rows={4}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${
                errors.message ? "border-red-500" : "border-border"
              } appearance-none focus:outline-none focus:ring-0 focus:border-primary resize-none`}
              placeholder=" "
            />
            <label
              htmlFor="message"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                isLabelFloating("message")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              Your Message
            </label>
            {errors.message && (
              <p className="text-xs text-red-500 mt-1 ml-1 text-left">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <CustomButton
          type="submit"
          variant="sand"
          size="hero"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </CustomButton>
      </form>
    </motion.div>
  );
};
