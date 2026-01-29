"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Info,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const tourSteps = [
  {
    id: 1,
    title: "Accueil et admission",
    description:
      "Vous serez accueilli(e) à l'entrée principale. L'équipe administrative vérifiera vos documents et vous remettra un bracelet d'identification.",
    duration: "15-20 min",
    tips: [
      "Apportez votre carte d'identité et carte vitale",
      "Arrivez 1 heure avant l'heure prévue",
      "Un proche peut vous accompagner jusqu'à la chambre",
    ],
  },
  {
    id: 2,
    title: "Installation en chambre",
    description:
      "Vous serez conduit(e) dans votre chambre où vous pourrez vous changer et ranger vos affaires. Une infirmière viendra prendre vos constantes.",
    duration: "20-30 min",
    tips: [
      "Retirez bijoux, vernis à ongles et prothèses dentaires",
      "Enfilez la blouse fournie par l'hôpital",
      "Rangez vos objets de valeur dans le coffre prévu",
    ],
  },
  {
    id: 3,
    title: "Préparation pré-opératoire",
    description:
      "L'équipe soignante effectuera les dernières vérifications : identité, jeûne, préparation cutanée. L'anesthésiste passera vous voir.",
    duration: "30-45 min",
    tips: [
      "Confirmez que vous êtes bien à jeun",
      "Signalez toute allergie ou nouveau symptôme",
      "Posez vos dernières questions à l'équipe",
    ],
  },
  {
    id: 4,
    title: "Transfert au bloc opératoire",
    description:
      "Vous serez transféré(e) sur un brancard vers le bloc opératoire. L'équipe vous accompagnera et vous rassurera tout au long du trajet.",
    duration: "10-15 min",
    tips: [
      "Respirez calmement et détendez-vous",
      "L'équipe vous parlera pour vous rassurer",
      "Le trajet dure quelques minutes seulement",
    ],
  },
  {
    id: 5,
    title: "Salle d'opération",
    description:
      "Dans la salle d'opération, l'équipe vous installera confortablement. L'anesthésiste vous administrera l'anesthésie et veillera sur vous pendant toute l'intervention.",
    duration: "Variable",
    tips: [
      "L'équipe se présentera et vérifiera votre identité",
      "Des moniteurs surveilleront vos fonctions vitales",
      "Vous ne ressentirez rien pendant l'opération",
    ],
  },
  {
    id: 6,
    title: "Salle de réveil (SSPI)",
    description:
      "Après l'intervention, vous serez transféré(e) en salle de surveillance post-interventionnelle. L'équipe surveillera votre réveil et gérera la douleur.",
    duration: "1-2 heures",
    tips: [
      "Vous pouvez ressentir un peu de confusion au réveil",
      "Signalez toute douleur à l'équipe",
      "Vos proches seront prévenus dès votre retour en chambre",
    ],
  },
  {
    id: 7,
    title: "Retour en chambre",
    description:
      "Une fois bien réveillé(e), vous retournerez dans votre chambre. L'équipe soignante continuera de vous surveiller et vous accompagnera dans votre récupération.",
    duration: "Variable",
    tips: [
      "Reposez-vous autant que nécessaire",
      "Sonnez si vous avez besoin de quoi que ce soit",
      "Vos proches pourront vous rendre visite",
    ],
  },
];

export default function VirtualTourPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const progress = ((currentStep + 1) / tourSteps.length) * 100;
  const currentTourStep = tourSteps[currentStep];

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    router.push("/patient");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Visite virtuelle du bloc
        </h1>
        <p className="text-muted-foreground">
          Découvrez le parcours patient le jour de votre intervention
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Étape {currentStep + 1} sur {tourSteps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {completedSteps.length} étapes vues
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Video Player Placeholder */}
      <Card className="overflow-hidden">
        <div className="aspect-video bg-foreground/5 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-primary" />
                ) : (
                  <Play className="h-10 w-10 text-primary ml-1" />
                )}
              </div>
              <h3 className="font-semibold text-lg mb-1">
                {currentTourStep.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                Cliquez pour démarrer la vidéo
              </p>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
            <div className="flex items-center justify-between text-primary-foreground">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-card hover:text-card hover:bg-card/20"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-card hover:text-card hover:bg-card/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <span className="text-sm text-card/80">0:00 / 2:30</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-card hover:text-card hover:bg-card/20"
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Step Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-semibold text-primary">
                  {currentStep + 1}
                </span>
              </div>
              <div>
                <CardTitle className="text-lg">
                  {currentTourStep.title}
                </CardTitle>
                <Badge variant="secondary" className="mt-1">
                  Durée: {currentTourStep.duration}
                </Badge>
              </div>
            </div>
            {completedSteps.includes(currentStep) && (
              <CheckCircle2 className="h-6 w-6 text-success" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{currentTourStep.description}</p>

          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Conseils pratiques</span>
            </div>
            <ul className="space-y-2">
              {currentTourStep.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Step Navigation */}
      <div className="flex flex-wrap gap-2">
        {tourSteps.map((step, index) => (
          <Button
            key={step.id}
            variant={index === currentStep ? "default" : "outline"}
            size="sm"
            className="gap-1"
            onClick={() => setCurrentStep(index)}
          >
            {completedSteps.includes(index) && (
              <CheckCircle2 className="h-3 w-3" />
            )}
            {index + 1}
          </Button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="gap-2 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>

        {currentStep === tourSteps.length - 1 ? (
          <Button onClick={handleComplete} className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            J'ai compris
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
