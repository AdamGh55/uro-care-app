"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ArrowLeft, UserPlus } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (role: 'patient' | 'clinician') => {
    setIsLoading(true)
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsLoading(false)
    
    if (role === 'patient') {
      router.push('/patient')
    } else {
      router.push('/clinician')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Link 
        href="/" 
        className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l'accueil
      </Link>
      
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Heart className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-2xl font-semibold text-foreground">UroCare</span>
      </div>

      <Card className="w-full max-w-md border-border">
        <Tabs defaultValue="patient" className="w-full">
          <CardHeader className="pb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="clinician">Soignant</TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <TabsContent value="patient" className="mt-0">
            <CardHeader className="pt-0">
              <CardTitle className="text-foreground">Connexion Patient</CardTitle>
              <CardDescription>
                Accédez à votre tableau de bord de récupération et check-ins quotidiens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient-email">Email</Label>
                <Input 
                  id="patient-email" 
                  type="email" 
                  placeholder="patient@demo.com" 
                  defaultValue="patient@demo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-password">Mot de passe</Label>
                <Input 
                  id="patient-password" 
                  type="password" 
                  placeholder="Entrez votre mot de passe"
                  defaultValue="demo123"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                className="w-full" 
                onClick={() => handleLogin('patient')}
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
              <button className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Mot de passe oublié ?
              </button>
              
              <Separator className="my-2" />
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Vous n'avez pas de compte ?</p>
                <Link href="/onboarding">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <UserPlus className="h-4 w-4" />
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </TabsContent>

          <TabsContent value="clinician" className="mt-0">
            <CardHeader className="pt-0">
              <CardTitle className="text-foreground">Connexion Soignant</CardTitle>
              <CardDescription>
                Accédez à votre tableau de bord pour suivre vos patients et alertes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clinician-email">Email</Label>
                <Input 
                  id="clinician-email" 
                  type="email" 
                  placeholder="clinician@demo.com"
                  defaultValue="clinician@demo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinician-password">Mot de passe</Label>
                <Input 
                  id="clinician-password" 
                  type="password" 
                  placeholder="Entrez votre mot de passe"
                  defaultValue="demo123"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                className="w-full" 
                onClick={() => handleLogin('clinician')}
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
              <button className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Mot de passe oublié ?
              </button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        En continuant, vous acceptez nos{" "}
        <Link href="#" className="text-primary hover:underline">Conditions d'utilisation</Link>
        {" "}et notre{" "}
        <Link href="#" className="text-primary hover:underline">Politique de confidentialité</Link>.
      </p>
    </div>
  )
}
