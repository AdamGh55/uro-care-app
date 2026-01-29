"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  AlertCircle,
  ChevronRight,
  Calendar,
  Clock,
  Users,
} from "lucide-react"
import { patients } from "@/lib/mock-data"

export default function ClinicianPatients() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.surgeryType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPatients = patients.length
  const patientsWithAlerts = patients.filter(p => p.activeAlerts > 0).length
  const checkedInToday = patients.filter(p => {
    if (!p.lastCheckIn) return false
    const today = new Date().toDateString()
    return new Date(p.lastCheckIn).toDateString() === today
  }).length

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Patients</h1>
        <p className="text-muted-foreground">View and manage your patient roster.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Patients</p>
              <p className="text-xl font-bold text-foreground">{totalPatients}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">With Alerts</p>
              <p className="text-xl font-bold text-foreground">{patientsWithAlerts}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Checked in Today</p>
              <p className="text-xl font-bold text-foreground">{checkedInToday}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or surgery type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">All Patients</CardTitle>
          <CardDescription>{filteredPatients.length} patients found</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Surgery Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Post-op Day</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Check-in</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Alerts</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{patient.surgeryType}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">Day {patient.postOpDay}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {patient.lastCheckIn ? (
                        <span className="text-sm text-muted-foreground">
                          {new Date(patient.lastCheckIn).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </span>
                      ) : (
                        <span className="text-sm text-amber-600">No check-in</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {patient.activeAlerts > 0 ? (
                        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                          <AlertCircle className="h-3 w-3" />
                          {patient.activeAlerts}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          None
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/clinician/patients/${patient.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredPatients.map((patient) => (
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{patient.surgeryType}</span>
                    <span>•</span>
                    <span>Day {patient.postOpDay}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {patient.activeAlerts > 0 ? (
                      <Badge variant="destructive" className="text-xs">
                        {patient.activeAlerts} alerts
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        Stable
                      </Badge>
                    )}
                    {patient.lastCheckIn && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(patient.lastCheckIn).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </Link>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-lg font-medium text-foreground">No patients found</p>
              <p className="text-muted-foreground">Try adjusting your search query.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
