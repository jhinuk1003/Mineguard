import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold tracking-wide transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5D061] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-[1.03] active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#FF7A00] via-[#E11D74] to-[#BE123C] text-white shadow-lg shadow-[#E11D74]/30 hover:shadow-xl hover:shadow-[#FF7A00]/50 border border-[#F5D061]/40",
        desi:
          "bg-gradient-to-r from-[#FF7A00] to-[#E11D74] text-white shadow-md shadow-[#FF7A00]/30 hover:shadow-[#E11D74]/50 border border-[#F5D061]/50",
        gold:
          "bg-gradient-to-r from-[#FFF0B3] via-[#F5D061] to-[#C8963E] text-[#120726] font-bold shadow-md shadow-[#F5D061]/40 hover:shadow-lg hover:shadow-[#F5D061]/60 border border-white/60",
        rani:
          "bg-gradient-to-r from-[#E11D74] to-[#9E0E4E] text-white shadow-md shadow-[#E11D74]/40 hover:shadow-lg hover:shadow-[#E11D74]/60 border border-[#F5D061]/30",
        peacock:
          "bg-gradient-to-r from-[#00A896] to-[#01685D] text-white shadow-md shadow-[#00A896]/40 hover:shadow-lg hover:shadow-[#00A896]/60 border border-[#F5D061]/30",
        destructive:
          "bg-gradient-to-r from-[#BE123C] to-[#881337] text-white shadow-sm hover:shadow-lg hover:shadow-[#BE123C]/50 border border-red-400/40",
        outline:
          "border-1.5 border-[#F5D061]/60 bg-[#260E45]/80 text-[#FFF8E7] hover:bg-[#E11D74]/25 hover:border-[#F5D061] hover:text-white shadow-sm hover:shadow-[#F5D061]/30",
        secondary:
          "bg-[#2C1250] text-[#F5D061] border border-[#F5D061]/30 hover:bg-[#3D1A6E] hover:border-[#F5D061]/60 shadow-sm",
        ghost: "text-[#FFF8E7] hover:bg-[#E11D74]/20 hover:text-[#F5D061]",
        link: "text-[#F5D061] underline-offset-4 hover:underline hover:text-[#FF7A00]",
        google: "bg-white text-black shadow-sm hover:bg-gray-50 hover:shadow-xl border border-gray-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

