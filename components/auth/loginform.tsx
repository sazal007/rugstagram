"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-border shadow-sm">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back
              </h1>
              <p className="text-foreground/70 text-sm text-balance">
                Enter your email to sign in to your account
              </p>
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-accent focus-visible:ring-accent/20"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute text-sm duration-300 transform origin-left bg-card px-2 start-1 z-10 ${
                    isLabelFloating("email")
                      ? "-translate-y-4 scale-75 top-2 text-accent"
                      : "scale-100 -translate-y-1/2 top-1/2 text-foreground/60"
                  }`}
                >
                  Email
                </label>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-accent focus-visible:ring-accent/20"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className={`absolute text-sm duration-300 transform origin-left bg-card px-2 start-1 z-10 ${
                    isLabelFloating("password")
                      ? "-translate-y-4 scale-75 top-2 text-accent"
                      : "scale-100 -translate-y-1/2 top-1/2 text-foreground/60"
                  }`}
                >
                  Password
                </label>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
              >
                Sign in
              </Button>
            </div>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card *:data-[slot=field-separator-content]:text-foreground/70 mb-4">
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
                <span className="sr-only">Sign in with Google</span>
              </Button>
            </div>

            <p className="text-center text-foreground/70 text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="text-accent hover:text-accent/80 underline underline-offset-4 transition-colors font-medium"
              >
                Sign up
              </a>
            </p>
          </form>
          <div className="bg-sand/10 relative hidden md:block border-l border-border">
            <img
              src="https://images.unsplash.com/photo-1534889156217-d643df14f14a?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
