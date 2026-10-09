import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, FileText, CheckCircle, ShieldAlert, GitMerge } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 lg:px-14 h-16 flex items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-xl tracking-tight">AIVAR</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors flex items-center" href="/login">
            Login
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </nav>
      </header>
      
      <main className="flex-1">
        <section className="w-full py-24 lg:py-32 xl:py-48 flex justify-center bg-grid-white/[0.02] relative overflow-hidden">
          <div className="absolute inset-0 bg-background/90 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                  AI-Powered SRS Intelligence
                </div>
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Engineering Requirements, Perfected by AI
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Upload your SRS. Detect conflicts. Generate architecture. Create test cases. Improve requirements effortlessly with Gemini intelligence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8">
                    Analyze Your SRS
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="h-12 px-8">View Demo</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-muted/50 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-2xl shadow-sm border border-border/50">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ShieldAlert className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Conflict Detection</h3>
                <p className="text-muted-foreground">Contextual intelligence finds contradictions and logical flaws across your entire SRS document instantly.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-2xl shadow-sm border border-border/50">
                <div className="p-3 bg-primary/10 rounded-full">
                  <GitMerge className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Auto-Architecture</h3>
                <p className="text-muted-foreground">Generate UML, Class Diagrams, and Context Flow diagrams straight from raw text requirements.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-2xl shadow-sm border border-border/50">
                <div className="p-3 bg-primary/10 rounded-full">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Test Case Generation</h3>
                <p className="text-muted-foreground">Automatically derive test scenarios with preconditions and expected results from every extracted requirement.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © 2026 AIVAR Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
