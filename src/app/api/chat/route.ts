import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, projectId } = await req.json()

    if (!message || !projectId) {
      return NextResponse.json({ error: 'Message and Project ID are required' }, { status: 400 })
    }

    // Get the latest SRS document context
    const srs = await prisma.srsDocument.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    const systemInstruction = `
      You are the AIVAR Copilot, an AI Software Architect assistant.
      The user is asking a question about their project based on the uploaded SRS document.
      Use the following SRS document to answer the question. If the answer is not in the document, say "I cannot find this explicitly stated in the SRS."
      
      SRS DOCUMENT CONTENT (TRUNCATED):
      ${srs?.content ? srs.content.substring(0, 40000) : "No document found."}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        { role: 'model', parts: [{ text: "Understood. I'm ready to help with the SRS." }] },
        { role: 'user', parts: [{ text: message }] }
      ]
    });

    return NextResponse.json({ reply: response.text })

  } catch (error: any) {
    console.error('Chat Error:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
