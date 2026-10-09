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
              <div className="space-y-6 max-w-3xl relative">
                {/* Decorative background glow */}
                <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                
                <div className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-2 shadow-[0_0_15px_rgba(var(--primary),0.2)] backdrop-blur-md">
                  ✨ AI-Powered SRS Intelligence
                </div>
                <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-sm pb-2">
                  Engineering Requirements, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Perfected by AI</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Upload your SRS. Detect conflicts. Generate architecture. Create test cases. Improve requirements effortlessly with Gemini intelligence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-all hover:scale-105">
                    Analyze Your SRS
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base font-semibold hover:bg-primary/10 transition-all hover:scale-105">View Live Demo</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-muted/50 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="group flex flex-col items-center text-center space-y-4 p-8 bg-background/50 backdrop-blur-sm rounded-3xl shadow-sm border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <ShieldAlert className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Conflict Detection</h3>
                <p className="text-muted-foreground leading-relaxed">Contextual intelligence finds contradictions and logical flaws across your entire SRS document instantly.</p>
              </div>
              <div className="group flex flex-col items-center text-center space-y-4 p-8 bg-background/50 backdrop-blur-sm rounded-3xl shadow-sm border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 relative z-10">
                  <GitMerge className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight relative z-10">Auto-Architecture</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">Generate UML, Class Diagrams, and Context Flow diagrams straight from raw text requirements.</p>
              </div>
              <div className="group flex flex-col items-center text-center space-y-4 p-8 bg-background/50 backdrop-blur-sm rounded-3xl shadow-sm border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Test Case Generation</h3>
                <p className="text-muted-foreground leading-relaxed">Automatically derive test scenarios with preconditions and expected results from every extracted requirement.</p>
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
