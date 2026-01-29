"use client";

import Link from "next/link";
import { User, Stethoscope, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Bienvenue sur UroCare</h1>
        <p className="text-muted-foreground">Sélectionnez votre espace pour continuer</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Patient Card */}
        <Link href="/patient/login" className="group">
          <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Patient</CardTitle>
              <CardDescription>
                Accédez à votre espace personnel
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-sm">
              Consultez votre dossier, vos rendez-vous et vos messages.
              <div className="mt-6">
                <Button className="w-full group-hover:bg-primary/90">Me connecter</Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Doctor Card */}
        <Link href="/doctor/login" className="group">
          <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Professionnel</CardTitle>
              <CardDescription>
                Accès réservé aux médecins
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-sm">
              Gérez vos patients, créez des invitations et suivez les parcours de soins.
              <div className="mt-6">
                <Button variant="outline" className="w-full">Espace Pro</Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
