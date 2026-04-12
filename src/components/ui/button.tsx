import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-none text-base font-normal transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-red-700 hover:shadow-lg hover:shadow-destructive/20 active:scale-95",
        outline:
          "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:shadow-lg active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:opacity-90 hover:shadow-md active:scale-95",
        ghost: "bg-transparent text-foreground hover:bg-background-alt active:bg-background active:scale-95",
        link: "text-primary underline-offset-4 hover:text-accent transition-colors",
      },
      size: {
        default: "h-10 px-4 py-4",
        sm: "h-8 px-4 py-2.5",
        lg: "h-12 px-4 py-4",
        icon: "h-8 w-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size}), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
