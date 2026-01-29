"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  AlertTriangle,
  ThermometerSun,
  HeartPulse,
  Activity,
  Stethoscope,
  Camera,
  Droplets,
} from "lucide-react"
import { AlertPopup } from "@/components/alert-popup"
import { Textarea } from "@/components/ui/textarea"

interface CheckInData {
  painLevel: number
  nausea: 'yes' | 'no' | null
  dizziness: 'yes' | 'no' | null
  fatigue: 'mild' | 'moderate' | 'severe' | null
  temperature: string
  heartRate: string
  bleeding: 'none' | 'mild' | 'heavy' | null
  urinationProblems: 'none' | 'mild' | 'severe' | null
  urinationBurning: 'yes' | 'no' | null
  hematuria: 'yes' | 'no' | null
  transit: 'normal' | 'constipation' | 'diarrhea' | null
  gasEmission: 'yes' | 'no' | null
  woundConcerns: 'none' | 'redness' | 'swelling' | 'fluid' | null
  woundPhoto: boolean
  medicationsTaken: 'yes' | 'no' | 'partial' | null
  additionalNotes: string
}

const steps = [
  { id: 1, title: 'Symptômes généraux', icon: Activity },
  { id: 2, title: 'Constantes', icon: HeartPulse },
  { id: 3, title: 'Mictions & Transit', icon: Droplets },
  { id: 4, title: 'Plaie & Médicaments', icon: Stethoscope },
  { id: 5, title: 'Récapitulatif', icon: Check },
]

export default function PatientCheckIn() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [data, setData] = useState<CheckInData>({
    painLevel: 3,
    nausea: null,
    dizziness: null,
    fatigue: null,
    temperature: '',
    heartRate: '',
    bleeding: null,
    urinationProblems: null,
    urinationBurning: null,
    hematuria: null,
    transit: null,
    gasEmission: null,
    woundConcerns: null,
    woundPhoto: false,
    medicationsTaken: null,
    additionalNotes: '',
  })
  const [alertType, setAlertType] = useState<'fever' | 'pain' | 'hematuria' | 'retention' | null>(null)

  const updateData = <K extends keyof CheckInData>(key: K, value: CheckInData[K]) => {
    setData(prev => ({ ...prev, [key]: value }))
  }

  const canProceed = () => {
    return true
    /* Validation disabled for testing
    switch (currentStep) {
      case 1:
        return data.nausea !== null && data.dizziness !== null && data.fatigue !== null
      case 2:
        return data.temperature !== ''
      case 3:
        return data.urinationProblems !== null && data.transit !== null
      case 4:
        return data.woundConcerns !== null && data.medicationsTaken !== null
      default:
        return true
    }
    */
  }

  const handleNext = () => {
    // Check for alert conditions
    const temp = parseFloat(data.temperature)
    if (currentStep === 2 && temp > 38) {
      setAlertType('fever')
    } else if (currentStep === 1 && data.painLevel >= 7) {
      setAlertType('pain')
    } else if (currentStep === 3 && data.hematuria === 'yes') {
      setAlertType('hematuria')
    } else if (currentStep === 3 && data.urinationProblems === 'severe') {
      setAlertType('retention')
    }

    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)

    // Save to LocalStorage (Mock Database)
    const submission = {
      id: "CK-" + Date.now(),
      patientId: 'P001', // Mock Patient ID
      patientName: 'Mohammed Benali', // Mock Name for Doctor Dashboard
      timestamp: new Date().toISOString(),
      ...data,
      status: hasWarning() ? 'alert' : 'normal'
    };

    let existingCheckins = [];
    try {
      existingCheckins = JSON.parse(localStorage.getItem('urocare_checkins') || '[]');
    } catch (e) {
      console.error("Failed to parse existing checkins", e);
      existingCheckins = [];
    }
    localStorage.setItem('urocare_checkins', JSON.stringify([submission, ...existingCheckins]));
  }

  // Determine if there's a warning based on the check-in data
  const hasWarning = () => {
    const temp = parseFloat(data.temperature)
    return (temp > 38) || (data.painLevel >= 7) || data.bleeding === 'heavy' || data.hematuria === 'yes' || data.urinationProblems === 'severe'
  }

  if (isSubmitted) {
    const warning = hasWarning()

    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${warning ? 'bg-amber-100' : 'bg-green-100'
              }`}>
              {warning ? (
                <AlertTriangle className="h-10 w-10 text-amber-600" />
              ) : (
                <Check className="h-10 w-10 text-green-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Check-in envoyé</h2>
            {warning ? (
              <>
                <p className="text-muted-foreground mb-6">
                  Nous vous recommandons de contacter votre équipe soignante.
                </p>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700 mb-6">
                  Certaines valeurs nécessitent attention
                </Badge>
              </>
            ) : (
              <>
                <p className="text-muted-foreground mb-6">
                  Tout semble normal aujourd'hui ! Continuez votre récupération.
                </p>
                <Badge variant="secondary" className="bg-green-100 text-green-700 mb-6">
                  Toutes les valeurs sont normales
                </Badge>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => router.push('/patient')}>
                Retour au tableau de bord
              </Button>
              <Button onClick={() => router.push('/patient/journal')}>
                Voir le journal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Check-in quotidien</h1>
        <p className="text-muted-foreground">Comment vous sentez-vous aujourd'hui ?</p>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Étape {currentStep} sur 5</span>
          <span className="font-medium text-foreground">{steps[currentStep - 1].title}</span>
        </div>
        <Progress value={(currentStep / 5) * 100} className="h-2" />
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center gap-1 ${step.id === currentStep
                ? 'text-primary'
                : step.id < currentStep
                  ? 'text-green-600'
                  : 'text-muted-foreground'
                }`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step.id === currentStep
                ? 'border-primary bg-primary text-primary-foreground'
                : step.id < currentStep
                  ? 'border-green-600 bg-green-600 text-white'
                  : 'border-muted-foreground/30'
                }`}>
                {step.id < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </div>
              <span className="text-xs hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            {(() => {
              const StepIcon = steps[currentStep - 1].icon
              return <StepIcon className="h-5 w-5" />
            })()}
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <>
              {/* Pain Level */}
              <div className="space-y-4">
                <Label className="text-base">Niveau de douleur (EVA) : {data.painLevel}/10</Label>
                <Slider
                  value={[data.painLevel]}
                  onValueChange={([value]) => updateData('painLevel', value)}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Pas de douleur</span>
                  <span>Douleur intense</span>
                </div>
                {data.painLevel >= 7 && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                    Attention : douleur sévère signalée
                  </div>
                )}
              </div>

              {/* Nausea */}
              <div className="space-y-3">
                <Label className="text-base">Avez-vous des nausées ?</Label>
                <RadioGroup
                  value={data.nausea || ''}
                  onValueChange={(value) => updateData('nausea', value as 'yes' | 'no')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="nausea-yes" />
                    <Label htmlFor="nausea-yes" className="font-normal">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="nausea-no" />
                    <Label htmlFor="nausea-no" className="font-normal">Non</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Dizziness */}
              <div className="space-y-3">
                <Label className="text-base">Avez-vous des vertiges ?</Label>
                <RadioGroup
                  value={data.dizziness || ''}
                  onValueChange={(value) => updateData('dizziness', value as 'yes' | 'no')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="dizziness-yes" />
                    <Label htmlFor="dizziness-yes" className="font-normal">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="dizziness-no" />
                    <Label htmlFor="dizziness-no" className="font-normal">Non</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Fatigue */}
              <div className="space-y-3">
                <Label className="text-base">Comment est votre niveau de fatigue ?</Label>
                <RadioGroup
                  value={data.fatigue || ''}
                  onValueChange={(value) => updateData('fatigue', value as 'mild' | 'moderate' | 'severe')}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="fatigue-mild" />
                    <Label htmlFor="fatigue-mild" className="font-normal">Légère</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="fatigue-moderate" />
                    <Label htmlFor="fatigue-moderate" className="font-normal">Modérée</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="fatigue-severe" />
                    <Label htmlFor="fatigue-severe" className="font-normal">Sévère</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Temperature */}
              <div className="space-y-3">
                <Label htmlFor="temperature" className="text-base flex items-center gap-2">
                  <ThermometerSun className="h-4 w-4" />
                  Température (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="ex: 37.2"
                  value={data.temperature}
                  onChange={(e) => updateData('temperature', e.target.value)}
                  className="max-w-[200px]"
                />
                <p className="text-sm text-muted-foreground">Plage normale : 36.1°C - 37.2°C</p>
                {parseFloat(data.temperature) > 38 && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                    Attention : température supérieure à 38°C
                  </div>
                )}
              </div>

              {/* Heart Rate */}
              <div className="space-y-3">
                <Label htmlFor="heartRate" className="text-base flex items-center gap-2">
                  <HeartPulse className="h-4 w-4" />
                  Fréquence cardiaque (optionnel)
                </Label>
                <Input
                  id="heartRate"
                  type="number"
                  placeholder="ex: 72"
                  value={data.heartRate}
                  onChange={(e) => updateData('heartRate', e.target.value)}
                  className="max-w-[200px]"
                />
                <p className="text-sm text-muted-foreground">Fréquence normale au repos : 60-100 bpm</p>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              {/* Urination Problems */}
              <div className="space-y-3">
                <Label className="text-base">Difficultés à uriner (dysurie) ?</Label>
                <RadioGroup
                  value={data.urinationProblems || ''}
                  onValueChange={(value) => updateData('urinationProblems', value as 'none' | 'mild' | 'severe')}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="urination-none" />
                    <Label htmlFor="urination-none" className="font-normal">Aucune</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="urination-mild" />
                    <Label htmlFor="urination-mild" className="font-normal">Légères</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="urination-severe" />
                    <Label htmlFor="urination-severe" className="font-normal">Sévères</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Burning sensation */}
              <div className="space-y-3">
                <Label className="text-base">Brûlures urinaires ?</Label>
                <RadioGroup
                  value={data.urinationBurning || ''}
                  onValueChange={(value) => updateData('urinationBurning', value as 'yes' | 'no')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="burning-yes" />
                    <Label htmlFor="burning-yes" className="font-normal">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="burning-no" />
                    <Label htmlFor="burning-no" className="font-normal">Non</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Hematuria */}
              <div className="space-y-3">
                <Label className="text-base">Sang dans les urines (hématurie) ?</Label>
                <RadioGroup
                  value={data.hematuria || ''}
                  onValueChange={(value) => updateData('hematuria', value as 'yes' | 'no')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hematuria-yes" />
                    <Label htmlFor="hematuria-yes" className="font-normal">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hematuria-no" />
                    <Label htmlFor="hematuria-no" className="font-normal">Non</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Transit */}
              <div className="space-y-3">
                <Label className="text-base">Comment est votre transit ?</Label>
                <RadioGroup
                  value={data.transit || ''}
                  onValueChange={(value) => updateData('transit', value as 'normal' | 'constipation' | 'diarrhea')}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="transit-normal" />
                    <Label htmlFor="transit-normal" className="font-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="constipation" id="transit-constipation" />
                    <Label htmlFor="transit-constipation" className="font-normal">Constipation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="diarrhea" id="transit-diarrhea" />
                    <Label htmlFor="transit-diarrhea" className="font-normal">Diarrhée</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Gas emission */}
              <div className="space-y-3">
                <Label className="text-base">Émission de gaz/selles ?</Label>
                <RadioGroup
                  value={data.gasEmission || ''}
                  onValueChange={(value) => updateData('gasEmission', value as 'yes' | 'no')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="gas-yes" />
                    <Label htmlFor="gas-yes" className="font-normal">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="gas-no" />
                    <Label htmlFor="gas-no" className="font-normal">Non</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              {/* Wound Concerns */}
              <div className="space-y-3">
                <Label className="text-base">État de la cicatrice ?</Label>
                <RadioGroup
                  value={data.woundConcerns || ''}
                  onValueChange={(value) => updateData('woundConcerns', value as 'none' | 'redness' | 'swelling' | 'fluid')}
                  className="grid grid-cols-2 gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="wound-none" />
                    <Label htmlFor="wound-none" className="font-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="redness" id="wound-redness" />
                    <Label htmlFor="wound-redness" className="font-normal">Rougeur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="swelling" id="wound-swelling" />
                    <Label htmlFor="wound-swelling" className="font-normal">Gonflement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fluid" id="wound-fluid" />
                    <Label htmlFor="wound-fluid" className="font-normal">Écoulement</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Wound Photo */}
              <div className="space-y-3">
                <Label className="text-base">Photo de la cicatrice (optionnel)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Prenez une photo de votre cicatrice
                  </p>
                  <Button variant="outline" size="sm">
                    Prendre une photo
                  </Button>
                </div>
              </div>

              {/* Medications */}
              <div className="space-y-3">
                <Label className="text-base">Avez-vous pris vos médicaments ?</Label>
                <RadioGroup
                  value={data.medicationsTaken || ''}
                  onValueChange={(value) => updateData('medicationsTaken', value as 'yes' | 'no' | 'partial')}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="meds-yes" />
                    <Label htmlFor="meds-yes" className="font-normal">Oui, tous</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="meds-partial" />
                    <Label htmlFor="meds-partial" className="font-normal">Partiellement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="meds-no" />
                    <Label htmlFor="meds-no" className="font-normal">Non</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Additional notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-base">Remarques supplémentaires</Label>
                <Textarea
                  id="notes"
                  placeholder="Décrivez tout autre symptôme ou préoccupation..."
                  value={data.additionalNotes}
                  onChange={(e) => updateData('additionalNotes', e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">Vérifiez vos réponses avant d'envoyer :</p>

              <div className="rounded-lg border border-border divide-y divide-border">
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Douleur (EVA)</span>
                  <span className={`font-medium ${data.painLevel >= 7 ? 'text-destructive' : 'text-foreground'}`}>{data.painLevel}/10</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Température</span>
                  <span className={`font-medium ${parseFloat(data.temperature) > 38 ? 'text-destructive' : 'text-foreground'}`}>{data.temperature}°C</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Nausées</span>
                  <span className="font-medium text-foreground">{data.nausea === 'yes' ? 'Oui' : 'Non'}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Vertiges</span>
                  <span className="font-medium text-foreground">{data.dizziness === 'yes' ? 'Oui' : 'Non'}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Fatigue</span>
                  <span className="font-medium text-foreground">{data.fatigue === 'mild' ? 'Légère' : data.fatigue === 'moderate' ? 'Modérée' : 'Sévère'}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Difficultés urinaires</span>
                  <span className={`font-medium ${data.urinationProblems === 'severe' ? 'text-destructive' : 'text-foreground'}`}>
                    {data.urinationProblems === 'none' ? 'Aucune' : data.urinationProblems === 'mild' ? 'Légères' : 'Sévères'}
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Hématurie</span>
                  <span className={`font-medium ${data.hematuria === 'yes' ? 'text-warning' : 'text-foreground'}`}>
                    {data.hematuria === 'yes' ? 'Oui' : 'Non'}
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Transit</span>
                  <span className="font-medium text-foreground">
                    {data.transit === 'normal' ? 'Normal' : data.transit === 'constipation' ? 'Constipation' : 'Diarrhée'}
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">État cicatrice</span>
                  <span className={`font-medium ${data.woundConcerns !== 'none' ? 'text-warning' : 'text-foreground'}`}>
                    {data.woundConcerns === 'none' ? 'Normal' : data.woundConcerns === 'redness' ? 'Rougeur' : data.woundConcerns === 'swelling' ? 'Gonflement' : 'Écoulement'}
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Médicaments pris</span>
                  <span className={`font-medium ${data.medicationsTaken === 'no' ? 'text-destructive' : 'text-foreground'}`}>
                    {data.medicationsTaken === 'yes' ? 'Oui, tous' : data.medicationsTaken === 'partial' ? 'Partiellement' : 'Non'}
                  </span>
                </div>
              </div>

              {hasWarning() && (
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-warning">Attention</p>
                      <p className="text-sm text-muted-foreground">
                        Certaines de vos réponses nécessitent une attention particulière.
                        Votre équipe soignante sera alertée.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>

        {currentStep < 5 ? (
          <Button onClick={handleNext} disabled={!canProceed()}>
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" />
            Envoyer le check-in
          </Button>
        )}
      </div>

      {/* Alert Popup */}
      {alertType && (
        <AlertPopup
          type={alertType}
          value={alertType === 'fever' ? parseFloat(data.temperature) : alertType === 'pain' ? data.painLevel : undefined}
          isOpen={!!alertType}
          onClose={() => setAlertType(null)}
          onContactTeam={() => {
            setAlertType(null)
            router.push('/patient/messages')
          }}
        />
      )}
    </div>
  )
}
