import { cookies } from 'next/headers';
import prisma from "@/lib/db/prisma"
import InteractiveArchitecture from "@/components/architecture/InteractiveArchitecture"
export const instant = false

export default async function ArchitecturePage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get('aivar_user_email')?.value || 'auto@aivar.test';

  const project = await prisma.project.findFirst({
    where: { user: { email: userEmail } },
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
            <InteractiveArchitecture 
              key={model.id}
              title={`${model.type.replace('_', ' ').toLowerCase()} Diagram`}
              initialChart={model.content} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
