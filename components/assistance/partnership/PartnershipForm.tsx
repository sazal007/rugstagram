'use client';
import { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CustomButton } from "@/components/ui/custom-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import type * as RPNInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import { usePartnership } from "@/hooks/use-partnership";

// Define Zod schema
const partnershipSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  streetAddress2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  stateRegion: z.string().min(1, "State/Region is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  comments: z.string().optional(),
});

type PartnershipFormValues = z.infer<typeof partnershipSchema>;

export const PartnershipForm: React.FC = () => {
  const { createPartnership, isSubmitting, error: apiError, isSuccess, resetSuccess } =
    usePartnership();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      fullName: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      stateRegion: "",
      postalCode: "",
      country: "United States",
      phone: "",
      email: "",
      comments: "",
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

  const onSubmit = async (data: PartnershipFormValues) => {
    try {
      // Format phone number: +9779813671117 -> +977-9813671117
      let formattedPhone = data.phone;
      if (data.phone) {
        const parsedNode = parsePhoneNumber(data.phone);
        if (parsedNode) {
          formattedPhone = `+${parsedNode.countryCallingCode}-${parsedNode.nationalNumber}`;
        }
      }

      await createPartnership({
        full_name: data.fullName,
        street_address: data.streetAddress,
        street_address2: data.streetAddress2,
        city: data.city,
        state: data.stateRegion,
        code: data.postalCode,
        country: data.country,
        phone_number: formattedPhone,
        email: data.email,
        comments: data.comments,
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

  const isLabelFloating = (field: keyof PartnershipFormValues) => {
    const value = watchedValues[field];
    return (
      (value !== "" && value !== undefined) ||
      focusedFields.has(field)
    );
  };

  return (
    <div className="min-h-[80vh] bg-background flex flex-col items-center justify-center p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl space-y-6">
        {isSuccess && (
          <div className="p-4 bg-green-100 text-green-700 rounded-base border border-green-200 text-center">
            Thank you! Your partnership request has been submitted successfully.
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
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${errors.fullName ? "border-red-500" : "border-border"} appearance-none focus:outline-none focus:ring-0 focus:border-primary`}
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
          {errors.fullName && <p className="text-xs text-red-500 mt-1 ml-1">{errors.fullName.message}</p>}
        </div>

        {/* Address */}
        <div>
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                id="streetAddress"
                {...register("streetAddress")}
                onFocus={() => handleFocus("streetAddress")}
                onBlur={(e) => {
                  register("streetAddress").onBlur(e);
                  handleBlur("streetAddress");
                }}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${errors.streetAddress ? "border-red-500" : "border-border"} appearance-none focus:outline-none focus:ring-0 focus:border-primary`}
                placeholder=" "
              />
              <label
                htmlFor="streetAddress"
                className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                  isLabelFloating("streetAddress")
                    ? "-translate-y-4 scale-75 top-2 text-primary"
                    : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                }`}
              >
                Street Address
              </label>
              {errors.streetAddress && <p className="text-xs text-red-500 mt-1 ml-1">{errors.streetAddress.message}</p>}
            </div>

            <div className="relative">
              <input
                type="text"
                id="streetAddress2"
                {...register("streetAddress2")}
                onFocus={() => handleFocus("streetAddress2")}
                onBlur={(e) => {
                  register("streetAddress2").onBlur(e);
                  handleBlur("streetAddress2");
                }}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary"
                placeholder=" "
              />
              <label
                htmlFor="streetAddress2"
                className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                  isLabelFloating("streetAddress2")
                    ? "-translate-y-4 scale-75 top-2 text-primary"
                    : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                }`}
              >
                Street Address 2
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="city"
                  {...register("city")}
                  onFocus={() => handleFocus("city")}
                  onBlur={(e) => {
                    register("city").onBlur(e);
                    handleBlur("city");
                  }}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${errors.city ? "border-red-500" : "border-border"} appearance-none focus:outline-none focus:ring-0 focus:border-primary`}
                  placeholder=" "
                />
                <label
                  htmlFor="city"
                  className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                    isLabelFloating("city")
                      ? "-translate-y-4 scale-75 top-2 text-primary"
                      : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                  }`}
                >
                  City
                </label>
                {errors.city && <p className="text-xs text-red-500 mt-1 ml-1">{errors.city.message}</p>}
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="stateRegion"
                  {...register("stateRegion")}
                  onFocus={() => handleFocus("stateRegion")}
                  onBlur={(e) => {
                    register("stateRegion").onBlur(e);
                    handleBlur("stateRegion");
                  }}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${errors.stateRegion ? "border-red-500" : "border-border"} appearance-none focus:outline-none focus:ring-0 focus:border-primary`}
                  placeholder=" "
                />
                <label
                  htmlFor="stateRegion"
                  className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                    isLabelFloating("stateRegion")
                      ? "-translate-y-4 scale-75 top-2 text-primary"
                      : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                  }`}
                >
                  State / Region
                </label>
                {errors.stateRegion && <p className="text-xs text-red-500 mt-1 ml-1">{errors.stateRegion.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="postalCode"
                  {...register("postalCode")}
                  onFocus={() => handleFocus("postalCode")}
                  onBlur={(e) => {
                    register("postalCode").onBlur(e);
                    handleBlur("postalCode");
                  }}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${errors.postalCode ? "border-red-500" : "border-border"} appearance-none focus:outline-none focus:ring-0 focus:border-primary`}
                  placeholder=" "
                />
                <label
                  htmlFor="postalCode"
                  className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                    isLabelFloating("postalCode")
                      ? "-translate-y-4 scale-75 top-2 text-primary"
                      : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                  }`}
                >
                  Postal / Zip Code
                </label>
                {errors.postalCode && <p className="text-xs text-red-500 mt-1 ml-1">{errors.postalCode.message}</p>}
              </div>

              <div className="relative">
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      onOpenChange={(open) => {
                        if (open) {
                          handleFocus("country");
                        } else {
                          handleBlur("country");
                        }
                      }}
                    >
                      <SelectTrigger className={`block! w-full! px-2.5! pb-2.5! pt-4! h-[52px]! text-sm! text-foreground! bg-transparent! border! ${errors.country ? "border-red-500!" : "border-border!"} rounded-base! appearance-none! outline-none! focus-visible:ring-0! focus-visible:border-primary! shadow-none! data-[size=default]:h-[52px]!`}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">
                          United Kingdom
                        </SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Nepal">Nepal</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <label
                  className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                    (watchedValues.country !== "" && watchedValues.country !== undefined) || focusedFields.has("country")
                      ? "-translate-y-4 scale-75 top-2 text-primary"
                      : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
                  }`}
                >
                  Country
                </label>
                {errors.country && <p className="text-xs text-red-500 mt-1 ml-1">{errors.country.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Phone and Email in one div */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {errors.phone && <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone.message}</p>}
            </div>
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
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${errors.email ? "border-red-500" : "border-border"} appearance-none focus:outline-none focus:ring-0 focus:border-primary`}
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
              {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div>
          <div className="relative">
            <textarea
              id="comments"
              {...register("comments")}
              onFocus={() => handleFocus("comments")}
              onBlur={(e) => {
                register("comments").onBlur(e);
                handleBlur("comments");
              }}
              rows={4}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border ${errors.comments ? "border-red-500" : "border-border"} appearance-none focus:outline-none focus:ring-0 focus:border-primary resize-none`}
              placeholder=" "
            />
            <label
              htmlFor="comments"
              className={`absolute text-sm duration-300 transform origin-left bg-background px-2 start-1 z-10 ${
                isLabelFloating("comments")
                  ? "-translate-y-4 scale-75 top-2 text-primary"
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500"
              }`}
            >
              Your Comments
            </label>
            {errors.comments && <p className="text-xs text-red-500 mt-1 ml-1">{errors.comments.message}</p>}
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
    </div>
  );
};
