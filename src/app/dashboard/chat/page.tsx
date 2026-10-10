'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BrainCircuit, Send, Loader2, User } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Hello! I am AIVAR Copilot. I have analyzed your SRS document. What would you like to know about the architecture or requirements?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  
  // In a real app we fetch the active project ID from a context or URL param
  // Using a dummy one for now, or just letting the backend find the first project.
  const dummyProjectId = "auto-find-first-project"

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages })
      })

      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error)
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error answering your question.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Copilot</h1>
        <p className="text-muted-foreground mt-2 mb-6">
          Chat directly with your Software Requirements Specification document.
        </p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-md">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <span>AIVAR Intelligence</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-primary ml-3' : 'bg-secondary mr-3'}`}>
                  {msg.role === 'user' ? <User className="h-4 w-4 text-primary-foreground" /> : <BrainCircuit className="h-4 w-4 text-foreground" />}
                </div>
                <div className={`rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex flex-row max-w-[80%]">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary mr-3 flex items-center justify-center">
                  <BrainCircuit className="h-4 w-4 text-foreground" />
                </div>
                <div className="rounded-lg p-4 bg-muted flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-4 bg-background border-t">
          <form onSubmit={sendMessage} className="flex space-x-2">
            <Input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Ask a question about the SRS (e.g. 'What are the security requirements?')" 
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={!input.trim() || loading} size="icon">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
