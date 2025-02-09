import * as React from "react"

import { cn } from "@/lib/utils"
import { useFormField } from "./form"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const { error } = useFormField()

  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-neutral-200 bg-transparent dark:bg-neutral-950 px-3 py-2 text-base shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
        className, error && "dark:border-red-500 dark:focus-visible:ring-red-500 border-red-500 focus-visible:ring-red-500"
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
