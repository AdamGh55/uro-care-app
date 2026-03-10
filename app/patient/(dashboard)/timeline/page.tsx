"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Check,
  Clock,
  Circle,
  Bell,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { timelineTasks, type TimelineTask } from "@/lib/mock-data"
import { TimelineService } from "@/lib/timeline-service"
import { useLanguage } from "@/lib/i18n/LanguageContext"

type FilterType = 'all' | 'due-soon' | 'completed'
type PhaseType = TimelineTask['phase']

const phaseColors: Record<PhaseType, string> = {
  'before': 'bg-blue-500',
  'surgery-day': 'bg-primary',
  'after': 'bg-green-500',
  'follow-up': 'bg-amber-500',
}

export default function PatientTimeline() {
  const { t } = useLanguage()
  const [tasks, setTasks] = useState<TimelineTask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [reminderDialog, setReminderDialog] = useState<{ open: boolean; task: TimelineTask | null }>({
    open: false,
    task: null,
  })
  const [expandedPhases, setExpandedPhases] = useState<PhaseType[]>(['before', 'surgery-day', 'after', 'follow-up'])

  // Load timeline on mount
  useEffect(() => {
    const loadedTasks = TimelineService.getTimeline("Prostatectomie", "2026-02-15")
    setTasks(loadedTasks)
    setIsLoading(false)
  }, [])

  const completedCount = tasks.filter(t => t.status === 'done').length
  const totalCount = tasks.length
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'done'
    if (filter === 'due-soon') {
      const dueDate = new Date(task.dueDate)
      const today = new Date()
      const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
      return task.status !== 'done' && dueDate <= threeDaysFromNow
    }
    return true
  })

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.phase]) acc[task.phase] = []
    acc[task.phase].push(task)
    return acc
  }, {} as Record<PhaseType, TimelineTask[]>)

  const handleMarkDone = (taskId: string) => {
    // Optimistic update
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, status: 'done' as const } : t
    ))
    // Persist update
    TimelineService.updateTaskStatus(taskId, 'done')
  }

  const togglePhase = (phase: PhaseType) => {
    setExpandedPhases(prev =>
      prev.includes(phase)
        ? prev.filter(p => p !== phase)
        : [...prev, phase]
    )
  }

  const getStatusIcon = (status: TimelineTask['status']) => {
    switch (status) {
      case 'done':
        return <Check className="h-4 w-4" />
      case 'in-progress':
        return <Clock className="h-4 w-4" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const getStatusStyles = (status: TimelineTask['status']) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-600 border-green-200'
      case 'in-progress':
        return 'bg-primary/10 text-primary border-primary/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">{t('patient.timeline.title')}</h1>
        <p className="text-muted-foreground">{t('patient.timeline.subtitle')}</p>
      </div>

      {/* Progress Card */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('patient.timeline.progressTitle')}</p>
              <p className="text-3xl font-bold text-foreground">{progress}%</p>
              <p className="text-sm text-muted-foreground">{t('patient.timeline.tasksCompleted').replace('{completed}', completedCount.toString()).replace('{total}', totalCount.toString())}</p>
            </div>
            <Progress value={progress} className="h-3 sm:w-48" />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          {t('patient.timeline.filters.all')}
        </Button>
        <Button
          variant={filter === 'due-soon' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('due-soon')}
        >
          {t('patient.timeline.filters.dueSoon')}
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          {t('patient.timeline.filters.completed')}
        </Button>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {(['before', 'surgery-day', 'after', 'follow-up'] as PhaseType[]).map(phase => {
          const phaseTasks = groupedTasks[phase] || []
          if (phaseTasks.length === 0) return null

          const isExpanded = expandedPhases.includes(phase)
          const phaseCompleted = phaseTasks.filter(t => t.status === 'done').length
          const phaseTotal = phaseTasks.length

          return (
            <Card key={phase}>
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors rounded-t-lg"
                onClick={() => togglePhase(phase)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${phaseColors[phase]}`} />
                    <CardTitle className="text-foreground">
                      {t(`patient.timeline.phases.${phase === 'surgery-day' ? 'surgeryDay' : phase === 'follow-up' ? 'followUp' : phase}` as any)}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {phaseCompleted}/{phaseTotal}
                    </Badge>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="relative ml-1.5 border-l-2 border-border pl-6 space-y-4">
                    {phaseTasks.map((task, index) => (
                      <div key={task.id} className="relative">
                        {/* Timeline dot */}
                        <div className={`absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border-2 ${getStatusStyles(task.status)}`}>
                          {getStatusIcon(task.status)}
                        </div>

                        {/* Task content */}
                        <div className="rounded-lg border border-border p-4 bg-card">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex-1">
                              <h3 className="font-medium text-foreground">{task.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {new Date(task.dueDate).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                                <Badge
                                  variant={task.status === 'done' ? 'default' : task.status === 'in-progress' ? 'default' : 'secondary'}
                                  className={`text-xs ${task.status === 'done'
                                    ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                    : task.status === 'in-progress'
                                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                      : ''
                                    }`}
                                >
                                  {task.status === 'done' ? t('patient.timeline.status.done') : task.status === 'in-progress' ? t('patient.timeline.status.inProgress') : t('patient.timeline.status.notStarted')}
                                </Badge>
                              </div>
                            </div>

                            {task.status !== 'done' && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setReminderDialog({ open: true, task })
                                  }}
                                >
                                  <Bell className="h-4 w-4 mr-1" />
                                  {t('patient.timeline.buttons.remind')}
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleMarkDone(task.id)
                                  }}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  {t('patient.timeline.buttons.done')}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Reminder Dialog */}
      <Dialog open={reminderDialog.open} onOpenChange={(open) => setReminderDialog({ open, task: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('patient.timeline.reminder.title')}</DialogTitle>
            <DialogDescription>
              {t('patient.timeline.reminder.desc').replace('{task}', reminderDialog.task?.title || '')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reminder-date">{t('patient.timeline.reminder.dateLabel')}</Label>
              <Input
                id="reminder-date"
                type="date"
                defaultValue={reminderDialog.task?.dueDate}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminder-time">{t('patient.timeline.reminder.timeLabel')}</Label>
              <Input
                id="reminder-time"
                type="time"
                defaultValue="09:00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderDialog({ open: false, task: null })}>
              {t('patient.timeline.reminder.cancel')}
            </Button>
            <Button onClick={() => setReminderDialog({ open: false, task: null })}>
              {t('patient.timeline.reminder.setReminder')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
