"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Heart,
  Home,
  CalendarDays,
  ClipboardCheck,
  BookOpen,
  MessageSquare,
  User,
  Menu,
  LogOut,
  ChevronRight,
  Library,
  Video,
} from "lucide-react"

const patientNavItems = [
  { href: "/patient", label: "Tableau de bord", icon: Home },
  { href: "/patient/timeline", label: "Mon parcours", icon: CalendarDays },
  { href: "/patient/check-in", label: "Check-in quotidien", icon: ClipboardCheck },
  { href: "/patient/journal", label: "Journal", icon: BookOpen },
  { href: "/patient/virtual-tour", label: "Visite du bloc", icon: Video },
  { href: "/patient/library", label: "Bibliothèque", icon: Library },
  { href: "/patient/messages", label: "Messages", icon: MessageSquare },
  { href: "/patient/profile", label: "Profil", icon: User },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {patientNavItems.map((item) => {
        const isActive = pathname === item.href
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
            {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
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
        <span className="text-lg font-semibold text-foreground">UroCare</span>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Patient Portal
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
        <span className="text-lg font-semibold text-foreground">UroCare</span>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center gap-2 border-b border-border px-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">UroCare</span>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Patient Portal
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

export default function PatientLayout({
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
