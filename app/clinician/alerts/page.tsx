"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertCircle,
  Search,
  Eye,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react"
import { alerts, type Alert } from "@/lib/mock-data"

export default function ClinicianAlerts() {
  const [alertList, setAlertList] = useState<Alert[]>(alerts)
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAlerts = alertList.filter(alert => {
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    const matchesSearch = alert.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSeverity && matchesStatus && matchesSearch
  })

  const handleMarkHandled = (alertId: string) => {
    setAlertList(prev => prev.map(a => 
      a.id === alertId ? { ...a, status: 'Handled' as const } : a
    ))
  }

  const handleMarkSeen = (alertId: string) => {
    setAlertList(prev => prev.map(a => 
      a.id === alertId && a.status === 'New' ? { ...a, status: 'Seen' as const } : a
    ))
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <AlertCircle className="h-4 w-4" />
      case 'Seen':
        return <Clock className="h-4 w-4" />
      case 'Handled':
        return <CheckCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const newCount = alertList.filter(a => a.status === 'New').length
  const seenCount = alertList.filter(a => a.status === 'Seen').length
  const handledCount = alertList.filter(a => a.status === 'Handled').length

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Alerts</h1>
        <p className="text-muted-foreground">Monitor and manage patient alerts.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New</p>
              <p className="text-xl font-bold text-foreground">{newCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Seen</p>
              <p className="text-xl font-bold text-foreground">{seenCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Handled</p>
              <p className="text-xl font-bold text-foreground">{handledCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient or alert type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Seen">Seen</SelectItem>
                  <SelectItem value="Handled">Handled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">All Alerts</CardTitle>
          <CardDescription>{filteredAlerts.length} alerts found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    alert.severity === 'High' ? 'bg-destructive/10' :
                    alert.severity === 'Medium' ? 'bg-amber-100' : 'bg-blue-100'
                  }`}>
                    {getStatusIcon(alert.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-foreground">{alert.patientName}</span>
                      <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground mt-1">{alert.type}</p>
                    {alert.keyValues && (
                      <p className="text-sm text-muted-foreground">{alert.keyValues}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(alert.time).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 sm:flex-shrink-0">
                  <Link href={`/clinician/patients/${alert.patientId}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                  {alert.status !== 'Handled' && (
                    <Button 
                      size="sm"
                      onClick={() => handleMarkHandled(alert.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Handled
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {filteredAlerts.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-lg font-medium text-foreground">No alerts found</p>
                <p className="text-muted-foreground">All clear! No alerts match your filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
