import { BrainCircuit } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center space-y-6">
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Outer glowing ripple */}
        <div className="absolute h-full w-full animate-ping rounded-full bg-primary/20"></div>
        {/* Inner solid circle */}
        <div className="absolute h-16 w-16 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"></div>
        {/* Center Icon */}
        <BrainCircuit className="relative h-10 w-10 text-primary animate-pulse" />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Loading Intelligence...
        </h2>
        <p className="text-muted-foreground text-sm">
          AIVAR is fetching your project data
        </p>
      </div>
    </div>
  );
}
