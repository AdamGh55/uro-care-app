"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Activity,
  Thermometer,
  Calendar,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Minus,
  Check,
  AlertTriangle,
  X,
  BarChart3,
} from "lucide-react"
import { checkInHistory, type CheckInEntry } from "@/lib/mock-data"
import Link from "next/link"

export default function PatientJournal() {
  const [selectedEntry, setSelectedEntry] = useState<CheckInEntry | null>(null)

  // Calculate trends for the header visualization
  const painData = checkInHistory.map(e => e.painLevel).reverse()
  const tempData = checkInHistory.map(e => e.temperature).reverse()

  const painTrend = painData[painData.length - 1] < painData[painData.length - 2] ? 'improving' : 
                   painData[painData.length - 1] > painData[painData.length - 2] ? 'worsening' : 'stable'
  const tempTrend = tempData[tempData.length - 1] < tempData[tempData.length - 2] ? 'decreasing' :
                   tempData[tempData.length - 1] > tempData[tempData.length - 2] ? 'rising' : 'stable'

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Journal</h1>
          <p className="text-muted-foreground">Consultez votre historique et suivez vos tendances de récupération.</p>
        </div>
        <Link href="/patient/journal/history">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Historique complet</span>
          </Button>
        </Link>
      </div>

      {/* Trends Overview */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Tendance douleur
              </CardTitle>
              {painTrend === 'improving' && <TrendingDown className="h-5 w-5 text-green-600" />}
              {painTrend === 'worsening' && <TrendingUp className="h-5 w-5 text-red-500" />}
              {painTrend === 'stable' && <Minus className="h-5 w-5 text-muted-foreground" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-20">
              <div className="flex items-end gap-1 h-full flex-1">
                {painData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-primary/60 transition-all"
                    style={{ height: `${(value / 10) * 100}%`, minHeight: '4px' }}
                  />
                ))}
              </div>
              <div className="ml-4 text-right">
                <p className="text-2xl font-bold text-foreground">{painData[painData.length - 1]}/10</p>
                <p className="text-xs text-muted-foreground capitalize">{painTrend}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-accent" />
                Tendance température
              </CardTitle>
              {tempTrend === 'decreasing' && <TrendingDown className="h-5 w-5 text-green-600" />}
              {tempTrend === 'rising' && <TrendingUp className="h-5 w-5 text-amber-500" />}
              {tempTrend === 'stable' && <Minus className="h-5 w-5 text-muted-foreground" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-20">
              <div className="flex items-end gap-1 h-full flex-1">
                {tempData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-accent/60 transition-all"
                    style={{ height: `${((value - 36) / 3) * 100}%`, minHeight: '4px' }}
                  />
                ))}
              </div>
              <div className="ml-4 text-right">
                <p className="text-2xl font-bold text-foreground">{tempData[tempData.length - 1]}°C</p>
                <p className="text-xs text-muted-foreground capitalize">{tempTrend}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check-in History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Check-in History</CardTitle>
          <CardDescription>Click on an entry to view details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {checkInHistory.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="w-full flex items-center gap-4 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors text-left"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                entry.status === 'ok' ? 'bg-green-100' : 'bg-amber-100'
              }`}>
                {entry.status === 'ok' ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    at {new Date(entry.date).toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Pain: <span className="text-foreground font-medium">{entry.painLevel}/10</span></span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">Temp: <span className="text-foreground font-medium">{entry.temperature}°C</span></span>
                  {entry.heartRate && (
                    <>
                      <span className="text-muted-foreground">|</span>
                      <span className="text-muted-foreground">HR: <span className="text-foreground font-medium">{entry.heartRate}</span></span>
                    </>
                  )}
                </div>
              </div>

              <Badge 
                variant="secondary"
                className={entry.status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
              >
                {entry.status === 'ok' ? 'Normal' : 'Attention'}
              </Badge>
              
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Detail Sheet */}
      <Sheet open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Check-in Details</span>
              <Button variant="ghost" size="icon" onClick={() => setSelectedEntry(null)}>
                <X className="h-4 w-4" />
              </Button>
            </SheetTitle>
          </SheetHeader>
          
          {selectedEntry && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  selectedEntry.status === 'ok' ? 'bg-green-100' : 'bg-amber-100'
                }`}>
                  {selectedEntry.status === 'ok' ? (
                    <Check className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {new Date(selectedEntry.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedEntry.date).toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">General Symptoms</h3>
                <div className="grid gap-3">
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-muted-foreground">Pain Level</span>
                    <span className="font-medium text-foreground">{selectedEntry.painLevel}/10</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-muted-foreground">Nausea</span>
                    <span className="font-medium text-foreground">{selectedEntry.nausea ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-muted-foreground">Dizziness</span>
                    <span className="font-medium text-foreground">{selectedEntry.dizziness ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-muted-foreground">Fatigue</span>
                    <span className="font-medium text-foreground capitalize">{selectedEntry.fatigue}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Vitals</h3>
                <div className="grid gap-3">
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-muted-foreground">Temperature</span>
                    <span className="font-medium text-foreground">{selectedEntry.temperature}°C</span>
                  </div>
                  {selectedEntry.heartRate && (
                    <div className="flex justify-between p-3 rounded-lg bg-muted">
                      <span className="text-muted-foreground">Heart Rate</span>
                      <span className="font-medium text-foreground">{selectedEntry.heartRate} bpm</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Surgery-specific</h3>
                <div className="grid gap-3">
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-muted-foreground">Bleeding</span>
                    <span className="font-medium text-foreground capitalize">{selectedEntry.bleeding}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-muted-foreground">Urination Problems</span>
                    <span className="font-medium text-foreground capitalize">{selectedEntry.urinationProblems}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-muted-foreground">Wound Concerns</span>
                    <span className="font-medium text-foreground capitalize">{selectedEntry.woundConcerns}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
