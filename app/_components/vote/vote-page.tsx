import { geistMono } from "@/app/fonts";
import { cn } from "@/lib/utils";

export const VotePage = ({ vote }: { vote: string }) => {
  if (vote === "original") {
    return (
      <div
        className={cn(
          geistMono.className,
          "px-4 py-1 bg-blue-100 text-blue-600 w-fit rounded-lg font-medium"
        )}
      >
        ✍️ Original
      </div>
    );
  } else
    return (
      <div
        className={cn(
          geistMono.className,
          "px-4 py-1 bg-orange-100 text-orange-600 w-fit rounded-lg font-medium"
        )}
      >
        ✨ AI Enhanced
      </div>
    );
};
