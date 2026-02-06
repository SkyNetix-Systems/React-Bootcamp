// clsx is used to conditionally join classNames together
// Example: clsx("p-2", isActive && "bg-blue-500")
import { clsx } from "clsx";

// tailwind-merge intelligently merges Tailwind classes
// It resolves conflicts like: "p-2 p-4" → "p-4"
import { twMerge } from "tailwind-merge";

// cn = className utility function (common shadcn/ui pattern)
// Combines conditional classes + resolves Tailwind conflicts
export function cn(...inputs) {
  // clsx → builds class string conditionally
  // twMerge → removes conflicting Tailwind classes
  return twMerge(clsx(inputs));
}
