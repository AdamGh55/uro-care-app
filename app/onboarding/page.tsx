"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  ChevronRight,
  ChevronLeft,
  User,
  Stethoscope,
  Calendar,
  FileText,
  CheckCircle2,
  Upload,
  Plus,
  X,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const surgeryTypes = [
  { id: "prostatectomy", name: "Prostatectomie", description: "Ablation de la prostate" },
  { id: "cystoscopy", name: "Cystoscopie", description: "Examen endoscopique de la vessie" },
  { id: "lithotripsy", name: "Lithotripsie", description: "Traitement des calculs rénaux" },
  { id: "adenomectomy", name: "Adénomectomie", description: "Chirurgie de l'HBP" },
  { id: "nephrectomy", name: "Néphrectomie", description: "Ablation du rein" },
  { id: "ureteroscopy", name: "Urétéroscopie", description: "Examen des uretères" },
  { id: "other", name: "Autre", description: "Autre intervention urologique" },
];

const medicalConditions = [
  "Hypertension artérielle (HTA)",
  "Diabète",
  "Anticoagulants",
  "Maladie cardiaque",
  "Insuffisance rénale",
  "Asthme / BPCO",
  "Apnée du sommeil",
];

const steps = [
  { id: 1, title: "Création du compte", icon: User },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for Code Entry
  const [accessCode, setAccessCode] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [formData, setFormData] = useState({
    // Personal info
    firstName: "",
    lastName: "",
    email: "",
    password: "", // Added password
    phone: "",
    dateOfBirth: "",
    gender: "",
    weight: "",
    height: "",
    // Medical history
    conditions: [] as string[],
    allergies: "",
    currentMedications: [] as string[],
    otherConditions: "",
    // Surgery info
    surgeryType: "",
    surgeryDate: "",
    surgeon: "",
    center: "",
    // Documents
    documents: [] as string[],
    consent: false,
    dataConsent: false,
  });

  const [newMedication, setNewMedication] = useState("");

  // Calculate progress based on verified steps
  // If step 0 (code), progress is 0. If step 1+, progress relative to main steps.
  const progress = currentStep === 0 ? 0 : ((currentStep) / steps.length) * 100;

  const verifyCode = () => {
    // Mock validation & Data Fetching
    console.log("Access Code used:", accessCode);

    // 1. Check for Master Bypass (for testing)
    if (accessCode === "URO-TEST") {
      setFormData(prev => ({ ...prev, firstName: "Patient", lastName: "Test" }));
      setIsCodeVerified(true);
      setCurrentStep(1);
      return;
    }

    // 2. Check LocalStorage (Simulating Database)
    // Bypass validation for testing
    setIsCodeVerified(true);
    setCurrentStep(1);
    return;

    /* Original Validation
    try {
      const invites = JSON.parse(localStorage.getItem('urocare_invites') || '[]');
      const invite = invites.find((i: any) => i.code === accessCode);

      if (invite) {
        setFormData(prev => ({
          ...prev,
          firstName: invite.firstName,
          lastName: invite.lastName
        }));
        setIsCodeVerified(true);
        setCurrentStep(1);
      } else {
        alert("Code invalide. Veuillez vérifier votre code d'accès.");
      }
    } catch (e) {
      console.error("Error checking invites", e);
      alert("Une erreur est survenue.");
    }
    */
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save New Patient to Local Storage for Doctor Dashboard
      const newPatient = {
        id: "P-" + Date.now(),
        name: formData.firstName + " " + formData.lastName || "Nouveau Patient",
        status: "Pré-opératoire",
        surgeryDate: formData.surgeryDate || new Date().toISOString(),
        procedure: formData.surgeryType || "Consultation",
        lastUpdate: "À l'instant",
        email: formData.email,
        phone: formData.phone
      };

      const existingPatients = JSON.parse(localStorage.getItem('urocare_patients') || '[]');
      localStorage.setItem('urocare_patients', JSON.stringify([newPatient, ...existingPatients]));

      router.push("/patient");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleCondition = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition],
    }));
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setFormData((prev) => ({
        ...prev,
        currentMedications: [...prev.currentMedications, newMedication.trim()],
      }));
      setNewMedication("");
    }
  };

  const removeMedication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      currentMedications: prev.currentMedications.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">UroCare</span>
          </div>
          <Badge variant="outline">{t('auth.onboarding.badge')}</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Step 0: Access Code Check */}
        {currentStep === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">{t('auth.onboarding.codeTitle')}</h1>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {t('auth.onboarding.codeDesc')}
              </p>
            </div>

            <Card className="w-full max-w-md">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">{t('auth.onboarding.enterCode')}</Label>
                    <Input
                      id="code"
                      placeholder="URO-XXXX"
                      className="text-center text-lg tracking-widest uppercase"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && verifyCode()}
                    />
                  </div>
                  <Button className="w-full" onClick={verifyCode}>
                    {t('auth.onboarding.verifyBtn')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground text-center">
              {t('auth.onboarding.noCodeInfo')}
            </p>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {t('auth.onboarding.stepOf').replace('{current}', currentStep.toString()).replace('{total}', steps.length.toString())}
                </span>
                <span className="text-sm text-muted-foreground">
                  {currentStep === 1 ? t('auth.onboarding.step1Title') : steps[currentStep - 1].title}
                </span>
              </div>
              <Progress value={progress} className="h-2" />

              <div className="flex justify-between mt-4">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = currentStep > step.id;
                  const isCurrent = currentStep === step.id;
                  return (
                    <div
                      key={step.id}
                      className={`flex flex-col items-center gap-1 ${isCurrent
                        ? "text-primary"
                        : isCompleted
                          ? "text-success"
                          : "text-muted-foreground"
                        }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${isCurrent
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                            ? "bg-success text-success-foreground"
                            : "bg-muted"
                          }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <span className="text-[10px] hidden sm:block">{t('auth.onboarding.step1Title')}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Content */}
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.onboarding.step1Title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t('auth.onboarding.firstName')}</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          readOnly
                          disabled
                          className="bg-muted text-muted-foreground opacity-100" // Opacity fix for disabled look
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t('auth.onboarding.lastName')}</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          readOnly
                          disabled
                          className="bg-muted text-muted-foreground opacity-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t('auth.onboarding.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder={t('auth.onboarding.emailPlaceholder')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">{t('auth.onboarding.password')}</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder={t('auth.onboarding.passwordPlaceholder')}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="gap-2 bg-transparent"
                type="button"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('auth.onboarding.prev')}
              </Button>

              <Button onClick={handleNext} className="gap-2" type="button">
                {currentStep === steps.length ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    {t('auth.onboarding.finish')}
                  </>
                ) : (
                  <>
                    {t('auth.onboarding.next')}
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </main>
    </div >
  );
}
