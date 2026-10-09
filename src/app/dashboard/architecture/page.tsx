import prisma from "@/lib/db/prisma"
import MermaidDiagram from "@/components/architecture/MermaidDiagram"
export const instant = false

export default async function ArchitecturePage() {
  const project = await prisma.project.findFirst({
    include: {
      architectureModels: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (!project) return <div>No project found</div>;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Architecture</h1>
        <p className="text-muted-foreground mt-2">
          AI-generated architectural diagrams based on your SRS.
        </p>
      </div>

      {project.architectureModels.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No architecture models generated yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {project.architectureModels.map((model) => (
            <div key={model.id} className="space-y-4">
              <h2 className="text-xl font-semibold capitalize">{model.type.replace('_', ' ').toLowerCase()} Diagram</h2>
              <MermaidDiagram chart={model.content} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
