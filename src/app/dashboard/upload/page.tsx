'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { UploadCloud, FileText, AlertCircle, Loader2 } from 'lucide-react'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [projectName, setProjectName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState('')
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      if (!projectName) {
        // Default project name to file name without extension
        setProjectName(e.target.files[0].name.replace(/\.[^/.]+$/, ""))
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !projectName) return

    setLoading(true)
    setError(null)
    setProgress('Uploading document...')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('projectName', projectName)

      setProgress('Analyzing with Gemini AI... This may take up to a minute depending on document size.')
      
      const response = await fetch('/api/srs/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to process document')
      }

      setProgress('Analysis complete! Redirecting...')
      
      // Give a tiny delay before redirect to show completion
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 1000)

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground mt-2">
          Upload a Software Requirement Specification (SRS) to extract intelligence.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>
            Supported formats: PDF, DOCX, TXT. Ensure the document contains your system requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 p-4 text-sm text-destructive bg-destructive/10 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="e.g., E-Commerce Redesign"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">SRS Document</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                <Label htmlFor="file" className="cursor-pointer flex flex-col items-center space-y-2">
                  {file ? (
                    <>
                      <FileText className="h-10 w-10 text-primary" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">Click to change file</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-10 w-10 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Click to select a file</span>
                      <span className="text-xs text-muted-foreground">PDF, DOCX up to 10MB</span>
                    </>
                  )}
                </Label>
              </div>
            </div>

            <div className="flex flex-col space-y-3 pt-4">
              <Button type="submit" size="lg" disabled={!file || !projectName || loading} className="w-full sm:w-auto self-end">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  'Start AI Analysis'
                )}
              </Button>
              {loading && progress && (
                <p className="text-sm text-muted-foreground text-right">{progress}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
