"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  AlertCircle,
  Users,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  Clock,
  Eye,
  CheckCircle2,
} from "lucide-react"
import { alerts, patients, clinicianStats } from "@/lib/mock-data"

export default function ClinicianDashboard() {
  const recentAlerts = alerts.slice(0, 5)
  const patientsNeedingReview = patients.filter(p => p.activeAlerts > 0).slice(0, 4)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'Low':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-destructive text-destructive-foreground'
      case 'Seen':
        return 'bg-amber-500 text-white'
      case 'Handled':
        return 'bg-green-500 text-white'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Clinic Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here&apos;s an overview of your patients today.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alerts Today</p>
              <p className="text-2xl font-bold text-foreground">{clinicianStats.alertsToday}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Checking In Today</p>
              <p className="text-2xl font-bold text-foreground">{clinicianStats.patientsCheckingInToday}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">High-risk Patients</p>
              <p className="text-2xl font-bold text-foreground">{clinicianStats.highRiskPatients}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unread Messages</p>
              <p className="text-2xl font-bold text-foreground">{clinicianStats.unreadMessages}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Recent Alerts</CardTitle>
              <Link href="/clinician/alerts">
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Latest patient alerts requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Alert</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Severity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium text-foreground text-sm">{alert.patientName}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-foreground">{alert.type}</p>
                          {alert.keyValues && (
                            <p className="text-xs text-muted-foreground">{alert.keyValues}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Patients Needing Review */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Patients Needing Review</CardTitle>
              <Link href="/clinician/patients">
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Patients with active alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {patientsNeedingReview.map((patient) => (
              <Link
                key={patient.id}
                href={`/clinician/patients/${patient.id}`}
                className="flex items-center gap-4 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
              >
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{patient.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{patient.surgeryType}</span>
                    <span>•</span>
                    <span>Day {patient.postOpDay}</span>
                  </div>
                </div>
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {patient.activeAlerts}
                </Badge>
              </Link>
            ))}
            
            {patientsNeedingReview.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-muted-foreground">All patients are stable</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/clinician/alerts">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Review Alerts
            </Button>
          </Link>
          <Link href="/clinician/patients">
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              View All Patients
            </Button>
          </Link>
          <Link href="/clinician/messages">
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Check Messages
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
