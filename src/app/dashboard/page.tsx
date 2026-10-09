import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, GitMerge, ShieldAlert, CheckCircle, Activity, Box } from "lucide-react"
import prisma from "@/lib/db/prisma"
import PrintButton from "@/components/PrintButton"

export const instant = false

export default async function DashboardPage() {
  const project = await prisma.project.findFirst({
    include: {
      requirements: true,
      validationReports: true,
      conflicts: {
        include: {
          requirementA: true,
          requirementB: true
        }
      },
      architectureModels: true,
      testCases: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (!project) {
    return <div>No projects found. Create a project to get started.</div>
  }

  const reqCount = project.requirements.length;
  const conflictCount = project.conflicts.length;
  const testCoverageCount = Array.from(new Set(project.testCases.map(tc => tc.requirementId))).length;
  const testCoveragePct = reqCount > 0 ? Math.round((testCoverageCount / reqCount) * 100) : 0;
  
  const highRiskCount = project.requirements.filter(r => r.riskLevel === 'High' || r.riskLevel === 'Critical').length;
  const ambiguousCount = project.requirements.filter(r => r.ambiguityScore < 80).length;

  const latestReport = project.validationReports[0];
  const overallScore = latestReport ? latestReport.overallScore : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your SRS intelligence and project health for <strong>{project.name}</strong>.
          </p>
        </div>
        {/* Interactive Export Button Client Component */}
        <PrintButton />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SRS Quality Score</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overallScore}/100</div>
            <Progress value={overallScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2 mb-4">Grade: {overallScore > 90 ? 'A' : overallScore > 80 ? 'B' : 'C'}</p>
            
            <div className="text-xs border-t pt-3 space-y-1.5 mt-2">
              <p className="font-semibold text-foreground">Score Penalty Breakdown:</p>
              <div className="flex justify-between">
                <span>Completeness:</span> 
                <span className={(latestReport?.completeness ?? 0) < 85 ? "text-destructive font-medium" : "text-green-600"}>{latestReport?.completeness ?? 0}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Consistency:</span> 
                <span className={(latestReport?.consistency ?? 0) < 85 ? "text-destructive font-medium" : "text-green-600"}>{latestReport?.consistency ?? 0}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Unambiguity:</span> 
                <span className={(latestReport?.unambiguity ?? 0) < 85 ? "text-destructive font-medium" : "text-green-600"}>{latestReport?.unambiguity ?? 0}/100</span>
              </div>
              
              <div className="pt-2">
                {(latestReport?.consistency ?? 0) < 80 && (
                  <details className="mt-2 group">
                    <summary className="text-destructive italic hover:underline cursor-pointer font-medium list-none flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-open:rotate-90 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      Penalty applied due to detected logical conflicts.
                    </summary>
                    <div className="mt-2 p-3 bg-destructive/10 rounded-md border border-destructive/20 text-foreground">
                      <p className="font-semibold mb-2 text-destructive">Conflicting PDF Statements:</p>
                      {project.conflicts.map((c, i) => (
                        <div key={c.id || i} className="mb-3 last:mb-0 border-l-2 border-destructive pl-2">
                          <p className="font-medium text-xs">Statement 1: "{c.requirementA?.text}"</p>
                          <p className="font-medium text-xs mt-1">Statement 2: "{c.requirementB?.text}"</p>
                          <p className="text-muted-foreground mt-1 text-[11px]"><strong>AI Reasoning:</strong> {c.reason}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
                
                {ambiguousCount > 0 && (
                  <details className="mt-2 group">
                    <summary className="text-orange-500 italic hover:underline cursor-pointer font-medium list-none flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-open:rotate-90 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      Penalty applied due to {ambiguousCount} ambiguous statements.
                    </summary>
                    <div className="mt-2 p-3 bg-orange-500/10 rounded-md border border-orange-500/20 text-foreground">
                      <p className="font-semibold mb-2 text-orange-600">Vague Statements Found in PDF:</p>
                      {project.requirements.filter(r => r.ambiguityScore < 80).slice(0, 3).map((r, i) => (
                        <div key={r.id || i} className="mb-2 last:mb-0 border-l-2 border-orange-500 pl-2">
                          <p className="text-xs">"...{r.text}..."</p>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
                
                {(latestReport?.consistency ?? 0) >= 80 && ambiguousCount === 0 && (
                  <p className="text-green-600 mt-1 italic">✓ No major penalties detected.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requirements</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reqCount}</div>
            <p className="text-xs text-muted-foreground mt-2">Total extracted requirements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Conflicts Detected</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{conflictCount}</div>
            <p className="text-xs text-muted-foreground mt-2">Requires immediate attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Test Coverage</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{testCoveragePct}%</div>
            <Progress value={testCoveragePct} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{testCoverageCount}/{reqCount} requirements covered</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>AI Findings Summary</CardTitle>
            <CardDescription>Top issues identified by Gemini AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-destructive"></span>
                  <span className="text-sm font-medium">High Risk Requirements</span>
                </div>
                <span className="text-sm text-muted-foreground">{highRiskCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className="text-sm font-medium">Ambiguous Statements</span>
                </div>
                <span className="text-sm text-muted-foreground">{ambiguousCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-sm font-medium">Test Cases Generated</span>
                </div>
                <span className="text-sm text-muted-foreground">{project.testCases.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Architecture Status</CardTitle>
            <CardDescription>Generated models based on requirements</CardDescription>
          </CardHeader>
          <CardContent>
            {project.architectureModels.length > 0 ? (
              <div className="flex flex-col items-center justify-center h-[120px] rounded-md border border-dashed border-border bg-muted/50">
                <Box className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">{project.architectureModels.length} Models Generated</p>
                <p className="text-xs text-muted-foreground">UML & Context flow ready</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[120px] rounded-md border border-dashed border-border bg-muted/50">
                <Box className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-muted-foreground">No Architecture Models</p>
                <p className="text-xs text-muted-foreground">Run AI analysis to generate</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
