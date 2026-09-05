import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wide uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F5D061]",
  {
    variants: {
      variant: {
        default:
          "border-[#F5D061] bg-gradient-to-r from-[#FF7A00] to-[#E11D74] text-white shadow-md shadow-[#E11D74]/30",
        gold:
          "border-[#F5D061] bg-[#2A1608] text-[#FDE68A] shadow-sm shadow-[#F5D061]/30",
        rani:
          "border-[#E11D74] bg-[#3B0720] text-[#FF85BA] shadow-sm shadow-[#E11D74]/30",
        peacock:
          "border-[#00A896] bg-[#022A26] text-[#05D5BE] shadow-sm shadow-[#00A896]/30",
        emerald:
          "border-[#10B981] bg-[#052E16] text-[#34D399] shadow-sm shadow-[#10B981]/30",
        secondary:
          "border-[#F5D061]/30 bg-[#260E45] text-[#FFF8E7] hover:bg-[#32135C]",
        destructive:
          "border-[#BE123C] bg-[#3B0A14] text-[#FDA4AF] shadow-sm shadow-[#BE123C]/30",
        outline: "border-[#F5D061]/70 text-[#F5D061] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
