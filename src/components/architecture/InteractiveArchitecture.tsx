'use client'

import { useState } from 'react'
import MermaidDiagram from './MermaidDiagram'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, Code2, LayoutTemplate } from 'lucide-react'

export default function InteractiveArchitecture({ initialChart, title }: { initialChart: string, title: string }) {
  const [chart, setChart] = useState(initialChart)
  const [tempChart, setTempChart] = useState(initialChart)
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = () => {
    setChart(tempChart)
  }

  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm">
      <CardHeader className="bg-muted/30 border-b pb-3 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
            className="h-8 gap-2 text-muted-foreground hover:text-primary"
          >
            <Code2 className="h-4 w-4" />
            {isEditing ? 'Hide Code' : 'Edit Diagram'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`grid ${isEditing ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} divide-y md:divide-y-0 md:divide-x divide-border/50`}>
          
          {/* Diagram Preview */}
          <div className="p-6 bg-background flex flex-col">
            <div className="flex-1 min-h-[300px]">
              <MermaidDiagram chart={chart} />
            </div>
          </div>

          {/* Editor (Hidden by default) */}
          {isEditing && (
            <div className="flex flex-col bg-muted/10">
              <div className="p-3 border-b flex items-center justify-between bg-muted/20">
                <span className="text-sm font-medium text-muted-foreground font-mono">Mermaid Editor</span>
                <Button size="sm" onClick={handleUpdate} className="h-7 text-xs gap-1.5 px-3">
                  <RefreshCw className="h-3 w-3" /> Update Preview
                </Button>
              </div>
              <textarea
                className="flex-1 w-full p-4 bg-transparent border-none resize-none font-mono text-sm focus:outline-none text-foreground/80 leading-relaxed"
                style={{ minHeight: '300px' }}
                value={tempChart}
                onChange={(e) => setTempChart(e.target.value)}
                spellCheck={false}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
