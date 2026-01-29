"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    MessageSquare,
    ClipboardCheck,
    Shield,
    Calendar,
    AlertCircle,
    User,
    Phone,
    Check,
    AlertTriangle,
    Activity,
    Thermometer,
    Clock,
    FileText
} from "lucide-react";
import { timelineTasks } from "@/lib/mock-data";

export default function PatientDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [clinicianNotes, setClinicianNotes] = useState("");
    const [patient, setPatient] = useState<any>(null);
    const [checkins, setCheckins] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load patient data
        const localPatients = JSON.parse(localStorage.getItem('urocare_patients') || '[]');
        let foundPatient = localPatients.find((p: any) => p.id === id);

        // Mock fallback if not found in local storage (for demo purposes)
        if (!foundPatient) {
            if (id === 'P001') {
                foundPatient = {
                    id: "P001",
                    name: "Ahmed Benali",
                    status: "Pré-opératoire",
                    surgeryDate: "2024-03-15",
                    procedure: "Prostatectomie",
                    activeAlerts: 1,
                    postOpDay: 2,
                    surgeonName: "Dr. Alami",
                    emergencyContact: {
                        name: "Fatima Benali",
                        phone: "06 61 23 45 67"
                    }
                };
            } else {
                // Generic fallback
                foundPatient = {
                    id: id,
                    name: "Patient Inconnu",
                    status: "--",
                    surgeryDate: new Date().toISOString(),
                    procedure: "--",
                    activeAlerts: 0,
                    postOpDay: 0,
                    surgeonName: "Dr. Alami",
                    emergencyContact: {
                        name: "--",
                        phone: "--"
                    }
                };
            }
        }
        setPatient(foundPatient);

        // Load checkins
        const allCheckins = JSON.parse(localStorage.getItem('urocare_checkins') || '[]');
        // Filter checkins for this patient (assuming patientId matches or we can link them)
        // For now, in this mock setup, we might match by ID or just show all if ID matches 'P001' which seems to be the default
        const patientCheckins = allCheckins.filter((c: any) => c.patientId === id || (id === 'P001' && !c.patientId));
        setCheckins(patientCheckins);

        setLoading(false);
    }, [id]);

    if (loading) {
        return <div className="p-8 text-center">Chargement du dossier...</div>;
    }

    if (!patient) {
        return <div className="p-8 text-center">Patient introuvable.</div>;
    }

    // Calculate timeline progress (mock)
    const completedTasks = timelineTasks.filter(t => t.status === 'done').length;
    const totalTasks = timelineTasks.length;
    const progress = Math.round((completedTasks / totalTasks) * 100);

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2);

    // Latest checkin logic
    const latestCheckIn = checkins.length > 0 ? checkins[0] : null;

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 bg-muted/20 min-h-screen">
            {/* Back Button */}
            <Link href="/doctor/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au tableau de bord
            </Link>

            {/* Patient Header */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <Avatar className="h-20 w-20">
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                {getInitials(patient.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
                                <Badge variant="outline">{patient.procedure}</Badge>
                                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                                    J+{patient.postOpDay || 0}
                                </Badge>
                                {patient.activeAlerts > 0 && (
                                    <Badge variant="destructive">
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        {patient.activeAlerts} Alertes
                                    </Badge>
                                )}
                            </div>
                            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{patient.surgeonName || "Non assigné"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Opération: {new Date(patient.surgeryDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{patient.emergencyContact?.phone || "--"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    <span>Contact: {patient.emergencyContact?.name || "--"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Latest Check-in Snapshot */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <ClipboardCheck className="h-5 w-5" />
                            Dernier Check-in
                        </CardTitle>
                        {latestCheckIn && (
                            <CardDescription>
                                {new Date(latestCheckIn.timestamp || latestCheckIn.date).toLocaleString('fr-FR', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        {latestCheckIn ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${latestCheckIn.status === 'normal' || latestCheckIn.status === 'ok' ? 'bg-green-100' : 'bg-red-100'
                                        }`}>
                                        {latestCheckIn.status === 'normal' || latestCheckIn.status === 'ok' ? (
                                            <Check className="h-6 w-6 text-green-600" />
                                        ) : (
                                            <AlertTriangle className="h-6 w-6 text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">
                                            {latestCheckIn.status === 'normal' || latestCheckIn.status === 'ok' ? 'Tout est normal' : 'Nécessite attention'}
                                        </p>
                                        <p className="text-sm text-muted-foreground">État général</p>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                                        <Activity className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Douleur</p>
                                            <p className="font-medium text-foreground">{latestCheckIn.painLevel}/10</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                                        <Thermometer className="h-5 w-5 text-accent" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Température</p>
                                            <p className="font-medium text-foreground">{latestCheckIn.temperature}°C</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-border divide-y divide-border">
                                    <div className="flex justify-between p-3">
                                        <span className="text-sm text-muted-foreground">Nausées</span>
                                        <span className="text-sm font-medium text-foreground">{latestCheckIn.nausea === 'yes' ? 'Oui' : 'Non'}</span>
                                    </div>
                                    <div className="flex justify-between p-3">
                                        <span className="text-sm text-muted-foreground">Vertiges</span>
                                        <span className="text-sm font-medium text-foreground">{latestCheckIn.dizziness === 'yes' ? 'Oui' : 'Non'}</span>
                                    </div>
                                    <div className="flex justify-between p-3">
                                        <span className="text-sm text-muted-foreground">Fatigue</span>
                                        <span className="text-sm font-medium text-foreground capitalize">
                                            {latestCheckIn.fatigue === 'mild' ? 'Légère' : latestCheckIn.fatigue === 'moderate' ? 'Modérée' : latestCheckIn.fatigue === 'severe' ? 'Sévère' : '--'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <ClipboardCheck className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                <p className="text-muted-foreground">Aucun check-in enregistré</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Timeline Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-foreground">Progression du Parcours</CardTitle>
                        <CardDescription>Étapes de récupération</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Progression globale</span>
                            <span className="font-bold text-foreground">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                        <p className="text-sm text-muted-foreground">
                            {completedTasks} sur {totalTasks} tâches complétées
                        </p>

                        <div className="mt-4 space-y-2">
                            <h4 className="font-medium text-foreground text-sm">Phases</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Phase post-opératoire immédiate</span>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button variant="outline" size="sm" className="w-full">
                                <FileText className=" h-4 w-4 mr-2" />
                                Voir le protocole complet
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Journal Entries Table */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-foreground">Historique des Check-ins</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {checkins.length > 0 ? (
                            <div className="space-y-2">
                                {checkins.slice(0, 5).map((entry: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${entry.status === 'alert' || entry.status === 'needs_attention' ? 'bg-red-500' : 'bg-green-500'}`} />
                                            <span className="font-medium">
                                                {new Date(entry.timestamp || entry.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(entry.timestamp || entry.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span>Dlr: {entry.painLevel}/10</span>
                                            <span>Temp: {entry.temperature}°C</span>
                                            <Badge variant="outline" className={entry.status === 'alert' ? 'border-red-500 text-red-500' : 'border-green-500 text-green-600'}>
                                                {entry.status === 'alert' ? 'Alerte' : 'Normal'}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">Aucun historique disponible</p>
                        )}
                    </CardContent>
                </Card>

                {/* Clinician Notes */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-foreground">Notes Médicales</CardTitle>
                        <CardDescription>Notes privées pour le personnel soignant</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder="Ajouter une note..."
                            value={clinicianNotes}
                            onChange={(e) => setClinicianNotes(e.target.value)}
                            rows={4}
                        />
                        <Button className="w-full sm:w-auto">Enregistrer la note</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-foreground">Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    <Link href="/doctor/messages">
                        <Button>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Envoyer un message
                        </Button>
                    </Link>
                    <Button variant="outline">
                        <ClipboardCheck className="h-4 w-4 mr-2" />
                        Demander un bilan
                    </Button>
                    <Button variant="outline">
                        <Check className="h-4 w-4 mr-2" />
                        Marquer comme stable
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
