"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  CalendarCheck,
  ClipboardCheck,
  AlertCircle,
  Calendar,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Minus,
  Thermometer,
  Activity,
} from "lucide-react"
import { currentPatient, timelineTasks } from "@/lib/mock-data"

export default function PatientOverview() {
  const [checkInHistory, setCheckInHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load check-ins from local storage
    const savedCheckins = JSON.parse(localStorage.getItem('urocare_checkins') || '[]')
    setCheckInHistory(savedCheckins)
    setIsLoading(false)
  }, [])

  const completedTasks = timelineTasks.filter(t => t.status === 'done').length
  const totalTasks = timelineTasks.length
  const progress = Math.round((completedTasks / totalTasks) * 100)

  const nextTasks = timelineTasks
    .filter(t => t.status !== 'done')
    .slice(0, 3)

  const todayCheckIn = checkInHistory[0]
  const checkInDone = todayCheckIn && new Date(todayCheckIn.timestamp).toDateString() === new Date().toDateString()

  // Calculate trends
  // Note: history is sorted newest first
  const currentPain = todayCheckIn?.painLevel || 0
  const previousPain = checkInHistory[1]?.painLevel || currentPain

  const painTrend = currentPain < previousPain ? 'down' :
    currentPain > previousPain ? 'up' : 'stable'

  const currentTemp = parseFloat(todayCheckIn?.temperature || '0')
  const previousTemp = parseFloat(checkInHistory[1]?.temperature || '0') || currentTemp

  const tempTrend = currentTemp < previousTemp ? 'down' :
    currentTemp > previousTemp ? 'up' : 'stable'

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Hello, {currentPatient.name.split(' ')[0]}
          </h1>
          <Badge variant="outline" className="text-xs">
            {currentPatient.surgeryType}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            Post-op Day {currentPatient.postOpDay}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Surgery: {new Date(currentPatient.surgeryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CalendarCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Task</p>
              <p className="font-medium text-foreground truncate max-w-[140px]">
                {nextTasks[0]?.title || 'All done!'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${checkInDone ? 'bg-green-100' : 'bg-amber-100'}`}>
              <ClipboardCheck className={`h-6 w-6 ${checkInDone ? 'text-green-600' : 'text-amber-600'}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today&apos;s Check-in</p>
              <p className={`font-medium ${checkInDone ? 'text-green-600' : 'text-amber-600'}`}>
                {checkInDone ? 'Completed' : 'Not done'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${currentPatient.activeAlerts > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
              <AlertCircle className={`h-6 w-6 ${currentPatient.activeAlerts > 0 ? 'text-red-600' : 'text-green-600'}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
              <p className={`font-medium ${currentPatient.activeAlerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {currentPatient.activeAlerts}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Appointment</p>
              <p className="font-medium text-foreground">Jan 29, 2026</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Next Steps Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Next Steps</CardTitle>
              <Link href="/patient/timeline">
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Your upcoming tasks in the recovery timeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Timeline Progress</span>
                <span className="font-medium text-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {nextTasks.map((task, index) => (
              <div key={task.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${task.status === 'in-progress'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
                  }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{task.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{task.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                {task.status === 'in-progress' && (
                  <Badge className="bg-primary/10 text-primary text-xs">In progress</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Check-in Card */}
        <Card className="flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground">Daily Check-in</CardTitle>
            <CardDescription>Complete your daily health assessment</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {checkInDone ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <ClipboardCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Check-in Complete</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You completed today&apos;s check-in at {new Date(todayCheckIn.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </p>
                <Link href="/patient/journal">
                  <Button variant="outline" size="sm">
                    View history
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <ClipboardCheck className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Check-in Required</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete your daily health assessment to track your recovery progress.
                </p>
                <Link href="/patient/check-in">
                  <Button>
                    Start Check-in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trends Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground">Your Trends</CardTitle>
          <CardDescription>How your symptoms have been changing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-lg border border-border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Pain Level</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{todayCheckIn?.painLevel ?? '--'}/10</span>
                  {painTrend === 'down' && <TrendingDown className="h-5 w-5 text-green-600" />}
                  {painTrend === 'up' && <TrendingUp className="h-5 w-5 text-red-500" />}
                  {painTrend === 'stable' && <Minus className="h-5 w-5 text-muted-foreground" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {painTrend === 'down' ? 'Improving' : painTrend === 'up' ? 'Increasing' : 'Stable'} from yesterday
                </p>
              </div>
              {/* Mini chart placeholder */}
              <div className="hidden sm:flex items-end gap-1 h-12">
                {checkInHistory.slice(0, 5).reverse().map((entry, i) => (
                  <div
                    key={i}
                    className="w-2 rounded-sm bg-primary/60"
                    style={{ height: `${(entry.painLevel / 10) * 100}%`, minHeight: '4px' }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                <Thermometer className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Temperature</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{todayCheckIn?.temperature || '--'}°C</span>
                  {tempTrend === 'down' && <TrendingDown className="h-5 w-5 text-green-600" />}
                  {tempTrend === 'up' && <TrendingUp className="h-5 w-5 text-amber-500" />}
                  {tempTrend === 'stable' && <Minus className="h-5 w-5 text-muted-foreground" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {tempTrend === 'down' ? 'Decreasing' : tempTrend === 'up' ? 'Rising' : 'Stable'} from yesterday
                </p>
              </div>
              {/* Mini chart placeholder */}
              <div className="hidden sm:flex items-end gap-1 h-12">
                {checkInHistory.slice(0, 5).reverse().map((entry, i) => (
                  <div
                    key={i}
                    className="w-2 rounded-sm bg-accent/60"
                    style={{ height: `${((parseFloat(entry.temperature) - 36) / 3) * 100}%`, minHeight: '4px' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
