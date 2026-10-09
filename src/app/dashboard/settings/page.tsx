import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cookies } from "next/headers"
import { Settings, User, Mail, Shield } from "lucide-react"

export const instant = false

export default async function SettingsPage() {
  const cookieStore = await cookies()
  const userEmail = cookieStore.get('aivar_user_email')?.value || 'Guest'
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account Information
            </CardTitle>
            <CardDescription>
              Your personal account details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-1">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Address
              </span>
              <span className="text-lg">{userEmail}</span>
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="outline" disabled>Change Password (Coming Soon)</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security & Privacy
            </CardTitle>
            <CardDescription>
              Manage your data and security preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your projects and SRS documents are strictly isolated to your account.
              No other users can view your uploaded files or generated architectures.
            </p>
            <div className="pt-2">
              <Button variant="destructive" disabled>Delete Account Data</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
