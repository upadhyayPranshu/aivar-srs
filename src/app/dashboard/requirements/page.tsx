import { cookies } from 'next/headers';
import prisma from "@/lib/db/prisma"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import ExportDataButton from "@/components/ExportDataButton"
export const instant = false

export default async function RequirementsPage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get('aivar_user_email')?.value || 'auto@aivar.test';

  const project = await prisma.project.findFirst({
    where: { user: { email: userEmail } },
    include: {
      requirements: {
        orderBy: {
          reqId: 'asc'
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (!project) return <div>No project found</div>;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Requirements</h1>
          <p className="text-muted-foreground mt-2">
            Extracted software requirements from your SRS document.
          </p>
        </div>
        <ExportDataButton 
          data={project.requirements} 
          filename="requirements_export.csv"
          columns={[
            { header: "ID", key: "reqId" },
            { header: "Description", key: "text" },
            { header: "Type", key: "type" },
            { header: "Priority", key: "priority" },
            { header: "Risk Level", key: "riskLevel" },
            { header: "Quality Score", key: "ambiguityScore" } // simplified proxy for now
          ]}
        />
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead className="text-right">Quality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {project.requirements.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{req.reqId}</TableCell>
                <TableCell className="max-w-[400px] truncate" title={req.text}>{req.text}</TableCell>
                <TableCell>
                  <Badge variant="outline">{req.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={req.priority === 'High' || req.priority === 'Critical' ? 'destructive' : 'secondary'}>
                    {req.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={req.riskLevel === 'High' ? 'destructive' : req.riskLevel === 'Medium' ? 'default' : 'secondary'}>
                    {req.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span className={req.ambiguityScore > 80 && req.testabilityScore > 80 ? "text-green-600 font-medium" : "text-orange-500 font-medium"}>
                    {Math.round((req.ambiguityScore + req.completenessScore + req.testabilityScore + req.consistencyScore) / 4)}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
