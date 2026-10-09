const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Check if demo user exists
  let demoUser = await prisma.user.findUnique({
    where: { email: 'demo@aivar.test' }
  })

  if (!demoUser) {
    demoUser = await prisma.user.create({
      data: {
        email: 'demo@aivar.test',
        name: 'Demo User',
      }
    })
  }

  // Check if demo project exists
  let project = await prisma.project.findFirst({
    where: { userId: demoUser.id, name: 'E-Commerce Platform Redesign' }
  })

  if (!project) {
    project = await prisma.project.create({
      data: {
        name: 'E-Commerce Platform Redesign',
        description: 'Migration from legacy monolith to microservices.',
        userId: demoUser.id,
      }
    })

    const srs = await prisma.srsDocument.create({
      data: {
        projectId: project.id,
        name: 'ecommerce-srs-v1.pdf',
        version: 1,
        content: 'Sample SRS document text goes here...',
      }
    })

    // Create some requirements
    const req1 = await prisma.requirement.create({
      data: {
        projectId: project.id,
        srsDocumentId: srs.id,
        reqId: 'FR-001',
        text: 'The system must operate completely offline in remote warehouses.',
        type: 'Functional',
        priority: 'High',
        ambiguityScore: 90,
        completenessScore: 85,
        testabilityScore: 95,
        consistencyScore: 100,
        riskLevel: 'High'
      }
    })

    const req2 = await prisma.requirement.create({
      data: {
        projectId: project.id,
        srsDocumentId: srs.id,
        reqId: 'FR-087',
        text: 'The system must synchronize inventory data with the cloud in real time.',
        type: 'Functional',
        priority: 'High',
        ambiguityScore: 70,
        completenessScore: 60,
        testabilityScore: 80,
        consistencyScore: 90,
        riskLevel: 'Medium'
      }
    })

    // Create a conflict
    await prisma.conflict.create({
      data: {
        projectId: project.id,
        requirementAId: req1.id,
        requirementBId: req2.id,
        severity: 'HIGH',
        reason: 'The requirements impose contradictory connectivity assumptions (completely offline vs real time cloud sync).',
        recommendation: 'Clarify whether cloud synchronization is optional, deferred until connectivity is available, or mandatory.'
      }
    })

    // Create Architecture
    await prisma.architectureModel.create({
      data: {
        projectId: project.id,
        type: 'SYSTEM',
        content: `graph TD
  Client[Client App] --> API[API Gateway]
  API --> Auth[Auth Service]
  API --> Inventory[Inventory Service]
  API --> Orders[Order Service]
  Inventory --> DB[(Database)]
  Orders --> DB
  Auth --> DB`
      }
    })

    // Create Test Case
    await prisma.testCase.create({
      data: {
        projectId: project.id,
        requirementId: req1.id,
        testCaseId: 'TC-001',
        title: 'Offline Inventory Operation',
        preconditions: 'User is logged in, network connection is disabled.',
        steps: '1. Disable network connection. 2. Attempt to view inventory list. 3. Update an inventory item quantity.',
        expectedResult: 'System should allow viewing and updating local cache, queueing updates for later sync.',
        priority: 'High',
        type: 'Functional'
      }
    })

    // Create Estimates
    await prisma.estimate.create({
      data: {
        projectId: project.id,
        developerHours: 120,
        qaHours: 70,
        designHours: 100,
        devopsHours: 25,
        architectureHours: 80,
        totalHours: 395
      }
    })
    
    // Create validation report
    await prisma.validationReport.create({
      data: {
        projectId: project.id,
        overallScore: 87,
        completeness: 85,
        consistency: 90,
        unambiguity: 88
      }
    })

    console.log('Seed completed successfully.')
  } else {
    console.log('Demo project already exists. Seed skipped.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
