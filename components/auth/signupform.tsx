"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-utils";
import Image from "next/image";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signup, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please make sure your passwords match.",
      });
      return;
    }

    try {
      await signup(formData);
      toast.success("Account Created", {
        description: "Your account has been created successfully. Welcome to Rugstagram!",
      });
    } catch (error: unknown) {
      toast.error("Signup Failed", {
        description: getErrorMessage(error),
      });
      console.error("Signup submission error:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const isLabelFloating = (field: string) => {
    return (
      formData[field as keyof typeof formData] !== "" ||
      focusedFields.has(field)
    );
  };

  // Helper to render an input field with floating label
  const renderField = (id: string, label: string, type = "text", required = true) => (
    <div className="relative">
      <input
        type={type}
        id={id}
        value={formData[id as keyof typeof formData]}
        onChange={(e) => handleInputChange(id, e.target.value)}
        onFocus={() => handleFocus(id)}
        onBlur={() => handleBlur(id)}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-accent focus-visible:ring-accent/20"
        placeholder=" "
        required={required}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm duration-300 transform origin-left bg-card px-2 start-1 z-10 ${
          isLabelFloating(id)
            ? "-translate-y-4 scale-75 top-2 text-accent"
            : "scale-100 -translate-y-1/2 top-1/2 text-foreground/60"
        }`}
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-border shadow-sm">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
            <div className="flex flex-col items-center gap-2 text-center mb-2">
              <h1 className="text-2xl font-bold text-foreground">
                Create your account
              </h1>
              <p className="text-foreground/70 text-sm text-balance">
                Enter your details below to create your account
              </p>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              {renderField("first_name", "First Name")}
              {renderField("last_name", "Last Name")}
            </div>

            {/* Username & Phone */}
            <div className="grid grid-cols-2 gap-4">
               {renderField("username", "Username")}
               {renderField("phone", "Phone", "tel")}
            </div>

            {/* Email Field */}
            {renderField("email", "Email", "email")}

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-4">
              {renderField("password", "Password", "password")}
              {renderField("confirmPassword", "Confirm Password", "password")}
              <p className="text-xs text-foreground/70">
                Must be at least 8 characters long.
              </p>
            </div>

            <div>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card *:data-[slot=field-separator-content]:text-foreground/70 my-4">
              Or continue with
            </FieldSeparator>

            <div className="flex justify-center items-center">
              <Button variant="outline" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">Sign up with Google</span>
              </Button>
            </div>

            <p className="text-center text-foreground/70 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-accent hover:text-accent/80 underline underline-offset-4 transition-colors font-medium"
              >
                Sign in
              </a>
            </p>
          </form>
          <div className="bg-sand/10 relative hidden md:block border-l border-border">
            <Image
              src="https://images.unsplash.com/photo-1534889156217-d643df14f14a?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              width={100}
              height={100}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
