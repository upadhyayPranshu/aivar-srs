import Link from "next/link"
import { BrainCircuit, LayoutDashboard, FolderKanban, FileText, ListTodo, ShieldAlert, AlertTriangle, GitBranch, Share2, ClipboardCheck, Calculator, GitCompare, MessageSquareCode, Settings, UploadCloud, User } from "lucide-react"
import LogoutButton from "@/components/LogoutButton"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"
export const instant = false

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const userEmail = cookieStore.get('aivar_user_email')?.value || 'Guest'

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-background hidden md:block shrink-0">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BrainCircuit className="h-6 w-6 text-primary" />
            AIVAR
          </Link>
        </div>
        <div className="overflow-auto py-4">
          <nav className="grid gap-1 px-4 text-sm font-medium">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted transition-all">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/dashboard/upload" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted transition-all mt-2">
              <UploadCloud className="h-4 w-4" />
              Upload SRS
            </Link>
            
            <div className="mt-4 mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              Project
            </div>
            
            <Link href="/dashboard/requirements" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted transition-all">
              <ListTodo className="h-4 w-4" />
              Requirements
            </Link>
            <Link href="/dashboard/architecture" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted transition-all">
              <Share2 className="h-4 w-4" />
              Architecture
            </Link>
            <Link href="/dashboard/test-cases" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted transition-all">
              <ClipboardCheck className="h-4 w-4" />
              Test Cases
            </Link>
            <Link href="/dashboard/chat" className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-primary/10 transition-all font-semibold mt-2">
              <MessageSquareCode className="h-4 w-4" />
              AI Copilot
            </Link>
            
            <div className="mt-4 mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              System
            </div>
            <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted transition-all">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between border-b border-border bg-background px-6 shrink-0">
          <h2 className="font-semibold text-lg">Project Name</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground truncate max-w-[120px]">
                {userEmail}
              </span>
            </div>
            <LogoutButton />
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
