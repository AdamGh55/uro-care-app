"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  LayoutDashboard,
  AlertCircle,
  Users,
  MessageSquare,
  Settings,
  Menu,
  LogOut,
  ChevronRight,
  BarChart3,
} from "lucide-react"
import { alerts } from "@/lib/mock-data"

const newAlerts = alerts.filter(a => a.status === 'New').length

const clinicianNavItems = [
  { href: "/clinician", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/clinician/alerts", label: "Alertes", icon: AlertCircle, badge: newAlerts },
  { href: "/clinician/patients", label: "Patients", icon: Users },
  { href: "/clinician/messages", label: "Messages", icon: MessageSquare },
  { href: "/clinician/statistics", label: "Statistiques", icon: BarChart3 },
  { href: "/clinician/settings", label: "Paramètres", icon: Settings },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {clinicianNavItems.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== '/clinician' && pathname?.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
            {item.badge && item.badge > 0 && (
              <Badge 
                variant={isActive ? "secondary" : "default"} 
                className={cn(
                  "ml-auto h-5 min-w-5 px-1.5 flex items-center justify-center",
                  isActive && "bg-primary-foreground/20 text-primary-foreground"
                )}
              >
                {item.badge}
              </Badge>
            )}
            {isActive && !item.badge && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        )
      })}
    </nav>
  )
}

function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-border bg-card lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Heart className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-foreground leading-tight">UroCare</span>
          <span className="text-xs text-muted-foreground">Pro</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Clinician Dashboard
        </div>
        <NavLinks />
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
            <LogOut className="h-5 w-5" />
            Log out
          </Button>
        </Link>
      </div>
    </aside>
  )
}

function MobileHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Heart className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-foreground leading-tight">UroCare</span>
          <span className="text-[10px] text-muted-foreground -mt-0.5">Pro</span>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Menu className="h-5 w-5" />
            {newAlerts > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
                {newAlerts}
              </span>
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center gap-2 border-b border-border px-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground leading-tight">UroCare</span>
              <span className="text-xs text-muted-foreground">Pro</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Clinician Dashboard
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
          <div className="border-t border-border p-4">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                <LogOut className="h-5 w-5" />
                Log out
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default function ClinicianLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
