import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/lib/utils";

const custombuttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Home page specific variants
        "hero-primary":
          "bg-white text-primary uppercase tracking-widest text-xs font-bold hover:bg-sand hover:text-white transition-colors duration-300",
        "hero-outline":
          "border border-white text-white uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-primary transition-colors duration-300",
        sand: "bg-sand text-white uppercase tracking-widest hover:text-gray-200 text-xs font-bold cursor-pointer transition-colors",
        "outline-primary":
          "border border-primary text-primary uppercase tracking-widest text-xs font-bold hover:bg-primary hover:text-white transition-colors",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        hero: "px-8 py-4 uppercase tracking-widest text-xs font-bold",
        "hero-sm": "px-8 py-3 uppercase tracking-widest text-xs font-bold",
        "hero-lg": "px-10 py-4 uppercase tracking-widest text-xs font-bold",
        compact: "px-6 py-2 uppercase tracking-widest text-xs font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof custombuttonVariants> {
  asChild?: boolean;
  href?: string;
}

function CustomButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  href,
  ...props
}: ButtonProps) {
  const baseClassName = cn(custombuttonVariants({ variant, size, className }));

  if (href && !asChild) {
    return (
      <Link
        href={href}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={baseClassName}
        {...(props as Omit<React.ComponentProps<typeof Link>, "href">)}
      />
    );
  }

  if (asChild) {
    return (
      <Slot
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={baseClassName}
        {...props}
      />
    );
  }

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={baseClassName}
      {...props}
    />
  );
}

export { CustomButton, custombuttonVariants };
