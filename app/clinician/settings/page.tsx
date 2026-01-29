"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  AlertTriangle,
  Users,
  Mail,
  Thermometer,
  Activity,
} from "lucide-react"

const teamMembers = [
  { id: '1', name: 'Dr. Michael Chen', role: 'Lead Surgeon', email: 'dr.chen@hospital.com' },
  { id: '2', name: 'Dr. Emily Rodriguez', role: 'Surgeon', email: 'dr.rodriguez@hospital.com' },
  { id: '3', name: 'Dr. Sarah Kim', role: 'Surgeon', email: 'dr.kim@hospital.com' },
  { id: '4', name: 'Nurse Johnson', role: 'Head Nurse', email: 'nurse.johnson@hospital.com' },
  { id: '5', name: 'Nurse Williams', role: 'Care Coordinator', email: 'nurse.williams@hospital.com' },
]

export default function ClinicianSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [urgentAlerts, setUrgentAlerts] = useState(true)
  const [feverThreshold, setFeverThreshold] = useState([38.0])
  const [painThreshold, setPainThreshold] = useState([7])

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Settings</h1>
        <p className="text-muted-foreground">Manage your notification preferences and alert thresholds.</p>
      </div>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure how and when you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive daily summary and urgent alerts via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive real-time alerts on your device
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="urgent-alerts" className="text-base">Urgent Alerts Only</Label>
              <p className="text-sm text-muted-foreground">
                Only notify for high-severity alerts
              </p>
            </div>
            <Switch
              id="urgent-alerts"
              checked={urgentAlerts}
              onCheckedChange={setUrgentAlerts}
            />
          </div>
        </CardContent>
      </Card>

      {/* Alert Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5" />
            Alert Thresholds
          </CardTitle>
          <CardDescription>
            Set custom thresholds for automatic patient alerts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-muted-foreground" />
              <Label className="text-base">Fever Threshold</Label>
            </div>
            <div className="space-y-3">
              <Slider
                value={feverThreshold}
                onValueChange={setFeverThreshold}
                min={37.0}
                max={40.0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">37.0°C</span>
                <span className="font-medium text-foreground">{feverThreshold[0].toFixed(1)}°C</span>
                <span className="text-muted-foreground">40.0°C</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Alert when patient temperature exceeds {feverThreshold[0].toFixed(1)}°C
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <Label className="text-base">Pain Threshold</Label>
            </div>
            <div className="space-y-3">
              <Slider
                value={painThreshold}
                onValueChange={setPainThreshold}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">1</span>
                <span className="font-medium text-foreground">{painThreshold[0]}/10</span>
                <span className="text-muted-foreground">10</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Alert when patient reports pain level of {painThreshold[0]} or higher
              </p>
            </div>
          </div>

          <Button className="w-full sm:w-auto">Save Thresholds</Button>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
          <CardDescription>
            Your clinic team and their contact information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 rounded-lg border border-border p-4"
              >
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {member.name.split(' ').slice(-1)[0][0]}{member.name.split(' ')[0][0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-foreground">{member.name}</p>
                    <Badge variant="secondary">{member.role}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
