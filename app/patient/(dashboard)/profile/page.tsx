"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Stethoscope,
  Users,
  Bell,
  Clock,
  LogOut,
  Shield,
} from "lucide-react"
import { currentPatient } from "@/lib/mock-data"

export default function PatientProfile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [reminderTime, setReminderTime] = useState("09:00")

  const initials = currentPatient.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-foreground">{currentPatient.name}</h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{currentPatient.email}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Surgery Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Stethoscope className="h-5 w-5" />
            Surgery Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Surgery Type</p>
                <p className="font-medium text-foreground">{currentPatient.surgeryType}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Surgery Date</p>
                <p className="font-medium text-foreground">
                  {new Date(currentPatient.surgeryDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Surgeon</p>
                <p className="font-medium text-foreground">{currentPatient.surgeonName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recovery Day</p>
                <p className="font-medium text-foreground">Post-op Day {currentPatient.postOpDay}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {currentPatient.emergencyContact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-foreground">{currentPatient.emergencyContact.name}</p>
              <p className="text-sm text-muted-foreground">{currentPatient.emergencyContact.relationship}</p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{currentPatient.emergencyContact.phone}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Manage how and when you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive reminders for check-ins and tasks
              </p>
            </div>
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reminder-time" className="text-base">Daily Reminder Time</Label>
              <p className="text-sm text-muted-foreground">
                When to remind you about check-ins
              </p>
            </div>
            <Select value={reminderTime} onValueChange={setReminderTime}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="07:00">7:00 AM</SelectItem>
                <SelectItem value="08:00">8:00 AM</SelectItem>
                <SelectItem value="09:00">9:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="18:00">6:00 PM</SelectItem>
                <SelectItem value="20:00">8:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Link href="/">
        <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent">
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </Link>
    </div>
  )
}
