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
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function PatientOverview() {
  const { t } = useLanguage()
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
            {t('patient.dashboard.hello').replace('{name}', currentPatient.name.split(' ')[0])}
          </h1>
          <Badge variant="outline" className="text-xs">
            {currentPatient.surgeryType}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            {t('patient.dashboard.postOpDay').replace('{day}', currentPatient.postOpDay.toString())}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {t('patient.dashboard.surgery').replace('{date}', new Date(currentPatient.surgeryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))}
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
              <p className="text-sm text-muted-foreground">{t('patient.dashboard.nextTask')}</p>
              <p className="font-medium text-foreground truncate max-w-[140px]">
                {nextTasks[0]?.title || t('patient.dashboard.allDone')}
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
              <p className="text-sm text-muted-foreground">{t('patient.dashboard.todayCheckin')}</p>
              <p className={`font-medium ${checkInDone ? 'text-green-600' : 'text-amber-600'}`}>
                {checkInDone ? t('patient.dashboard.completed') : t('patient.dashboard.notDone')}
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
              <p className="text-sm text-muted-foreground">{t('patient.dashboard.activeAlerts')}</p>
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
              <p className="text-sm text-muted-foreground">{t('patient.dashboard.nextAppt')}</p>
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
              <CardTitle className="text-foreground">{t('patient.dashboard.nextStepsTitle')}</CardTitle>
              <Link href="/patient/timeline">
                <Button variant="ghost" size="sm" className="text-primary">
                  {t('patient.dashboard.viewAll')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>{t('patient.dashboard.nextStepsDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">{t('patient.dashboard.timelineProgress')}</span>
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
                    {t('patient.dashboard.due').replace('{date}', new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))}
                  </p>
                </div>
                {task.status === 'in-progress' && (
                  <Badge className="bg-primary/10 text-primary text-xs">{t('patient.dashboard.inProgress')}</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Check-in Card */}
        <Card className="flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground">{t('patient.dashboard.dailyCheckinTitle')}</CardTitle>
            <CardDescription>{t('patient.dashboard.dailyCheckinDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {checkInDone ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <ClipboardCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t('patient.dashboard.checkinComplete')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('patient.dashboard.checkinTime').replace('{time}', new Date(todayCheckIn.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }))}
                </p>
                <Link href="/patient/journal">
                  <Button variant="outline" size="sm">
                    {t('patient.dashboard.viewHistory')}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <ClipboardCheck className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t('patient.dashboard.checkinRequired')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('patient.dashboard.checkinRequiredDesc')}
                </p>
                <Link href="/patient/check-in">
                  <Button>
                    {t('patient.dashboard.startCheckin')}
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
          <CardTitle className="text-foreground">{t('patient.dashboard.trendsTitle')}</CardTitle>
          <CardDescription>{t('patient.dashboard.trendsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-lg border border-border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{t('patient.dashboard.painLevel')}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{todayCheckIn?.painLevel ?? '--'}/10</span>
                  {painTrend === 'down' && <TrendingDown className="h-5 w-5 text-green-600" />}
                  {painTrend === 'up' && <TrendingUp className="h-5 w-5 text-red-500" />}
                  {painTrend === 'stable' && <Minus className="h-5 w-5 text-muted-foreground" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {painTrend === 'down' ? t('patient.dashboard.improving') : painTrend === 'up' ? t('patient.dashboard.increasing') : t('patient.dashboard.stable')} {t('patient.dashboard.fromYesterday')}
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
                <p className="text-sm text-muted-foreground">{t('patient.dashboard.temperature')}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{todayCheckIn?.temperature || '--'}°C</span>
                  {tempTrend === 'down' && <TrendingDown className="h-5 w-5 text-green-600" />}
                  {tempTrend === 'up' && <TrendingUp className="h-5 w-5 text-amber-500" />}
                  {tempTrend === 'stable' && <Minus className="h-5 w-5 text-muted-foreground" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {tempTrend === 'down' ? t('patient.dashboard.decreasing') : tempTrend === 'up' ? t('patient.dashboard.rising') : t('patient.dashboard.stable')} {t('patient.dashboard.fromYesterday')}
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
