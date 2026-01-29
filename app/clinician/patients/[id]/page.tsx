"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  MessageSquare,
  ClipboardCheck,
  Shield,
  Calendar,
  AlertCircle,
  User,
  Phone,
  Check,
  AlertTriangle,
  Activity,
  Thermometer,
} from "lucide-react"
import { patients, checkInHistory, timelineTasks, alerts } from "@/lib/mock-data"

export default function PatientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [clinicianNotes, setClinicianNotes] = useState("")
  
  const patient = patients.find(p => p.id === id) || patients[0]
  const patientAlerts = alerts.filter(a => a.patientId === id)
  
  // Calculate timeline progress (mock - using shared timeline for demo)
  const completedTasks = timelineTasks.filter(t => t.status === 'done').length
  const totalTasks = timelineTasks.length
  const progress = Math.round((completedTasks / totalTasks) * 100)

  // Get recent check-ins (mock)
  const recentCheckIns = checkInHistory.slice(0, 3)
  const latestCheckIn = checkInHistory[0]

  const initials = patient.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <Link href="/clinician/patients" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Patients
      </Link>

      {/* Patient Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
                <Badge variant="outline">{patient.surgeryType}</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  Post-op Day {patient.postOpDay}
                </Badge>
                {patient.activeAlerts > 0 && (
                  <Badge variant="destructive">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {patient.activeAlerts} Alerts
                  </Badge>
                )}
              </div>
              <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4 mt-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{patient.surgeonName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Surgery: {new Date(patient.surgeryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{patient.emergencyContact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Contact: {patient.emergencyContact.name}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Latest Check-in Snapshot */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <ClipboardCheck className="h-5 w-5" />
              Latest Check-in
            </CardTitle>
            {latestCheckIn && (
              <CardDescription>
                {new Date(latestCheckIn.date).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {latestCheckIn ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    latestCheckIn.status === 'ok' ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    {latestCheckIn.status === 'ok' ? (
                      <Check className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {latestCheckIn.status === 'ok' ? 'All values normal' : 'Needs attention'}
                    </p>
                    <p className="text-sm text-muted-foreground">Overall status</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                    <Activity className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pain Level</p>
                      <p className="font-medium text-foreground">{latestCheckIn.painLevel}/10</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                    <Thermometer className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-medium text-foreground">{latestCheckIn.temperature}°C</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border divide-y divide-border">
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-muted-foreground">Nausea</span>
                    <span className="text-sm font-medium text-foreground">{latestCheckIn.nausea ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-muted-foreground">Dizziness</span>
                    <span className="text-sm font-medium text-foreground">{latestCheckIn.dizziness ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-muted-foreground">Fatigue</span>
                    <span className="text-sm font-medium text-foreground capitalize">{latestCheckIn.fatigue}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-muted-foreground">Bleeding</span>
                    <span className="text-sm font-medium text-foreground capitalize">{latestCheckIn.bleeding}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-muted-foreground">Wound Concerns</span>
                    <span className="text-sm font-medium text-foreground capitalize">{latestCheckIn.woundConcerns}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ClipboardCheck className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No check-ins recorded yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Timeline Progress</CardTitle>
            <CardDescription>Recovery milestone completion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="font-bold text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </p>

            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-foreground text-sm">Phase Completion</h4>
              <div className="space-y-2">
                {(['before', 'surgery-day', 'after', 'follow-up'] as const).map(phase => {
                  const phaseTasks = timelineTasks.filter(t => t.phase === phase)
                  const phaseComplete = phaseTasks.filter(t => t.status === 'done').length
                  const phaseTotal = phaseTasks.length
                  const phasePercent = Math.round((phaseComplete / phaseTotal) * 100)
                  
                  const phaseLabel = {
                    'before': 'Before Surgery',
                    'surgery-day': 'Surgery Day',
                    'after': 'After Surgery',
                    'follow-up': 'Follow-up',
                  }[phase]
                  
                  return (
                    <div key={phase} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-28">{phaseLabel}</span>
                      <Progress value={phasePercent} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground w-12 text-right">{phaseComplete}/{phaseTotal}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Journal Entries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Check-ins</CardTitle>
            <CardDescription>Last {recentCheckIns.length} entries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentCheckIns.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  entry.status === 'ok' ? 'bg-green-100' : 'bg-amber-100'
                }`}>
                  {entry.status === 'ok' ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pain: {entry.painLevel}/10 | Temp: {entry.temperature}°C
                  </p>
                </div>
                <Badge 
                  variant="secondary"
                  className={entry.status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
                >
                  {entry.status === 'ok' ? 'Normal' : 'Attention'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Clinician Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Clinician Notes</CardTitle>
            <CardDescription>Add notes about this patient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Add your notes here..."
              value={clinicianNotes}
              onChange={(e) => setClinicianNotes(e.target.value)}
              rows={6}
            />
            <Button className="w-full sm:w-auto">Save Notes</Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/clinician/messages">
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </Link>
          <Button variant="outline">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Request Extra Check-in
          </Button>
          <Button variant="outline">
            <Check className="h-4 w-4 mr-2" />
            Mark Stable
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
