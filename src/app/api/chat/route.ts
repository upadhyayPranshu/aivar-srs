import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()
    
    // Get user from cookie
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const userEmail = cookieStore.get('aivar_user_email')?.value || 'auto@aivar.test'

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Get the latest SRS document for this user
    const srs = await prisma.srsDocument.findFirst({
      where: { project: { user: { email: userEmail } } },
      orderBy: { createdAt: 'desc' }
    })

    const systemInstruction = `
      You are the AIVAR Copilot, an AI Software Architect assistant.
      The user is asking a question about their project based on the uploaded SRS document.
      Use the following SRS document to answer the question. If the answer is not in the document, say "I cannot find this explicitly stated in the SRS."
      
      SRS DOCUMENT CONTENT (TRUNCATED):
      ${srs?.content ? srs.content.substring(0, 40000) : "No document found."}
    `;

    // Format conversation history for Gemini
    const formattedHistory = (history || []).filter((msg: any) => msg.role === 'user' || msg.role === 'assistant').map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))

    // Construct full conversation prompt
    const contents = [
      { role: 'user', parts: [{ text: systemInstruction }] },
      { role: 'model', parts: [{ text: "Understood. I'm ready to help with the SRS." }] },
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ]

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: contents as any
    });

    return NextResponse.json({ reply: response.text })

  } catch (error: any) {
    console.error('Chat Error:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
