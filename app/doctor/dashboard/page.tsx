"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import {
    Users,
    Calendar,
    Activity,
    LogOut,
    Search,
    MoreVertical,
    Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InvitePatientDialog } from "@/components/doctor/invite-patient-dialog";

export default function DoctorDashboard() {
    type CheckIn = {
        id: string;
        patientName: string;
        timestamp: string;
        status: 'alert' | 'normal';
    };

    const [recentCheckins, setRecentCheckins] = useState<CheckIn[]>([]);

    const [patients, setPatients] = useState([
        {
            id: "P001",
            name: "Ahmed Benali",
            status: "Pré-opératoire",
            surgeryDate: "2024-03-15",
            procedure: "Prostatectomie",
            lastUpdate: "Il y a 2h",
        },
        // ... existing patients
    ]);

    useEffect(() => {
        try {
            const checkins = JSON.parse(localStorage.getItem('urocare_checkins') || '[]');
            setRecentCheckins(checkins);
        } catch (e) {
            console.error("Failed to parse checkins", e);
            setRecentCheckins([]);
        }

        try {
            // Load new patients
            const localPatients = JSON.parse(localStorage.getItem('urocare_patients') || '[]');
            if (localPatients.length > 0) {
                setPatients(prev => {
                    // Avoid duplicates if using strict mode or multiple effects
                    const newPatients = localPatients.filter((lp: any) => !prev.some(p => p.id === lp.id));
                    return [...newPatients, ...prev];
                });
            }
        } catch (e) {
            console.error("Failed to parse patients", e);
        }
    }, []);

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-30 h-16 border-b bg-background px-6 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Activity className="h-6 w-6 text-primary" />
                    <span>UroCare Pro</span>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/avatars/doctor.png" alt="Dr. Smith" />
                                    <AvatarFallback>DR</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Dr. Alami</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        urologie@clinique.ma
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Paramètres</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                                <LogOut className="mr-2 h-4 w-4" />
                                <Link href="/login">Se déconnecter</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-8 space-y-8">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
                        <p className="text-muted-foreground">
                            Aperçu de vos patients et interventions à venir.
                        </p>
                    </div>
                    <InvitePatientDialog />
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Patients Actifs</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">
                                +2 depuis la semaine dernière
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Alertes Check-in</CardTitle>
                            <Activity className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-500">
                                {recentCheckins.filter(c => c.status === 'alert').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Patients nécessitant attention
                            </p>
                        </CardContent>
                    </Card>

                    {/* Activity Feed Card */}
                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Derniers Check-ins</CardTitle>
                            <Bell className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 max-h-[120px] overflow-y-auto">
                                {recentCheckins.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">Aucun check-in récent.</p>
                                ) : (
                                    recentCheckins.slice(0, 3).map((checkin: any) => (
                                        <div key={checkin.id} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${checkin.status === 'alert' ? 'bg-red-500' : 'bg-green-500'}`} />
                                                <span className="font-medium">{checkin.patientName || 'Patient'}</span>
                                            </div>
                                            <span className="text-muted-foreground">
                                                {new Date(checkin.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Patient Table */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle>Patients récents</CardTitle>
                                <CardDescription>
                                    Gérez les dossiers et suivez l'état des patients.
                                </CardDescription>
                            </div>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Rechercher un patient..."
                                    className="pl-8 w-full"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Intervention</TableHead>
                                    <TableHead>Date Opération</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/doctor/patients/${patient.id}`} className="flex items-center gap-2 hover:underline">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>
                                                        {patient.name.split(" ").map((n) => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {patient.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    patient.status === "Pré-opératoire"
                                                        ? "default"
                                                        : patient.status === "En attente"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                            >
                                                {patient.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{patient.procedure}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                {new Date(patient.surgeryDate).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                        <span className="sr-only">Menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <Link href={`/doctor/patients/${patient.id}`}>
                                                        <DropdownMenuItem>Voir le dossier</DropdownMenuItem>
                                                    </Link>
                                                    <Link href={`/doctor/messages`}>
                                                        <DropdownMenuItem>Envoyer un message</DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-500">
                                                        Archiver
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
